# Claude prompt — Add 24 missing guides in one controlled pass

Use this prompt with Claude Code only when intentionally doing one large content batch.

---

Read `docs/full-content-backlog-45-guides.md` first.

Then implement the 24 missing guides listed below in **one controlled content batch**.

This is a large content batch. Be strict and mechanical. Do not add extra ideas.

## Context

Current app has 90 admin guides.

Already completed recent batches:

- A1 Medical access essentials
- A2 Disaster preparedness
- A3 Daily utilities

Now add the 24 guide ideas from the latest content review.

Target result:

- ADMIN_GUIDES should increase from 90 to 114.
- Add exactly 24 guide files.
- Register exactly 24 new guides in `ADMIN_GUIDES`.

---

# Global rules

## Allowed

- Add guide files under:
  - `src/constants/content/adminGuides/guides/`
- Register imports + array entries in:
  - `src/constants/content/adminGuides/guides/index.ts`
- Reuse existing images if clearly suitable.
- Add `searchKeywords` / aliases.
- Add `counterPhrases` where the user may need to speak at a counter, phone, police, clinic, school, consulate, etc.
- Create report doc:
  - `docs/content-roadmap-24-guides-one-pass.md`

## Not allowed

- Do not add more than 24 guides.
- Do not change UI.
- Do not change build config.
- Do not change app.json/package.json version.
- Do not create or move git tags.
- Do not run EAS build.
- Do not create GitHub issues.
- Do not invent official URLs.
- Do not invent exact legal/policy/fee facts.
- Do not present legal/medical/financial advice as final authority.
- Do not add affiliate links.
- Do not add monetization/IAP.
- Do not add the proposed AI mail-translation feature in this task.

## Source/fact rule

If exact official source is not verified, keep wording cautious and mark the guide/report item as:

`NEEDS_OFFICIAL_SOURCE_CHECK`

Use safe wording:

- thường
- có thể
- tùy địa phương
- tùy trường hợp
- hãy kiểm tra nguồn chính thức
- hãy hỏi cơ quan phụ trách
- không nên ký nếu chưa hiểu
- nên liên hệ trung tâm tư vấn / luật sư / cơ quan chính thức nếu tình huống nghiêm trọng

## Style rule

Vietnamese must be:

- natural
- short
- practical
- easy for Vietnamese residents in Japan
- not machine-translated
- not too Sino-Vietnamese
- action-first

Every guide should answer:

1. Đây là gì?
2. Ai cần?
3. Khi nào cần làm?
4. Làm ở đâu / hỏi ai / kiểm tra ở đâu?
5. Cần chuẩn bị gì?
6. Các bước chính
7. Lỗi hay gặp
8. Câu tiếng Nhật có thể nói
9. Search keywords
10. Source status / official source check needed

---

# 24 guides to add

## Priority High — 10 guides

### 1. `naturalization-kika-application`

Title: `Nhập tịch Nhật Bản / 帰化申請`

Japanese title: `帰化申請を考えるとき`

Purpose:
Explain the difference between permanent residence and naturalization. Help long-term Vietnamese residents understand what naturalization means and what to ask before starting.

Must cover:

- 帰化 = becoming Japanese citizen
- Difference from 永住 / permanent residence
- Possible loss of Vietnamese nationality / dual nationality issue — write cautiously and mark source check
- Where to consult: 法務局 / legal professional
- Long preparation time
- Documents vary by case
- Do not treat this as legal advice

CounterPhrases examples:

- `帰化申請について相談したいです。`
- `永住と帰化の違いを知りたいです。`
- `必要な書類を教えていただけますか。`
- `ベトナム国籍への影響を確認したいです。`

Search keywords:

- nhập tịch
- quốc tịch Nhật
- kika
- 帰化
- 帰化申請
- vĩnh trú khác nhập tịch
- mất quốc tịch Việt Nam

Source status:

- NEEDS_OFFICIAL_SOURCE_CHECK: MOJ/法務省/法務局, Vietnamese nationality impact

