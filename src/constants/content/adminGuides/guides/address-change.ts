import type { AdminGuide } from '../../../../types/content';

const addressChange: AdminGuide = {
    id: 'address-change',
    category: 'immigration',
    lastVerified: '2026-08-21',
    priority: 'high',
    title: 'Đổi địa chỉ / chuyển nhà',
    titleJp: '住居地の届出',
    icon: 'home',
    color: '#16A085',
    description: 'Khi đổi nhà ở Nhật, bạn phải báo địa chỉ mới với 市役所/区役所. Việc này quyết định cả thẻ cư trú, bảo hiểm, ngân hàng và bưu điện có gửi đúng địa chỉ hay không.',
    legalScope: {
      jurisdiction: 'municipality',
      jurisdictionNote: 'Nghĩa vụ khai báo địa chỉ nằm trong hệ thống cư trú toàn quốc, nhưng nơi tiếp nhận là 市役所/区役所 nơi cư trú mới.',
      sourceVerifiedAt: '2026-08-21',
      nextReviewAt: '2026-12-01',
      riskLevel: 'high',
      whenToAskExpert: [
        'Bạn đã quá hạn 14 ngày hoặc không có giấy tờ chứng minh ngày chuyển đến.',
        'Địa chỉ thực tế, hợp đồng thuê và địa chỉ trên thẻ cư trú không khớp.',
        'Bạn vừa mới nhập cảnh, chuyển tỉnh hoặc chuyển cùng gia đình và không rõ cần 転出届 hay 転入届.',
      ],
    },
    quickAction: {
      deadline: 'Trong vòng 14 ngày từ ngày dọn vào nhà mới.',
      office: '市役所/区役所 ở nơi mới. Cộng thêm 市役所 cũ nếu chuyển sang thành phố/tỉnh khác.',
      doNow: [
        'Mang 在留カード ra 市役所 nơi ở mới.',
        'Yêu cầu cập nhật địa chỉ lên mặt sau 在留カード ngay tại quầy.',
        'Nếu có My Number Card, đưa luôn để cập nhật cùng lúc.',
        'Sau khi xong: tự đổi địa chỉ ở ngân hàng, điện thoại, công ty, bưu điện.',
      ],
      bring: ['在留カード (bắt buộc)', '転出証明書 (nếu chuyển từ thành phố khác)', 'My Number Card (nếu đã có)', 'Hợp đồng thuê nhà (để đối chiếu địa chỉ)', 'Hộ chiếu (nếu được yêu cầu)'],
      ifLate: 'Đến 市役所 ngay khi nhớ ra. Nói thật ngày bạn dọn vào — nhân viên sẽ xử lý. Giữ giấy biên nhận để dùng cho thủ tục visa sau.',
      officialSourceLabels: ['住居地の届出 — 出入国在留管理庁'],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_address-change_hero.jpg'),
    heroImageCaption: 'Thủ tục đổi địa chỉ tại 役所 khi chuyển nhà',
    whoIsThisFor: [
      'Bạn đang có 在留カード (trung/dài hạn) và vừa đổi địa chỉ.',
      'Bạn chuyển nhà trong cùng thành phố — vẫn phải làm.',
      'Bạn chuyển nhà sang thành phố/tỉnh khác — phải làm 2 đầu (nơi cũ + nơi mới).',
      'Không cần làm nếu: chỉ đi du lịch ngắn ngày, hoặc đang ở khách sạn tạm thời.',
    ],
    whenToDo: [
      'Trong vòng 14 ngày kể từ ngày thực sự dọn vào nhà mới.',
      'Đi sớm — không có địa chỉ mới trên 在留カード thì khó làm các thủ tục khác.',
      'Sau khi 市役所 xong, tự đổi địa chỉ ở: ngân hàng, điện thoại, bảo hiểm, công ty/trường, bưu điện.',
    ],
    whereToDo: [
      '市役所/区役所/町村役場 ở địa chỉ mới (luôn cần).',
      '市役所 cũ trước khi đi (chỉ khi chuyển sang thành phố/tỉnh khác — để xin 転出証明書).',
      'Không làm ở 入国管理局 — đây là thủ tục địa phương, không phải thủ tục visa.',
    ],
    estimatedTime: 'Thường xử lý trong ngày tại 市役所/区役所, nhưng tháng 3-4 hoặc đầu tuần có thể phải chờ lâu.',
    fees: [
      'Khai báo địa chỉ thường không mất phí.',
      'Nếu xin thêm bản 住民票 hoặc giấy xác nhận khác, phí phụ thuộc từng địa phương.',
    ],
    documentsChecklist: [
      { label: 'Thẻ cư trú (在留カード)', required: true, note: 'Dùng để cập nhật địa chỉ ở mặt sau thẻ.' },
      { label: 'My Number Card', required: false, note: 'Mang theo nếu đã có để cập nhật địa chỉ và chứng thư điện tử nếu cần.' },
      { label: '転出証明書', required: false, note: 'Có thể cần khi chuyển từ thành phố/quận/phường khác.' },
      { label: 'Hộ chiếu', required: false, note: 'Mang theo nếu mới nhập cảnh hoặc 市役所/区役所 yêu cầu xác minh thêm.' },
    ],
    commonMistakes: [
      'Tưởng đổi địa chỉ với nhà mạng/ngân hàng là xong → quên 市役所.',
      'Có My Number Card nhưng không mang theo → phải đi lại lần 2.',
      'Đi nhầm 入国管理局 thay vì 市役所/区役所.',
      'Quên xin 転送届 ở bưu điện → thư quan trọng từ ISA, trường, công ty bị gửi nhầm chỗ.',
      'Chuyển trong cùng thành phố mà không đi 市役所, vì nghĩ "không phải đổi 市役所 mới".',
    ],
    faq: [
      {
        question: 'Chuyển trong cùng thành phố có cần đi 市役所 không?',
        answer: 'Có. Tên thủ tục đổi thành 転居届 thay vì 転入届, nhưng vẫn phải cập nhật. Bỏ qua sẽ làm sai dữ liệu cư trú và thư từ vẫn gửi về địa chỉ cũ.',
      },
      {
        question: 'Có cần lên 入国管理局 để đổi địa chỉ không?',
        answer: 'Không. Địa chỉ làm tại 市役所. 入国管理局 xử lý các thay đổi khác như họ tên, quốc tịch — không phải địa chỉ.',
      },
      {
        question: 'Nếu làm muộn quá 14 ngày thì sao?',
        answer: 'Đi ngay khi nhớ ra. Quá hạn không bị phạt tự động, nhưng giải thích trung thực với nhân viên. Lịch sử khai báo trễ có thể bất lợi cho thủ tục visa sau này.',
      },
    ],
    counterPhrases: [
      {
        jp: '住所変更の手続きをしたいです。',
        romaji: 'Juusho henkou no tetsuzuki o shitai desu.',
        vn: 'Tôi muốn làm thủ tục đổi địa chỉ.',
        note: 'Câu mở đầu khi tới quầy 市役所/区役所.',
      },
      {
        jp: '必要な書類を教えていただけますか。',
        romaji: 'Hitsuyou na shorui o oshiete itadakemasu ka.',
        vn: 'Anh/chị cho tôi biết giấy tờ cần thiết được không?',
      },
      {
        jp: '在留カードの住所も今日変更できますか。',
        romaji: 'Zairyuu kaado no juusho mo kyou henkou dekimasu ka.',
        vn: 'Hôm nay đổi luôn địa chỉ trên 在留カード được không?',
      },
      {
        jp: '他の市から引っ越してきました。転出証明書は必要ですか。',
        romaji: 'Hoka no shi kara hikkoshite kimashita. Tenshutsu shoumeisho wa hitsuyou desu ka.',
        vn: 'Tôi chuyển từ thành phố khác. Có cần 転出証明書 không?',
      },
      {
        jp: '住所変更の後、他に必要な手続きはありますか。',
        romaji: 'Juusho henkou no ato, hoka ni hitsuyou na tetsuzuki wa arimasu ka.',
        vn: 'Sau khi đổi địa chỉ, còn thủ tục nào khác cần làm không?',
      },
      {
        jp: '足りない書類を紙に書いていただけますか。',
        romaji: 'Tarinai shorui o kami ni kaite itadakemasu ka.',
        vn: 'Anh/chị ghi giúp danh sách giấy còn thiếu được không?',
      },
    ],
    officialLinks: [
      { label: '住居地の届出 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Đi trong 14 ngày từ ngày dọn vào',
        description: 'Đếm từ ngày bạn thực sự dọn vào, không phải ngày ký hợp đồng. ISA quy định 14 ngày — đi sớm hơn càng tốt.',
        documents: [
          'Thẻ cư trú (在留カード)',
          'Giấy tờ chuyển vào/chuyển ra nếu 市役所 yêu cầu',
        ],
        tip: 'Khi đến 市役所 với 在留カード, địa chỉ mới được ghi luôn lên mặt sau thẻ ngay tại quầy.',
      },
      {
        step: 2,
        title: 'Điền 住民異動届 tại 市役所',
        description: '**Các trường trên 住民異動届:**\n\n| Trường | Ghi như thế nào |\n|---|---|\n| 異動事由 | 転居 (cùng thành phố) / 転入 (từ nơi khác) |\n| 転入（居）年月日 | Ngày thực sự chuyển đến |\n| 新住所 | Địa chỉ mới khớp với hợp đồng thuê |\n| 氏名 | Tên theo 在留カード |\n| 生年月日 | Ngày sinh |\n| 在留資格 | Copy chính xác từ 在留カード |\n\nSau khi nộp: nhân viên đóng dấu địa chỉ mới lên mặt sau **在留カード** ngay tại quầy.',
        documents: [
          'Thẻ cư trú',
          'My Number Card nếu có',
          '転出証明書 nếu chuyển từ thành phố khác',
        ],
        tip: 'Sau khi 市役所 xong: tự đổi địa chỉ ở 5 nơi — ngân hàng, điện thoại, công ty/trường, bảo hiểm tư nhân (nếu có), bưu điện (xin 転送届 chuyển tiếp thư trong 1 năm).',
        image: require('../../../../../assets/content/daily-life/ag_address-change_s2.jpg'),
        imageCaption: 'Điền 住民異動届 tại 役所 và cập nhật địa chỉ mới lên 在留カード',
      },
      {
        step: 3,
        title: 'Kiểm tra mặt sau 在留カード trước khi rời quầy',
        description: 'Sau khi cập nhật, địa chỉ mới thường được ghi ở mặt sau 在留カード. Đọc kỹ từng ký tự — sai chữ Hán/số là phải đi lại.',
        documents: [],
        tip: 'Nếu địa chỉ trên thẻ sai, yêu cầu chỉnh ngay tại quầy. Đừng đi về rồi mới phát hiện.',
      },
    ],
  };

export default addressChange;
