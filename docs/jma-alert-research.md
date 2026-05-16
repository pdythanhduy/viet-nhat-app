# JMA Alert Feature — Research Document

**Status:** Research only. NO implementation. Phase 2 candidate.
**Date:** 2026-05-16
**Audience:** Future Claude session or human dev who picks up this feature.

---

## 1. Goal & non-goals

### Goal

Surface Japan Meteorological Agency (気象庁 / JMA) disaster alerts and recent earthquake
data in Vietnamese, scoped to the user's chosen prefecture. Help Vietnamese residents in
Japan understand and act on warnings without translating bureaucratic Japanese.

### Non-goals (intentionally NOT building)

- **Real-time earthquake early warning.** The OS-level J-Alert (緊急地震速報) on Japanese
  iPhones already does this via cell broadcast — faster than any third-party app. Our app
  must NOT pretend to replace it.
- **Generic daily weather forecasts.** That's what built-in Weather + Yahoo!天気 do. We
  add no value there.
- **Pushy spam.** Push only critical alerts. Misuse erodes notification opt-in rate
  permanently.

---

## 2. JMA endpoints (public, free, undocumented)

JMA exposes JSON feeds at `https://www.jma.go.jp/bosai/...`. These are scraped by every
Japanese disaster app. Officially undocumented for public use, but stable for years and
widely relied on. Treat them as a free resource with reliability risk.

### Earthquakes

| Endpoint | Purpose | Update freq |
|---|---|---|
| `https://www.jma.go.jp/bosai/quake/data/list.json` | Recent earthquake list (50 most recent) | Within ~1 min of detection |
| `https://www.jma.go.jp/bosai/quake/data/<eventId>.json` | Per-event detail (震度 by region) | One-shot per event |

**Sample list response shape:**
```json
[
  {
    "eid": "20260516120000",
    "ctt": "20260516120130",
    "ift": "20260516120030",
    "ser": "1",
    "at": "2026-05-16T12:00:00+09:00",
    "anm": "Osaka prefecture",
    "mag": "4.2",
    "maxi": "4",
    "json": "20260516120030_0_VTSE51_280000.json"
  }
]
```

Key fields:
- `at` — 発生時刻 (occurrence time, ISO with JST offset)
- `anm` — area name (震央地域)
- `mag` — magnitude (M, decimal string)
- `maxi` — max 震度 (intensity scale 1-7, can be `5弱`/`5強`/`6弱`/`6強` for 5/6)
- `eid` — event ID for detail lookup

### Warnings (警報・注意報)

| Endpoint | Purpose |
|---|---|
| `https://www.jma.go.jp/bosai/warning/data/warning/<areaCode>.json` | Per-prefecture active warnings |
| `https://www.jma.go.jp/bosai/warning/data/warning/map.json` | Nationwide warning map (all areas) |

`<areaCode>` is the 6-digit JIS prefecture/area code. See section 3.

**Sample warning response (excerpt):**
```json
{
  "reportDatetime": "2026-05-16T15:30:00+09:00",
  "headlineText": "大雨警報・洪水警報を発表しました",
  "areaTypes": [
    {
      "areas": [
        {
          "code": "2710000",
          "warnings": [
            { "code": "33", "status": "発表" },  // 大雨警報
            { "code": "18", "status": "発表" }   // 洪水警報
          ]
        }
      ]
    }
  ]
}
```

Warning codes (selection — full list in JMA spec):
| Code | Japanese | Vietnamese (proposed) | Severity |
|---|---|---|---|
| 02 | 暴風警報 | Cảnh báo gió mạnh | warning |
| 03 | 大雨特別警報 | **CẢNH BÁO ĐẶC BIỆT mưa cực lớn** | emergency |
| 18 | 洪水警報 | Cảnh báo lũ lụt | warning |
| 21 | 大雨警報 | Cảnh báo mưa lớn | warning |
| 33 | 大雪警報 | Cảnh báo tuyết lớn | warning |
| 35 | 暴風雪警報 | Cảnh báo bão tuyết | warning |
| 36 | 高潮警報 | Cảnh báo triều cường | warning |
| 37 | 波浪警報 | Cảnh báo sóng lớn | warning |

Special warnings (特別警報) are highest severity — life-threatening.

### Tsunami (津波)

| Endpoint | Purpose |
|---|---|
| `https://www.jma.go.jp/bosai/tsunami/data/list.json` | Active tsunami warnings list |

Severity levels:
- 大津波警報 (Major Tsunami Warning) → evacuate immediately, can be 3m+ wave
- 津波警報 (Tsunami Warning) → evacuate, 1-3m wave
- 津波注意報 (Tsunami Advisory) → caution, <1m wave

### Evacuation (避難情報) — caveat

