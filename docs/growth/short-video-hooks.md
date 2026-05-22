# Growth Asset Pack — Short-Video Hooks (TikTok / Reels / Shorts)

**Date**: 2026-05-23
**Status**: hooks library. No video has been produced. Format playbook already exists in [`docs/social-content-engine.md`](../social-content-engine.md). This doc supplies the 50 specific hook strings ready to slot into formats A-E.
**Total**: 50 hooks across 6 categories.

**Hard rules** (from `content-governance.md` §1, repeated here for every hook):
- No "100% pass" / "guaranteed" / "loophole" language.
- No fabricated personal testimony. If a story is illustrative, the on-screen label `Tình huống ví dụ` must appear.
- No "do this instead of consulting [authority]" framing — every CTA must permit escalation to professionals.
- No naming a specific government officer / law-firm partner / city ward.
- No before/after price comparison without citing the official fee schedule.

CTA convention (default for every hook): **"Đọc full ở app Cẩm Nang Việt Nhật — link dưới."** Variants in §7.

15-second structure (Reels / Shorts cap; TikTok can extend to 35s but the hook must work in 15s):

```
0-3s   HOOK         (the one-liner below)
3-10s  BODY         (3 visual beats — see per-hook outline)
10-13s ANCHOR       (one concrete fact / number / phone / deadline)
13-15s CTA          (one-liner from §7)
```

**Do-not-exaggerate note**: every hook has a "**⚠️**" footnote naming the specific framing risk for that hook. Read it before recording.

---

## Category 1 — Visa (10 hooks)

### V1
**Hook**: "Visa của bạn vừa được cấp — nhưng có 3 việc nếu không làm trong 14 ngày, tư cách sẽ bị xem xét lại."
**Body**: visual checklist on screen — 1) báo chuyển việc, 2) báo chuyển nhà, 3) gia hạn 在留カード thông tin.
**Anchor**: "出入国管理及び難民認定法 §19-16."
**Source guide**: `job-change-notification`, `residence-card-info-change`.
**⚠️**: Don't imply visa is automatically revoked — the law says "may be reviewed", not "is revoked". Stick to "bị xem xét lại".

### V2
**Hook**: "Quá hạn visa 1 ngày — không phải hết hi vọng."
**Body**: 3-beat: 1) đến Nyukan tự khai báo (出頭), 2) 在留特別許可 là discretionary — KHÔNG đảm bảo, 3) phải nói chuyện với 弁護士/行政書士 trước khi đi.
**Anchor**: "法テラス: 0570-078374 (tư vấn miễn phí lần đầu)."
**Source guide**: `overstaying-illegal-stay-procedures`.
**⚠️**: NEVER imply overstay is "easy to fix". Frame as "có quy trình chính thức, nhưng phải tự khai và có luật sư".

### V3
**Hook**: "10 năm cư trú không phải là điều kiện duy nhất để xin 永住."
**Body**: 3 đường rút ngắn — 1) 高度専門職 (1-3 năm), 2) 日本人/永住者 配偶者, 3) HSP 70/80 điểm.
**Anchor**: "出入国在留管理庁 永住許可に関するガイドライン."
**Source guide**: `permanent-residency-eijuu`, `highly-skilled-professional`.
**⚠️**: "Rút ngắn" không có nghĩa là "đậu chắc". Phải nhắc Nyukan đánh giá từng trường hợp.

### V4
**Hook**: "Đổi việc mà không báo trong 14 ngày — có thể ảnh hưởng đến lần gia hạn visa tới."
**Body**: 1) lý do (Nyukan dùng lịch sử việc làm để xem ổn định), 2) cách báo (オンライン từ My Number portal), 3) phí (miễn phí).
**Anchor**: "出入国在留管理庁 在留資格変更・更新時の確認事項."
**Source guide**: `job-change-notification`.
**⚠️**: "Có thể ảnh hưởng" — không nói "sẽ bị từ chối". Sự thật là Nyukan có thể yêu cầu giải trình.

### V5
**Hook**: "Bạn biết visa technical intern và tokutei ginou khác nhau ở 3 điểm quan trọng nhất không?"
**Body**: 3 dimension: 1) đổi việc (cấm/được), 2) đưa gia đình (cấm/SSW2 được), 3) lương sàn (khác).
**Anchor**: "厚生労働省 技能実習・特定技能の比較資料."
**Source guide**: `ginou-jisshu-to-tokutei-ginou`, `ssw-training-worker-2027`.
**⚠️**: Không khuyến khích bỏ technical intern sang SSW — đó là quyết định cá nhân. Chỉ liệt kê khác biệt.