---

### 2. `vietnam-embassy-consulate-japan`

Title: `Đại sứ quán / Lãnh sự quán Việt Nam tại Nhật`

Japanese title: `在日ベトナム大使館・領事館を利用するとき`

Purpose:
Help users know when to contact Vietnamese Embassy/Consulates in Japan.

Must cover:

- Tokyo Embassy
- Consulate in Osaka
- Consulate in Fukuoka
- Passport renewal / lost passport
- Power of attorney / certification / consular paperwork
- Citizen protection hotline — source check required
- Do not hardcode phone/address unless verified from official source

CounterPhrases examples:

- `パスポートの更新について相談したいです。`
- `パスポートをなくしました。`
- `委任状について確認したいです。`
- `緊急の相談です。`

Search keywords:

- đại sứ quán Việt Nam
- lãnh sự quán Việt Nam
- hộ chiếu Việt Nam
- mất hộ chiếu
- giấy ủy quyền
- công chứng
- ベトナム大使館
- ベトナム領事館

Source status:

- NEEDS_OFFICIAL_SOURCE_CHECK: Embassy/Consulate addresses, opening hours, hotlines, services

---

### 3. `furusato-nozei-guide`

Title: `Furusato Nouzei / ふるさと納税`

Japanese title: `ふるさと納税を使うとき`

Purpose:
Explain hometown tax donation in simple Vietnamese, including why foreign residents may use it if paying resident tax, and what to check.

Must cover:

- What it is
- Basic concept: donate to municipality, receive return gifts, tax deduction/credit
- One-stop exception vs tax filing
- Need to check limit amount
- Popular services: Rakuten Furusato, Satofuru, Furunavi — do not add affiliate links
- Avoid promising exact savings

CounterPhrases examples:

- `ふるさと納税の上限額を確認したいです。`
- `ワンストップ特例を使いたいです。`
- `確定申告が必要ですか。`

Search keywords:

- furusato nouzei
- thuế quê hương
- ふるさと納税
- ワンストップ特例
- tiết kiệm thuế
- quà tặng thuế

Source status:

- NEEDS_OFFICIAL_SOURCE_CHECK: MIC/総務省, one-stop/tax filing details

---

### 4. `ideco-foreign-residents-guide`

Title: `iDeCo cho người nước ngoài ở Nhật`

Japanese title: `外国人がiDeCoを使うとき`

Purpose:
Explain iDeCo basics and key caution for foreign residents, especially what happens when returning to Vietnam.

Must cover:

- What iDeCo is
- Tax benefit concept
- Long-term retirement product
- Hard to withdraw early
- Returning to Vietnam: conditions for lump-sum withdrawal need source check
- Difference from NISA
- Should consult official pension/financial source

CounterPhrases examples:

- `iDeCoについて相談したいです。`
- `帰国する場合、どうなりますか。`
- `途中で引き出せますか。`
- `NISAとの違いを知りたいです。`

Search keywords:

- iDeCo
- ideco người nước ngoài
- lương hưu cá nhân
- về Việt Nam có lấy iDeCo được không
- 個人型確定拠出年金
- 帰国

Source status:

- NEEDS_OFFICIAL_SOURCE_CHECK: iDeCo official, pension withdrawal conditions, tax details

---

### 5. `remittance-service-comparison-vietnam`

Title: `Gửi tiền về Việt Nam: chọn dịch vụ nào?`

Japanese title: `ベトナムへ送金するとき`

Purpose:
Compare remittance options conceptually without hardcoding unstable rates/fees.

Must cover:

- Wise
- SBI Remit
- Seven Bank
- Lotus Post Remit
- Compare fee, exchange rate, convenience, receiving method
- Do not state exact current fees/rates unless source verified
- Large transfers may trigger reporting/verification; mention cautiously
- Need identity verification

CounterPhrases examples:

- `ベトナムへ送金したいです。`
- `手数料はいくらですか。`
- `為替レートを確認したいです。`
- `本人確認には何が必要ですか。`

