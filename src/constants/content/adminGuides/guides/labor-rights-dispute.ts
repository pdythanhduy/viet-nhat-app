import type { AdminGuide } from '../../../../types/content';

const laborRightsDispute: AdminGuide = {
    id: 'labor-rights-dispute',
    category: 'daily-law',
    lastVerified: '2026-05-02',
    priority: 'high',
    title: 'Quyền lao động và tranh chấp với công ty',
    titleJp: '労働相談・労働審判・未払い賃金請求',
    icon: 'shield-checkmark',
    color: '#C0392B',
    description: 'Hướng dẫn quyền lao động cơ bản tại Nhật, cách khiếu nại khi bị trả thiếu lương, bị sa thải bất hợp pháp hoặc bị ép nghỉ việc — áp dụng cho cả người nước ngoài.',
    heroImage: require('../../../../../assets/content/daily-life/ag_labor-rights_hero.jpg'),
    heroImageCaption: 'Bảo vệ quyền lao động và khiếu nại tại Nhật',
    whoIsThisFor: [
      'Người bị trả thiếu lương, thiếu tiền làm thêm giờ hoặc không được trả lương cuối cùng.',
      'Người bị sa thải đột ngột, ép ký đơn nghỉ tự nguyện hoặc bị đối xử không công bằng tại nơi làm việc.',
      'Người muốn hiểu rõ quyền lao động trước khi ký hợp đồng hoặc khi có mâu thuẫn với công ty.',
    ],
    whenToDo: [
      'Ngay khi phát hiện lương thiếu hoặc thấy bảng lương có điểm bất thường.',
      'Khi bị thông báo nghỉ việc và muốn xác nhận quyết định đó có hợp pháp không.',
      'Trước khi ký bất kỳ giấy tờ nào công ty đưa khi nghỉ việc (đặc biệt 合意退職書).',
    ],
    whereToDo: [
      '労働基準監督署: xử lý vi phạm pháp luật lao động (lương, giờ làm, an toàn).',
      '総合労働相談コーナー: tư vấn tổng hợp về quan hệ lao động, miễn phí, tại từng ハローワーク.',
      '個人加盟ユニオン: hỗ trợ đàm phán tập thể cho cá nhân, không cần đủ số người thành lập công đoàn.',
      '地方裁判所: nộp đơn 労働審判 khi muốn giải quyết pháp lý nhanh.',
    ],
    estimatedTime: '労働基準監督署: tiếp nhận trong ngày, điều tra có thể mất 1–3 tháng. 労働審判: 3 phiên xét xử trong 3–6 tháng.',
    documentsChecklist: [
      { label: '労働契約書 hoặc 雇用通知書', required: true, note: 'Dùng để xác định lương, giờ làm, vị trí và điều kiện nghỉ việc.' },
      { label: '給与明細 các tháng liên quan', required: true },
      { label: 'Bảng chấm công / タイムカード / PC login records', required: true, note: 'Cần cho tranh chấp lương làm thêm hoặc giờ làm.' },
      { label: 'Tin nhắn, email, thông báo sa thải hoặc yêu cầu nghỉ việc', required: false },
      { label: '解雇理由証明書 nếu công ty đã sa thải', required: false, note: 'Có thể yêu cầu công ty cấp bằng văn bản.' },
    ],
    commonMistakes: [
      'Ký 合意退職書 hoặc "退職届" ngay khi được đưa — mất quyền tranh chấp sau đó.',
      'Không giữ bằng chứng giờ làm (タイムカード, email, LINE với sếp về giờ giấc).',
      'Nghĩ vì là người nước ngoài nên không có quyền khiếu nại — Luật lao động Nhật bảo vệ tất cả người làm việc tại Nhật bất kể quốc tịch.',
      'Để quá 3 năm kể từ khi xảy ra vi phạm lương — 賃金請求権 hết thời hiệu.',
      'Không hỏi tư vấn trước khi nghỉ việc — nhiều trường hợp có thể đàm phán được lương thôi việc hoặc bồi thường.',
    ],
    faq: [
      {
        question: 'Công ty nói "có chứng cứ sa thải" nhưng không nói rõ là gì — có hợp pháp không?',
        answer: '解雇 ở Nhật phải có lý do "客観的に合理的な理由" (khách quan, hợp lý) và "社会通念上相当" (xã hội chấp nhận được). Công ty không giải thích lý do cụ thể là dấu hiệu đáng ngờ. Bạn có quyền yêu cầu giải thích bằng văn bản (解雇理由証明書) — từ chối cung cấp là vi phạm 労働基準法第22条.',
      },
      {
        question: 'Bị ép ký "自己都合退職" nhưng thực ra là bị ép nghỉ — có cách nào không?',
        answer: '有. Nếu thực chất công ty gây sức ép buộc bạn nghỉ, đây có thể được coi là 解雇 hoặc 不当な自己都合退職 — bạn có thể khiếu nại để được công nhận là 会社都合, từ đó hưởng 雇用保険 tốt hơn và có căn cứ đòi bồi thường. Không ký trước, hỏi 労働相談コーナー ngay.',
      },
      {
        question: 'Công ty phá sản, lương chưa được trả — còn có thể đòi không?',
        answer: 'Có. Hệ thống **未払い賃金立替払制度** do 独立行政法人労働者健康安全機構 (JOHAS) quản lý, qua 労働基準監督署, cho phép nhà nước tạm ứng tối đa 80% lương chưa trả (trong phạm vi quy định) khi công ty phá sản hoặc được xác nhận mất khả năng thanh toán. Liên hệ 労働基準監督署 ngay khi biết công ty gặp khó khăn.',
      },
      {
        question: 'Không biết tiếng Nhật, có thể khiếu nại không?',
        answer: 'Được. 労働局 ở nhiều tỉnh lớn có 外国人労働者向け相談コーナー hỗ trợ tiếng Anh, Trung, Hàn và một số tiếng khác. Ngoài ra có thể gọi 外国人総合相談支援センター. Ở Tokyo, 東京外国人雇用サービスセンター hỗ trợ tư vấn đa ngôn ngữ.',
      },
    ],
    officialLinks: [
      { label: '労働基準監督署 — 厚生労働省', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/kantoku/index.html' },
      { label: '総合労働相談コーナー — 厚生労働省', url: 'https://www.mhlw.go.jp/general/seido/chihou/kaiketu/soudan.html' },
      { label: '労働条件相談ほっとライン (0120-811-610)', url: 'https://www.check-roudou.mhlw.go.jp/soudan/' },
      { label: '未払い賃金立替払制度 — 労働者健康安全機構', url: 'https://www.johas.go.jp/sangyouhoken/tabid/1150/Default.aspx' },
      { label: '労働審判手続 — 裁判所', url: 'https://www.courts.go.jp/saiban/syurui/syurui_minzi/minzi_02_02_12/index.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Nắm quyền lao động cơ bản',
        description: '**Lương tối thiểu (令和7年度 / Oct 2025):**\n- Toàn quốc: ¥1,121/giờ (mức trung bình)\n- Tokyo: ¥1,226/giờ | Osaka: ¥1,163/giờ | Aichi: ¥1,077/giờ\n- Tra mức của tỉnh bạn: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/minimumichiran/\n\n**Làm thêm giờ — hệ số tối thiểu:**\n| Loại | Hệ số |\n|---|---|\n| Ngày thường vượt giờ quy định | 1.25× |\n| Tháng vượt 60 giờ làm thêm | 1.50× |\n| Làm đêm 22:00–5:00 | +0.25× (cộng thêm vào hệ số trên) |\n| Ngày nghỉ pháp định (法定休日) | 1.35× |\n\n**Nghỉ phép có lương (有給休暇):**\n- Sau 6 tháng liên tục: 10 ngày/năm\n- Tăng dần đến tối đa 20 ngày\n- Công ty phải đảm bảo bạn dùng ít nhất **5 ngày/năm**\n\n**Sa thải hợp pháp:** phải có lý do khách quan, thông báo trước **30 ngày** hoặc trả **1 tháng lương** thay thế (解雇予告手当).',
        documents: ['Hợp đồng lao động (労働契約書 / 雇用通知書)', 'Bảng chấm công / タイムカード', 'Bảng lương 給与明細'],
        tip: '労働基準法 bảo vệ mọi người làm việc tại Nhật bất kể quốc tịch hay loại visa. Việc công ty nói "người nước ngoài không được khiếu nại" là sai pháp luật.',
      },
      {
        step: 2,
        title: 'Thu thập bằng chứng trước khi hành động',
        description: 'Trước khi liên hệ bất kỳ cơ quan nào, gom đủ bằng chứng:\n\n| Loại bằng chứng | Cách lấy |\n|---|---|\n| Giờ làm thực tế | Chụp ảnh タイムカード, xuất PC login log, lưu email/LINE có timestamp |\n| Bảng lương | Lưu tất cả 給与明細 từ ngày đầu |\n| Hợp đồng | 雇用通知書 hoặc 労働契約書 — nếu không có, yêu cầu bằng văn bản |\n| Thông báo nghỉ việc | Chụp ảnh bất kỳ giấy tờ nào liên quan sa thải |\n| Liên lạc nội bộ | LINE, email, chat công ty về giờ làm, lương, lý do nghỉ |\n\n⚠️ Nếu bị sa thải, **không ký bất kỳ giấy tờ nào** trước khi tư vấn — đặc biệt 退職届 (đơn nghỉ tự nguyện) và 合意退職書 (thoả thuận kết thúc hợp đồng).',
        documents: [],
        tip: 'Ghi chép mọi cuộc nói chuyện quan trọng với sếp hoặc HR (ngày, giờ, nội dung, nhân chứng nếu có). Ở Nhật, ghi âm trong phòng bạn cũng có mặt là hợp pháp cho mục đích tự bảo vệ.',
      },
      {
        step: 3,
        title: 'Liên hệ đúng nơi theo loại vấn đề',
        description: '**Tùy vấn đề, chọn đúng kênh:**\n\n| Vấn đề | Nơi phù hợp nhất |\n|---|---|\n| Lương làm thêm chưa được trả, thiếu tiền lương | **労働基準監督署** |\n| Bị sa thải, muốn đàm phán hoặc hiểu rõ quyền | **総合労働相談コーナー** |\n| Muốn công ty ngồi vào bàn đàm phán chính thức | **個人加盟ユニオン** |\n| Muốn giải quyết pháp lý nhanh (3–6 tháng) | **労働審判** tại 地方裁判所 |\n| Công ty phá sản, lương chưa trả | **労働基準監督署** → 未払い賃金立替払 |\n\n**Đường dây hỗ trợ miễn phí:**\n- **労働条件相談ほっとライン**: 0120-811-610 (月〜金 17:00–22:00, 土日祝 9:00–21:00)\n- **総合労働相談コーナー**: tại mỗi 労働局 và ハローワーク, giờ hành chính\n- **よりそいホットライン**: 0120-279-338 (24h, hỗ trợ đa ngôn ngữ)',
        documents: [],
        image: require('../../../../../assets/content/daily-life/ag_labor-rights_s3.jpg'),
        imageCaption: '労働相談 - chọn đúng nơi tư vấn theo vấn đề lương, sa thải hoặc tranh chấp lao động',
        tip: '総合労働相談コーナー miễn phí và không cần hẹn trước — đây là điểm đầu tiên nên đến nếu không biết bắt đầu từ đâu. Họ sẽ hướng dẫn bạn đến đúng cơ quan.',
      },
      {
        step: 4,
        title: 'Khiếu nại lương thiếu tại 労働基準監督署',
        description: '**Tính lương làm thêm bị thiếu:**\n\nLương giờ cơ bản = 基本給 ÷ 所定労働時間/tháng\nLương thiếu = Lương giờ × Số giờ làm thêm không trả × 1.25\n\n**Ví dụ cụ thể:**\nBạn có 基本給 200,000 yên/tháng, 所定労働時間 160 giờ/tháng. Tháng 10 làm thêm 30 giờ nhưng bảng lương không có 残業手当:\n- Lương giờ = 200,000 ÷ 160 = 1,250 yên/giờ\n- Lương thiếu tháng đó = 1,250 × 30 × 1.25 = **46,875 yên**\n- Nếu tình trạng này kéo dài 12 tháng → tổng đòi được = ~**562,500 yên**\n- Thời hiệu 3 năm → tối đa ~**1,687,500 yên** (36 tháng)\n\n**Thủ tục nộp đơn:**\n1. Đến 労働基準監督署 gần nhà, trình bày vấn đề.\n2. Thanh tra lao động (労働基準監督官) tiếp nhận và có thể yêu cầu công ty cung cấp tài liệu.\n3. Nếu xác nhận vi phạm, thanh tra ra **是正勧告** (yêu cầu khắc phục) — phần lớn công ty tuân theo.\n4. Nếu công ty không tuân, có thể bị điều tra hình sự.\n\n**Thời hiệu: 3 năm** từ ngày phát sinh quyền đòi lương (改正労働基準法 2020). Nộp đơn càng sớm càng tốt.\n\nNgoài ra có thể tự đàm phán với công ty, hoặc nhờ 弁護士 (luật sư lao động) gửi **内容証明郵便** (thư bảo đảm) yêu cầu thanh toán.',
        documents: ['Bảng lương 給与明細 (tất cả các tháng liên quan)', 'Bằng chứng giờ làm (タイムカード, email timestamps)', '労働契約書 hoặc 雇用通知書', 'Thẻ cư trú + hộ chiếu'],
        image: require('../../../../../assets/content/daily-life/ag_labor-rights_s4.jpg'),
        imageCaption: '労働基準監督署 - nơi khiếu nại lương thiếu và vi phạm Luật tiêu chuẩn lao động',
        tip: 'Nếu công ty chưa trả mà bạn nghỉ việc, lương vẫn phải được thanh toán trong 7 ngày kể từ ngày yêu cầu (退職時の賃金 — 労働基準法第23条). Gửi yêu cầu bằng văn bản có xác nhận ngày gửi.',
      },
      {
        step: 5,
        title: 'Tranh chấp sa thải — 労働審判 và đàm phán',
        description: '**Sa thải bất hợp pháp (不当解雇):**\nNếu sa thải không có lý do hợp pháp → bạn có thể yêu cầu:\n- Phục hồi vị trí làm việc, hoặc\n- Bồi thường (解決金) — thường tính theo số tháng lương\n\n**労働審判 — giải quyết pháp lý nhanh:**\n1. Nộp đơn **申立書** tại 地方裁判所 nơi công ty đặt trụ sở.\n2. Phiên xét xử tối đa 3 lần, thường giải quyết trong 3–6 tháng.\n3. Hội đồng gồm: 1 thẩm phán (労働審判官) + 2 người am hiểu lao động (労働審判員).\n4. Nếu không đồng ý kết quả → tự động chuyển sang tố tụng dân sự.\n\n**Không cần luật sư nhưng nên có** — nhiều luật sư lao động nhận theo hình thức **成功報酬型** (chỉ trả khi thắng, thường 10–20% số tiền thu được).\n\n**個人加盟ユニオン** (công đoàn cá nhân): bất kỳ người đi làm nào đều có thể gia nhập một mình và yêu cầu **団体交渉** (đàm phán tập thể) với công ty — công ty bắt buộc phải ngồi vào bàn đàm phán theo luật.',
        documents: ['申立書 (tải từ trang tòa án hoặc chuẩn bị với luật sư)', 'Toàn bộ bằng chứng đã thu thập', 'Thẻ cư trú + hộ chiếu'],
        tip: 'Nếu bị sa thải và đang xem xét kiện: tuyệt đối không ký 退職届 hay 合意退職書 trước. Một khi đã ký đồng thuận nghỉ việc, rất khó đảo ngược về mặt pháp lý.',
      },
    ],
  };

export default laborRightsDispute;
