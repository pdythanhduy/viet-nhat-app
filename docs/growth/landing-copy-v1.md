# Growth Asset Pack — Landing Page Copy v1

**Date**: 2026-05-23
**Status**: copy pack. No landing page is being built in this PR. This doc is the ready-to-paste text for whenever a landing page is built (currently gated by `docs/growth-next-loop-v1.5.1.md` §3 — domain registration + AASA + asset-links not done).
**Companion**: [`docs/growth/aso-v1.md`](aso-v1.md) (subtitle / positioning variants), [`docs/v1.5.0-changelog.md`](../v1.5.0-changelog.md) (long-form description).

**Compliance applies**: every line below passes `docs/content-governance.md` §1 anti-clickbait rules. No "guaranteed". No "tăng tỷ lệ đậu". No fake testimonials. No "loophole".

---

## 0. Tone calibration

The landing page must feel like:
- A government information portal (calm, sourced)
- ... written by a friend who's been in Japan for 5 years (warm, specific)
- ... not a SaaS app (no startup jargon, no "transform your life")

Read this section before writing any new copy.

### Voice rules

- **Use "bạn", not "anh/chị"** — bạn is age-neutral and emotionally close. The app respects the reader.
- **No "chúng tôi" branding flexes** — say what the app does, not who built it.
- **No exclamation marks** — none, in the entire page.
- **Numbers > adjectives** — "127 thủ tục" beats "rất nhiều thủ tục".
- **Concrete > abstract** — "tìm thủ tục bằng tiếng Việt" beats "trải nghiệm tốt".
- **Anti-fear, not anti-anxiety** — we don't pretend the bureaucracy isn't hard; we say "here's how to navigate it".

### Words to avoid

| ❌ | Why |
| --- | --- |
| "Cách mạng" / "Đột phá" / "Số 1" | Marketing puff, low-trust |
| "Giải pháp tốt nhất" | Superlative, unprovable |
| "Tự động" / "AI thông minh" | We don't have AI; misleading |
| "Tăng tỷ lệ đậu visa" | Compliance refusal |
| "Cài ngay kẻo trễ" | Time-pressure manipulation |
| "Miễn phí 100% mãi mãi" | "Mãi mãi" is unprovable |
| "Cộng đồng người Việt" | We are not a community app |

---

## 1. Hero copy

The hero is the first thing the visitor sees. ONE sentence. ONE supporting line. ONE CTA.

### Hero option H1 — Utility-led (default)

**Headline**:
> Cẩm nang sống ở Nhật, viết bằng tiếng Việt.

**Sub-headline**:
> 127 thủ tục, đời sống, và pháp lý — tìm được bằng tiếng Việt, romaji, hoặc tiếng Nhật. Nguồn từ 出入国在留管理庁, 厚生労働省, 法テラス.

**CTA**:
> Tải app miễn phí — iOS · Android

### Hero option H2 — Newcomer-led (test)

**Headline**:
> Mới sang Nhật? App này đỡ bạn 90 ngày đầu.

**Sub-headline**:
> Checklist tuần 1, tuần 4, và tháng 3. Hơn 127 hướng dẫn thủ tục, đời sống, pháp lý — tiếng Việt + tiếng Nhật.

**CTA**:
> Tải app miễn phí — iOS · Android

### Hero option H3 — Trust-led (paid-traffic variant)

**Headline**:
> Mọi hướng dẫn đều có thể kiểm chứng tại nguồn.

**Sub-headline**:
> Cẩm Nang Việt Nhật — 127 thủ tục cho người Việt ở Nhật, mỗi guide dẫn về nguồn .go.jp. Không quảng cáo, không bán dữ liệu.

**CTA**:
> Tải app — iOS · Android

**Default pick**: H1 ship. H2 swap if newcomer-cohort retention is the priority. H3 swap if running paid traffic where trust friction is higher.

---

## 2. Trust copy (the section that earns the install)

This section appears right below the hero. It exists to neutralize the question "is this app legitimate?".

### Trust block