### V6
**Hook**: "Visa hộ gia đình — vợ/chồng có thể làm thêm bao nhiêu giờ một tuần?"
**Body**: 1) 28h/tuần cho hộ gia đình + sinh viên + Designated Activities, 2) phải xin 資格外活動許可 trước, 3) vượt giới hạn → ảnh hưởng gia hạn.
**Anchor**: "出入国管理及び難民認定法 §19-2."
**Source guide**: `permission-activity-outside-status`, `family-stay-invitation`.
**⚠️**: Đừng dùng từ "tự do làm thêm" — phải xin phép trước.

### V7
**Hook**: "Mất 在留カード — đừng đi tìm, hãy đi báo."
**Body**: 1) báo cảnh sát trong 24h (lấy 紛失届), 2) Nyukan trong 14 ngày, 3) phí cấp lại 1,300円.
**Anchor**: "出入国在留管理庁 在留カード再交付申請."
**Source guide**: `lost-residence-card`.
**⚠️**: Không nói "không sao đâu" — mất 在留カード là procedure nghiêm túc.

### V8
**Hook**: "Visa bị từ chối — bạn có 3 đường, không phải 1."
**Body**: 1) lý do từ chối (Nyukan có giải thích nếu yêu cầu), 2) khiếu nại (異議申立, có thời hạn), 3) nộp lại với hồ sơ bổ sung.
**Anchor**: "出入国管理及び難民認定法 §61-9 §61-10."
**Source guide**: `visa-rejection-appeal-process`.
**⚠️**: Không hứa "có cách thoát". Luật sư đánh giá từng case.

### V9
**Hook**: "Sống chung không kết hôn — visa hôn nhân có chấp nhận không?"
**Body**: 1) cần đăng ký hôn nhân hợp pháp (Nhật hoặc VN), 2) Nyukan yêu cầu chứng minh quan hệ thật (album, chat, sinh hoạt), 3) sống chung không có giấy KHÔNG đủ.
**Anchor**: "出入国在留管理庁 配偶者ビザ・基準."
**Source guide**: `marriage-certificate-vn-japan`, `marriage-procedures-japan`.
**⚠️**: Đừng implyfake document — chỉ nói về procedure hợp pháp.

### V10
**Hook**: "Bạn biết Nyukan có 7 hotline tiếng Việt miễn phí — gọi giờ nào trả lời ai?"
**Body**: 1) FRESC 0570-011000 (Mon-Fri 9-17), 2) các 地方入管 đều có VN line riêng, 3) gọi trước khi nộp giấy → tránh đi sai cục.
**Anchor**: "出入国在留管理庁 FRESC 外国人在留支援センター 案内."
**Source guide**: `foreign-resident-support-centers`.
**⚠️**: Số có thể đổi — luôn dẫn user về app để có số mới nhất.

---

## Category 2 — Tax (8 hooks)

### T1
**Hook**: "Bạn có thể đang đóng thừa thuế cư trú — và chính phủ không nhắc bạn."
**Body**: 1) 住民税 dựa trên thu nhập NĂM TRƯỚC, 2) nếu năm nay thu nhập giảm → vẫn đóng theo năm cũ, 3) có thể xin 減免 nếu giảm > 30%.
**Anchor**: "市役所 税務課 — 各市có form 軽減申請 riêng."
**Source guide**: `juminzei-local-tax`, `kokuho-reduction`.
**⚠️**: "Có thể đang đóng thừa" — không phải "chắc chắn đóng thừa". Phụ thuộc thu nhập.

### T2
**Hook**: "確定申告 không phải chỉ cho freelancer — nhiều người Việt lương cố định vẫn nên làm."
**Body**: 1) khấu trừ y tế > 100,000円, 2) gửi tiền về VN (送金) ≥ 380,000円 hỗ trợ gia đình → 扶養控除, 3) thuê nhà 礼金/敷金 trong 1 số trường hợp.
**Anchor**: "国税庁 確定申告書作成コーナー."
**Source guide**: `kakutei-shinkoku`, `tax-on-remittance-to-vietnam`.
**⚠️**: "扶養控除" có điều kiện nghiêm — không phải gửi tiền là đủ. Phải có giấy tờ chứng minh quan hệ + người nhận thực sự phụ thuộc.