Search keywords:

- gửi tiền về Việt Nam
- Wise
- SBI Remit
- Seven Bank
- Lotus Remit
- phí gửi tiền
- tỷ giá
- 送金
- ベトナム送金

Source status:

- NEEDS_OFFICIAL_SOURCE_CHECK: providers' current fees/limits, tax/reporting threshold

---

### 6. `essential-apps-japan-life`

Title: `App cần thiết khi sống ở Nhật`

Japanese title: `日本生活で役立つアプリ`

Purpose:
List useful app categories for daily life in Japan.

Must cover:

- Disaster: Yahoo!防災速報, Safety tips
- Transit: Yahoo!乗換案内, Google Maps, NAVITIME
- Digital procedure: マイナポータル
- Payment: PayPay, LINE Pay, Rakuten Pay
- Banking/post office apps
- Family/calendar: TimeTree
- This is not endorsement; availability/features change

CounterPhrases:
Maybe not necessary, but add if schema expects useful phrases:

- `このアプリの使い方を教えてください。`
- `日本語しか表示されません。`

Search keywords:

- app cần thiết Nhật
- ứng dụng Nhật
- PayPay
- Yahoo 防災
- NAVITIME
- マイナポータル
- TimeTree
- 乗換案内

Source status:

- NEEDS_OFFICIAL_SOURCE_CHECK: app names/features/current availability

---

### 7. `police-questioning-rights-japan`

Title: `Khi bị cảnh sát hỏi hoặc giữ ở Nhật`

Japanese title: `警察に質問・取調べを受けたとき`

Purpose:
Provide safety-first, rights-aware guidance without encouraging illegal behavior.

Must cover:

- Stay calm
- Ask what the situation is
- Right to remain silent / 黙秘権 — source check
- Right to lawyer / 当番弁護士制度 — source check
- Interpreter request
- Consular contact
- Do not sign documents you do not understand
- Contact 法テラス / lawyer / embassy
- Strong disclaimer: not legal advice

CounterPhrases examples:

- `日本語が十分に分かりません。通訳をお願いします。`
- `弁護士に相談したいです。`
- `この書類の内容が分かりません。`
- `署名する前に確認したいです。`
- `ベトナム大使館に連絡したいです。`

Search keywords:

- cảnh sát Nhật
- bị cảnh sát hỏi
- bị bắt ở Nhật
- quyền im lặng
- luật sư Nhật
- thông dịch viên
- 黙秘権
- 当番弁護士
- 法テラス

Source status:

- NEEDS_OFFICIAL_SOURCE_CHECK: legal rights, duty lawyer, interpreter/consular access

---

### 8. `domestic-violence-dv-support-japan`

Title: `Bạo lực gia đình / DV ở Nhật`

Japanese title: `DV・家庭内暴力で困ったとき`

Purpose:
Help victims know where to seek help safely.

Must cover:

- DV includes physical, psychological, economic, sexual abuse
- Emergency: call police if immediate danger
- DV consultation centers / 配偶者暴力相談支援センター
- Shelters may exist but details vary
- Visa/residence impact if spouse visa/dependent — needs legal review
- Safety planning and do not confront abuser if dangerous
- Multilingual hotline source check

CounterPhrases examples:

- `DVについて相談したいです。`
- `安全な場所に避難したいです。`
- `配偶者から暴力を受けています。`
- `在留資格への影響を相談したいです。`
- `ベトナム語で相談できますか。`

Search keywords:

- bạo lực gia đình
- DV Nhật
- chồng bạo lực
- vợ chồng đánh nhau
- shelter
- ly thân visa
- 配偶者暴力相談支援センター
- DV相談

Source status:

- NEEDS_OFFICIAL_SOURCE_CHECK: DV hotline, shelter, visa implications

---

### 9. `foreign-resident-support-centers`

Title: `Trung tâm hỗ trợ người nước ngoài ở Nhật`

