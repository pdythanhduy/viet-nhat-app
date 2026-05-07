import type { AdminGuide } from '../../../../types/content';

const divorceCustodyNameResidence: AdminGuide = {
    id: 'divorce-custody-name-residence',
    category: 'daily-law',
    lastVerified: '2026-04-11',
    priority: 'high',
    title: 'Ly hôn, nuôi con và giấy tờ cư trú',
    titleJp: '離婚・親権・氏名変更・在留手続き',
    icon: 'document-attach',
    color: '#7F8C8D',
    description: 'Guide thực tế cho người nước ngoài ở Nhật khi hôn nhân đổ vỡ: nộp 離婚届, con ở với ai, đổi họ của con, đổi tên trên giấy tờ và ảnh hưởng đến visa/cư trú.',
    heroImage: require('../../../../../assets/content/daily-life/ag_divorce_hero.jpg'),
    heroImageCaption: 'Ly hôn tại Nhật - kiểm tra 離婚届, quyền nuôi con và thay đổi giấy tờ cư trú',
    whoIsThisFor: [
      'Người nước ngoài ở Nhật đang chuẩn bị ly hôn hoặc vừa ly hôn.',
      'Gia đình có con chung và cần hiểu sau ly hôn phải quyết định gì cho con.',
      'Người đang ở diện spouse/dependent và lo ảnh hưởng tới cư trú sau khi ly hôn.',
    ],
    whenToDo: [
      'Trước khi ký và nộp 離婚届, đặc biệt nếu có con, tài sản chung hoặc đang ở diện visa gắn với hôn nhân.',
      'Ngay sau khi ly hôn hoặc ly thân thực tế, để không trễ các mốc thông báo cư trú và đổi giấy tờ.',
      'Càng cần đọc sớm nếu vụ việc có bạo lực gia đình, đe dọa, kiểm soát giấy tờ hoặc tranh chấp đưa con đi.',
    ],
    whereToDo: [
      'City hall / ward office: 離婚届, hộ tịch, địa chỉ cư trú và một số thay đổi dân cư liên quan.',
      '家庭裁判所: tranh chấp về con, nuôi con, thay đổi họ của con, điều chỉnh sau ly hôn khi không tự thỏa thuận được.',
      'ISA: thông báo ly hôn trong 14 ngày đối với một số diện cư trú và xử lý thay đổi tư cách lưu trú nếu cần.',
      'Ngân hàng, công ty, bảo hiểm, trường học của con: cập nhật tên, địa chỉ, tài khoản nhận trợ cấp và người giám hộ.',
    ],
    estimatedTime: 'Không có một timeline chung cho mọi gia đình. Nhưng về thủ tục, thường có 3 lớp việc phải tách rõ: nộp hồ sơ ly hôn/hộ tịch, quyết định và giấy tờ liên quan đến con, và xử lý ngay ảnh hưởng lên cư trú/visa trong 14 ngày nếu thuộc diện phải thông báo.',
    fees: [
      '協議離婚 nộp 離婚届 tại city hall không phải là một thủ tục tòa án tiêu chuẩn, nhưng có thể phát sinh chi phí bản sao, dịch thuật hoặc chứng nhận giấy tờ.',
      'Nếu cần xin 子の氏の変更許可 tại 家庭裁判所, trang Tòa án nêu lệ phí là 800 yên tiền tem mỗi trẻ, cộng bưu phí theo từng tòa.',
      'Thay đổi tên trên giấy tờ cư trú hoặc xử lý hồ sơ cư trú sau ly hôn có thể phát sinh chi phí ảnh, chuyển phát, dịch thuật hoặc hồ sơ phụ trợ.',
    ],
    documentsChecklist: [
      { label: 'Xác định rõ đang là 協議離婚 hay 裁判離婚', required: true },
      { label: 'Giấy tờ nhân thân, thẻ cư trú, hộ chiếu, địa chỉ cư trú hiện tại', required: true },
      { label: 'Nếu có con: thỏa thuận hoặc quyết định về 親権, 養育費, 親子交流', required: false, note: 'Từ 01/04/2026 luật đã thay đổi, cần nhìn kỹ phần quyền của con và quyền của cha mẹ sau ly hôn.' },
      { label: 'Nếu cần đổi họ của con: hồ sơ 子の氏の変更許可', required: false },
      { label: 'Nếu tên hợp pháp của bạn thay đổi: hồ sơ đổi thông tin trên 在留カード trong 14 ngày', required: false },
      { label: 'Nếu đang ở diện spouse/dependent: kế hoạch xử lý visa hoặc tư cách lưu trú sau ly hôn', required: false },
    ],
    commonMistakes: [
      'Nghĩ nộp 離婚届 xong là mọi giấy tờ của con và cư trú sẽ tự chạy theo.',
      'Không hiểu rằng sau ly hôn, visa gắn với quan hệ hôn nhân có thể bị ảnh hưởng rất lớn.',
      'Quên thông báo cho ISA trong 14 ngày nếu thuộc diện phải báo ly hôn hoặc tử biệt với vợ/chồng.',
      'Tưởng con sống với mẹ là tự động đổi họ/move hộ tịch theo mẹ mà không cần thủ tục riêng.',
      'Nhầm giữa quyền nuôi con thực tế, 親権, 養育費, 面会交流 và giấy tờ cư trú.',
      'Không cập nhật tên/địa chỉ mới cho ngân hàng, bảo hiểm, công ty, trường của con sau khi tình trạng gia đình thay đổi.',
    ],
    faq: [
      {
        question: 'Ly hôn ở Nhật có phải lúc nào cũng ra tòa không?',
        answer: 'Không. 法務省 nêu rõ 協議離婚 có thể nộp 離婚届 tại city hall khi hai bên thỏa thuận được. Riêng 裁判離婚 thì phải nộp theo kết quả bản án, điều đình, hòa giải hoặc quyết định của tòa, và thủ tục nộp có mốc riêng.',
      },
      {
        question: 'Luật mới năm 2026 thay đổi gì lớn về con sau ly hôn?',
        answer: 'Theo 法務省, sửa đổi lớn về nuôi dưỡng con sau ly hôn có hiệu lực từ ngày 01/04/2026. Từ mốc này, sau ly hôn có thể xác định một bên hoặc cả hai bên là người có 親権, thay vì mặc định chỉ một bên như trước đây. Nhưng việc áp dụng luôn phải nhìn theo lợi ích của trẻ và hoàn cảnh từng vụ việc.',
      },
      {
        question: 'Con ở với mẹ thì có tự đổi họ sang mẹ không?',
        answer: 'Không tự động. Trang Tòa án nêu rõ nếu họ của con khác với cha hoặc mẹ sau ly hôn, muốn đổi theo họ của cha hoặc mẹ thì phải xin 子の氏の変更許可 tại 家庭裁判所 rồi mới làm tiếp thủ tục hộ tịch liên quan.',
      },
      {
        question: 'Tôi đang ở visa spouse hoặc dependent, ly hôn xong có sao không?',
        answer: 'Có thể ảnh hưởng rất lớn. ISA yêu cầu một số diện như 家族滞在, 日本人の配偶者等, 永住者の配偶者等 phải thông báo ly hôn hoặc tử biệt với vợ/chồng trong vòng 14 ngày. Việc có tiếp tục ở Nhật được hay không là câu chuyện khác với việc chỉ nộp thông báo; nhiều trường hợp cần đổi sang tư cách lưu trú khác càng sớm càng tốt.',
      },
      {
        question: 'Nếu sau ly hôn tên hợp pháp của tôi đổi thì có phải đổi trên thẻ cư trú không?',
        answer: 'Có. ISA nêu rõ khi họ tên, ngày sinh, giới tính hoặc quốc tịch/vùng lãnh thổ thay đổi thì trung dài hạn cư trú phải nộp thay đổi thông tin ngoài địa chỉ trên 在留カード trong vòng 14 ngày.',
      },
    ],
    officialLinks: [
      { label: '離婚届 — 法務省', url: 'https://www.moj.go.jp/ONLINE/FAMILYREGISTER/5-3.html' },
      { label: '離婚を考えている方へ — 法務省', url: 'https://www.moj.go.jp/MINJI/minji07_00011.html' },
      { label: '親権者 — 法務省', url: 'https://www.moj.go.jp/MINJI/minji07_00015.html' },
      { label: '子どもに関する事項（子育ての計画）— 法務省', url: 'https://www.moj.go.jp/MINJI/minji07_00014.html' },
      { label: '養育費 — 法務省', url: 'https://www.moj.go.jp/MINJI/minji07_00016' },
      { label: '親子交流（面会交流）— 法務省', url: 'https://www.moj.go.jp/MINJI/minji07_00017.html' },
      { label: '民法等の一部を改正する法律〔令和8年4月1日施行〕— 法務省', url: 'https://www.moj.go.jp/MINJI/minji07_00357.html' },
      { label: '子の氏の変更許可 — 裁判所', url: 'https://www.courts.go.jp/saiban/syurui/syurui_kazi/kazi_06_07/index.html' },
      { label: '配偶者に関する届出 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html' },
      { label: '住居地以外の在留カード記載事項の変更届出 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00009.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Tách 4 chuyện khác nhau: ly hôn, con, tên, cư trú',
        description: 'Ngay từ đầu hãy tách riêng bốn câu hỏi: làm sao nộp ly hôn, con sẽ ở với ai và ai có quyền gì, ai cần đổi tên/họ trên giấy tờ, và cư trú/visa có bị ảnh hưởng không. Nếu trộn bốn việc này thành một, bạn rất dễ bỏ sót mốc 14 ngày của ISA hoặc thủ tục của con ở 家庭裁判所.',
        documents: [
          'Tình trạng hôn nhân hiện tại',
          'Có con chung hay không',
          'Tư cách lưu trú hiện tại của mỗi người',
        ],
        tip: 'Đây không phải lúc “giải quyết dần cũng được”. Một số mốc là mốc pháp lý rất ngắn.',
      },
      {
        step: 2,
        title: 'Nộp 離婚届 đúng loại',
        description: 'Pháp務省 nêu rõ 協議離婚 có thể nộp bất kỳ lúc nào tại city hall theo nơi có hộ tịch gốc hoặc nơi đang ở; còn 裁判離婚 phải nộp trong vòng 10 ngày kể từ ngày phán quyết hoặc quyết định có hiệu lực. Nếu là người nước ngoài, song song với giấy tờ Nhật còn có thể phải xem yêu cầu của nước mang quốc tịch của mình.',
        documents: [
          'Mẫu 離婚届',
          'Giấy tờ tùy thân',
          'Tài liệu của tòa nếu là 裁判離婚',
        ],
        tip: 'Ly hôn có hiệu lực trong hộ tịch không có nghĩa là cư trú của người nước ngoài đã tự ổn. Hai lớp thủ tục này khác nhau.',
        image: require('../../../../../assets/content/daily-life/ag_divorce_s2.jpg'),
        imageCaption: 'Điền 離婚届 tại municipal office — cần chữ ký 2 người và 2 nhân chứng',
      },
      {
        step: 3,
        title: 'Nếu có con: chốt 親権, 養育費, 親子交流',
        description: 'Pháp務省 nhấn mạnh khi có con thì cha mẹ cần chốt ít nhất ba nhóm việc: ai có 親権, ai trả 養育費 và kế hoạch 親子交流. Từ ngày 01/04/2026, luật đã thay đổi để cho phép sau ly hôn có thể là một bên hoặc cả hai bên có 親権, nhưng tiêu chí cốt lõi vẫn là lợi ích của trẻ.',
        documents: [
          'Thỏa thuận hoặc tài liệu từ tòa về con',
          'Kế hoạch chăm sóc và nơi ở của con',
          'Thông tin thu nhập và chi phí nuôi con nếu bàn về 養育費',
        ],
        tip: 'Đừng xem đây là phần “nói miệng sau”. Càng ít giấy trắng mực đen, rủi ro tranh chấp về sau càng lớn.',
      },
      {
        step: 4,
        title: 'Nếu con cần theo họ của cha hoặc mẹ: làm thủ tục riêng',
        description: 'Trang Tòa án nêu rõ khi con có họ khác với cha hoặc mẹ sau ly hôn, muốn đổi theo họ của cha hoặc mẹ thì phải xin 子の氏の変更許可 ở 家庭裁判所. Sau 01/04/2026, nếu con dưới 15 tuổi và là trường hợp共同親権 thì nguyên tắc còn phải chú ý việc cha mẹ cùng đứng tên hoặc người có quyền hành xử cụ thể theo quyết định của tòa.',
        documents: [
          '戸籍謄本 của con',
          '戸籍謄本 của cha và mẹ có ghi việc ly hôn',
          'Giấy tờ từ tòa nếu có chỉ định người thực hiện quyền',
        ],
        tip: 'Con sống với mẹ không tự động đồng nghĩa con đã mang họ mẹ. Đây là chỗ rất nhiều người hiểu nhầm.',
      },
      {
        step: 5,
        title: 'Xử lý cư trú ngay nếu đang ở diện spouse/dependent',
        description: 'ISA nêu rõ người có một số tư cách như 家族滞在, 日本人の配偶者等, 永住者の配偶者等 phải thông báo ly hôn hoặc tử biệt với vợ/chồng trong vòng 14 ngày. Sau đó, nếu tư cách lưu trú đang dựa vào hôn nhân hoặc phụ thuộc, cần đánh giá rất sớm xem có phải đổi sang diện khác hay không.',
        documents: [
          'Thẻ cư trú',
          'Thông tin ngày ly hôn',
          'Kế hoạch cư trú tiếp theo nếu đang ở diện gắn với hôn nhân',
        ],
        tip: 'Nộp thông báo 14 ngày không phải là “gia hạn” quyền ở lại. Đó chỉ là nghĩa vụ báo tin; phần cư trú tiếp theo phải xử lý riêng.',
        image: require('../../../../../assets/content/daily-life/ag_divorce_s5.jpg'),
        imageCaption: 'Nộp hồ sơ đổi tư cách lưu trú tại ISA sau khi không còn diện 家族滞在',
      },
      {
        step: 6,
        title: 'Nếu tên hoặc địa chỉ đổi: cập nhật tất cả giấy tờ nối theo',
        description: 'Nếu sau ly hôn tên hợp pháp của bạn đổi, hoặc bạn chuyển nhà cùng con, đừng chỉ đổi ở một nơi. ISA yêu cầu đổi thông tin ngoài địa chỉ trên 在留カード trong 14 ngày khi tên hợp pháp thay đổi; ngoài ra còn phải cập nhật địa chỉ, ngân hàng, bảo hiểm, công ty, trường của con và nơi nhận trợ cấp.',
        documents: [
          'Giấy tờ chứng minh tên mới hoặc thay đổi hộ tịch',
          '在留カード',
          'Danh sách nơi cần cập nhật thông tin',
        ],
        tip: 'Sau ly hôn, lỗi vận hành thường gặp nhất không nằm ở luật mà ở giấy tờ không đồng bộ giữa city hall, ISA, ngân hàng và trường của con.',
      },
    ],
  };

export default divorceCustodyNameResidence;