### T3
**Hook**: "Gửi tiền về Việt Nam — bao nhiêu yên thì cần khai báo thuế?"
**Body**: 1) 100万円/lần qua ngân hàng (国外送金等調書), 2) tổng năm có thể bị 税務調査, 3) trong 1 số TH bị đánh thuế (quà tặng, vay nợ trả lãi).
**Anchor**: "国税庁 国外送金等調書 制度."
**Source guide**: `tax-on-remittance-to-vietnam`, `banking-remittance-anti-fraud`.
**⚠️**: Không advise tránh khai báo. Đây là rule informational, không phải workaround.

### T4
**Hook**: "年末調整 vs 確定申告 — bạn cần làm cái nào (hay cả hai)?"
**Body**: 1) 年末調整 = công ty làm tự động, 2) 確定申告 = khi có thu nhập phụ HOẶC có khoản khấu trừ công ty không xử lý, 3) ai có 副業 luôn cần 確定申告.
**Anchor**: "国税庁 年末調整・確定申告のしくみ."
**Source guide**: `tax-year-end-adjustment-filing`.
**⚠️**: Không khuyến khích "không khai 副業" — đó là vi phạm.

### T5
**Hook**: "ふるさと納税 không phải miễn phí — nhưng có thể coi như mua quà giảm giá hợp pháp."
**Body**: 1) thực chất chuyển 住民税 sang thành phố khác, 2) trừ tối đa ~30% thuế năm, 3) phí 2,000円 ai cũng phải đóng.
**Anchor**: "総務省 ふるさと納税のしくみ."
**Source guide**: `furusato-nozei-guide`, `furusato-nozei` (daily-life).
**⚠️**: Không nói "ai cũng nên làm" — phải có thuế phải đóng đủ ngưỡng.

### T6
**Hook**: "Bạn đi làm baito mà không biết bị trừ thuế nguồn 10% mỗi tháng?"
**Body**: 1) 源泉徴収 áp dụng cho lương baito > một ngưỡng nhỏ, 2) cuối năm có thể xin lại qua 年末調整 hoặc 確定申告, 3) nhiều người không xin lại = mất tiền.
**Anchor**: "国税庁 源泉徴収のしくみ."
**Source guide**: `payslip-reading`, `kakutei-shinkoku`.
**⚠️**: Đúng số % thay đổi theo dạng baito — phải dẫn về guide để xem chi tiết.

### T7
**Hook**: "Mua nhà ở Nhật — 住宅ローン控除 có thể giảm thuế tối đa 35 năm."
**Body**: 1) khấu trừ 0.7%/năm dư nợ tối đa 13 năm, 2) phải tự khai 確定申告 năm đầu, 3) phải đáp ứng diện tích sàn ≥ 50㎡.
**Anchor**: "国土交通省 住宅ローン減税制度."
**Source guide**: `home-purchase-mortgage`.
**⚠️**: Quy tắc thay đổi theo năm tài khoá. Số % và ngưỡng có thể thay đổi.

### T8
**Hook**: "Người Việt làm freelancer ở Nhật — khi nào phải đăng ký 個人事業."
**Body**: 1) 開業届 phải nộp trong 1 tháng sau khi bắt đầu, 2) 青色申告 cho 65万円 khấu trừ, 3) không đăng ký + thu nhập lớn = rủi ro 税務調査.
**Anchor**: "国税庁 個人事業の開廃業届出書."
**Source guide**: `sole-proprietor-kojin-jigyo`, `freelance-side-job-work-visa-rules`.
**⚠️**: Visa work cho phép kojin jigyo không phải tất cả — phải xem visa loại nào.

---

## Category 3 — Baito (part-time work, 8 hooks)

### B1
**Hook**: "Sinh viên Việt — 28 giờ/tuần baito là tối đa cứng, vượt 1 lần ảnh hưởng visa tới."
**Body**: 1) 資格外活動許可 = 28h/tuần, 2) cộng dồn ngay cả nhiều job, 3) kỳ nghỉ dài (vacation) được 40h.
**Anchor**: "出入国管理及び難民認定法 §19."
**Source guide**: `permission-activity-outside-status`, `study-in-japan-student-guide`.
**⚠️**: Đừng nói "không sao đâu" — thực tế là Nyukan có dữ liệu giờ làm qua khai thuế chéo.