```
Tại sao bạn có thể tin app này?

Nguồn chính thức
Mỗi guide dẫn về nguồn .go.jp — bạn có thể tự kiểm chứng.
Chúng tôi không tự suy luận luật.

Không quảng cáo
App miễn phí, không in-app ad, không sponsored content.
Không bán hoặc share dữ liệu người dùng cho bên thứ ba.

Không theo dõi cá nhân
Không tạo tài khoản. Không yêu cầu email, số điện thoại,
hay địa chỉ. Bookmark + tiến độ học lưu trên máy bạn,
không upload lên cloud.

Offline được
Mở app khi không có wifi vẫn dùng được. Khi đang ở
bệnh viện, ga tàu basement, hay trên 新幹線.

Nguồn mở về cách hoạt động
Mọi quyết định ranking + heuristic của app đều có thể
đọc trong docs trên GitHub. Không có "black box".
```

### Trust card row (visual: 4-5 small cards across)

| Card | One-line |
| --- | --- |
| Nguồn .go.jp | Mỗi guide dẫn về Nhật trang chính thức |
| Không ads | Không quảng cáo, không sponsor |
| Không tài khoản | Không cần email / số điện thoại |
| Offline | Không cần wifi để mở |
| Nguồn mở docs | Cách app hoạt động đều đọc được |

---

## 3. Onboarding copy ("what does the app actually do?")

For visitors who scrolled past the hero. They want concrete details.

### Three-pillar block

```
Cẩm Nang Việt Nhật phục vụ 3 mảng

1. Thủ tục
   Visa, 在留カード, 永住, 帰化, 国民健康保険, 国民年金,
   住民税, 確定申告, 雇用保険, 労災, my number, hanko.
   127 guide, mỗi guide có quy trình + giấy tờ + số điện
   thoại chính thức.

2. Đời sống
   Nhà cửa, chuyển nhà, ngân hàng, gửi tiền về VN,
   bệnh viện, nhà thuốc, hằng ngày 市役所 / コンビニ / 
   pharmacy / post office, đi tàu, an toàn xe đạp.

3. Pháp lý + Khẩn cấp
   Tai nạn giao thông, mất giấy tờ, police hỏi đường,
   DV, scam mạo danh, hotline tiếng Việt + 法テラス,
   FRESC, AMDA y tế.
```

### Feature list (use in modal "see all features" or sub-page)

```
Tìm kiếm bằng 4 ngôn ngữ
Gõ tiếng Việt có dấu, tiếng Việt không dấu, romaji,
hoặc tiếng Nhật — đều ra cùng kết quả.

127 guide có nguồn
Mỗi guide ghi rõ ngày cập nhật + ít nhất 1 link .go.jp
để bạn tự kiểm tra.

Mẫu câu tiếng Nhật theo tình huống
76+ câu cho 市役所, bệnh viện, ngân hàng, phòng nhân
sự — bạn có thể chỉ vào màn hình mà nói.

Daily Ritual học tiếng Nhật
5 phút mỗi ngày, không streak counter ép buộc,
không push notification.

Trung tâm khẩn cấp
1 chạm đến 110, 119, 法テラス, AMDA, FRESC, đại sứ
quán VN tại Nhật.

Bookmark cho lúc cần
Lưu guide để mở lại offline. Lưu trên máy bạn,
không upload.
```

---

## 4. FAQ copy

Position: middle of the page. 8 FAQ items.

