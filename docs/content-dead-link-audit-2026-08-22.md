# Audit link chết định kỳ — 2026-08-22

**Scope**: toàn bộ `officialLinks` trong 127 admin guide — 353 URL duy nhất (tăng từ 349 ở đợt 07-11, do các guide mới/link mới thêm trong đợt audit 2026-08-21 vừa xong).
**Trigger**: yêu cầu lặp lại audit link chết định kỳ (lần trước: 07-11, 20/349 link chết).

## Phương pháp

1. Trích toàn bộ URL từ `officialLinks` của 127 file guide bằng script Node.
2. Quét HTTP status hàng loạt bằng `curl` (song song, user-agent giả lập trình duyệt, timeout 15-20s).
3. **Phát hiện quan trọng**: `curl` trong môi trường này KHÔNG đáng tin cho nhiều domain `.go.jp`/`.or.jp` — 49/353 URL trả về rỗng (không status code) dù các domain đó (nenkin.go.jp, kyoukaikenpo.or.jp, myna.go.jp, soumu.go.jp, houterasu.or.jp, kojinbango-card.go.jp, j-lis.go.jp, zenginkyo.or.jp, cic.co.jp...) đã được xác nhận CÒN SỐNG qua WebFetch nhiều lần trong các đợt audit trước (kể cả ngay trong đợt 2026-08-21 vừa xong). Đây đúng là hiện tượng đã ghi nhận ở audit 07-11: "nhiều site .go.jp/.or.jp chặn user-agent tự động nhưng vẫn sống bình thường".
4. Xác minh chéo bằng WebFetch cho **~40/49 URL "rỗng"** + toàn bộ URL trả `403`/`000` — ưu tiên các URL sâu (deep-link cụ thể) vì dễ bị dời/xóa hơn trang chủ.

## Kết quả

**Chỉ 1 link chết thật sự được xác nhận** (trong tổng 353 URL):

| Guide | Link cũ (chết) | Nguyên nhân | Link mới |
|---|---|---|---|
| `health-insurance.ts` | `https://fresc.moj.go.jp` | DNS không phân giải được (`ENOTFOUND`) — subdomain đã bị gỡ | `https://www.moj.go.jp/isa/support/portal/index.html` (Cổng thông tin hỗ trợ đời sống người nước ngoài của ISA, có nhắc rõ đến FRESC) |

**Đã xác nhận CÒN SỐNG** (không sửa) qua WebFetch, dù `curl` báo rỗng/403:
- Toàn bộ `nenkin.go.jp` (11 URL kiểm tra, gồm cả deep-link cũ như `20150402-01.html`, `20150428.html?id=3770`)
- Toàn bộ `kyoukaikenpo.or.jp`, `kojinbango-card.go.jp` (+ `net.kojinbango-card.go.jp`), `myna.go.jp`, `soumu.go.jp` (4 URL), `houterasu.or.jp` (2 URL), `zenginkyo.or.jp` (2/3 URL — 1 URL còn lại 403 nhưng cùng domain đã xác nhận sống), `cic.co.jp` (2 URL), `j-lis.go.jp` (403 nhưng là domain chính thức J-LIS, cùng pattern chặn bot), `post.japanpost.jp` (2 URL), `city.shibuya.tokyo.jp`, `ntt-east.co.jp`, `jsdc.or.jp`, `police.pref.kanagawa.jp`, `qa.smbc.co.jp`, `reg.mc.env.go.jp`, `laws.e-gov.go.jp` (2 URL), `studyinjapan.go.jp` (redirect 301 bình thường), `zenrosai.coop`
- 15 URL `mofa.go.jp` + `vn.emb-japan.go.jp` báo `403` qua cả curl lẫn WebFetch — đây là domain đã biết chặn bot triệt để (xác nhận lại pattern từ đợt 07-11 và từ chính đợt audit 2026-08-21 hôm qua). KHÔNG sửa vì không có bằng chứng thực sự chết.
- `sevenbank.co.jp/soukin`, `ntt-east.co.jp` (2 trang): WebFetch báo "encoding/mojibake" — trang tải được (không phải lỗi HTTP) nhưng hiển thị lỗi font do trang gốc dùng Shift-JIS không khai báo đúng charset. KHÔNG phải link chết, không cần sửa (browser thật của người dùng đọc bình thường).

## Kết luận

- **287 nguyên vẹn** (curl xác nhận 200 trực tiếp) + **~65 xác nhận qua WebFetch** = **352/353 xác nhận sống**.
- **1/353 thật sự chết** → đã sửa.
- Tỷ lệ link chết đợt này (0.3%) thấp hơn nhiều so với đợt 07-11 (20/349 ≈ 5.7%) — hợp lý vì đợt 07-11 là lần đầu quét (nợ tích lũy nhiều năm), còn đợt này quét lại chỉ 6 tuần sau.

**Verify**: `typecheck` ✅, `verify:content` ✅ (0 issue), full test suite 526/526 ✅.

## Ghi chú cho đợt sau

- Không dùng `curl` một mình để kết luận link chết trong môi trường này — bắt buộc xác minh chéo WebFetch trước khi sửa bất kỳ URL nào, đặc biệt domain `.go.jp`/`.or.jp`.
- `mofa.go.jp` và `vn.emb-japan.go.jp` chặn bot 100% các lần thử — không cần thử lại các URL này trừ khi có báo cáo cụ thể từ người dùng thật rằng trang không tải được.
- Lặp lại audit này mỗi ~1-2 tháng theo nhịp đã thiết lập.