### B2
**Hook**: "Lương baito của bạn chậm — đây là 3 đường có thể đi mà không cần nghỉ việc."
**Body**: 1) gọi 労働基準監督署 (miễn phí, không tiết lộ danh tính), 2) viết đơn 内容証明 yêu cầu trả, 3) FRESC tiếng Việt 0570-011000.
**Anchor**: "労働基準法 §24 (賃金支払の原則)."
**Source guide**: `labor-rights-dispute`, `workplace-accident-rousai`.
**⚠️**: Không khuyến khích dùng SNS tố cáo công ty — có rủi ro pháp lý.

### B3
**Hook**: "Bị sa thải đột ngột — 解雇 vs 雇い止め có gì khác?"
**Body**: 1) 解雇 = công ty đuổi (cần lý do hợp lý + báo trước 30 ngày), 2) 雇い止め = không gia hạn hợp đồng (yếu hơn), 3) cả hai đều có 失業給付 nếu đủ điều kiện.
**Anchor**: "労働基準法 §20."
**Source guide**: `labor-rights-dispute`, `unemployment-benefits`, `employment-crisis-visa-job-loss-layoff`.
**⚠️**: Không khuyên kiện ngay — phải nói chuyện với 労基 + 弁護士 trước.

### B4
**Hook**: "Tai nạn lao động ở Nhật — bạn được trả bảo hiểm dù làm baito."
**Body**: 1) 労災 áp dụng cho mọi nhân viên không phân biệt visa, 2) phí thuốc + lương nghỉ được trả, 3) công ty KHÔNG được ép nghỉ việc vì tai nạn.
**Anchor**: "労働者災害補償保険法."
**Source guide**: `workplace-accident-rousai`.
**⚠️**: Không nói "luôn được trả 100%" — có procedure xét.

### B5
**Hook**: "Visa kỹ thuật + làm Uber Eats — có hợp pháp không?"
**Body**: 1) baito ngoài chuyên ngành cần 資格外活動許可, 2) giao hàng được tính là "労働", 3) phải khai báo + đăng ký 個人事業 nếu thu nhập đáng kể.
**Anchor**: "出入国在留管理庁 資格外活動許可 案内."
**Source guide**: `freelance-side-job-work-visa-rules`, `permission-activity-outside-status`.
**⚠️**: Quy tắc Uber/Demaecan thay đổi — phải dẫn user về guide cho điều kiện hiện hành.

### B6
**Hook**: "Đi phỏng vấn baito ở Nhật — 3 câu tiếng Nhật không nên nói sai."
**Body**: 1) "シフト融通きく" (linh hoạt ca làm), 2) "長く続けられます" (làm lâu dài), 3) "日本語勉強中です" (đang học tiếng).
**Anchor**: app có 76+ câu mẫu phỏng vấn baito.
**Source guide**: `job-interview-japan`.
**⚠**: Không hứa "nói xong là đậu" — chỉ là vocabulary support.

### B7
**Hook**: "Lương baito 1,200円/h — sau thuế và phí, bạn thực nhận bao nhiêu?"
**Body**: visual breakdown: 1) 源泉徴収 ~10%, 2) 雇用保険 (nếu áp dụng), 3) phí giao thông (一部支給/全額支給).
**Anchor**: "厚生労働省 給与所得の源泉徴収."
**Source guide**: `payslip-reading`.
**⚠️**: Số cụ thể phụ thuộc từng nơi — không nói "luôn nhận X円".

### B8
**Hook**: "Hợp đồng baito viết bằng tiếng Nhật — bạn nên check 5 dòng quan trọng nhất."
**Body**: 1) 給与/支払日, 2) 雇用形態, 3) 試用期間, 4) 退職時通知期間, 5) 残業手当 có hay không.
**Anchor**: "労働基準法 §15 (労働条件の明示)."
**Source guide**: `japanese-resume-rirekisho` companion + work-contract phrases.
**⚠**: Không khuyến khích bỏ qua các dòng còn lại — chỉ là 5 dòng critical nhất.

---

## Category 4 — Housing (8 hooks)