Japanese title: `外国人相談窓口を利用するとき`

Purpose:
Explain where foreign residents can get multilingual consultation.

Must cover:

- FRESC in Tokyo
- Local multicultural centers / 多文化共生センター
- City/ward foreign resident consultation windows
- Interpretation support
- Legal/labor/life consultation availability varies
- How to search by prefecture/city
- Do not list phone numbers unless verified

CounterPhrases examples:

- `外国人相談窓口を探しています。`
- `ベトナム語で相談できますか。`
- `生活の相談をしたいです。`
- `予約が必要ですか。`

Search keywords:

- trung tâm hỗ trợ người nước ngoài
- tư vấn tiếng Việt Nhật
- FRESC
- 多文化共生センター
- 外国人相談
- ベトナム語相談

Source status:

- NEEDS_OFFICIAL_SOURCE_CHECK: center lists, phone numbers, languages

---

### 10. `free-japanese-classes-local`

Title: `Lớp tiếng Nhật miễn phí / giá rẻ ở địa phương`

Japanese title: `地域の日本語教室を探すとき`

Purpose:
Help users find community Japanese classes.

Must cover:

- City/ward international association classes
- Volunteer Japanese classes
- Classes for children of foreign residents
- How to search: city name + 日本語教室 / 国際交流協会
- Costs and schedules vary
- Not replacement for formal school if visa requires attendance

CounterPhrases examples:

- `日本語教室を探しています。`
- `初心者でも参加できますか。`
- `費用はいくらですか。`
- `子ども向けの日本語教室はありますか。`

Search keywords:

- lớp tiếng Nhật miễn phí
- lớp tiếng Nhật cộng đồng
- volunteer nihongo
- 日本語教室
- 国際交流協会
- ボランティア日本語

Source status:

- NEEDS_OFFICIAL_SOURCE_CHECK: local class listings

---

## Priority Medium — 8 guides

### 11. `child-allowance-jidou-teate-guide`

Title: `Trợ cấp trẻ em / 児童手当`

Japanese title: `児童手当を申請するとき`

Purpose:
Explain child allowance basics. Policy has changed recently; be cautious.

Must cover:

- Who may apply
- Apply at city/ward office
- Need child/resident registration/bank account/My Number depending case
- Income limit changes from 2024/2026 must be source checked
- Deadlines after birth/move-in
- Do not state exact amount unless source verified

CounterPhrases examples:

- `児童手当を申請したいです。`
- `必要な書類を教えてください。`
- `いつから受け取れますか。`
- `引っ越した場合の手続きは必要ですか。`

Search keywords:

- trợ cấp trẻ em
- jidou teate
- 児童手当
- sinh con trợ cấp
- con nhỏ ở Nhật

Source status:

- NEEDS_OFFICIAL_SOURCE_CHECK: latest child allowance rules/amounts/income limit

---

### 12. `mental-health-stress-support`

Title: `Stress, trầm cảm và hỗ trợ tâm lý ở Nhật`

Japanese title: `心の相談・メンタルヘルスで困ったとき`

Purpose:
Help users find support when mentally overwhelmed.

Must cover:

- Stress, depression, loneliness, overwork
- Emergency self-harm risk: call emergency/local crisis line — source check
- Yorisoi Hotline / TELL / local mental health centers — source check
- Workplace stress consultation
- Encourage talking to trusted person/professional
- Do not provide diagnosis

CounterPhrases examples:

- `心の相談をしたいです。`
- `眠れません。`
- `仕事のストレスでつらいです。`
- `ベトナム語で相談できますか。`

Search keywords:

- trầm cảm ở Nhật
- stress
- tâm lý
- hotline tiếng Việt
- よりそいホットライン
- TELL
- メンタルヘルス
- 心の相談

Source status:

- NEEDS_OFFICIAL_SOURCE_CHECK: hotline numbers/languages/hours

---

### 13. `rental-home-insurance-guide`

Title: `Bảo hiểm nhà thuê / 家財保険・地震保険`

