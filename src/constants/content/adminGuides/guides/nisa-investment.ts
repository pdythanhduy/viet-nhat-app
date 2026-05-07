import type { AdminGuide } from '../../../../types/content';

const nisaInvestment: AdminGuide = {
    id: 'nisa-investment',
    category: 'money',
    lastVerified: '2026-05-02',
    priority: 'normal',
    title: 'Đầu tư NISA miễn thuế tại Nhật',
    titleJp: '新NISA（少額投資非課税制度）',
    icon: 'trending-up',
    color: '#16A085',
    description: 'Hướng dẫn mở tài khoản NISA và bắt đầu đầu tư miễn thuế tại Nhật dành cho người nước ngoài: điều kiện, hạn mức, sản phẩm phù hợp và những điểm đặc thù cần biết khi rời Nhật.',
    heroImage: require('../../../../../assets/content/daily-life/ag_nisa_hero.jpg'),
    heroImageCaption: 'Mở tài khoản NISA và đầu tư miễn thuế tại Nhật',
    whoIsThisFor: [
      'Người đang sống và làm việc tại Nhật muốn đầu tư dài hạn trong khi ở đây.',
      'Người muốn tận dụng ưu đãi miễn thuế trên lợi nhuận đầu tư thay vì để tiền trong tài khoản tiết kiệm lãi suất thấp.',
      'Người lo ngại không biết NISA có áp dụng cho người nước ngoài không và phải làm gì khi về nước.',
    ],
    whenToDo: [
      'Khi đã ổn định tại Nhật (≥6 tháng kể từ nhập cảnh), có tài khoản ngân hàng Nhật và thu nhập ổn định.',
      'Càng sớm càng tốt — ưu đãi NISA có hạn mức năm, không sử dụng năm nay sẽ mất.',
      'Trước khi về nước lâu dài: đóng hoặc sắp xếp tài khoản NISA đúng quy định để tránh vi phạm.',
    ],
    whereToDo: [
      'Công ty chứng khoán hoặc ngân hàng được phép mở NISA: nộp hồ sơ mở tài khoản và xác minh danh tính.',
      'Trang NISA của 金融庁: kiểm tra khung制度, hạn mức và danh sách sản phẩm つみたて投資枠.',
      'Công ty chứng khoán đang dùng: hỏi thủ tục đổi金融機関, 出国届出書 hoặc 継続適用届出書 khi rời Nhật.',
      '国税庁: tra thủ tục NISA liên quan đến mở/đổi tài khoản, thay đổi thông tin và xuất cảnh.',
    ],
    documentsChecklist: [
      { label: '在留カード hoặc giấy tờ xác minh cư trú tại Nhật', required: true },
      { label: 'My Number', required: true, note: 'Cần khi mở tài khoản chứng khoán/NISA.' },
      { label: 'Tài khoản ngân hàng Nhật để nạp/rút tiền', required: true },
      { label: 'Giấy tờ xác minh danh tính theo yêu cầu công ty chứng khoán', required: true },
      { label: '勘定廃止通知書 hoặc giấy tờ đổi金融機関', required: false, note: 'Chỉ cần khi đổi nơi mở NISA.' },
      { label: '出国届出書 hoặc 継続適用届出書', required: false, note: 'Cần kiểm tra trước khi rời Nhật hoặc đi công tác dài hạn.' },
    ],
    fees: [
      'Phí mở tài khoản NISA: miễn phí tại hầu hết công ty chứng khoán online.',
      'Phí quản lý quỹ (信託報酬): tùy sản phẩm, quỹ index phổ biến như eMAXIS Slim 全世界株式 là ~0.058%/năm.',
      'Thuế lợi nhuận: 0% trong NISA — đây là ưu đãi chính của tài khoản này.',
    ],
    commonMistakes: [
      'Nghĩ NISA không dành cho người nước ngoài — thực tế người nước ngoài cư trú hợp pháp tại Nhật hoàn toàn có thể mở.',
      'Mở NISA rồi về nước lâu dài mà không xử lý đúng cách — vi phạm quy định và có thể bị tính thuế.',
      'Đầu tư vào sản phẩm rủi ro cao (cổ phiếu đơn lẻ, crypto) với tiền không được phép mất — NISA không bảo đảm lợi nhuận.',
      'Mở nhiều tài khoản NISA ở nhiều công ty — vi phạm quy định, chỉ được mở 1 tài khoản NISA tại 1 công ty trong cùng năm.',
      'Bán rồi tưởng "thu lại hạn mức" ngay — hạn mức đã dùng chỉ phục hồi vào **đầu năm tiếp theo**.',
    ],
    faq: [
      {
        question: 'Lợi nhuận trong NISA thực sự không bị đánh thuế?',
        answer: 'Đúng. Thông thường lợi nhuận từ đầu tư (cổ tức, chênh lệch giá) bị tính thuế 20.315% tại Nhật. Trong tài khoản NISA, toàn bộ lợi nhuận được miễn thuế. Ví dụ: đầu tư 1,800万円 tăng lên 3,000万円 → trong NISA, 1,200万円 lợi nhuận không bị trừ thuế.',
      },
      {
        question: 'Khi về Việt Nam thì tài khoản NISA phải làm gì?',
        answer: 'Nếu bạn rời Nhật vì lý do cá nhân (không phải điều chuyển công việc): phải thông báo với công ty chứng khoán, tài khoản NISA sẽ chuyển sang tài khoản thông thường và bạn không thể đầu tư mới. Tài sản hiện tại vẫn có thể giữ nhưng không còn miễn thuế. Nên bán trước khi rời hoặc tư vấn với công ty chứng khoán về phương án cụ thể.',
      },
      {
        question: 'Mất việc hoặc nghỉ không lương có ảnh hưởng tài khoản NISA không?',
        answer: 'Không ảnh hưởng đến tài khoản nếu bạn vẫn cư trú tại Nhật. Tuy nhiên, nếu thu nhập giảm, nên điều chỉnh số tiền đầu tư hàng tháng để không ảnh hưởng đến quỹ khẩn cấp.',
      },
      {
        question: 'Nên chọn つみたて投資枠 hay 成長投資枠?',
        answer: 'Người mới bắt đầu nên ưu tiên つみたて投資枠: đầu tư tự động hàng tháng vào quỹ index đã được 金融庁 phê duyệt, phí thấp, không cần theo dõi liên tục. 成長投資枠 phù hợp hơn khi đã có kinh nghiệm và muốn mua ETF hoặc cổ phiếu đơn lẻ.',
      },
    ],
    officialLinks: [
      { label: 'NISAを知る — 金融庁', url: 'https://www.fsa.go.jp/policy/nisa2/about/nisa2024/' },
      { label: 'つみたて投資枠対象商品 — 金融庁', url: 'https://www.fsa.go.jp/policy/nisa2/products/' },
      { label: 'NISAよくある質問 — 金融庁', url: 'https://www.fsa.go.jp/policy/nisa2/question/index.html' },
      { label: 'NISA口座の手続 — 国税庁', url: 'https://www.nta.go.jp/users/gensen/nisa/tetsuzuki.htm' },
    ],
    steps: [
      {
        step: 1,
        title: 'Hiểu hạn mức và cấu trúc tài khoản NISA',
        description: '**Hệ thống 新NISA (từ 2024, áp dụng không giới hạn thời gian):**\n\n| Loại đầu tư | Hạn mức năm | Sản phẩm được phép |\n|---|---|---|\n| **つみたて投資枠** | **120万円/năm** | Quỹ index phê duyệt bởi 金融庁 |\n| **成長投資枠** | **240万円/năm** | Cổ phiếu, ETF, phần lớn 投資信託 |\n| **Tổng cộng** | **360万円/năm** | |\n\n**Hạn mức sinh涯 (trọn đời):** 1,800万円 (trong đó 成長投資枠 tối đa 1,200万円)\n\n**Miễn thuế vô thời hạn** — không còn giới hạn 20 năm như NISA cũ.\n\n**Phục hồi hạn mức:** khi bán tài sản, hạn mức tương đương (tính theo giá mua gốc) được cộng lại vào **đầu năm tiếp theo**.\n\nChỉ được mở **1 tài khoản NISA** tại 1 công ty trong cùng 1 năm.',
        documents: [],
        image: require('../../../../../assets/content/daily-life/ag_nisa_s1.jpg'),
        imageCaption: '新NISA - hiểu hạn mức つみたて投資枠, 成長投資枠 và giới hạn trọn đời',
        tip: 'Không cần dùng hết 360万円/năm. Bắt đầu nhỏ (ví dụ 30,000–50,000 yên/tháng) và tăng dần theo thu nhập là chiến lược phù hợp hơn với người mới.',
      },
      {
        step: 2,
        title: 'Kiểm tra điều kiện và chọn công ty chứng khoán',
        description: '**Điều kiện mở tài khoản NISA với tư cách người nước ngoài:**\n- Đang cư trú tại Nhật, có đăng ký 住民票\n- Đã nhập cảnh ≥6 tháng (hoặc có giấy xác nhận làm việc tại Nhật)\n- 在留カード còn hiệu lực ≥3 tháng tính từ ngày mở tài khoản\n- Từ 18 tuổi trở lên tính đến ngày 01/01 của năm mở tài khoản\n\n**Công ty chứng khoán online phổ biến cho người nước ngoài:**\n\n| Công ty | Đặc điểm |\n|---|---|\n| **SBI証券** | Nền tảng lớn nhất, hỗ trợ mở tài khoản online đơn giản |\n| **楽天証券** | Tích hợp với Rakuten ecosystem, giao diện thân thiện |\n| **マネックス証券** | Hỗ trợ tốt cho tài khoản người nước ngoài |\n\n⚠️ Một số công ty chứng khoán truyền thống (như 野村證券) có thể khó khăn hơn với người nước ngoài. Nên ưu tiên các công ty online.',
        documents: ['Thẻ cư trú (在留カード)', 'Tài khoản ngân hàng Nhật để liên kết', 'My Number (số cá nhân)'],
        tip: 'Quá trình mở tài khoản online thường mất 1–2 tuần (xác minh danh tính qua bưu điện hoặc eKYC). Chuẩn bị My Number Card vật lý để đẩy nhanh xác minh.',
      },
      {
        step: 3,
        title: 'Chọn sản phẩm đầu tư phù hợp',
        description: '**Với người mới bắt đầu — ưu tiên quỹ index phí thấp:**\n\n| Sản phẩm | Đặc điểm | Phí/năm |\n|---|---|---|\n| eMAXIS Slim 全世界株式（オールカントリー） | Đầu tư toàn thế giới (~50% Mỹ, còn lại các nước khác) | ~0.058% |\n| eMAXIS Slim 米国株式（S&P500） | Chỉ cổ phiếu Mỹ — 500 công ty lớn nhất | ~0.088% |\n| SBI・V・S&P500インデックス・ファンド | Tương tự S&P500, phí cực thấp | ~0.094% |\n\n**つみたて投資枠**: tất cả sản phẩm trên đều được phép, mua tự động hàng tháng.\n**成長投資枠**: thêm ETF (VT, VOO...) và cổ phiếu đơn lẻ (cần thêm kiến thức).\n\n⚠️ NISA **không bảo đảm lợi nhuận** — giá trị có thể giảm. Chỉ đầu tư số tiền có thể giữ dài hạn (≥5–10 năm).',
        documents: [],
        image: require('../../../../../assets/content/daily-life/ag_nisa_s3.jpg'),
        imageCaption: '投資信託 - chọn sản phẩm phí thấp và phù hợp với kế hoạch dài hạn',
        tip: '"オルカン" (eMAXIS Slim 全世界株式) là lựa chọn phổ biến nhất cho người mới và được nhiều chuyên gia tài chính Nhật khuyến nghị cho người đầu tư thụ động dài hạn.',
      },
      {
        step: 4,
        title: 'Thiết lập tự động hàng tháng (積立設定)',
        description: 'Sau khi mở tài khoản và chọn sản phẩm:\n\n1. Vào mục **積立設定** trên app/website công ty chứng khoán.\n2. Chọn quỹ muốn đầu tư.\n3. Đặt số tiền hàng tháng (ví dụ: 30,000 yên, tối đa 100,000 yên/tháng với つみたて投資枠).\n4. Liên kết tài khoản ngân hàng để tự động trừ tiền.\n5. Chọn ngày trừ tiền hàng tháng.\n\nSau khi thiết lập, hệ thống tự mua quỹ mỗi tháng — **không cần theo dõi hay tự tay mua**.\n\n**Chiến lược đơn giản nhất:** cố định một số tiền hàng tháng, giữ liên tục bất kể thị trường lên hay xuống (平均コスト法 / Dollar-cost averaging) — phù hợp nhất với người bận và không muốn theo dõi thị trường.',
        documents: [],
        tip: 'Không nên rút tiền ra hoặc bán khi thị trường giảm — đây là sai lầm phổ biến nhất. Thị trường dài hạn có xu hướng phục hồi; ngừng mua khi giảm thực ra lại bỏ lỡ thời điểm giá rẻ.',
      },
      {
        step: 5,
        title: 'Xử lý tài khoản NISA khi chuẩn bị rời Nhật',
        description: 'Khi bạn sắp rời Nhật vĩnh viễn hoặc lâu dài:\n\n**Bắt buộc thông báo công ty chứng khoán** trước khi rời.\n\n| Tình huống | Quy định |\n|---|---|\n| Điều chuyển công tác (転勤) do công ty | Có thể tiếp tục giữ tài khoản NISA, không mua mới được |\n| Rời Nhật tự nguyện | Tài khoản chuyển sang tài khoản thông thường, không đầu tư mới được |\n| Tài sản hiện có | Vẫn giữ được và miễn thuế cho đến khi bán |\n\n**Lựa chọn:** bán toàn bộ trước khi rời (lợi nhuận trong NISA vẫn miễn thuế) hoặc giữ lại và bán dần sau khi đã không còn là cư dân Nhật (cần tư vấn với công ty chứng khoán về quy định cụ thể).\n\n**Về thuế tại Việt Nam:** Việt Nam có thể tính thuế thu nhập từ lợi nhuận đầu tư nước ngoài — kiểm tra với cơ quan thuế Việt Nam trước khi bán.',
        documents: ['Thông báo xuất cảnh (出国届) cho công ty chứng khoán', 'Xác nhận số dư tài khoản và giá trị hiện tại'],
        tip: 'Trước khi rời Nhật ít nhất 2–3 tháng, gọi điện cho công ty chứng khoán hỏi quy trình cụ thể cho tình huống của bạn — mỗi công ty có quy định xử lý tài khoản người không cư trú khác nhau.',
      },
    ],
  };

export default nisaInvestment;
