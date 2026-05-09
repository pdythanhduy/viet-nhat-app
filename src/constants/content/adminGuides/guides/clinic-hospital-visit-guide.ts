import type { AdminGuide } from '../../../../types/content';

const clinicHospitalVisitGuide: AdminGuide = {
  id: 'clinic-hospital-visit-guide',
  category: 'health',
  lastVerified: '2026-05-09',
  priority: 'normal',
  title: 'Cách đi khám bệnh ở Nhật',
  titleJp: '日本で病院・クリニックに行くとき',
  icon: 'medkit-outline',
  color: '#117A65',
  description:
    'Khi bị bệnh ở Nhật, bước đầu cần biết: nên đi クリニック (phòng khám nhỏ) hay 病院 (bệnh viện lớn), mang gì, và quy trình tại quầy. Phần lớn bệnh thường nên đi クリニック gần nhà trước — đi 病院 lớn cho bệnh nhẹ thường mất thời gian và có phụ phí nếu không có giấy giới thiệu.',
  heroImage: require('../../../../../assets/content/daily-life/ag_kensin_hero.jpg'),
  heroImageCaption: 'クリニック / 病院 — biết chỗ nào đi trước, mang gì, và nói gì tại quầy tiếp nhận',
  searchKeywords: [
    'đi khám bệnh',
    'bệnh viện Nhật',
    'phòng khám Nhật',
    'khám bệnh ở Nhật',
    'bảo hiểm y tế',
    'thuốc',
    'nhà thuốc',
    'bị sốt',
    'đau đầu',
    '病院',
    'クリニック',
    '保険証',
    'お薬手帳',
  ],
  legalScope: {
    jurisdiction: 'mixed',
    jurisdictionNote:
      'Quy trình khám bệnh và việc dùng bảo hiểm y tế (健康保険 / 国民健康保険) được hệ thống y tế Nhật điều phối qua MHLW. Phí, giờ làm và yêu cầu giấy giới thiệu (紹介状) khác nhau theo phòng khám / bệnh viện và khu vực.',
    sourceVerifiedAt: '2026-05-09',
    nextReviewAt: '2026-12-01',
    riskLevel: 'medium',
    whenToAskExpert: [
      'Triệu chứng nặng / kéo dài / nghi ngờ cấp cứu — không tự xử lý ở nhà.',
      'Không có 保険証 và lo về chi phí — hỏi trực tiếp phòng khám hoặc 市役所 trước khi đi khám.',
      'Cần khám chuyên khoa hiếm (神経内科, 精神科, 産婦人科 nâng cao) — hỏi trước có thông dịch không.',
    ],
  },
  quickAction: {
    deadline: 'Đi sớm khi triệu chứng còn nhẹ. Sốt cao kéo dài >2 ngày, đau ngực, khó thở, chảy máu nhiều — không đợi, đi ngay.',
    office: 'クリニック (phòng khám nhỏ) gần nhà cho bệnh thường. 病院 (bệnh viện lớn) chỉ khi có 紹介状 hoặc cấp cứu.',
    doNow: [
      'Xác định có phải cấp cứu không — nếu có, gọi 119 thay vì đi phòng khám.',
      'Tìm phòng khám gần nhà / chỗ làm: Google Maps + từ khóa 内科 / 小児科 / 耳鼻科 tùy triệu chứng.',
      'Kiểm tra giờ làm và có cần đặt hẹn (予約) không — gọi điện nếu không chắc.',
      'Chuẩn bị thẻ bảo hiểm (保険証, hoặc マイナンバーカード đã liên kết, hoặc 資格確認書), 在留カード, tiền mặt 5,000–10,000円, お薬手帳 nếu có.',
      'Đến quầy 受付, nói "初めてです" hoặc "再診です", điền form triệu chứng (問診票).',
    ],
    bring: [
      'Thẻ bảo hiểm — 保険証 cũ còn hạn, hoặc マイナンバーカード đã liên kết với bảo hiểm, hoặc 資格確認書 (giấy xác nhận tư cách). Bất kỳ thẻ nào hợp lệ là được.',
      '在留カード hoặc giấy tờ tùy thân khác',
      'Tiền mặt 5,000–10,000円 hoặc thẻ (một số クリニック không nhận thẻ)',
      'お薬手帳 (sổ thuốc) — nếu đang uống thuốc thường xuyên',
      'Danh sách / ảnh chụp thuốc đang uống và dị ứng (nếu có)',
    ],
    ifLate: 'Nếu phòng khám đã đóng cửa và triệu chứng nặng lên: gọi 119 (cấp cứu) hoặc hỏi #7119 (tư vấn y tế nếu khu vực có hỗ trợ).',
    officialSourceLabels: ['厚生労働省 (MHLW) — 医療・健康'],
  },
  whoIsThisFor: [
    'Người Việt mới sang Nhật chưa từng đi khám bệnh ở Nhật.',
    'Người sống ở Nhật một thời gian nhưng vẫn lo về quy trình tại quầy.',
    'Gia đình có con nhỏ — cần biết chọn 小児科 hay 内科.',
    'Không phải bạn nếu đang trong tình huống cấp cứu — gọi 119 ngay (xem guide emergency-calls-japan).',
  ],
  whenToDo: [
    'Khi có triệu chứng kéo dài (sốt, ho, đau bụng, đau đầu, dị ứng) >1–2 ngày.',
    'Khám định kỳ hoặc theo dõi bệnh mạn tính.',
    'Trẻ em sốt / quấy khóc bất thường — đi 小児科 sớm.',
    'Phụ nữ có thai / sau sinh — theo lịch của 産婦人科.',
  ],
  whereToDo: [
    'クリニック (phòng khám nhỏ, 1–2 bác sĩ) — phù hợp cho bệnh thường, ít chờ.',
    '病院 (bệnh viện lớn, ≥20 giường) — chỉ đi khi có 紹介状 từ クリニック, hoặc cấp cứu.',
    '夜間休日診療 (phòng khám ngoài giờ) — buổi tối / cuối tuần khi クリニック đóng.',
    'Không phải nơi: 薬局 (nhà thuốc) chỉ bán thuốc theo toa, không khám bệnh.',
  ],
  estimatedTime:
    'クリニック thường mất 1–2 giờ tổng (chờ + khám + nhận toa thuốc + ra 薬局). 病院 lớn có thể mất 3–4 giờ. Đi sáng sớm thường bớt chờ.',
  fees: [
    'Có thẻ bảo hiểm hợp lệ (保険証, マイナンバーカード đã liên kết, hoặc 資格確認書): bệnh nhân thường trả khoảng 30% chi phí. Một lần khám thường khoảng 1,000–4,000円 (chưa kể thuốc).',
    'Không có bảo hiểm: trả 100% — có thể từ 5,000円 đến vài chục nghìn yên tùy xét nghiệm.',
    'Đi 病院 lớn không có 紹介状: nhiều nơi tính thêm phụ phí 選定療養費 — kiểm tra với từng bệnh viện trước khi đi.',
    'Phí có thể thay đổi — hỏi trực tiếp phòng khám / bệnh viện hoặc xem trang chính thức của họ.',
  ],
  documentsChecklist: [
    { label: '保険証 / マイナンバーカード / 資格確認書', required: true, note: 'Bất kỳ thẻ nào chứng minh tư cách bảo hiểm hợp lệ. Thiếu = trả 100%. Mới sang chưa có thẻ chính thức, có thể xin giấy tạm tại 市役所.' },
    { label: '在留カード', required: false, note: 'Một số phòng khám hỏi giấy tờ tùy thân. Mang theo cho chắc.' },
    { label: 'Tiền mặt 5,000–10,000円', required: true, note: 'Một số クリニック chỉ nhận tiền mặt.' },
    { label: 'お薬手帳', required: false, note: 'Nếu đang uống thuốc thường xuyên — bác sĩ xem để tránh tương tác thuốc.' },
    { label: 'Ảnh chụp / danh sách thuốc đang uống', required: false, note: 'Khi không có お薬手帳 — chụp tên thuốc bằng tiếng Nhật trên hộp.' },
    { label: '紹介状 (giấy giới thiệu)', required: false, note: 'Bắt buộc nếu đến 病院 lớn để tránh phụ phí 選定療養費.' },
  ],
  commonMistakes: [
    'Đi thẳng 病院 lớn cho bệnh nhẹ mà không có 紹介状 → bị tính phụ phí và chờ rất lâu.',
    'Quên 保険証 → bị tính 100% chi phí. Một số クリニック cho mang bù sau, một số không.',
    'Không kiểm tra giờ làm và ngày nghỉ — nhiều クリニック đóng thứ Năm hoặc Chủ Nhật.',
    'Không hỏi chi phí trước khi xét nghiệm sâu (CT, MRI) — có thể bất ngờ với hóa đơn.',
    'Không mang thông tin thuốc đang uống → bác sĩ kê thuốc mới có thể tương tác xấu.',
    'Đi 1 lần rồi bỏ — nhiều bệnh cần tái khám 再診 để theo dõi và đổi liều.',
  ],
  faq: [
    {
      question: 'Tôi không có 保険証, có khám được không?',
      answer:
        'Được, nhưng thường phải trả 100% chi phí — đắt gấp khoảng 3 lần khi có bảo hiểm. Mới sang Nhật và đang chờ thẻ chính thức, hỏi 市役所 xin giấy tạm xác nhận tư cách bảo hiểm (kiểu 健康保険被保険者資格証明書 hoặc 資格確認書). Chưa tham gia bảo hiểm bắt buộc, đăng ký 国民健康保険 ở 市役所 càng sớm càng tốt — quy trình mới sang Nhật thường mất 1–2 tuần.',
    },
    {
      question: 'Khám xong bác sĩ kê toa, tôi mua thuốc ở đâu?',
      answer:
        'クリニック thường KHÔNG bán thuốc trực tiếp. Bác sĩ đưa 処方箋 (toa thuốc) — bạn cầm ra 薬局 (nhà thuốc) gần đó. Đa số 薬局 chấp nhận 保険証. 処方箋 thường có hạn 4 ngày kể từ ngày kê.',
    },
    {
      question: 'Tôi không nói được tiếng Nhật, làm sao mô tả triệu chứng?',
      answer:
        'Trước khi đi: viết sẵn triệu chứng bằng tiếng Việt + dịch sang tiếng Nhật bằng app (DeepL / VoiceTra / Google). Khi đến quầy, đưa giấy hoặc mở app. Một số phòng khám có 通訳 (thông dịch) — hỏi trước "ベトナム語の通訳はありますか?". Nếu không, dùng app dịch và chỉ vào vị trí đau trên cơ thể.',
    },
    {
      question: 'Tôi cần khám chuyên khoa gì cho triệu chứng nào?',
      answer:
        'Cảm sốt thường: 内科. Trẻ em <15 tuổi: 小児科. Đau họng / mũi / tai: 耳鼻咽喉科. Đau mắt: 眼科. Da: 皮膚科. Phụ nữ thai sản: 産婦人科. Răng: 歯科 (xem guide dentist-visit-japan). Không chắc → đi 内科 trước, bác sĩ sẽ giới thiệu chuyên khoa nếu cần.',
    },
    {
      question: 'Phòng khám hỏi tôi có muốn xét nghiệm thêm — có nên đồng ý không?',
      answer:
        'Hỏi rõ: "費用はいくらくらいですか?" (chi phí bao nhiêu) trước khi đồng ý. Một số xét nghiệm (CT, MRI, máu sâu) có thể vài chục nghìn yên dù có bảo hiểm. Nếu không cần gấp, có thể nói "今日はやめて、次回考えます" (hôm nay không, lần sau tính).',
    },
  ],
  counterPhrases: [
    {
      jp: '初めてです。',
      romaji: 'Hajimete desu.',
      vn: 'Đây là lần đầu tôi đến đây.',
      note: 'Nói ở quầy tiếp nhận nếu bạn chưa từng khám ở phòng khám này.',
    },
    {
      jp: '保険証を持っています。',
      romaji: 'Hokenshou o motte imasu.',
      vn: 'Tôi có thẻ bảo hiểm.',
      note: 'Dùng khi nhân viên hỏi về bảo hiểm.',
    },
    {
      jp: '予約していませんが、診てもらえますか。',
      romaji: 'Yoyaku shite imasen ga, mite moraemasu ka.',
      vn: 'Tôi chưa đặt hẹn, nhưng có thể khám được không?',
      note: 'Dùng khi đến phòng khám mà chưa đặt lịch.',
    },
    {
      jp: '熱があります。',
      romaji: 'Netsu ga arimasu.',
      vn: 'Tôi bị sốt.',
      note: 'Câu mô tả triệu chứng cơ bản.',
    },
    {
      jp: '頭が痛いです。',
      romaji: 'Atama ga itai desu.',
      vn: 'Tôi bị đau đầu.',
      note: 'Câu mô tả triệu chứng cơ bản.',
    },
    {
      jp: '薬を飲んでいます。',
      romaji: 'Kusuri o nonde imasu.',
      vn: 'Tôi đang uống thuốc.',
      note: 'Nói với bác sĩ nếu bạn đang dùng thuốc.',
    },
    {
      jp: 'ベトナム語の通訳はありますか。',
      romaji: 'Betonamu-go no tsuuyaku wa arimasu ka.',
      vn: 'Có phiên dịch tiếng Việt không?',
      note: 'Dùng khi cần hỗ trợ ngôn ngữ.',
    },
    {
      jp: '費用はどのくらいかかりますか。',
      romaji: 'Hiyou wa dono kurai kakarimasu ka.',
      vn: 'Chi phí khoảng bao nhiêu?',
      note: 'Dùng khi muốn hỏi trước chi phí.',
    },
  ],
  officialLinks: [
    { label: '厚生労働省 (MHLW) — 医療・健康', url: 'https://www.mhlw.go.jp/' },
    { label: '日本医師会', url: 'https://www.med.or.jp/' },
  ],
  steps: [
    {
      step: 1,
      title: 'Xác định có phải cấp cứu không',
      description:
        'Trước khi tìm phòng khám, kiểm tra triệu chứng. Cấp cứu nếu có một trong các dấu hiệu: mất ý thức, khó thở dữ dội, đau ngực dữ dội, co giật, chảy máu nhiều, bỏng diện rộng, người có thai chuyển dạ. Trong các trường hợp này, gọi 119 ngay — xem guide emergency-calls-japan.\n\nKhông cấp cứu → tiếp bước 2.',
      documents: [],
      tip: 'Nếu phân vân giữa cấp cứu và đi khám thường, gọi #7119 ở khu vực có hỗ trợ — tư vấn y tế bằng tiếng Nhật. Một số khu có thông dịch.',
    },
    {
      step: 2,
      title: 'Tìm クリニック gần nhà / chỗ làm',
      description:
        'Mở Google Maps, gõ từ khóa theo triệu chứng:\n\n• Cảm, sốt, đau bụng nhẹ → 内科\n• Trẻ em <15 tuổi → 小児科\n• Đau họng / mũi / tai → 耳鼻咽喉科\n• Đau mắt → 眼科\n• Da → 皮膚科\n• Phụ nữ thai sản → 産婦人科\n\nXem giờ làm trên Google hoặc trang web phòng khám. Nhiều クリニック đóng nửa ngày thứ Tư hoặc thứ Năm, và đóng cả Chủ Nhật. Một số yêu cầu đặt hẹn (予約) qua điện thoại hoặc app.',
      documents: [],
      tip: 'Hỏi đồng nghiệp / bạn cùng khu — họ thường biết phòng khám nào thân thiện với người nước ngoài.',
    },
    {
      step: 3,
      title: 'Chuẩn bị giấy tờ và đến quầy 受付',
      description:
        'Mang đầy đủ:\n\n• Thẻ bảo hiểm — 保険証 (cũ còn hạn), マイナンバーカード (đã liên kết bảo hiểm), hoặc 資格確認書\n• 在留カード\n• Tiền mặt 5,000–10,000円\n• お薬手帳 (nếu có)\n\nĐến quầy 受付 (tiếp nhận), nói "初めてです" (lần đầu) hoặc "再診です" (tái khám). Nhân viên đưa 問診票 (form triệu chứng) — điền tay tại chỗ. Mục cơ bản: tên / ngày sinh / địa chỉ / triệu chứng / khi nào bắt đầu / thuốc đang uống / dị ứng / bệnh mạn tính.',
      documents: [
        '保険証 / マイナンバーカード / 資格確認書',
        '在留カード',
        'Tiền mặt / thẻ',
        'お薬手帳 (nếu có)',
      ],
      tip: 'Điền 問診票 chậm và kỹ — bác sĩ đọc trước khi gọi vào. Càng chi tiết, khám càng đúng. Nếu không hiểu mục nào, hỏi nhân viên.',
    },
    {
      step: 4,
      title: 'Vào phòng bác sĩ — mô tả triệu chứng',
      description:
        'Khi tên được gọi (theo số), vào phòng. Bác sĩ thường hỏi 3 việc:\n\n1. Triệu chứng gì? Bắt đầu khi nào?\n2. Có sốt không? Có ăn được không?\n3. Có thuốc nào đang uống / dị ứng không?\n\nTrả lời ngắn gọn. Nếu không nói được, mở app dịch hoặc đưa giấy đã viết sẵn. Bác sĩ có thể: nghe phổi, sờ bụng, xem họng, đo huyết áp. Đôi khi yêu cầu xét nghiệm (máu, nước tiểu, X-quang).\n\nTrước khi đồng ý xét nghiệm sâu, hỏi: "費用はいくらくらいですか?".',
      documents: [],
      tip: 'Nếu bác sĩ giải thích quá nhanh, nói: "もう一度ゆっくりお願いします" (xin nhắc lại chậm).',
    },
    {
      step: 5,
      title: 'Thanh toán và nhận 処方箋',
      description:
        'Sau khi khám, ngồi đợi ở quầy. Khi tên được gọi:\n\n• Quầy 会計 đưa hóa đơn — thanh toán bằng tiền mặt hoặc thẻ.\n• Nếu có thuốc, nhận 処方箋 (toa thuốc) — KHÔNG phải thuốc.\n• Đôi khi nhận thêm 領収書 (hóa đơn để khai thuế y tế cuối năm) — giữ lại.\n\n処方箋 phải dùng trong 4 ngày kể từ ngày kê.',
      documents: [
        'Tiền mặt hoặc thẻ',
        'Thẻ bảo hiểm (đã đưa trước rồi, sẽ trả lại)',
      ],
      tip: 'Giữ 領収書 nguyên năm — nếu cả nhà tổng chi phí y tế >100,000円/năm, có thể xin giảm thuế 医療費控除 khi 確定申告.',
    },
    {
      step: 6,
      title: 'Ra 薬局 lấy thuốc',
      description:
        'Cầm 処方箋 + thẻ bảo hiểm ra 薬局 gần phòng khám (thường có ngay đối diện).\n\n1. Đưa 処方箋 và thẻ bảo hiểm cho nhân viên. Nếu lần đầu ở 薬局 này, điền form ngắn.\n2. Đưa お薬手帳 nếu có — nhân viên dán nhãn thuốc mới.\n3. Đợi 5–15 phút.\n4. Khi nhận thuốc: nhân viên giải thích cách uống. Nếu không hiểu, nói "もう一度お願いします".\n5. Thanh toán phần thuốc — cũng thường được bảo hiểm chi trả ~70%, phần bệnh nhân trả là ~30%.\n\nVề nhà uống thuốc đúng giờ. Nếu thuốc không hợp / có phản ứng lạ, ngừng và quay lại phòng khám.',
      documents: [
        '処方箋',
        '保険証 / マイナンバーカード / 資格確認書',
        'お薬手帳 (nếu có)',
        'Tiền mặt hoặc thẻ',
      ],
      tip: 'Nếu chưa có お薬手帳, hỏi 薬局 cấp một quyển miễn phí — họ sẽ dán nhãn thuốc mỗi lần lấy. Lần sau đi viện khác cũng dùng được quyển này.',
    },
  ],
};

export default clinicHospitalVisitGuide;