JMA does NOT publish 避難指示 / 避難勧告. Those come from each 市区町村 (city/ward) via
Lアラート. To get them, you'd need to either:
- Scrape `https://www.bousai.metro.tokyo.lg.jp/` per-prefecture (one URL per region, fragile)
- Use FDMA's L-Alert feed (requires registration as a disseminator)
- Direct user to Yahoo!防災速報 app for evacuation orders

**Recommendation:** Scope the MVP to JMA-only data (earthquakes + weather warnings + tsunami).
Don't promise evacuation orders. Add a "Cho lệnh sơ tán, dùng Yahoo!防災速報" hint.

---

## 3. Prefecture / area code mapping

JMA uses 7-digit area codes derived from JIS X 0401 prefecture codes. Format:
`PPPCCCC` where `PPP` is prefecture (010-470) and `CCCC` varies.

For our purpose, we want **prefecture-level** warnings, which use the `PP00000` form
(e.g., `2700000` = Osaka prefecture).

### 47 prefectures lookup

```typescript
export const PREFECTURE_CODES = {
  hokkaido: { code: '0100000', vi: 'Hokkaido', jp: '北海道' },
  aomori:   { code: '0200000', vi: 'Aomori',   jp: '青森県' },
  // ... 45 more
  okinawa:  { code: '4700000', vi: 'Okinawa',  jp: '沖縄県' },
};
```

Full list to be generated from the JIS X 0401 spec (47 entries). Vietnamese names should
match the Vietnamese-language convention common in VN-JP community (e.g., "Tokyo" not
"Đông Kinh", "Osaka" not "Đại Bản").

### How to know user's prefecture

Two paths:
1. **User picks at first launch** (recommended) — privacy-friendly, no permissions
2. **Reverse-geocode from GPS** — needs `expo-location`, friction. Skip for MVP.

Save to AsyncStorage under new key `selected_prefecture_code_v1`.

---

## 4. Severity / wording philosophy

User said:
> Đừng làm kiểu generic weather app. Sai lầm dễ gặp: "Hiển thị mọi cảnh báo".
> User sẽ tắt notification ngay.

Strict push criteria. **Push only when:**

| Trigger | Push? | Notification text (VN, đời thường) |
|---|---|---|
| 動đất 震度 ≥ 4 ở tỉnh user | ✅ Push | "🌋 Osaka rung mạnh độ 4. Kiểm tra nhà cửa và người thân." |
| 動đất 震度 5+ bất kỳ đâu | ✅ Push | "⚠️ Động đất lớn ở [tỉnh]. Coi tin tức ngay." |
| 大雨特別警報 (emergency rain) tại tỉnh user | ✅ Push | "🚨 Osaka có mưa CỰC LỚN. Hạn chế ra đường, theo dõi 119." |
| 大雨警報 (regular heavy rain) tại tỉnh user | ✅ Push | "🌧️ Osaka có cảnh báo mưa lớn. Tàu có thể delay tối nay." |
| 津波警報 / 大津波警報 ở tỉnh user (ven biển) | ✅ Push | "🌊 [tỉnh] có cảnh báo sóng thần. Lên cao ngay." |
| 暴風警報 ở tỉnh user | ✅ Push | "💨 Osaka có gió rất mạnh. Cẩn thận khi ra ngoài." |
| 注意報 (advisory) bất kỳ | ❌ Never push | Show in-app only |
| 大雨注意報 / mưa thường | ❌ Never push | Show in-app only |
| Forecast 30% mưa | ❌ Never push | Not in scope at all |

**In-app screen** can show fuller list (active warnings + recent earthquakes) without
pushing. Push is reserved for action-required events.

### Vietnamese wording rules

- ❌ "Cảnh báo khí tượng đặc biệt cho khu vực Osaka về hiện tượng mưa cực lớn"
- ✅ "🚨 Osaka mưa CỰC LỚN. Đừng ra đường tối nay."

- ❌ "Phát biểu thông báo địa chấn cấp 4"
- ✅ "🌋 Osaka rung độ 4. Người thân ổn không?"

Tone: thân, ngắn, gợi hành động cụ thể. Tránh từ Hán Việt hành chính.

---

## 5. Architecture suggestion (for future implementation)

### MVP without backend (recommended for v2.0.0)

```
┌──────────────────────────────────────────────────┐
│  App                                             │
│  ┌────────────────────────────────────────────┐  │
│  │  DisasterAlertsScreen                      │  │
│  │  - Active warnings (fetched on focus)      │  │
│  │  - Recent earthquakes (fetched on focus)   │  │
│  │  - Filter: user's prefecture               │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │  expo-background-fetch                     │  │
│  │  - Runs every ~15-30 min (OS-controlled)   │  │
│  │  - Polls JMA warnings for user prefecture  │  │
│  │  - If new push-worthy alert → local noti   │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
                      │
                      │ HTTPS GET
                      ▼
              ┌───────────────┐
              │  JMA endpoints│
              └───────────────┘
```

