import type { AdminGuide } from '../../../../types/content';

const pensionExemptionRefund: AdminGuide = {
    id: 'pension-exemption-refund',
    category: 'money',
    lastVerified: '2026-04-11',
    priority: 'high',
    title: '年金, miễn giảm và hoàn nenkin khi về nước',
    titleJp: '年金・免除・脱退一時金の基本',
    icon: 'card',
    color: '#2C3E50',
    description: 'Guide thực tế về 国民年金, 厚生年金, miễn giảm, 学生納付特例, chuyển việc và 脱退一時金 khi rời Nhật. Nội dung viết cho người nước ngoài đang sống hoặc sắp rời Nhật.',
    heroImage: require('../../../../../assets/content/daily-life/ag_pension_hero.jpg'),
    heroImageCaption: '年金 - kiểm tra lịch sử đóng, miễn giảm và 脱退一時金 khi rời Nhật',
    whoIsThisFor: [
      'Người Việt đang đi làm, đi học hoặc làm part-time tại Nhật và chưa hiểu mình đang đóng loại年金 nào.',
      'Người đang khó khăn tài chính và muốn xin miễn/猶予 thay vì để nợ年金.',
      'Người sắp về nước và đang phân vân có nên xin 脱退一時金 hay giữ thời gian đóng để tính lương hưu sau này.',
    ],
    whenToDo: [
      'Ngay khi nhận giấy đóng 国民年金 hoặc khi đổi việc để biết mình thuộc 国民年金 hay 厚生年金.',
      'Ngay khi gặp khó khăn tài chính, thất nghiệp hoặc là du học sinh không đủ khả năng đóng.',
      'Trước khi rời Nhật và trong vòng 2 năm sau khi xuất cảnh nếu muốn xin 脱退一時金.',
    ],
    whereToDo: [
      '市区町村 / ward office: một số thủ tục ban đầu liên quan tới 国民年金 và tình trạng cư trú.',
      '日本年金機構 /年金事務所: miễn giảm, 学生納付特例, xác nhận加入, 脱退一時金 và tra cứu年金 record.',
      'Công ty đang làm: nếu thuộc 厚生年金 thì việc tham gia/chấm dứt chủ yếu đi qua công ty.',
      'e-Tax/税務 và 納税管理人: nếu liên quan hoàn thuế khấu trừ từ 脱退一時金 của 厚生年金.',
    ],
    estimatedTime: 'Miễn giảm và 学生納付特例 nên làm càng sớm càng tốt vì có giới hạn thời gian truy ngược. 脱退一時金 chỉ xin sau khi đã rời Nhật và trong 2 năm kể từ ngày đủ điều kiện; xử lý thực tế mất thêm thời gian bưu chính, xác minh và chuyển khoản quốc tế.',
    fees: [
      '国民年金保険料 hiện hành theo 日本年金機構 cập nhật ngày 01/04/2026 là mức của năm tài khóa 2026; người thuộc第1号被保険者 phải tự đóng đúng hạn trừ khi được miễn/猶予.',
      'Miễn giảm, 納付猶予 hay 学生納付特例 không phải là “xóa mọi ảnh hưởng” như nhau; mỗi chế độ ảnh hưởng khác nhau tới số lương hưu sau này và khả năng追納.',
      'Nếu xin 脱退一時金 của 厚生年金, có thể có thuế bị khấu trừ; việc xin hoàn phần thuế này thường phải đi qua 納税管理人 và thủ tục thuế riêng.',
    ],
    documentsChecklist: [
      { label: '年金手帳/基礎年金番号通知書 hoặc số年金 cơ bản', required: true },
      { label: 'Giấy tờ cho biết bạn đang ở 国民年金 hay 厚生年金', required: true },
      { label: 'Nếu xin miễn/猶予: giấy tờ thu nhập, thất nghiệp hoặc hoàn cảnh kinh tế', required: false },
      { label: 'Nếu là du học sinh: giấy tờ trường học để xin 学生納付特例', required: false },
      { label: 'Nếu sắp về nước: ngày rời Nhật, địa chỉ ngoài Nhật và tài khoản nhận 脱退一時金', required: false },
      { label: 'Nếu muốn hoàn thuế của 脱退一時金 厚生年金: hồ sơ 納税管理人 và giấy tờ thuế liên quan', required: false },
    ],
    commonMistakes: [
      'Nghĩ 年金 chỉ là khoản bị trừ vô ích và bỏ mặc không xử lý khi khó khăn.',
      'Không phân biệt 国民年金 với 厚生年金, dẫn tới xin sai chỗ hoặc tưởng công ty đang lo hết.',
      'Du học sinh để nợ 国民年金 thay vì xin 学生納付特例.',
      'Người thất nghiệp không xin miễn/猶予 sớm, để mất khoảng thời gian có thể được bảo vệ.',
      'Xin 脱退一時金 mà không hiểu rằng sau khi nhận, record tương ứng sẽ mất và có thể làm mất cơ hội hưởng lương hưu sau này.',
      'Tưởng cứ về nước là tự động được hoàn全部 tiền年金 đã đóng.',
    ],
    faq: [
      {
        question: 'Ai bắt buộc phải vào 国民年金?',
        answer: '日本年金機構 nêu rõ người sống ở Nhật từ 20 đến 59 tuổi về nguyên tắc đều vào 国民年金. Nếu bạn đi làm thuộc hệ thống công ty và vào 厚生年金 thì phần cơ bản vẫn nằm trong hệ thống公的年金, nhưng cách tham gia và đóng sẽ đi qua công ty.',
      },
      {
        question: 'Tôi đi làm part-time có phải vào 厚生年金 không?',
        answer: 'Có thể có. 日本年金機構 cập nhật 31/03/2026 rằng từ 令和6年10月, người làm ngắn giờ ở doanh nghiệp từ 51 người trở lên có thể phải tham gia nếu đồng thời đáp ứng các điều kiện như tuần 20 giờ trở lên, lương tháng từ 8.8万円 trở lên, dự kiến làm trên 2 tháng và không phải sinh viên.',
      },
      {
        question: 'Không đủ tiền đóng thì để đó có sao không?',
        answer: 'Không nên. 日本年金機構 có các chế độ免除, 納付猶予, 学生納付特例 và産前産後免除. Nếu bạn đủ điều kiện mà không xin, việc để未納 có thể làm mất bảo vệ về障害年金 hoặc遺族年金 và làm xấu record đóng về sau.',
      },
      {
        question: 'Về nước rồi tôi có lấy lại hết tiền nenkin đã đóng không?',
        answer: 'Không. 脱退一時金 không phải là “trả lại toàn bộ số tiền đã đóng”. Đây là khoản lump-sum theo công thức và trần của hệ thống. 日本年金機構 cũng nhấn mạnh nếu bạn nhận 脱退一時金 thì record tương ứng bị xóa, nên phải cân nhắc trước khi xin.',
      },
      {
        question: 'Thời hạn xin 脱退一時金 là bao lâu?',
        answer: '日本年金機構 nêu rõ phải nộp trong vòng 2 năm kể từ ngày bạn đủ điều kiện sau khi rời Nhật. Nộp trước khi xuất cảnh là không đúng quy trình.',
      },
      {
        question: 'Du học sinh có phải đóng không và có cách nào giảm không?',
        answer: 'Du học sinh trong độ tuổi vẫn có thể thuộc 国民年金. Nếu học tại trường thuộc diện áp dụng, bạn nên xin 学生納付特例. Nhật Bản năm 2026 còn đẩy mạnh việc xin online qua liên kết マイナポータル và ねんきんネット cho người đủ điều kiện tiếp tục học.',
      },
    ],
    counterPhrases: [
      {
        jp: '国民年金の免除申請をしたいです。',
        romaji: 'Kokumin nenkin no menjo shinsei o shitai desu.',
        vn: 'Tôi muốn xin miễn 国民年金.',
        note: 'Câu mở đầu tại 年金事務所 hoặc 市役所.',
      },
      {
        jp: '脱退一時金の請求方法を教えていただけますか。',
        romaji: 'Dattai ichijikin no seikyuu houhou o oshiete itadakemasu ka.',
        vn: 'Anh/chị hướng dẫn giúp cách xin 脱退一時金 (tiền hoàn 1 lần)?',
        note: 'Dùng khi sắp về nước.',
      },
      {
        jp: '必要な書類を教えていただけますか。',
        romaji: 'Hitsuyou na shorui o oshiete itadakemasu ka.',
        vn: 'Anh/chị cho tôi biết giấy tờ cần thiết được không?',
      },
      {
        jp: '基礎年金番号がわかりません。教えていただけますか。',
        romaji: 'Kiso nenkin bangou ga wakarimasen. Oshiete itadakemasu ka.',
        vn: 'Tôi không nhớ 基礎年金番号. Anh/chị tra giúp được không?',
      },
      {
        jp: '失業中ですが、免除の対象になりますか。',
        romaji: 'Shitsugyouchuu desu ga, menjo no taishou ni narimasu ka.',
        vn: 'Tôi đang thất nghiệp, có thuộc diện được miễn không?',
      },
      {
        jp: '結果はいつごろ届きますか。',
        romaji: 'Kekka wa itsugoro todokimasu ka.',
        vn: 'Khi nào tôi nhận được kết quả?',
      },
    ],
    officialLinks: [
      { label: '国民年金（やさしい日本語）— 日本年金機構', url: 'https://www.nenkin.go.jp/international/simplejapanese/japanese-system/nationalpension/nationalpension.html' },
      { label: '国民年金保険料 — 日本年金機構', url: 'https://www.nenkin.go.jp/service/kokunen/hokenryo/hokenryo.html' },
      { label: '国民年金保険料の免除制度・納付猶予制度 — 日本年金機構', url: 'https://www.nenkin.go.jp/service/kokunen/menjo/20150428.html?id=3770' },
      { label: '国民年金保険料の免除等の申請が可能な期間 — 日本年金機構', url: 'https://www.nenkin.go.jp/service/kokunen/menjo/20150402-01.html' },
      { label: '国民年金保険料の免除・猶予 — 日本年金機構', url: 'https://www.nenkin.go.jp/shinsei/kokunen/menjoyuyo/index.html' },
      { label: '学生納付特例対象校一覧 — 日本年金機構', url: 'https://www.nenkin.go.jp/service/kokunen/menjo/gakutokutaisyouko.html' },
      { label: '令和8年度の学生納付特例手続き案内 — 日本年金機構', url: 'https://www.nenkin.go.jp/oshirase/taisetu/kojin/2026/202604/040103.html' },
      { label: '短時間労働者に対する健康保険・厚生年金保険の適用拡大 — 日本年金機構', url: 'https://www.nenkin.go.jp/service/kounen/tekiyo/jigyosho/tanjikan.html' },
      { label: '短期在留外国人の脱退一時金 — 日本年金機構', url: 'https://www.nenkin.go.jp/service/jukyu/seido/sonota-kyufu/dattai-ichiji/index.html' },
      { label: '脱退一時金を請求する方の手続き — 日本年金機構', url: 'https://www.nenkin.go.jp/service/jukyu/tetsuduki/sonota-kyufu/20140710.html' },
      { label: '退職所得となるもの — 国税庁', url: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/gensen/2725.htm' },
      { label: '退職金を受け取ったとき(退職所得) — 国税庁', url: 'https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1420.htm' },
    ],
    steps: [
      {
        step: 1,
        title: 'Xác định bạn đang ở 国民年金 hay 厚生年金',
        description: 'Nếu bạn đi làm full-time hoặc thuộc diện công ty phải cho vào xã hội bảo hiểm, thường bạn sẽ ở 厚生年金. Nếu không thuộc diện đó mà sống ở Nhật trong độ tuổi 20-59, bạn thường rơi vào 国民年金. Đừng để bị nhầm vì chỗ này quyết định bạn phải tự đóng hay công ty trừ lương.',
        documents: [
          'Payslip',
          'Thông báo tham gia bảo hiểm xã hội',
          'Giấy từ 年金機構 hoặc city hall',
        ],
        tip: 'Nhiều người nghĩ chỉ có “nenkin” chung chung. Thực tế hai nhánh này khác nhau rất nhiều về cách đóng và cách xử lý khi nghỉ việc.',
      },
      {
        step: 2,
        title: 'Điền 国民年金保険料免除・納付猶予申請書 tại 年金事務所',
        description: '**Các trường trên đơn 免除・猶予申請書** (tải PDF: https://www.nenkin.go.jp/shinsei/kokunen/menjoyuyo/menjo.files/mennzyo.pdf hoặc nhận tại quầy 年金事務所):\n\n| Trường | Ghi như thế nào |\n|---|---|\n| 基礎年金番号 | Số từ 年金手帳 hoặc 基礎年金番号通知書 |\n| 氏名 / フリガナ | Tên theo 在留カード; フリガナ viết KATAKANA |\n| 生年月日 | Ngày/tháng/năm sinh (西暦 — dương lịch) |\n| 住所 | Địa chỉ hiện tại khớp với 住民票 |\n| 免除・猶予の種別 | Chọn: 全額免除 / 一部免除 / 納付猶予 |\n| 申請理由 | Lý do: 失業 / 収入減少 / 学生 / その他 |\n| 世帯主氏名 / 配偶者 | Nếu xét thu nhập chung hộ thì cần điền |\n\n日本年金機構 cho phép truy ngược tối đa 2 năm; nộp đơn sớm để không mất khoảng thời gian được bảo vệ.',
        image: require('../../../../../assets/content/daily-life/dl_nenkin_s3.jpg'),
        imageCaption: '年金事務所 — nơi nộp đơn miễn/猶予 và xử lý các thủ tục 国民年金',
        documents: [
          'Đơn miễn/猶予 — tải PDF: https://www.nenkin.go.jp/shinsei/kokunen/menjoyuyo/menjo.files/mennzyo.pdf hoặc nhận tại quầy 年金事務所',
          'Giấy tờ thu nhập hoặc thất nghiệp nếu cần',
          'Thông tin配偶者/世帯主 trong trường hợp xét điều kiện',
        ],
        tip: '未納 và 免除/猶予 là hai trạng thái rất khác nhau. 未納 có thể làm bạn mất quyền bảo vệ khi có sự cố sức khỏe hoặc tử vong trong gia đình.',
      },
      {
        step: 3,
        title: 'Nếu là du học sinh: ưu tiên 学生納付特例',
        description: 'Với nhiều du học sinh, giải pháp đúng không phải im lặng để nợ mà là xin 学生納付特例. 日本年金機構 còn cập nhật trong tháng 3 và 4/2026 rằng người đủ điều kiện có thể nhận hướng dẫn qua マイナポータル và xin online dễ hơn nếu đã liên kết với ねんきんネット.',
        documents: [
          'Giấy tờ trường học',
          'Thông tin trường thuộc danh sách対象校',
          'Tài khoản マイナポータル / ねんきんネット nếu muốn làm online',
        ],
        tip: 'Nếu học trường không nằm trong danh sách対象校, đừng tự giả định là vẫn dùng được 学生納付特例. Hãy kiểm tra danh sách chính thức trước.',
      },
      {
        step: 4,
        title: 'Chuyển việc hoặc làm part-time: kiểm tra lại tư cách tham gia',
        description: 'Khi đổi công ty, nghỉ việc hoặc chuyển sang part-time, tư cách 年金 của bạn có thể đổi theo. Từ các cải cách đang áp dụng, người làm ngắn giờ tại doanh nghiệp từ 51 người trở lên vẫn có thể vào 厚生年金 nếu đủ điều kiện về giờ, lương và thời hạn làm việc.',
        documents: [
          'Hợp đồng lao động mới',
          'Số giờ làm/tuần',
          'Mức lương tháng theo hợp đồng',
        ],
        tip: 'Nhiều người tưởng làm part-time là chắc chắn không vào社会保険. Điều đó không còn đúng trong rất nhiều công ty từ sau mở rộng áp dụng.',
      },
      {
        step: 5,
        title: 'Trước khi về nước: cân nhắc kỹ 脱退一時金',
        description: '日本年金機構 nêu rõ nếu bạn là người không có quốc tịch Nhật, đã rời hệ thống bảo hiểm công và rời Nhật, bạn có thể xin 脱退一時金 nếu đáp ứng đủ điều kiện. Nhưng phải nhớ: nhận khoản này đồng nghĩa record tương ứng bị xóa. Nếu sau này bạn quay lại Nhật hoặc có hiệp định an sinh xã hội với nước mình, bài toán có thể khác.',
        documents: [
          'Ngày rời Nhật',
          'Thông tin thời gian đã tham gia 国民年金/厚生年金',
          'Tài khoản nhận tiền ở nước ngoài',
        ],
        tip: 'Đây không phải nút “rút hết cho nhanh”. Với người có ý định quay lại Nhật hoặc cộng dồn thời gian bảo hiểm theo hiệp định, quyết định này cần nghĩ dài hạn hơn.',
      },
      {
        step: 6,
        title: 'Nếu xin 脱退一時金 của 厚生年金: để ý cả phần thuế',
        description: 'NTA xem một số lump-sum liên quan hệ thống年金 là退職所得. Nếu không có thủ tục phù hợp, khoản chi trả có thể bị khấu trừ thuế ở mức 20.42%. Nhiều trường hợp muốn lấy lại phần khấu trừ này phải thông qua 納税管理人 và thủ tục thuế riêng sau đó.',
        documents: [
          'Giấy quyết định chi trả 脱退一時金',
          'Chứng từ khấu trừ thuế nếu có',
          'Hồ sơ 納税管理人 nếu muốn xử lý hoàn thuế',
        ],
        tip: 'Rất nhiều người chỉ nhìn số tiền nhận về mà không biết còn bài toán thuế phía sau. Nếu bỏ qua bước này, bạn có thể mất một khoản không nhỏ.',
      },
    ],
  };

export default pensionExemptionRefund;