### H1
**Hook**: "Thuê nhà ở Nhật — bạn có thể đang trả 礼金 mà không cần thiết."
**Body**: 1) 礼金 là phong tục, không bắt buộc luật, 2) UR / 公社住宅 / 0礼金 物件 → không có 礼金, 3) thương lượng giảm là OK ở các mùa thấp điểm.
**Anchor**: "UR都市機構 公的賃貸住宅案内."
**Source guide**: `renting-and-buying-home`, `apartment` (daily-life).
**⚠️**: Không nói "không bao giờ trả 礼金" — nhiều物件 ở Tokyo phải trả.

### H2
**Hook**: "Chuyển nhà ở Nhật — báo 14 ngày trễ là bao nhiêu phí?"
**Body**: 1) phạt tối đa 50,000円 cho không báo 転入届/転出届, 2) ảnh hưởng nenkin, bảo hiểm, my number, 3) phí làm lại địa chỉ trên 在留カード miễn phí nếu trong 14 ngày.
**Anchor**: "住民基本台帳法 §23, §24."
**Source guide**: `moving-in-notification`, `address-change`.
**⚠️**: Mức phạt thực tế khác mức luật ghi — phụ thuộc市役所. Đừng nói số chính xác.

### H3
**Hook**: "Trả lại nhà thuê — 敷金 bị giữ bao nhiêu là hợp lý?"
**Body**: 1) 国交省 guideline: bình thường = chủ chịu, hư bất thường = mới trừ, 2) 自然損耗 KHÔNG được trừ vào tenant, 3) yêu cầu 見積もり trước khi ký rời nhà.
**Anchor**: "国土交通省 原状回復をめぐるトラブルとガイドライン."
**Source guide**: `moving-out-checklist`, `apartment`.
**⚠️**: Nhiều chủ vẫn trừ — phải có giấy hướng dẫn để cãi lại.

### H4
**Hook**: "Bị đuổi khỏi nhà thuê ở Nhật — chủ KHÔNG được làm 3 việc này."
**Body**: 1) đổi khóa khi chưa hết hạn, 2) cắt điện/nước, 3) đuổi không có lệnh tòa án.
**Anchor**: "借地借家法."
**Source guide**: `daily-law-basics`, `consumer-rights-cooling-off`.
**⚠️**: Phải tham vấn 法テラス nếu thực sự bị đuổi — không tự kiện.

### H5
**Hook**: "Mua nhà ở Nhật cho người nước ngoài — vĩnh trú không phải là bắt buộc."
**Body**: 1) 永住 không phải điều kiện cứng, 2) 住宅ローン một số ngân hàng yêu cầu, 3) full cash hoặc bảo lãnh viên đều OK.
**Anchor**: "金融庁 住宅ローン審査の一般要件."
**Source guide**: `home-purchase-mortgage`.
**⚠️**: Đừng nói "ai cũng vay được" — điều kiện thực rất ngặt.

### H6
**Hook**: "Hợp đồng nhà ở Nhật ghi 'gaikokujin OK' — nhưng 3 chỗ thường bị từ chối ngầm."
**Body**: 1) guarantor không phải tiếng Nhật (nhiều bất động sản từ chối), 2) thu nhập < 3x tiền nhà, 3) visa < 6 tháng còn lại.
**Anchor**: "国土交通省 外国人の入居受け入れ環境整備."
**Source guide**: `renting-and-buying-home`, `discrimination-human-rights-support`.
**⚠️**: Không kết tội bất kỳ chủ nhà nào — chỉ kể pattern phổ biến.

### H7
**Hook**: "Bão / động đất tại nhà thuê — bảo hiểm nhà không phải tự động có."
**Body**: 1) 火災保険 thường mandatory khi ký hợp đồng, 2) 地震保険 là OPTIONAL (mua riêng), 3) phí ~1-2 vạn yên/năm.
**Anchor**: "金融庁 地震保険制度."
**Source guide**: `fire-earthquake-insurance-home`, `typhoon-evacuation-alerts`, `earthquake-preparedness-japan`.
**⚠️**: Phí thay đổi theo nhà / tỉnh — không nói chính xác mức.

### H8
**Hook**: "NHK gõ cửa — bạn KHÔNG bắt buộc mở cửa, nhưng có hợp đồng thì phải trả."
**Body**: 1) 放送法 §64: ai có máy thu sóng là phải đóng, 2) không có máy thu = không phải ký, 3) đã ký nhưng không trả → có thể bị kiện dân sự.
**Anchor**: "放送法 §64."
**Source guide**: `nhk-contract-guide`.
**⚠️**: Không tư vấn "cứ đuổi đi" — phải biết quyền và nghĩa vụ chính xác.

