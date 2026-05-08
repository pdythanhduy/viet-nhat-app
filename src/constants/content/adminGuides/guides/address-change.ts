import type { AdminGuide } from '../../../../types/content';

const addressChange: AdminGuide = {
    id: 'address-change',
    category: 'immigration',
    lastVerified: '2026-05-06',
    priority: 'high',
    title: 'Đổi địa chỉ / chuyển nhà',
    titleJp: '住居地の届出',
    icon: 'home',
    color: '#16A085',
    description: 'Khi chuyển đến địa chỉ mới ở Nhật, người trung/dài hạn cần làm thủ tục địa chỉ tại municipal office trong thời hạn quy định.',
    legalScope: {
      jurisdiction: 'municipality',
      jurisdictionNote: 'Nghĩa vụ khai báo địa chỉ nằm trong hệ thống cư trú toàn quốc, nhưng nơi tiếp nhận là municipal office nơi cư trú mới.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-12-01',
      riskLevel: 'high',
      whenToAskExpert: [
        'Bạn đã quá hạn 14 ngày hoặc không có giấy tờ chứng minh ngày chuyển đến.',
        'Địa chỉ thực tế, hợp đồng thuê và địa chỉ trên thẻ cư trú không khớp.',
        'Bạn vừa mới nhập cảnh, chuyển tỉnh hoặc chuyển cùng gia đình và không rõ cần 転出届 hay 転入届.',
      ],
    },
    quickAction: {
      deadline: 'Làm trong vòng 14 ngày kể từ ngày chuyển đến/định nơi cư trú mới.',
      office: 'Municipal office nơi có địa chỉ mới; nơi cũ nếu cần làm 転出届 trước khi chuyển.',
      doNow: [
        'Mang thẻ cư trú ra municipal office nơi ở mới.',
        'Cập nhật My Number Card nếu đã có.',
        'Sau khi đổi địa chỉ, cập nhật ngân hàng, điện thoại, bảo hiểm, công ty/trường và bưu điện.',
      ],
      bring: ['Thẻ cư trú', 'My Number Card nếu có', '転出証明書 nếu chuyển từ địa phương khác', 'Hộ chiếu nếu mới nhập cảnh hoặc được yêu cầu'],
      ifLate: 'Đi làm càng sớm càng tốt và giải thích trung thực tại quầy; giữ lại bằng chứng đã hoàn tất thủ tục.',
      officialSourceLabels: ['住居地の届出 — 出入国在留管理庁'],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_address-change_hero.jpg'),
    heroImageCaption: 'Thủ tục đổi địa chỉ tại 役所 khi chuyển nhà',
    whoIsThisFor: [
      'Người có thẻ cư trú trung/dài hạn vừa chuyển đến địa chỉ mới ở Nhật.',
      'Người chuyển nhà giữa các thành phố/quận/phường khác nhau.',
      'Người mới nhập cảnh và đã quyết định nơi ở tại Nhật.',
    ],
    whenToDo: [
      'Trong vòng 14 ngày kể từ ngày quyết định nơi ở mới.',
      'Nếu chuyển sang thành phố khác, thường cần làm thủ tục chuyển ra ở nơi cũ và chuyển vào ở nơi mới.',
      'Sau khi đổi địa chỉ, nên cập nhật ngay ngân hàng, điện thoại, bảo hiểm, trường/công ty và bưu điện.',
    ],
    whereToDo: [
      '市役所/区役所/町村役場 tại địa chỉ mới.',
      'Municipal office nơi ở cũ nếu cần làm 転出届 trước khi chuyển đi.',
    ],
    estimatedTime: 'Thường xử lý trong ngày tại municipal office, nhưng tháng 3-4 hoặc đầu tuần có thể phải chờ lâu.',
    fees: [
      'Khai báo địa chỉ thường không mất phí.',
      'Nếu xin thêm bản 住民票 hoặc giấy xác nhận khác, phí phụ thuộc từng địa phương.',
    ],
    documentsChecklist: [
      { label: 'Thẻ cư trú (在留カード)', required: true, note: 'Dùng để cập nhật địa chỉ ở mặt sau thẻ.' },
      { label: 'My Number Card', required: false, note: 'Mang theo nếu đã có để cập nhật địa chỉ và chứng thư điện tử nếu cần.' },
      { label: '転出証明書', required: false, note: 'Có thể cần khi chuyển từ thành phố/quận/phường khác.' },
      { label: 'Hộ chiếu', required: false, note: 'Mang theo nếu mới nhập cảnh hoặc municipal office yêu cầu xác minh thêm.' },
    ],
    commonMistakes: [
      'Quên hạn 14 ngày vì nghĩ chỉ cần đổi địa chỉ với nhà mạng/ngân hàng.',
      'Không cập nhật My Number Card sau khi chuyển nhà.',
      'Nhầm thủ tục địa chỉ ở municipal office với thủ tục tại cục xuất nhập cảnh.',
      'Không chuyển tiếp bưu điện nên lỡ thư quan trọng từ ISA, trường, công ty hoặc bảo hiểm.',
    ],
    faq: [
      {
        question: 'Chỉ chuyển trong cùng thành phố có cần làm không?',
        answer: 'Có. Thủ tục có thể là 転居届 thay vì 転入届, nhưng vẫn cần cập nhật địa chỉ tại municipal office.',
      },
      {
        question: 'Có cần lên cục xuất nhập cảnh để đổi địa chỉ không?',
        answer: 'Thông thường địa chỉ cư trú được khai báo tại municipal office. Các thay đổi khác như họ tên, quốc tịch/khu vực là thủ tục riêng với ISA.',
      },
      {
        question: 'Nếu làm muộn quá 14 ngày thì sao?',
        answer: 'Nên đi làm càng sớm càng tốt và giải thích trung thực. Việc khai báo muộn có thể bất lợi trong các thủ tục lưu trú sau này.',
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
        jp: '住所変更後、忘れないように他に何の手続きが必要ですか。',
        romaji: 'Juusho henkou go, wasurenai you ni hoka ni nani no tetsuzuki ga hitsuyou desu ka.',
        vn: 'Sau khi đổi địa chỉ, còn thủ tục nào khác cần làm để khỏi quên?',
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
        title: 'Làm trong vòng 14 ngày',
        description: 'Theo ISA, sau khi xác định nơi ở mới, bạn cần khai báo nơi cư trú trong vòng 14 ngày.',
        documents: [
          'Thẻ cư trú (在留カード)',
          'Giấy tờ chuyển vào/chuyển ra nếu municipal office yêu cầu',
        ],
        tip: 'Nếu làm thủ tục tại municipal office với thẻ cư trú, thông tin địa chỉ thường được cập nhật trực tiếp trên thẻ.',
      },
      {
        step: 2,
        title: 'Điền 住民異動届 tại municipal office',
        description: '**Các trường trên 住民異動届:**\n\n| Trường | Ghi như thế nào |\n|---|---|\n| 異動事由 | 転居 (cùng thành phố) / 転入 (từ nơi khác) |\n| 転入（居）年月日 | Ngày thực sự chuyển đến |\n| 新住所 | Địa chỉ mới khớp với hợp đồng thuê |\n| 氏名 | Tên theo 在留カード |\n| 生年月日 | Ngày sinh |\n| 在留資格 | Copy chính xác từ 在留カード |\n\nSau khi nộp: nhân viên đóng dấu địa chỉ mới lên mặt sau **在留カード** ngay tại quầy.',
        documents: [
          'Thẻ cư trú',
          'My Number Card nếu có',
          '転出証明書 nếu chuyển từ thành phố khác',
        ],
        tip: 'Cập nhật địa chỉ cho My Number Card, bảo hiểm, ngân hàng, điện thoại và bưu điện sau khi chuyển nhà.',
        image: require('../../../../../assets/content/daily-life/ag_address-change_s2.jpg'),
        imageCaption: 'Điền 住民異動届 tại 役所 và cập nhật địa chỉ mới lên 在留カード',
      },
      {
        step: 3,
        title: 'Kiểm tra mặt sau thẻ cư trú',
        description: 'Sau khi cập nhật, địa chỉ mới thường được ghi ở mặt sau thẻ cư trú.',
        documents: [],
        tip: 'Nếu địa chỉ trên thẻ sai, yêu cầu chỉnh ngay tại quầy.',
      },
    ],
  };

export default addressChange;