```
Câu hỏi thường gặp

App có miễn phí không?
Có. Không có gói premium, không có in-app purchase,
không có quảng cáo.

App có yêu cầu tạo tài khoản không?
Không. Bookmark + tiến độ học lưu trên máy bạn.
Không có server lưu dữ liệu cá nhân.

Tôi không biết tiếng Nhật — app có dùng được không?
Có. Tìm kiếm bằng tiếng Việt (có dấu hoặc không dấu).
Mỗi câu tiếng Nhật có romaji + dịch tiếng Việt bên cạnh.

App có cập nhật theo luật mới không?
Có. Mỗi guide có ngày 'last verified'. Cập nhật thường
xuyên theo thông tin chính thức từ 出入国在留管理庁,
厚生労働省, 法務省, 国税庁, 厚労省.

App có tư vấn cá nhân không?
KHÔNG. App là tài liệu tham khảo, không phải tư vấn
pháp lý hoặc tài chính cá nhân. Mỗi guide có hướng dẫn
khi nào nên hỏi 弁護士 / 行政書士 / 税理士 / 社労士.

App có chạy offline không?
Có. Sau khi tải về, không cần wifi. Riêng các link
nguồn cần internet để mở.

App có dùng AI không?
KHÔNG. Mọi guide đều do người viết, mỗi câu dẫn về
nguồn chính thức. Không có chatbot, không tự sinh câu
trả lời.

Tôi báo lỗi / đóng góp được không?
Email: pdythanhduy@gmail.com. Mỗi báo lỗi thực được
xử lý trong vòng 1-2 tuần.
```

---

## 5. Emotional copy (anti-fear band — placement near footer)

This section is the soft close. It speaks to the feeling beneath the install decision: "Tôi đang ở Nhật một mình, nhiều thứ tôi không hiểu".

```
Sống ở Nhật không phải để hoang mang

Bạn không cần thuộc lòng luật Nhật.
Không cần biết kanji.
Không cần một người quen ở Nhật lâu năm.

Chỉ cần một cẩm nang — gõ tiếng Việt là tìm được,
mỗi câu dẫn về nguồn chính thức, mở được khi không có
mạng, không bị quảng cáo làm phiền, không bị theo dõi
qua tài khoản.

Hơn 127 thủ tục, đời sống, và pháp lý — đã được biên
soạn cho người Việt ở Nhật.

Khi việc khẩn xảy ra, mở app, gõ, đọc, gọi số đúng.
Khi việc không khẩn, mở app, hiểu trước, không bị động.

Tải app — và để cẩm nang đi cùng bạn.
```

---

## 6. "Not legal advice" positioning

Required compliance band. Placement: footer + every guide-page deep-link.

### Short version (footer line)

```
App là tài liệu tham khảo, không phải tư vấn pháp lý
hoặc tài chính cá nhân. Mỗi trường hợp cụ thể nên hỏi
弁護士, 行政書士, 税理士, hoặc 社労士 có giấy phép.
```

### Long version (legal disclaimer page link from footer)

```
Tuyên bố trách nhiệm

Cẩm Nang Việt Nhật là tài liệu thông tin tổng quát.
KHÔNG phải:
- Tư vấn pháp lý cá nhân
- Tư vấn thuế cá nhân
- Tư vấn nhập cư cá nhân
- Tư vấn y tế

Mỗi guide ghi rõ khi nào nên hỏi chuyên gia có
giấy phép tại Nhật:
- 弁護士 (luật sư) cho vấn đề pháp lý
- 行政書士 (administrative scrivener) cho thủ tục
  nhập cư
- 税理士 (kế toán thuế) cho thuế
- 社労士 (social labor) cho lao động + nenkin
- 司法書士 (judicial scrivener) cho nhà đất + di chúc

Hotline miễn phí lần đầu: 法テラス 0570-078374.

App không chịu trách nhiệm cho hậu quả của quyết định
dựa hoàn toàn vào nội dung trong app. Luôn xác nhận
thông tin mới nhất tại nguồn chính thức (.go.jp) hoặc
với chuyên gia có giấy phép.

Liên hệ báo lỗi: pdythanhduy@gmail.com
```

---

## 7. Footer copy

```
Cẩm Nang Việt Nhật — cẩm nang sống ở Nhật cho người Việt.

App miễn phí · Không ads · Không tài khoản · Không tracking
Nguồn từ 出入国在留管理庁 · 厚生労働省 · 法務省 · 国税庁 · 法テラス

Tải app: iOS [link] · Android [link]
Báo lỗi / đóng góp: pdythanhduy@gmail.com
Tuyên bố trách nhiệm: [link to §6 long version]
Privacy: [link to docs/privacy-policy.html]
Terms: [link to docs/terms.html]
```

