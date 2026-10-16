# ASO submission record — 2026-10-16

**Why**: no new downloads. Audit of the live listing (iTunes lookup, 2026-10-16) found:

- Description is the April draft: literal `\n` visible mid-text, mentions "Trợ lý AI" (needs the user's own API key), no mention of the 120+ guides, news tab, or the 01/10/2026 visa-fee change.
- Only 3 screenshots. The 6-shot set from `aso-submission-2026-05-23.md` §3 was never uploaded.
- Binary declares only `EN` → store page shows "English". Fixed in code (`CFBundleLocalizations` vi/ja/en in `app.json`), ships with the next binary.
- 2 ratings total. In-app review prompt added (`src/utils/reviewPrompt.ts`), ships with the next binary.
- In-app share link pointed to `camnangvietnhat.app`, a domain that was never registered (NXDOMAIN). Now points to the GitHub Pages landing (`docs/index.html`).

## 0. Which locale is indexed where (important)

The Japan storefront indexes and displays only the **Japanese** and **English (U.S.)** localizations. A Vietnamese (`vi`) localization is **not used** in Japan. So for users in Japan:

- **English (U.S.)** locale = the listing most Vietnamese users see → write it **in Vietnamese** (that's what the live listing already does) and put the no-diacritics Vietnamese keywords there.
- **Japanese** locale = shown to iPhones set to Japanese; also catches Japanese-language searches (ベトナム人 ビザ…).

The `vi` keyword string from the May plan has no effect in Japan. Don't spend effort on it.

---

## 1. English (U.S.) locale — written in Vietnamese

**Name** (keep): `Cẩm Nang Việt Nhật`

**Subtitle** (28/30):
```
Visa, thủ tục, đời sống Nhật
```

**Keywords** (100/100). Words already in name/subtitle are left out; no diacritics:
```
thu tuc,nguoi viet,nhat ban,zairyu,the cu tru,gia han,nenkin,bao hiem,thue,vinh tru,my number,du hoc
```

**Promotional text** (155/170). Can be changed any time without review, so rotate it with the news:
```
Phí gia hạn visa và vĩnh trú tăng từ 01/10/2026 — xem bảng phí mới bằng tiếng Việt. Hơn 120 hướng dẫn thủ tục ở Nhật, có nguồn chính thức. Không quảng cáo.
```

**Description**. The first 3 lines are what people see before "more", so they carry the hook:
```
Sống ở Nhật mà không chắc thủ tục? Cẩm Nang Việt Nhật giải thích bằng tiếng Việt: gia hạn visa, thẻ cư trú, nenkin, thuế, bảo hiểm, chuyển nhà, sinh con… Có nguồn chính thức và ngày cập nhật cho từng bài.

Hơn 120 hướng dẫn, viết cho người Việt đang du học, đi làm, thực tập sinh, 特定技能 và gia đình ở Nhật.

■ THỦ TỤC & VISA
• Gia hạn / đổi tư cách lưu trú, vĩnh trú, nhập tịch, bảo lãnh gia đình
• Bảng phí visa mới từ 01/10/2026
• Thẻ cư trú, My Number, chuyển nhà 転入届 / 転出届
• Câu tiếng Nhật nói tại quầy 市役所 / 入管, checklist giấy tờ tick ngay trong app

■ TIỀN & CÔNG VIỆC
• Thuế 住民税, 確定申告, 年末調整, đọc bảng lương
• Nenkin, xin lại tiền 脱退一時金 khi về nước
• Bảo hiểm y tế, 労災, trợ cấp thất nghiệp, quyền lợi khi bị ép nghỉ việc

■ ĐỜI SỐNG & KHẨN CẤP
• Khám bệnh, sinh con, cho con đi học, đổ rác, thuê nhà
• Động đất, bão, tai nạn giao thông, gọi 119 / 110 — nói gì
• Cảnh báo lừa đảo nhắm vào người Việt

■ CÔNG CỤ
• Tìm kiếm bằng tiếng Việt, romaji hoặc tiếng Nhật
• Hỏi Cẩm Nang: gõ câu hỏi, app chỉ đúng bài cần đọc
• Nhắc hạn visa / giấy tờ quan trọng
• Tin tức Việt + Nhật, tin tiếng Nhật có furigana để luyện đọc
• Học tiếng Nhật, luyện JLPT (N5 miễn phí) và BJT

■ NGUỒN & QUYỀN RIÊNG TƯ
Nội dung đối chiếu với 出入国在留管理庁, 厚生労働省, 日本年金機構, 国税庁, 法テラス… Mỗi bài ghi rõ nguồn và ngày kiểm tra. Đây là thông tin tham khảo; quyết định quan trọng hãy xác nhận lại với cơ quan liên quan.

Không quảng cáo. Không cần tạo tài khoản. Dữ liệu cá nhân (bookmark, checklist, nhắc hạn) lưu trên máy của bạn.

Góp ý: thanhduy8vn@gmail.com
```

## 2. Japanese locale — add it in App Store Connect

App Information → Localizable Information → add **Japanese**.

**Name**: `Cẩm Nang Việt Nhật`
**Subtitle** (17/30): `在日ベトナム人の手続き・生活ガイド`
**Keywords** (70/100):
```
ベトナム人,ベトナム語,在留カード,在留資格,ビザ,更新,永住,帰化,年金,確定申告,国民健康保険,マイナンバー,手続き,生活,外国人,転職
```
**Description** (short):
```
日本で暮らすベトナム人のための手続き・生活ガイドです(本文はベトナム語)。

在留資格の更新・変更、永住、在留カード、年金、税金、健康保険、引っ越し、出産、災害時の対応など120以上のガイドを、出入国在留管理庁・厚生労働省などの公式情報をもとにベトナム語で解説しています。窓口で使える日本語フレーズ付き。

広告なし・アカウント登録不要。ベトナム人の同僚・友人・技能実習生への紹介にもどうぞ。
```
The last line targets Japanese employers / 監理団体 / teachers who search in Japanese to recommend tools to Vietnamese staff.

## 3. Screenshots — upload the 6-shot set

Specs and headlines: `docs/growth/screenshot-storyboards.md` + `aso-submission-2026-05-23.md` §3 (Set A). Changes for today's app:
- Shot 1 (most important): search + a visa-fee result → headline "Phí visa mới từ 01/10/2026 — tra bằng tiếng Việt".
- Replace one of the later shots with the News tab (furigana reader).
- Screenshots need iPhone 6.9"/6.7" captures; they can't be produced on this Windows machine. Capture them on the device or simulator.

## 4. Campaign links (to know which channel drives installs)

App Store Connect → Analytics → Acquisition → Campaigns → generate a link and copy the `pt=` value into `PROVIDER_TOKEN` in `docs/index.html`. After that:
- TikTok bio: `https://pdythanhduy.github.io/viet-nhat-app/?src=tiktok`
- In-app share: `?src=share` (already in `src/utils/shareGuide.ts`)
- Facebook groups: `?src=fb`

## 5. TikTok bio

- A personal TikTok account can't add a bio link until it has 1,000 followers. Switch to a **Business account** (Settings → Account → Switch to Business account) and the website field appears.
- Bio text: `📱 App miễn phí cho người Việt ở Nhật — thủ tục, visa, thuế 👇` + the `?src=tiktok` link.
- Captions say "link bio". Also pin the 3 best videos and add the link in the first comment.

## 6. Checklist

- [ ] Paste §1 (en-US) → save (promo text applies immediately; the rest goes with the next submission)
- [ ] Add the Japanese locale (§2)
- [ ] Capture and upload the 6 screenshots (§3)
- [ ] Fill in the `pt=` token (§4) and push `docs/index.html`
- [ ] TikTok → Business account + bio link (§5)
- [ ] Build 1.6.4 (review prompt + vi/ja localizations) and submit together with the metadata