Japanese title: `賃貸の家財保険・地震保険を確認するとき`

Purpose:
Explain rental insurance basics.

Must cover:

- 家財保険
- 借家人賠償責任
- 個人賠償責任
- 地震保険 may be separate
- Often required by rental contract
- What may/may not be covered
- Ask before signing

CounterPhrases examples:

- `この保険の補償内容を教えてください。`
- `地震保険は含まれていますか。`
- `解約できますか。`
- `更新料はいくらですか。`

Search keywords:

- bảo hiểm nhà thuê
- bảo hiểm động đất
- 家財保険
- 地震保険
- 借家人賠償
- thuê nhà bảo hiểm

Source status:

- NEEDS_OFFICIAL_SOURCE_CHECK: insurance coverage details vary by contract

---

### 14. `pet-registration-japan`

Title: `Nuôi thú cưng và đăng ký chó ở Nhật`

Japanese title: `ペットを飼う・犬を登録するとき`

Purpose:
Explain pet-related basics.

Must cover:

- Check rental contract/condo rules first
- Dog registration at municipality
- Rabies vaccination annual requirement — source check
- Microchip rule since 2022 — source check
- Manners: noise, waste, leash

CounterPhrases examples:

- `犬の登録をしたいです。`
- `狂犬病の予防接種について確認したいです。`
- `ペット可の物件ですか。`
- `マイクロチップについて教えてください。`

Search keywords:

- nuôi chó ở Nhật
- đăng ký chó
- thú cưng
- ペット
- 犬の登録
- 狂犬病予防注射
- マイクロチップ

Source status:

- NEEDS_OFFICIAL_SOURCE_CHECK: municipal registration, rabies, microchip rules

---

### 15. `adult-study-college-japan`

Title: `Đi học đại học/cao đẳng ở Nhật khi đã trưởng thành`

Japanese title: `社会人・外国人が日本で進学を考えるとき`

Purpose:
Explain options for adults/foreign residents considering study.

Must cover:

- University, vocational school, junior college, night school
- MEXT/JASSO scholarships concept — source check
- Visa/status impact if changing to student
- Tuition reduction may vary
- Need Japanese level/exam/docs

CounterPhrases examples:

- `社会人でも入学できますか。`
- `外国人向けの奨学金はありますか。`
- `学費はいくらですか。`
- `在留資格の変更が必要ですか。`

Search keywords:

- học đại học ở Nhật
- học cao đẳng Nhật
- học bổng JASSO
- MEXT
- 専門学校
- 大学
- 社会人入学

Source status:

- NEEDS_OFFICIAL_SOURCE_CHECK: scholarships, visa, admission requirements

---

### 16. `used-car-purchase-japan`

Title: `Mua xe ô tô cũ ở Nhật`

Japanese title: `中古車を買うとき`

Purpose:
Explain basics of buying a used car.

Must cover:

- Goo-net / Carsensor concept
- 車庫証明
- 自動車税
- shaken remaining period
- insurance
- total cost beyond sticker price
- avoid buying without understanding fees

CounterPhrases examples:

- `中古車を見たいです。`
- `総額はいくらですか。`
- `車庫証明は必要ですか。`
- `車検はいつまでですか。`

Search keywords:

- mua xe cũ Nhật
- ô tô cũ
- 中古車
- 車庫証明
- 自動車税
- 車検
- Goo-net
- Carsensor

Source status:

- NEEDS_OFFICIAL_SOURCE_CHECK: taxes, registration, parking certificate

---

### 17. `pharmacy-medicine-guide`

Title: `Thuốc và nhà thuốc ở Nhật`

Japanese title: `薬局・薬を使うとき`

Purpose:
Explain prescription vs over-the-counter medicine and safety cautions.

Must cover:

- 処方薬 vs 市販薬
- Prescription after clinic visit
- お薬手帳
- Ask pharmacist
- Do not mix medicines without asking
- Bringing medicine to/from Japan/Vietnam needs customs/source check
- Avoid strong claims about codeine unless sourced