**Pros:** Zero backend cost. Ships fast. Privacy-friendly (no server sees user location).
**Cons:** BackgroundFetch unreliable on iOS (15-30 min cadence, OS may suspend). Quake
notifications likely arrive AFTER the shake — useful for "check on family" not survival.

### v2.5+ with backend (only if metrics justify)

```
┌─────────────┐  poll JMA every 60s  ┌──────────────────┐
│  Cloudflare │◄────────────────────►│  JMA endpoints   │
│  Worker     │                       └──────────────────┘
│  (or Fly.io)│
│             │  Expo Push (only      ┌──────────────────┐
│             │  when push-worthy)    │  User devices    │
│             ├──────────────────────►│  (push tokens in │
└─────────────┘                       │  Supabase free)  │
                                      └──────────────────┘
```

Cost: ~0¥ (Cloudflare Workers free tier 100K req/day, Supabase free tier).
Latency: <1 min from JMA to user device. Acceptable for warnings (not earthquakes).

**Decision rule:** Build backend ONLY if `notification_opened` rate on the no-backend MVP
is >40% AND DAU > 1,000. Otherwise BackgroundFetch is good enough.

---

## 6. Rate limit & politeness

JMA doesn't publish rate limits. Community apps use these conventions:
- Earthquake list: poll every 60s max (during active session)
- Warning data: poll every 5 min max
- Set `User-Agent: CamNangVietNhat/2.0 (vn-jp-app, contact: thanhduy8vn@gmail.com)` so
  JMA can identify if usage spikes
- Cache responses for at least 30s in memory + 10 min in AsyncStorage
- Backoff exponentially on 5xx errors. Never spin-loop.

Aggressive polling could get the app blocked or worse. Be a good citizen.

---

## 7. Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| JMA changes endpoint schema | Medium (years between changes) | Wrap in adapter, fail gracefully (show "Không lấy được dữ liệu, mở Yahoo!天気") |
| User confuses our app with J-Alert | High if wording bad | Onboarding line: "App này KHÔNG thay J-Alert hệ thống." |
| BackgroundFetch wakes too rarely → user misses alert | High on iOS | Document limit. Suggest user enable notifications + open app daily |
| User misinterprets vague alert and panics or ignores danger | Medium | Vietnamese wording must be calibrated. Have a Vietnamese in Japan review wording before ship |
| Apple App Review questions disaster claims | Low if scoped honestly | Scope to "informational, not life-safety". Mention OS J-Alert in description |

---

## 8. Implementation checklist (for whoever builds this later)

When metrics justify Phase 2:

1. **Data layer** — `src/utils/jma/`
   - [ ] `jmaClient.ts` — fetch + parse helpers, response cache, error handling
   - [ ] `prefectureCodes.ts` — full 47-prefecture map with VI names
   - [ ] `warningTranslations.ts` — code → VI string + severity mapping
   - [ ] `pushCriteria.ts` — pure function `shouldPush(alert, userPrefecture): boolean`
   - [ ] Tests for all of the above

2. **UI** — new screen
   - [ ] `DisasterAlertsScreen.tsx` — active warnings + recent quakes list
   - [ ] Add to AppNavigator route stack
   - [ ] Entry point: card on EmergencyHubScreen + small badge on Home if active alert

3. **Background polling**
   - [ ] Add `expo-background-fetch` dependency
   - [ ] Register task in App.tsx, run every 30 min
   - [ ] On new push-worthy alert: schedule local notification + dedupe by alert ID

4. **Settings**
   - [ ] Prefecture picker in Settings (47 options, search)
   - [ ] Toggle: "Bật thông báo cảnh báo thiên tai"
   - [ ] Save to AsyncStorage

5. **Onboarding**
   - [ ] First launch after update: prompt to pick prefecture + grant notification
   - [ ] Disclaimer: "App này KHÔNG thay J-Alert. Vẫn nên giữ J-Alert bật."

6. **Analytics events** (add to `EventMap`):
   - `disaster_alerts_view`
   - `disaster_prefecture_selected: { code }`
   - `disaster_alert_pushed: { type, severity }`
   - `disaster_alert_opened: { type, severity }`

7. **App Store update prep**
   - [ ] Add to "What's New" notes
   - [ ] No new permissions needed (notifications already granted, no location)
   - [ ] App Privacy: no new data collection

---

## TL;DR

- JMA endpoints are free and stable. Use them.
- Build for **awareness + dispatch to action**, not real-time early warning.
- Ship strict push criteria — never spam.
- Vietnamese wording > technical accuracy. Have a native VN-in-Japan reviewer check.
- Start with no-backend BackgroundFetch MVP. Backend only if metrics prove demand.
- Quote/link `essential-apps-japan-life.ts` admin guide so users know about Yahoo!天気,
  Safety Tips, NHK World as complementary apps.
