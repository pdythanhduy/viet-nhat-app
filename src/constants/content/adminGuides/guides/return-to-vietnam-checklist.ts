import type { AdminGuide } from '../../../../types/content';

const returnToVietnamChecklist: AdminGuide = {
    id: 'return-to-vietnam-checklist',
    category: 'immigration',
    lastVerified: '2026-08-21',
    priority: 'normal',
    title: 'Checklist về nước / kết thúc hợp đồng',
    titleJp: '帰国・在留終了時の手続き',
    icon: 'airplane',
    color: '#27AE60',
    description: 'Tất cả thủ tục cần làm trước và sau khi rời Nhật: chuyển đi khỏi thành phố, hủy bảo hiểm, đóng ngân hàng, hủy điện thoại, hoàn thuế pension và quyết toán thuế.',
    legalScope: {
      jurisdiction: 'mixed',
      jurisdictionNote: 'Về nước/kết thúc cư trú liên quan nhiều cơ quan: municipal office cho 転出/住民登録 và bảo hiểm, ISA cho返納 thẻ cư trú khi xuất cảnh, Japan Pension Service cho 脱退一時金, ngân hàng/nhà mạng/cơ quan thuế cho hợp đồng và thuế.',
      sourceVerifiedAt: '2026-08-21',
      nextReviewAt: '2026-10-01',
      riskLevel: 'high',
      whenToAskExpert: [
        'Bạn có kế hoạch quay lại Nhật và đang cân nhắc có nên nhận 脱退一時金 hay giữ lịch sử pension.',
        'Bạn còn 住民税, nợ bảo hiểm/điện thoại/ngân hàng hoặc chưa quyết toán thuế.',
        'Bạn rời Nhật bằng 再入国/みなし再入国 thay vì rời vĩnh viễn và không chắc có nên nộp thẻ cư trú/転出 hay không.',
      ],
    },
    quickAction: {
      deadline: '転出届 làm quanh thời điểm rời địa chỉ theo hướng dẫn municipal office; trả thẻ cư trú ngay tại cảng xuất cảnh nếu rời Nhật không dùng tái nhập; 脱退一時金 nộp sau khi rời Nhật và trong vòng 2 năm.',
      office: 'Municipal office, cửa xuất nhập cảnh sân bay/cảng, Japan Pension Service, 税務署, ngân hàng và nhà mạng/hợp đồng dịch vụ.',
      doNow: [
        'Quyết định rời vĩnh viễn hay rời bằng 再入国/みなし再入国.',
        'Làm 転出届, hủy/đóng bảo hiểm và xử lý thuế trước khi rời.',
        'Chụp/lưu thông tin thẻ cư trú và pension trước khi nộp thẻ tại sân bay.',
        'Không đóng tài khoản nhận tiền cho đến khi đã rõ cách nhận pension refund/hoàn thuế.',
      ],
      bring: ['Thẻ cư trú', 'Hộ chiếu', 'My Number Card nếu có', 'Sổ/Thông tin pension', '源泉徴収票', 'Thông tin tài khoản ngân hàng', 'Hợp đồng SIM/internet/nhà'],
      ifLate: 'Nếu đã về Việt Nam mà còn sót thủ tục, xử lý ngay qua bưu điện/online/đại diện; 脱退一時金 quá 2 năm sẽ mất quyền yêu cầu.',
      officialSourceLabels: [
        '脱退一時金 — Japan Pension Service',
        '転出届の手続き — デジタル庁',
        '在留カード等の返納 — 出入国在留管理庁',
        '海外勤務と所得税額の精算 — 国税庁',
      ],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_return-vn_hero.jpg'),
    heroImageCaption: 'Checklist về nước — 転出届, hủy bảo hiểm, đóng tài khoản và hoàn pension',
    whoIsThisFor: [
      'Người kết thúc hợp đồng lao động, chương trình thực tập hoặc khóa học và chuẩn bị về Việt Nam.',
      'Người muốn rời Nhật vĩnh viễn hoặc tạm thời dài ngày.',
      'Người đã từng về nước nhưng chưa làm hết thủ tục — đặc biệt pension refund vẫn còn 2 năm để nộp.',
    ],
    whenToDo: [
      'Bắt đầu lên danh sách ít nhất 2–3 tháng trước ngày về — một số thủ tục cần hẹn trước hoặc chờ giấy tờ.',
      'Nộp 転出届 (chuyển đi) quanh thời điểm rời địa chỉ theo hướng dẫn municipal office; nếu về nước, ghi rõ 海外転出.',
      'Pension refund (脱退一時金) phải nộp SAU khi đã rời Nhật và trong vòng 2 năm kể từ ngày về.',
    ],
    whereToDo: [
      'Municipal office (市区町村役場): nộp 転出届, hủy 国民健康保険.',
      'Sân bay xuất cảnh: trả thẻ cư trú tại cửa kiểm tra xuất nhập cảnh.',
      'Japan Pension Service: nộp đơn 脱退一時金 qua bưu điện từ Việt Nam.',
      'Ngân hàng: đóng tài khoản hoặc giữ lại để nhận pension refund.',
      'Nhà mạng điện thoại: hủy hợp đồng SIM và internet.',
    ],
    estimatedTime: 'Toàn bộ quá trình mất 1–3 tháng nếu tính cả việc chờ pension refund sau khi về. Thủ tục tại Nhật trước ngày về có thể xử lý trong 1–2 tuần nếu chuẩn bị sớm.',
    fees: [
      'Hầu hết thủ tục chuyển đi, hủy bảo hiểm miễn phí.',
      'Pension refund: bạn NHẬN LẠI một phần tiền đã đóng — không phải nộp thêm. Mức hoàn phụ thuộc số tháng đóng và lương; với kỳ đóng từ 2021/04 trở đi, trần tháng dùng để tính có thể là 60 tháng.',
      'Sau khi nhận pension refund, Japan Pension Service khấu lưu 20.42% thuế. Người Việt Nam có thể nộp đơn xin hoàn thuế dựa trên hiệp định thuế VN–Nhật.',
    ],
    documentsChecklist: [
      { label: 'Thẻ cư trú (在留カード)', required: true, note: 'Nộp lại tại cửa kiểm tra xuất nhập cảnh ở sân bay.' },
      { label: 'Hộ chiếu còn hiệu lực', required: true },
      { label: 'Giấy 転出証明書 từ municipal office', required: false, note: 'Dùng để đóng tài khoản ngân hàng hoặc làm các thủ tục cần xác nhận đã rời địa chỉ.' },
      { label: 'Thông tin tài khoản ngân hàng để nhận pension refund', required: false, note: 'Tài khoản Nhật hoặc tài khoản nước ngoài đều được, nhưng tài khoản nước ngoài bị trừ phí chuyển quốc tế.' },
      { label: 'Bảng lương / 源泉徴収票', required: false, note: 'Cần nếu muốn quyết toán thuế trước khi về hoặc xin hoàn thuế sau.' },
    ],
    commonMistakes: [
      'Về nước mà không nộp 転出届 → tiếp tục bị tính 住民税 (thuế cư dân) năm sau dù không ở Nhật.',
      'Quên đăng ký pension refund hoặc để quá 2 năm — mất toàn bộ số tiền đã đóng.',
      'Đóng tài khoản ngân hàng Nhật trước khi nhận pension refund → phải khai tài khoản nước ngoài, bị trừ phí.',
      'Không hủy SIM hoặc internet trước khi về → bị tính phí hàng tháng sau khi về nước.',
      'Nghĩ rằng phải đến ISA để trả thẻ cư trú — thực ra nộp luôn tại cửa kiểm tra xuất cảnh ở sân bay.',
      'Không làm quyết toán thuế (年末調整 hoặc 確定申告) trước khi về → bỏ lỡ khoản hoàn thuế nếu có.',
    ],
    faq: [
      {
        question: 'Không có tài khoản ngân hàng Nhật để nhận pension refund thì sao?',
        answer: 'Có thể khai tài khoản ngân hàng nước ngoài trên đơn 脱退一時金. Japan Pension Service sẽ chuyển quốc tế nhưng phí chuyển tiền sẽ bị trừ vào số tiền nhận. Nếu có thể, giữ lại tài khoản Nhật cho đến khi nhận xong.',
      },
      {
        question: 'Về rồi mới nhớ chưa hủy SIM, phải làm thế nào?',
        answer: 'Gọi đường dây hỗ trợ của nhà mạng từ Việt Nam hoặc nhờ người ở Nhật hủy hộ. Một số nhà mạng cho phép hủy online hoặc qua My Page. Nên làm càng sớm càng tốt để tránh bị tính thêm phí.',
      },
      {
        question: 'Pension refund nộp ở đâu sau khi về Việt Nam?',
        answer: 'Tải mẫu đơn 脱退一時金 từ trang Japan Pension Service (nenkin.go.jp), điền và gửi bưu điện đến văn phòng Japan Pension Service kèm bản sao hộ chiếu và thẻ cư trú cũ. Thời gian xử lý khoảng 3–6 tháng.',
      },
      {
        question: 'Nếu muốn quay lại Nhật sau này thì nên làm gì khác không?',
        answer: 'Nếu có kế hoạch quay lại, hãy kiểm tra kỹ ngân hàng, bảo hiểm, My Number Card và tư cách lưu trú trước khi rời. Đặc biệt, nhận 脱退一時金 có nghĩa là các tháng đã dùng để tính khoản này không còn dùng cho quyền lợi pension tương lai, nên nếu định quay lại lâu dài thì cần cân nhắc trước.',
      },
    ],
    officialLinks: [
      { label: '脱退一時金 — Japan Pension Service', url: 'https://www.nenkin.go.jp/service/jukyu/seido/sonota-kyufu/dattai-ichiji/index.html' },
      { label: '転出届の手続き — デジタル庁', url: 'https://www.digital.go.jp/policies/moving_onestop_service' },
      { label: '在留カード等の返納 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html' },
      { label: '海外勤務と所得税額の精算 — 国税庁', url: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1920.htm' },
    ],
    steps: [
      {
        step: 1,
        title: 'Điền 転出届 tại municipal office trước khi về',
        description: '**Các trường trên 転出届** (nhận tại quầy 住民登録 / 市民課):\n\n| Trường | Ghi như thế nào |\n|---|---|\n| 氏名 / フリガナ | Tên theo 在留カード; フリガナ viết KATAKANA |\n| 生年月日 | Ngày/tháng/năm sinh (西暦 — dương lịch) |\n| 現住所 | Địa chỉ hiện tại đang đăng ký |\n| 転出先 | Nếu về nước: ghi 海外 + tên quốc gia (ベトナム) |\n| 転出年月日 | Ngày dự kiến rời địa chỉ / rời Nhật |\n| 世帯主 | Chủ hộ (thường chính bạn nếu ở một mình) |\n\nNộp trong vòng 14 ngày trước hoặc sau ngày thực tế dọn đi. Khi về nước vĩnh viễn, ghi rõ 海外転出.',
        documents: [
          'Thẻ cư trú',
          'Hộ chiếu',
          'Thẻ My Number (nếu có)',
        ],
        tip: 'Xin thêm 転出証明書 sau khi nộp — cần khi đóng tài khoản ngân hàng hoặc xác nhận đã hủy cư trú.',
      },
      {
        step: 2,
        title: 'Hủy SIM, internet và tiện ích (điện, gas, nước)',
        description: 'Liên hệ nhà mạng và công ty tiện ích ít nhất 1–2 tuần trước ngày dọn ra. Hỏi rõ phí hủy hợp đồng, ngày kết thúc dịch vụ và cách trả thiết bị (modem, router).',
        documents: [
          'Số hợp đồng SIM / internet',
          'Số khách hàng điện/gas/nước',
        ],
        tip: 'Chụp ảnh đồng hồ điện, gas, nước vào ngày cuối cùng ở nhà — bằng chứng cho hóa đơn quyết toán cuối.',
      },
      {
        step: 3,
        title: 'Xử lý tài khoản ngân hàng',
        description: 'Quyết định đóng hay giữ lại tài khoản. Nếu giữ: kiểm tra ngân hàng có cho phép tài khoản không cư trú không. Nếu đóng: rút hết tiền trước, sau đó ra chi nhánh hoặc làm online. Đừng đóng ngay — chờ đến sau khi nhận pension refund.',
        documents: [
          'Sổ ngân hàng hoặc thẻ ATM',
          'Thẻ cư trú hoặc giấy 転出証明書',
          'Con dấu (印鑑) nếu có đăng ký khi mở tài khoản',
        ],
        tip: 'Nhiều ngân hàng có điều khoản tự đóng tài khoản nếu không có giao dịch dài ngày hoặc nếu phát hiện chủ tài khoản không còn cư trú tại Nhật. Kiểm tra điều khoản với ngân hàng của bạn.',
      },
      {
        step: 4,
        title: 'Trả thẻ cư trú tại sân bay khi xuất cảnh',
        description: 'Khi qua cửa kiểm tra xuất nhập cảnh để rời Nhật không dùng 再入国/みなし再入国, thẻ cư trú mất hiệu lực và được trả lại ngay tại cảng xuất cảnh. Nếu rời bằng tái nhập hợp lệ để quay lại, không xử lý như về nước vĩnh viễn.',
        documents: [
          'Thẻ cư trú (在留カード)',
          'Hộ chiếu',
        ],
        tip: 'Không cần đến ISA riêng để nộp thẻ — làm ngay tại cửa kiểm tra xuất cảnh. Chụp ảnh thẻ cư trú trước khi nộp để lưu số thẻ khi cần cho đơn pension refund.',
      },
      {
        step: 5,
        title: 'Nộp đơn pension refund (脱退一時金) sau khi về nước',
        description: 'Nộp đơn xin hoàn lại một phần tiền pension đã đóng trong thời gian ở Nhật. Phải nộp SAU khi đã rời Nhật và không còn địa chỉ tại Nhật. Deadline là 2 năm kể từ ngày không còn địa chỉ tại Nhật/không còn tư cách tham gia pension theo điều kiện Japan Pension Service.\n\nĐiểm mới cần nhớ: nếu kỳ đóng pension thuộc giai đoạn áp dụng từ 2021/04 trở đi, số tháng tối đa dùng để tính 脱退一時金 là 60 tháng, không còn chỉ 36 tháng như quy định cũ. Sau khi nhận, phần 厚生年金 có thể bị khấu lưu thuế; nếu cần hoàn thuế Nhật, chuẩn bị 納税管理人 hoặc thủ tục thuế phù hợp trước/sau khi rời Nhật.',
        image: require('../../../../../assets/content/daily-life/dl_post-office_s1.jpg'),
        imageCaption: 'Gửi đơn 脱退一時金 qua bưu điện từ Việt Nam đến Japan Pension Service — dùng dịch vụ có số theo dõi',
        documents: [
          'Mẫu đơn 脱退一時金裁定請求書 様式第I号 — tải từ: https://www.nenkin.go.jp/shinsei/jukyu/sonota-kyufu/20150406.html',
          'Bản sao hộ chiếu (trang ảnh và trang con dấu nhập cảnh gần nhất)',
          'Bản sao thẻ cư trú cũ (đã nộp tại sân bay — dùng ảnh đã chụp trước khi nộp)',
          'Thông tin tài khoản ngân hàng để nhận tiền',
        ],
        tip: 'Số tháng đóng pension càng nhiều thì số tiền hoàn càng lớn nhưng có trần tính. Kiểm tra bảng tính Japan Pension Service theo tháng cuối cùng đóng bảo hiểm trước khi nộp.',
      },
    ],
  };

export default returnToVietnamChecklist;