CounterPhrases examples:

- `この薬の飲み方を教えてください。`
- `今、別の薬を飲んでいます。`
- `眠くなりますか。`
- `ベトナムに持って帰れますか。`

Search keywords:

- nhà thuốc Nhật
- thuốc Nhật
- đơn thuốc
- thuốc cảm
- 薬局
- 処方薬
- 市販薬
- お薬手帳

Source status:

- NEEDS_OFFICIAL_SOURCE_CHECK: medicine import/export, controlled ingredients

---

### 18. `death-funeral-procedure-japan`

Title: `Khi có người thân qua đời ở Nhật`

Japanese title: `日本で家族が亡くなったとき`

Purpose:
Explain first steps after a death in Japan with sensitive wording.

Must cover:

- Emergency/contact doctor/police depending situation
- 死亡届 generally has deadline — source check
- Cremation / 火葬
- Contact funeral company
- Contact Vietnamese Embassy/Consulate if repatriation/ashes/documents
- Bringing ashes/remains to Vietnam needs source check
- Use compassionate tone

CounterPhrases examples:

- `家族が亡くなりました。`
- `死亡届について確認したいです。`
- `火葬の手続きを知りたいです。`
- `ベトナムへ遺骨を持ち帰りたいです。`

Search keywords:

- qua đời ở Nhật
- tang lễ Nhật
- khai tử
- hỏa táng
- đưa tro về Việt Nam
- 死亡届
- 火葬
- 遺骨

Source status:

- NEEDS_OFFICIAL_SOURCE_CHECK: death notification deadline, cremation, consular procedure

---

## Nice to have — 6 guides

### 19. `point-cards-japan-guide`

Title: `Thẻ điểm phổ biến ở Nhật`

Japanese title: `ポイントカードを使うとき`

Must cover:
Rakuten Point, V Point/T-Point if relevant, dPoint, Ponta, PayPay Point. Explain points change often, not financial advice.

CounterPhrases:

- `ポイントカードはありますか。`
- `ポイントを使いたいです。`

Keywords:
Rakuten Point, dPoint, Ponta, PayPay Point, ポイントカード

Source status:
NEEDS_OFFICIAL_SOURCE_CHECK: current point programs

---

### 20. `online-shopping-japan-guide`

Title: `Mua hàng online ở Nhật`

Japanese title: `日本でネットショッピングを使うとき`

Must cover:
Amazon Japan, Rakuten, Mercari, Yahoo Auctions, returns, shipping, scams, COD. No affiliate links.

CounterPhrases:

- `返品したいです。`
- `商品が届きません。`
- `キャンセルできますか。`

Keywords:
Amazon JP, Rakuten, Mercari, Yahoo Auction, 返品, 返金, メルカリ

Source status:
NEEDS_OFFICIAL_SOURCE_CHECK: platform policies

---

### 21. `domestic-travel-japan-guide`

Title: `Du lịch trong Nhật cho người đang sống ở Nhật`

Japanese title: `日本国内を旅行するとき`

Must cover:
JR Pass usually for temporary visitors, regional passes vary, 青春18きっぷ basics, ryokan etiquette, reservation/cancellation.

CounterPhrases:

- `予約を変更したいです。`
- `キャンセル料はいくらですか。`
- `外国人向けの割引はありますか。`

Keywords:
JR Pass, 青春18きっぷ, ryokan, du lịch Nhật, 国内旅行

Source status:
NEEDS_OFFICIAL_SOURCE_CHECK: JR Pass/resident eligibility, ticket rules

---

### 22. `customs-vietnam-japan-items`

Title: `Mang đồ Việt Nam sang Nhật / từ Nhật về Việt Nam`

Japanese title: `日本へ持ち込む物・日本から持ち出す物`

Must cover:
food, meat/eggs, plants/seeds, medicine personal use, cash thresholds. Be very cautious.

CounterPhrases:

- `この薬は持ち込めますか。`
- `申告が必要ですか。`
- `食品を持っています。`

Keywords:
hải quan Nhật, mang thuốc vào Nhật, mang đồ ăn, 肉, 薬, 税関, 検疫

Source status:
NEEDS_OFFICIAL_SOURCE_CHECK: customs/quarantine rules

---

### 23. `vietnamese-religious-community-japan`

Title: `Cộng đồng tôn giáo Việt tại Nhật`

Japanese title: `在日ベトナム人の宗教コミュニティを探すとき`

Must cover:
Vietnamese temples, Catholic churches, community activities, how to search safely. Do not list unverified addresses.

CounterPhrases:

- `ベトナム語のミサはありますか。`
- `ベトナム人のコミュニティを探しています。`

Keywords:
chùa Việt ở Nhật, nhà thờ Việt Nam Nhật, cộng đồng Công giáo, ベトナム寺, ミサ

Source status:
NEEDS_OFFICIAL_SOURCE_CHECK: locations/schedules

---

### 24. `foreign-license-conversion-japan`

Title: `Đổi bằng lái Việt Nam sang bằng Nhật / 外免切替`

Japanese title: `外国免許を日本の免許に切り替えるとき`

Purpose:
Separate this from general driver's license guide.

Must cover:

- 外免切替
- Vietnamese license may require document confirmation/test — source check
- Need proof of staying in issuing country after license issuance — source check
- JAF translation / designated translation
- Knowledge/practical tests may be required
- Book appointment at license center

CounterPhrases examples:

- `外国免許の切替をしたいです。`
- `ベトナムの免許証を持っています。`
- `必要な書類を教えてください。`
- `予約は必要ですか。`

Search keywords:

- đổi bằng lái Việt Nam sang Nhật
- bằng lái Việt Nam
- 外免切替
- JAF翻訳
- 運転免許センター

Source status:

- NEEDS_OFFICIAL_SOURCE_CHECK: police/license center/JAF requirements

---

# Report doc requirements

Create:

`docs/content-roadmap-24-guides-one-pass.md`

Include:

1. Summary
- Before guide count
- After guide count
- 24 guide IDs added
- Group breakdown: High / Medium / Nice-to-have

2. Files created
- list all 24 guide file paths

3. CounterPhrases
- count per guide
- total count
- list guides with no counterPhrases if any and why

4. Search keywords
- count per guide
- total count

5. Source status
- status per guide
- all NEEDS_OFFICIAL_SOURCE_CHECK items
- domains that should be checked later

6. Risk review
Highlight high-risk guides:
- naturalization-kika-application
- police-questioning-rights-japan
- domestic-violence-dv-support-japan
- nhk remains prior risk if referenced
- customs-vietnam-japan-items
- death-funeral-procedure-japan
- child-allowance-jidou-teate-guide
- ideco-foreign-residents-guide

7. Device QA checklist
- Search for at least 24 guide titles/aliases
- Open each guide
- Counter phrase copy check for at least 10 high-risk guides
- Long Japanese term render check
- iOS/Android back/copy/scroll

8. Next required QA
- Native Japanese review
- Vietnamese naturalness review
- Legal/consumer review
- Official source deep-link verification

---

# Verification

Run:

```bash
npm run typecheck
npm run test:ci
npm run verify:content
npm run verify
```

If `npm run verify` includes the other three and is slow, still run it after the specific checks.

---

# Commit/push

If all verification passes:

- Commit all 24-guide changes + report doc.
- Push to `origin/main`.

Use commit message:

`feat(admin): add 24 high-value life guides`

---

# Report back

Report:

1. Files created.
2. ADMIN_GUIDES before/after.
3. CounterPhrase count per guide and total.
4. Search keyword count per guide and total.
5. Source status summary.
6. High-risk guides requiring human review.
7. Verification results.
8. Commit SHA.
9. Branch sync status.

Important: exactly 24 guides. No extra features. No UI/build/version/tag changes.
