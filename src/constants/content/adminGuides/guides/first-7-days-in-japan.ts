import type { AdminGuide } from '../../../../types/content';

const first7DaysInJapan: AdminGuide = {
    id: 'first-7-days-in-japan',
    category: 'daily-law',
    lastVerified: '2026-04-28',
    priority: 'high',
    title: '7 ngày đầu mới sang Nhật',
    titleJp: '来日後7日間のやること',
    icon: 'rocket',
    color: '#1F8A70',
    description: 'Checklist thực tế cho người vừa sang Nhật: việc nào cần làm ngay, việc nào làm trong vài ngày đầu, và lỗi nào dễ khiến thủ tục sau này rối hơn.',
    heroImage: require('../../../../../assets/content/daily-life/ag_first-7-days_hero.jpg'),
    heroImageCaption: 'Tuần đầu tại Nhật — đăng ký cư trú, mở tài khoản, lấy SIM và sắp xếp nơi ở',
    whoIsThisFor: [
      'Người vừa nhập cảnh Nhật để đi làm, đi học hoặc sống cùng gia đình.',
      'Người mới chuyển từ sân bay, ký túc xá hoặc nhà tạm sang nơi ở ổn định đầu tiên.',
      'Người thấy quá nhiều việc cùng lúc và muốn biết nên ưu tiên thứ tự nào trước.',
    ],
    whenToDo: [
      'Dùng ngay từ ngày đầu đến khoảng 7 ngày đầu sau khi sang Nhật.',
      'Một số việc như đăng ký địa chỉ có mốc pháp lý 14 ngày, nhưng không nên đợi đến sát hạn.',
      'Nếu bạn chưa có nơi ở ổn định, vẫn nên đọc trước để biết việc nào phải làm ngay khi chốt chỗ ở.',
    ],
    whereToDo: [
      'Tại nhà/điện thoại của bạn để kiểm tra giấy tờ, chụp ảnh, lưu thông tin quan trọng.',
      'Municipal office nơi bạn ở để làm địa chỉ, bảo hiểm, My Number và các giấy tờ cư trú.',
      'Ngân hàng, nhà mạng, công ty/nhà trường và các dịch vụ thiết yếu liên quan.',
    ],
    estimatedTime: 'Nếu chuẩn bị có thứ tự, phần lớn việc nền có thể hoàn tất trong 3 đến 7 ngày đầu. Một số dịch vụ như internet, ngân hàng hoặc My Number card có thể mất lâu hơn.',
    fees: [
      'Đăng ký địa chỉ thường không mất phí.',
      'Có thể phát sinh phí sim, tiền cọc nhà ở, phí mở dịch vụ, tiền đi lại và các bản giấy xác nhận nếu bạn xin thêm.',
      'Không nên mua quá nhiều thứ trong 1-2 ngày đầu; nên ưu tiên đồ thiết yếu và dịch vụ bắt buộc trước.',
    ],
    documentsChecklist: [
      { label: 'Hộ chiếu', required: true },
      { label: 'Thẻ cư trú', required: true },
      { label: 'Địa chỉ nơi ở hiện tại', required: true, note: 'Nên có bản tiếng Nhật để đọc đúng khi làm thủ tục.' },
      { label: 'Số điện thoại đang dùng', required: false, note: 'Nếu chưa có sim Nhật, ít nhất nên có cách liên lạc tạm thời.' },
      { label: 'Giấy tờ từ công ty, trường hoặc người bảo lãnh', required: false, note: 'Rất hữu ích khi mở tài khoản, làm sim hoặc giải thích mục đích cư trú.' },
      { label: 'Ảnh chụp toàn bộ giấy tờ quan trọng', required: false, note: 'Lưu trên điện thoại và cloud để tránh lúc cần lại không có.' },
    ],
    commonMistakes: [
      'Đến ngân hàng mở tài khoản mà chưa kiểm tra họ yêu cầu chữ ký, 印鑑 hay giấy tờ bổ sung.',
      'Quá tập trung mua đồ sinh hoạt mà quên việc pháp lý như địa chỉ, bảo hiểm, giấy tờ của công ty/trường.',
      'Không chụp hiện trạng nhà ngay ngày đầu nên sau này tranh chấp lúc trả nhà rất yếu.',
      'Mua sim, mở tài khoản hoặc ký dịch vụ khi chưa hiểu phí, thời hạn hủy và nghĩa vụ thanh toán.',
      'Không lưu sẵn địa chỉ tiếng Nhật của nhà ở, công ty, trường nên lúc làm thủ tục đọc sai hoặc viết sai.',
      'Nghĩ rằng “để vài tuần nữa làm cũng được” với việc đổi địa chỉ hoặc cập nhật giấy tờ.',
    ],
    faq: [
      {
        question: 'Việc nào bắt buộc nhất trong những ngày đầu?',
        answer: 'Thực tế nên ưu tiên: xác nhận chỗ ở ổn định, chụp/lưu giấy tờ, làm địa chỉ tại municipal office, kiểm tra bảo hiểm, sắp xếp liên lạc và tài chính cơ bản.',
      },
      {
        question: 'Nếu chưa mở được tài khoản ngân hàng ngay thì có sao không?',
        answer: 'Không phải lúc nào cũng mở được ngay trong 1-2 ngày đầu. Quan trọng là biết công ty/trường có yêu cầu thời điểm nào và chuẩn bị đủ giấy tờ trước khi đi mở.',
      },
      {
        question: 'Có nên làm tất cả trong một ngày không?',
        answer: 'Không nên. 7 ngày đầu nên chia theo mức độ ưu tiên: pháp lý và liên lạc trước, mua sắm và tối ưu sinh hoạt sau.',
      },
      {
        question: 'Nếu ở ký túc xá tạm thời thì có áp dụng guide này không?',
        answer: 'Có, nhưng cần phân biệt chỗ ở tạm và địa chỉ cư trú thực tế. Nếu chưa xác định nơi ở chính thức, hãy hỏi công ty/trường cách khai báo phù hợp.',
      },
    ],
    counterPhrases: [
      {
        jp: '今日来ました。住居地の届出をしたいです。',
        romaji: 'Kyou kimashita. Juukyochi no todokede o shitai desu.',
        vn: 'Tôi mới đến hôm nay. Tôi muốn đăng ký địa chỉ cư trú.',
        note: 'Câu mở đầu khi tới quầy 市役所/区役所.',
      },
      {
        jp: '必要な書類を教えていただけますか。',
        romaji: 'Hitsuyou na shorui o oshiete itadakemasu ka.',
        vn: 'Anh/chị cho tôi biết giấy tờ cần thiết được không?',
      },
      {
        jp: '今この書類しかないんですが、後で持って来てもいいですか。',
        romaji: 'Ima kono shorui shika nai n desu ga, ato de motte kite mo ii desu ka.',
        vn: 'Hiện tôi chỉ có giấy này, có thể bổ sung sau được không?',
        note: 'Dùng khi thiếu giấy và muốn tránh phải về tay không.',
      },
      {
        jp: '足りない書類を紙に書いていただけますか。',
        romaji: 'Tarinai shorui o kami ni kaite itadakemasu ka.',
        vn: 'Anh/chị có thể ghi giúp danh sách giấy còn thiếu vào giấy không?',
      },
      {
        jp: 'いつまでにすればいいですか。',
        romaji: 'Itsu made ni sureba ii desu ka.',
        vn: 'Tôi phải làm xong trước bao giờ?',
      },
      {
        jp: 'ここで全部できますか、それとも他の窓口に行きますか。',
        romaji: 'Koko de zenbu dekimasu ka, soretomo hoka no madoguchi ni ikimasu ka.',
        vn: 'Có thể làm hết ở đây hay phải sang quầy khác?',
      },
    ],
    officialLinks: [
      { label: '住居地の届出 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html' },
      { label: '国民健康保険 — 厚生労働省', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/kokuminkenkou/index.html' },
      { label: 'マイナンバーカード総合サイト', url: 'https://www.kojinbango-card.go.jp/' },
    ],
    steps: [
      {
        step: 1,
        title: 'Ngày 1: khóa giấy tờ và thông tin quan trọng',
        description: 'Ngày đầu không cần làm quá nhiều thủ tục, nhưng phải kiểm soát được giấy tờ và nơi ở của mình.',
        documents: [
          'Hộ chiếu',
          'Thẻ cư trú',
          'Địa chỉ nơi ở',
          'Thông tin công ty/trường/người đón',
        ],
        tip: 'Chụp ảnh hộ chiếu, thẻ cư trú, hợp đồng nhà ở, hướng dẫn công ty/trường và lưu vào một thư mục riêng trên điện thoại.',
      },
      {
        step: 2,
        title: 'Ngày 1-2: kiểm tra chỗ ở và sinh hoạt tối thiểu',
        description: 'Ngay khi vào chỗ ở, hãy kiểm tra điện, nước, gas, khóa cửa, internet và chụp hiện trạng nhà. Đây là việc nhỏ nhưng ảnh hưởng trực tiếp đến tiền và an toàn của bạn.',
        documents: [
          'Hợp đồng nhà hoặc giấy bàn giao',
          'Ảnh hiện trạng nhà',
        ],
        tip: 'Nếu có hỏng hóc, báo bằng tin nhắn hoặc email càng sớm càng tốt để có dấu vết.',
      },
      {
        step: 3,
        title: 'Ngày 2-4: làm địa chỉ và kiểm tra bảo hiểm',
        description: 'Nếu đã xác định nơi ở ổn định, nên đi municipal office sớm để làm địa chỉ. Nhiều việc khác sau đó sẽ phụ thuộc vào thông tin địa chỉ này.',
        documents: [
          'Thẻ cư trú',
          'Hộ chiếu',
          'Địa chỉ mới',
          'My Number Card nếu đã có',
        ],
        tip: 'Đừng để sát 14 ngày mới đi. Nếu phát sinh thiếu giấy tờ, bạn vẫn còn thời gian xử lý.',
        image: require('../../../../../assets/content/daily-life/ag_first-7-days_s3.jpg'),
        imageCaption: '区役所 — văn phòng phường, đăng ký địa chỉ cư trú trong 14 ngày đầu sau khi nhập cảnh',
      },
      {
        step: 4,
        title: 'Ngày 3-5: sắp xếp liên lạc và tiền bạc cơ bản',
        description: 'Sim điện thoại, tài khoản ngân hàng và cách nhận lương/nhận thư là nền vận hành hàng ngày. Không cần ép phải xong trong 24 giờ, nhưng nên bắt đầu trong tuần đầu.\n\nTrước khi đến ngân hàng: kiểm tra trang chính thức hoặc gọi chi nhánh để biết họ yêu cầu chữ ký, 印鑑 hay giấy tờ bổ sung. Nếu ngân hàng/chủ nhà yêu cầu dấu, hãy chuẩn bị con dấu phù hợp; nếu cần 印鑑登録 thì phải làm tại municipal office.',
        documents: [
          'Thẻ cư trú',
          'Địa chỉ tại Nhật',
          'Thông tin công ty/trường',
          'Số điện thoại hoặc email liên hệ',
          'Con dấu cá nhân (印鑑) hoặc chữ ký mẫu nếu ngân hàng yêu cầu',
        ],
        tip: 'Thứ tự nên làm: chốt giấy tờ và địa chỉ trước, sau đó mở sim/ngân hàng theo yêu cầu của từng nơi. Không mua dấu đắt tiền trước khi biết bên xử lý cần loại nào.',
        image: require('../../../../../assets/content/daily-life/ag_hanko-inkan_hero.jpg'),
        imageCaption: '印鑑 — chỉ chuẩn bị khi ngân hàng, chủ nhà hoặc thủ tục cụ thể yêu cầu dấu',
      },
      {
        step: 5,
        title: 'Ngày 5-7: dựng nhịp sống ổn định',
        description: 'Khi phần gấp đã xong, hãy chốt các việc giúp bạn sống ổn định hơn: lịch rác, đường đi làm/đi học, chỗ mua đồ, bệnh viện gần nhà và người cần gọi khi khẩn cấp.',
        documents: [
          'Lịch rác của quận',
          'Địa chỉ công ty/trường',
          'Thông tin liên hệ khẩn',
        ],
        tip: 'Tuần đầu không cần tối ưu mọi thứ. Mục tiêu là sống ổn định, không bỏ sót việc pháp lý và không tạo lỗi khó sửa về sau.',
      },
    ],
  };

export default first7DaysInJapan;