---

## 8. SEO / meta tags (for the page itself)

Place these in the `<head>` of the landing page when built.

### Vietnamese locale meta

```html
<title>Cẩm Nang Việt Nhật — Cẩm nang sống ở Nhật cho người Việt</title>
<meta name="description" content="127 thủ tục, đời sống, và pháp lý cho người Việt ở Nhật. Tìm bằng tiếng Việt, romaji, hoặc tiếng Nhật. Nguồn .go.jp. Miễn phí. Không ads. Không tài khoản.">
<meta property="og:title" content="Cẩm Nang Việt Nhật — Cẩm nang sống ở Nhật">
<meta property="og:description" content="127 thủ tục cho người Việt ở Nhật. Tìm bằng tiếng Việt. Nguồn .go.jp. Miễn phí.">
<meta property="og:type" content="website">
<meta property="og:locale" content="vi_VN">
```

### English locale meta

```html
<title>Vietnam-Japan Handbook — Living in Japan for Vietnamese Residents</title>
<meta name="description" content="127 official-source guides for Vietnamese residents in Japan. Search in Vietnamese, romaji, or Japanese. Sources from go.jp government sites. Free. No ads. No account.">
```

---

## 9. Microcopy fragments (for buttons, badges, tooltips)

These appear on landing page UI elements.

| Element | Copy |
| --- | --- |
| App Store badge | `Tải trên App Store` |
| Play Store badge | `Tải trên Google Play` |
| "Read more" button on a feature | `Tìm hiểu thêm` |
| "Read sample guide" link | `Đọc thử một guide` |
| Search demo input placeholder | `Thử gõ: visa, bao hiem, zairyu, 住民税…` |
| Privacy badge | `Không thu thập dữ liệu cá nhân` |
| Source badge | `Nguồn chính thức .go.jp` |
| Email contact button | `Báo lỗi hoặc đóng góp` |
| "Back to top" | `Lên đầu trang` |

---

## 10. Conversion priorities (when iterating)

When the landing page is shipped, iterate on copy in this order:

1. **Hero CTA placement and wording** — affects 90% of installs
2. **Trust block visibility above the fold** — affects "is this real" friction
3. **FAQ "Có miễn phí không"** — single biggest install-friction question for Vietnamese audience
4. **"Tải app" button label vs "Cài app" vs "Cài đặt"** — micro-copy A/B
5. **Search demo placeholder examples** — concrete examples beat abstract benefits

**Do not iterate on copy in observation season** — wait until 2026-06-12 (per `docs/observation-season-freeze.md`).

---

## 11. What this copy pack does NOT include

- ❌ Animated hero section copy (we ship static)
- ❌ Video script for hero (use `docs/growth/short-video-hooks.md` Format C for any explainer video)
- ❌ Testimonial copy (we don't have real testimonials yet; faking is forbidden)
- ❌ "Number of downloads" badge text (we don't have download numbers to advertise yet)
- ❌ Geographic targeting copy (page is single-locale per build, not dynamic)
- ❌ Newsletter sign-up copy (no newsletter exists; out of scope)
- ❌ Pricing copy (free; "free" is stated; nothing else to add)

---

## 12. When this copy actually ships

Per `docs/growth-next-loop-v1.5.1.md` §3:
- Domain registration NOT done
- AASA / asset-links NOT done
- Landing page hosting NOT chosen

**Until those three are done, this doc is text-only**. Once those land (separate decision), paste the copy from this doc into the page template; no re-authoring required.

---

## Related docs

- [`docs/growth/aso-v1.md`](aso-v1.md) — store-side equivalent of this copy
- [`docs/growth/screenshot-storyboards.md`](screenshot-storyboards.md) — visual companion
- [`docs/growth-next-loop-v1.5.1.md`](../growth-next-loop-v1.5.1.md) — landing page prereqs
- [`docs/v1.5.0-changelog.md`](../v1.5.0-changelog.md) — long-form release notes
- [`docs/content-governance.md`](../content-governance.md) — compliance rules