---

## Category 5 — Emergency (8 hooks)

### E1
**Hook**: "Mất ví ở Nhật — gọi đâu trước cảnh sát?"
**Body**: 1) ngân hàng (lock thẻ), 2) công ty thẻ tín dụng (báo mất), 3) sau đó 警察 để có 紛失届 (cần để claim bảo hiểm hoặc cấp lại my number).
**Anchor**: "警察庁 落とし物・遺失物届の案内."
**Source guide**: `lost-residence-card`, `banking-remittance-anti-fraud`.
**⚠️**: Không skip cảnh sát — 紛失届 là giấy cần cho mọi thủ tục cấp lại sau đó.

### E2
**Hook**: "Bị police chặn đường ở Nhật — 3 việc bạn được làm hợp pháp."
**Body**: 1) yêu cầu xem 警察手帳 (badge), 2) im lặng (黙秘権), 3) gọi 弁護士 ngay khi bị mời về đồn (当番弁護士 miễn phí).
**Anchor**: "刑事訴訟法 §198 §39."
**Source guide**: `police-questioning-rights-japan`.
**⚠️**: Không khuyến khích kháng cự — chỉ là quyền pháp lý chuẩn.

### E3
**Hook**: "Bạo lực gia đình ở Nhật — có 3 đường thoát mà không cần visa độc lập."
**Body**: 1) 配偶者暴力相談支援センター (24/7), 2) shelter tạm thời, 3) 保護命令 từ tòa.
**Anchor**: "DV防止法 + 内閣府男女共同参画局."
**Source guide**: `domestic-violence-dv-support`.
**⚠️**: Cẩn thận tuyệt đối — đừng pose như chuyên gia DV. Chỉ giới thiệu hotline + đường đi.

### E4
**Hook**: "Tai nạn giao thông — 4 việc làm tại hiện trường trước khi gọi bảo hiểm."
**Body**: 1) gọi 110 (kể cả khi không thấy đau), 2) chụp ảnh xe + hiện trường, 3) lấy thông tin người kia (免許 + tên + 連絡先), 4) đi viện ngay để có 診断書.
**Anchor**: "道路交通法 §72 (報告義務)."
**Source guide**: `traffic-accident-response`.
**⚠️**: Không thương lượng tại chỗ ("itadakimasu" 示談) — phải qua công ty bảo hiểm.

### E5
**Hook**: "Bị lừa tiền qua chuyển khoản — gọi đâu trong 60 phút đầu."
**Body**: 1) ngân hàng (chặn tài khoản đầu thụ hưởng), 2) 警察 #9110, 3) 国民生活センター 188.
**Anchor**: "振り込め詐欺救済法."
**Source guide**: `special-fraud-tokushu-sagi`, `banking-remittance-anti-fraud`.
**⚠️**: Không hứa "lấy lại được tiền" — luật救済 có giới hạn.

### E6
**Hook**: "Động đất lớn — 30 giây đầu làm gì, 3 giờ sau làm gì."
**Body**: 1) ngay: chui xuống bàn / đỡ đầu, không chạy, 2) 30 phút sau: kiểm tra thông tin trên NHK / 自治体, 3) 3 giờ: lấy 避難所 gần nhất từ hazard map.
**Anchor**: "気象庁 緊急地震速報・避難情報."
**Source guide**: `earthquake-preparedness-japan`, `hazard-map-flood-tsunami-volcano`.
**⚠️**: Không khuyên chạy ra ngoài — đó là sai lầm phổ biến.

### E7
**Hook**: "Cấp cứu ở Nhật — gọi 119 nhưng KHÔNG biết tiếng Nhật, làm gì?"
**Body**: 1) nói chậm "Betonamu-go onegai shimasu" (yêu cầu tiếng Việt), 2) AMDA 03-6233-9266 (line phiên dịch y tế), 3) chuẩn bị: tên + tuổi + địa chỉ + triệu chứng đơn giản.
**Anchor**: "厚生労働省 救急医療電話相談 #7119."
**Source guide**: `emergency-calls-japan`, `medical-interpretation-multilingual-hospitals`.
**⚠️**: AMDA không free — phải kiểm tra phí.

