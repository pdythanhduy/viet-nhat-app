import type { AdminGuide } from '../../../../types/content';

const movingInNotification: AdminGuide = {
    id: 'moving-in-notification',
    category: 'daily-law',
    lastVerified: '2026-05-06',
    priority: 'high',
    title: 'Đăng ký cư trú khi mới chuyển đến',
    titleJp: '転入届・住民登録',
    icon: 'home',
    color: '#27AE60',
    description:
      'Thủ tục đăng ký địa chỉ tại municipal office sau khi bạn chuyển đến nơi ở mới. Đây là một trong những việc nền tảng nhất để mở tài khoản, bảo hiểm, My Number và nhiều thủ tục khác.',
    legalScope: {
      jurisdiction: 'municipality',
      jurisdictionNote: '転入届/転居届 do municipal office xử lý theo hệ thống 住民基本台帳; với người trung/dài hạn, mang thẻ cư trú đến municipal office cũng được coi là đã làm 届出 địa chỉ theo ISA.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-12-01',
      riskLevel: 'high',
      whenToAskExpert: [
        'Bạn đã quá 14 ngày từ ngày chuyển đến hoặc chưa có địa chỉ cố định.',
        'Bạn mới nhập cảnh nhưng thẻ cư trú chưa ghi địa chỉ, hoặc hộ chiếu có ghi 在留カード後日交付.',
        'Bạn chuyển cùng gia đình, có người chưa đủ 16 tuổi, người không thể tự đi làm thủ tục hoặc cần ủy quyền.',
      ],
    },
    quickAction: {
      deadline: 'Làm trong vòng 14 ngày từ ngày xác định/chuyển đến nơi cư trú mới.',
      office: 'Municipal office nơi có địa chỉ mới; nếu chuyển từ địa phương khác trong Nhật, hỏi nơi cũ về 転出届/転出証明書 trước.',
      doNow: [
        'Mang thẻ cư trú ra municipal office nơi ở mới.',
        'Nếu chuyển từ địa phương khác, chuẩn bị 転出証明書 hoặc thủ tục chuyển đi online nếu đủ điều kiện.',
        'Hỏi luôn về bảo hiểm y tế, My Number Card, 住民票 và thủ tục trường học nếu có con.',
      ],
      bring: ['Thẻ cư trú', 'Hộ chiếu nếu mới nhập cảnh hoặc được yêu cầu', '転出証明書 nếu chuyển từ địa phương khác', 'My Number Card nếu đã có', 'Thông tin địa chỉ mới'],
      ifLate: 'Đi làm càng sớm càng tốt và giải thích trung thực tại municipal office; giữ bằng chứng đã cập nhật địa chỉ để dùng cho hồ sơ cư trú sau này.',
      officialSourceLabels: [
        'Resident registration system — Ministry of Internal Affairs and Communications',
        'Moving procedures on Myna Portal',
        '新規上陸後の住居地の届出（中長期在留者）— 出入国在留管理庁',
        '住居地の変更届出（中長期在留者）— 出入国在留管理庁',
      ],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_moving-in_hero.jpg'),
    heroImageCaption: 'Nộp 転入届 tại 役所 sau khi chuyển đến nơi ở mới',
    whoIsThisFor: [
      'Người mới sang Nhật có nơi ở cố định và cần đăng ký địa chỉ.',
      'Người chuyển địa chỉ sang thành phố hoặc quận khác trong Nhật.',
      'Người vừa dọn nhà và cần cập nhật thông tin cư trú đúng hạn.',
    ],
    whenToDo: [
      'Thường phải làm trong vòng 14 ngày kể từ ngày bắt đầu ở tại địa chỉ mới.',
      'Nên đi làm sớm vì nhiều thủ tục khác sẽ bị chậm nếu chưa có địa chỉ cư trú hợp lệ.',
    ],
    whereToDo: ['City hall, ward office hoặc municipal office nơi bạn đang ở.'],
    estimatedTime:
      'Nếu giấy tờ đủ và không quá đông, nhiều nơi xử lý trong ngày. Nhưng nên chừa thời gian vì có thể phải làm thêm bảo hiểm hoặc các thủ tục liên quan.',
    fees: ['Thông thường việc nộp chuyển đến hoặc đăng ký cư trú không có lệ phí riêng.'],
    documentsChecklist: [
      { label: 'Thẻ cư trú', required: true },
      { label: 'Hộ chiếu', required: false },
      { label: 'Giấy chuyển đi (転出証明書) nếu chuyển từ địa phương khác trong Nhật', required: false },
      { label: 'Thông tin địa chỉ nơi ở mới', required: true },
      { label: 'My Number nếu đã có', required: false },
    ],
    commonMistakes: [
      'Đợi quá lâu mới đi đăng ký cư trú, kéo theo chậm mở tài khoản ngân hàng hoặc làm bảo hiểm.',
      'Không hỏi luôn tại quầy về bảo hiểm, My Number và những việc nên xử lý cùng ngày.',
      'Chuyển nhà nhưng chỉ báo chủ nhà, không cập nhật với municipal office.',
    ],
    faq: [
      {
        question: 'Tôi chỉ mới thuê nhà nhưng chưa dọn hẳn vào thì có đi đăng ký ngay không?',
        answer:
          'Mốc quan trọng là khi bạn thực sự bắt đầu cư trú tại địa chỉ mới. Nên chuẩn bị để đi sớm ngay sau khi chuyển đến.',
      },
      {
        question: 'Chuyển từ tỉnh khác sang có gì khác?',
        answer:
          'Thường bạn cần giấy chuyển đi từ nơi cũ rồi mới làm thủ tục chuyển đến ở nơi mới.',
      },
    ],
    officialLinks: [
      { label: 'Resident registration system — Ministry of Internal Affairs and Communications', url: 'https://www.soumu.go.jp/main_sosiki/jichi_gyousei/c-gyousei/daityo/' },
      { label: 'Moving procedures on Myna Portal', url: 'https://myna.go.jp/html/moving_oss.html' },
      { label: '新規上陸後の住居地の届出（中長期在留者）— 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00021.html' },
      { label: '住居地の変更届出（中長期在留者）— 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Chuẩn bị giấy tờ trước khi ra municipal office',
        description:
          'Phải biết rõ mình là người mới sang Nhật hay đang chuyển từ địa phương khác trong Nhật để mang đúng giấy tờ.',
        documents: [
          'Thẻ cư trú',
          'Địa chỉ mới',
          'Giấy chuyển đi nếu có',
          'Thông tin của người đi cùng nếu đăng ký cho gia đình',
        ],
        tip: 'Nếu vừa mới sang Nhật, nhiều nơi sẽ làm cùng lúc các việc liên quan bảo hiểm và My Number.',
      },
      {
        step: 2,
        title: 'Điền 転入届 tại quầy',
        description: '**Các trường trên 転入届** (hoặc 転居届 nếu chuyển trong cùng thành phố):\n\n| Trường | Ghi như thế nào |\n|---|---|\n| 氏名 / フリガナ | Tên theo 在留カード; フリガナ viết KATAKANA |\n| 生年月日 | Ngày/tháng/năm sinh (西暦 — dương lịch) |\n| 転入年月日 | Ngày thực sự chuyển đến nhà mới |\n| 新住所 | Địa chỉ mới khớp với hợp đồng thuê |\n| 世帯主 | Chủ hộ — thường chính bạn nếu ở một mình |\n| 在留資格 | Copy chính xác từ 在留カード |\n\nSau khi nộp: nhân viên đóng dấu địa chỉ mới lên mặt sau **在留カード** ngay tại quầy.',
        documents: ['Mẫu đơn tại quầy', 'Thẻ cư trú (在留カード)', 'Hộ chiếu nếu được yêu cầu'],
        tip: 'Sai địa chỉ hoặc sai cách viết tên sẽ kéo theo lỗi ở ngân hàng, điện thoại và hồ sơ khác.',
        image: require('../../../../../assets/content/daily-life/ag_movingin_s2.jpg'),
        imageCaption: 'Điền 転入届 tại quầy 役所 — nhân viên cập nhật địa chỉ mới lên 在留カード',
      },
      {
        step: 3,
        title: 'Hỏi luôn các việc nên xử lý cùng ngày',
        description:
          'Sau khi có đăng ký cư trú, nhiều người sẽ làm tiếp bảo hiểm y tế, hỏi về My Number hoặc giấy chứng nhận cư trú.',
        documents: ['Thông tin về bảo hiểm, My Number hoặc giấy tờ cần xin thêm'],
        tip: 'Đừng bỏ lỡ cơ hội hỏi tại quầy xem còn thủ tục nào nên làm ngay hôm đó.',
      },
      {
        step: 4,
        title: 'Cập nhật địa chỉ ở các nơi liên quan',
        description:
          'Sau khi municipal office cập nhật xong, bạn vẫn phải tự cập nhật địa chỉ ở ngân hàng, điện thoại, nơi làm việc hoặc trường và các hợp đồng khác.',
        documents: ['Danh sách nơi cần đổi địa chỉ'],
        tip: 'Nếu quên cập nhật, thư quan trọng có thể bị gửi nhầm chỗ.',
        image: require('../../../../../assets/content/daily-life/ag_movingin_s4.jpg'),
        imageCaption: 'Cập nhật địa chỉ mới tại ngân hàng, bảo hiểm, điện thoại và các dịch vụ liên quan',
      },
    ],
  };

export default movingInNotification;