### E8
**Hook**: "Bị bệnh đêm không đi viện kịp — #7119 có cứu được không?"
**Body**: 1) #7119 = nurse triage line (đa số tỉnh), 2) nói triệu chứng → họ tư vấn 救急 hay 翌日, 3) miễn phí, hoạt động 24/7 ở nhiều tỉnh.
**Anchor**: "総務省消防庁 救急安心センター事業 #7119."
**Source guide**: `holiday-night-medical-care`, `emergency-calls-japan`.
**⚠️**: #7119 không phủ sóng 100% tỉnh — phải nói "đa số tỉnh".

---

## Category 6 — Japanese culture confusion (8 hooks)

### J1
**Hook**: "Vứt rác ở Nhật — chia sai 1 lần là cả khu mất phép vứt."
**Body**: 1) phân loại theo quận (mỗi 自治体 khác), 2) 燃えるゴミ vs 燃えないゴミ vs プラ vs ペットボトル vs 缶 vs 粗大ゴミ, 3) lịch khác nhau theo loại.
**Anchor**: "環境省 一般廃棄物の分別."
**Source guide**: `garbage-sorting-rules`, `trash` (daily-life).
**⚠️**: Không nói "ai cũng nghiêm" — một số chung cư lỏng hơn nhưng đừng dựa vào.

### J2
**Hook**: "Đi bệnh viện ở Nhật — 3 thứ phải mang theo MỖI lần khám."
**Body**: 1) 保険証 (insurance card), 2) 在留カード, 3) お薬手帳 (sổ thuốc đang uống).
**Anchor**: "厚生労働省 医療機関受診時の必要書類."
**Source guide**: `clinic-hospital-visit-guide`, `pharmacy-prescription-guide`.
**⚠️**: 在留カード không phải bắt buộc luật — nhưng nhiều bệnh viện hỏi để xác nhận thông tin.

### J3
**Hook**: "Tiếng Nhật ở 市役所 — 3 câu lịch sự là đủ qua hầu hết quầy."
**Body**: 1) "Sumimasen, tetsuduki o oshiete kudasai" (xin chỉ cách làm thủ tục), 2) "Yukkuri hanashite kudasai" (nói chậm hơn), 3) "Kakimasu" (tôi viết cho).
**Anchor**: 76+ city-hall phrases trong app.
**Source guide**: `cityHall` (japanese phrases category).
**⚠**: Không hứa "nói xong là xong" — phải có giấy tờ cần thiết.

### J4
**Hook**: "Bưu điện Nhật — gửi tiền hay gửi hàng về VN khác giá rất nhiều."
**Body**: 1) EMS (nhanh, đắt), 2) SAL (rẻ hơn nhưng 2025 đã giới hạn), 3) 国際郵便 ePacket cho hàng nhỏ.
**Anchor**: "日本郵便 国際郵便のご案内."
**Source guide**: `post-office`, `post-office-mail-forwarding`.
**⚠️**: Giá thay đổi nhanh — luôn dẫn về app cho bảng cập nhật.

### J5
**Hook**: "Bị 振り込め詐欺 (lừa chuyển khoản) — 3 dấu hiệu thường thấy với người Việt."
**Body**: 1) "Đại sứ quán yêu cầu chuyển tiền cọc", 2) "Cảnh sát Nhật yêu cầu chuyển tiền điều tra", 3) "Bưu điện đòi phí thông quan qua chuyển khoản".
**Anchor**: "警察庁 特殊詐欺手口集."
**Source guide**: `special-fraud-tokushu-sagi`.
**⚠️**: Đại sứ quán KHÔNG bao giờ yêu cầu chuyển tiền trước.

### J6
**Hook**: "Đi コンビニ ở Nhật — bạn có thể trả 5 loại hóa đơn ở đó."
**Body**: 1) 公共料金 (điện/gas/nước), 2) NHK, 3) 税金 (一部), 4) ECサイト (Amazon, Yahoo), 5) 国民年金 (một số mẫu).
**Anchor**: "経済産業省 コンビニ収納代行業界統計."
**Source guide**: `combini-supermarket-station-tips`, `electricity-gas-water-contracts`.
**⚠️**: Không phải mọi コンビニ đều nhận mọi loại — có 振込書 mới đến đúng nơi.

### J7
**Hook**: "Vào bệnh viện Nhật — bạn được hỏi 5 câu, 4 trong số đó có trên màn hình app."
**Body**: 1) tên + ngày sinh, 2) địa chỉ + số điện thoại, 3) bảo hiểm, 4) triệu chứng từ khi nào, 5) thuốc đang uống.
**Anchor**: app daily phrases có hospital module.
**Source guide**: `hospital`, `clinic-hospital-visit-guide`.
**⚠️**: Không hứa "không cần phiên dịch" — vẫn phải có người giúp với case phức tạp.

### J8
**Hook**: "Mua bảo hiểm xe đạp ở Nhật — gần như BẮT BUỘC ở Tokyo / Osaka, nhưng ít người Việt biết."
**Body**: 1) Tokyo 2020 luật, Osaka 2016 luật, 2) phí ~3,000-5,000円/năm, 3) bán ở konbini / 自転車屋 / online.
**Anchor**: "東京都 自転車条例" + "大阪府 自転車条例."
**Source guide**: `bicycle-insurance`, `bicycle-rules-2026`.
**⚠️**: Quy tắc khác theo tỉnh — phải kiểm tra tỉnh đang sống.

---

## §7 — CTA variants (mix per video, don't repeat same one in series)

Default: `"Đọc full ở app Cẩm Nang Việt Nhật — link dưới."`

Variants:
- `"Lưu lại trong app để khỏi quên — link bio."`
- `"App có hotline tiếng Việt đầy đủ — search 'khẩn cấp'."`
- `"Mỗi guide trong app đều dẫn về nguồn .go.jp — kiểm tra được."`
- `"Save guide này lúc rảnh, dùng khi cần."`
- `"Link app trong bio + Cẩm Nang Việt Nhật trên store."`

Avoid:
- "Cài app NGAY" (time-pressure language)
- "Đừng bỏ lỡ" (FOMO)
- "Người Việt nào ở Nhật cũng cần" (overclaim)
- Any "TẶNG miễn phí" — the app is free; not a giveaway

---

## §8 — Anti-exaggeration master rules (apply to every hook)

| Rule | Why |
| --- | --- |
| Number claims must include the source (law / ministry / link) | Without source = clickbait |
| Personal stories must carry `Tình huống ví dụ` overlay | Honesty about illustrative content |
| Time-pressure framing forbidden ("Cài ngay") | Anti-fear brand position |
| "Chính phủ giấu bạn" / "Bí mật ít người biết" framing forbidden | Conspiracy-bait, App-Review-risk |
| Health / legal outcome promises forbidden | Out of scope; must escalate to professional |
| Specific amount promises (e.g. "lấy lại 100,000円") forbidden | Numbers vary by case |
| "Cách lách luật" / "loophole" framing — never | Compliance hard refusal |
| Government agency endorsement implication — never | We are not endorsed |

For ANY hook here that gets recorded, the recorder must paste the on-screen text into the `aso-v1.md` §8 anti-clickbait grep before posting.

---

## §9 — Posting cadence guidance (operational)

This pack is the LIBRARY. The cadence is operational, not creative:

- Start: 2 videos / week, no more.
- Mix categories: don't do 3 visa videos in a row (audience fatigue).
- Each video posted to TikTok / Reels / Shorts simultaneously — same content, native crop per platform.
- Track installs ONLY via App Store / Play Store referrer (no in-app analytics for video attribution).
- After 4 weeks, kill any hook that has < 10% completion rate.

**Do not optimize before 4 weeks.** Same observation-season discipline as `docs/no-data-action-policy.md` applies to content: weak signal ≠ act.

---

## §10 — How to extend this library (process, not new framework)

When you write a new hook:

1. Pick the category (6 categories above).
2. Hook is ONE sentence ≤ 14 Vietnamese words.
3. Body is 3 visual beats with one concrete number / law / hotline.
4. Anchor cites the law / ministry source.
5. Source guide ID must exist in `src/constants/content/adminGuides/guides/`.
6. ⚠️ note names the specific framing risk.
7. Pass §8 anti-exaggeration check.

If a new hook fails any step, edit until it passes, OR discard. Don't ship borderline hooks.

---

## Related docs

- [`docs/social-content-engine.md`](../social-content-engine.md) — format playbook (A-E) the hooks slot into
- [`docs/growth/aso-v1.md`](aso-v1.md) — store-side conversion
- [`docs/growth/share-card-concepts.md`](share-card-concepts.md) — sister doc, static share assets
- [`docs/content-governance.md`](../content-governance.md) — compliance rules
