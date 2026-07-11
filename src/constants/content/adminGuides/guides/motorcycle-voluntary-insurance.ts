import type { AdminGuide } from '../../../../types/content';

const motorcycleVoluntaryInsurance: AdminGuide = {
    id: 'motorcycle-voluntary-insurance',
    category: 'traffic',
    lastVerified: '2026-07-11',
    priority: 'high',
    title: 'Bảo hiểm xe máy tự nguyện (任意保険)',
    titleJp: 'バイク・原付の任意保険・ファミリーバイク特約',
    icon: 'shield-checkmark-outline',
    color: '#1A5276',
    description: '自賠責保険 (bảo hiểm bắt buộc) chỉ chi trả tối thiểu cho người bị hại — không bảo vệ xe, không bảo vệ chính bạn khi bị thương. 任意保険 (bảo hiểm tự nguyện) lấp đầy khoảng trống đó và là điều nên có trước khi đi xe.',
    heroImage: require('../../../../../assets/content/daily-life/ag_moto-insurance_hero.jpg'),
    heroImageCaption: '任意保険 - bổ sung bảo hiểm tự nguyện để giảm rủi ro khi đi xe máy',
    whoIsThisFor: [
      'Người đang sở hữu 原付, xe tay ga, hoặc xe máy từ 51cc trở lên và chỉ có 自賠責保険.',
      'Người đang xét mua xe và muốn hiểu tổng chi phí bảo hiểm thực tế là bao nhiêu.',
      'Thành viên gia đình có ô tô và muốn biết cách thêm bảo hiểm xe máy vào hợp đồng hiện có (ファミリーバイク特約).',
    ],
    whenToDo: [
      'Ngay khi mua xe — lý tưởng là ký 任意保険 cùng lúc với 自賠責保険.',
      'Khi gia hạn 自賠責保険 hằng năm — dịp tốt để kiểm tra lại phạm vi bảo hiểm tổng thể.',
    ],
    whereToDo: [
      'Cửa hàng bán xe hoặc đại lý bảo hiểm: đăng ký 任意保険 cùng lúc mua xe.',
      'Website/app của công ty bảo hiểm: đăng ký hoặc gia hạn online nếu đã có thông tin xe.',
      'Công ty bảo hiểm ô tô hiện có của gia đình: hỏi thêm ファミリーバイク特約 nếu cùng hộ gia đình.',
    ],
    estimatedTime: '申し込み online: 15–30 phút. Qua đại lý bảo hiểm: 30–60 phút.',
    fees: [
      'ファミリーバイク特約: thêm ~3,000–7,000 yên/năm vào phí bảo hiểm ô tô hiện có (rẻ nhất).',
      '任意保険 riêng cho 原付 (≤125cc): ~5,000–15,000 yên/năm.',
      '任意保険 riêng cho xe 126–250cc: ~20,000–40,000 yên/năm tùy tuổi và kinh nghiệm lái.',
    ],
    documentsChecklist: [
      { label: 'Thông tin xe: ナンバー, 車台番号 (số khung), 排気量 (dung tích)', required: true },
      { label: 'Bằng lái xe (運転免許証)', required: true },
      { label: '自賠責保険証 hiện có', required: true },
      { label: 'Hợp đồng bảo hiểm ô tô (nếu muốn thêm ファミリーバイク特約)', required: false },
    ],
    commonMistakes: [
      'Nghĩ rằng 自賠責 là đủ — thực tế, nếu bạn làm hỏng xe người khác hoặc tự ngã, 自賠責 không chi trả gì cả.',
      'Bỏ qua ファミリーバイク特約 dù gia đình có ô tô — đây là cách rẻ nhất và thường đủ bảo vệ cho 原付.',
      'Mua bảo hiểm nhưng không mang theo giấy khi đi xe — phải có cả 自賠責証明書 lẫn 任意保険証 trong người.',
      'Không báo ngay cho công ty bảo hiểm sau tai nạn — trì hoãn có thể làm mất quyền bồi thường.',
    ],
    faq: [
      {
        question: 'ファミリーバイク特約 là gì và tôi có đủ điều kiện không?',
        answer: 'Là phần mở rộng của hợp đồng bảo hiểm ô tô hiện có — thêm vào để bảo vệ xe máy/原付 với chi phí thấp (~3,000–7,000 yên/năm). Điều kiện: trong cùng hộ khẩu (同居の家族) với người có hợp đồng bảo hiểm ô tô. Một số công ty bảo hiểm yêu cầu cùng đăng ký hộ khẩu tại Nhật.',
      },
      {
        question: '任意保険 cần xe ≤50cc không?',
        answer: 'Pháp luật không bắt buộc, nhưng rất nên có. Tai nạn dù nhỏ có thể gây thiệt hại cho xe người khác lên đến hàng triệu yên — 自賠責 không bao gồm khoản này. 任意保険 hoặc ファミリーバイク特約 lấp đầy khoảng trống đó.',
      },
      {
        question: 'Tai nạn xảy ra tôi cần làm gì ngay?',
        answer: '1. Dừng xe, đảm bảo an toàn. 2. Nếu có thương vong: gọi 119 (cấp cứu) + 110 (cảnh sát). 3. Gọi ngay hotline của công ty bảo hiểm — số in trên 証明書 mang theo. 4. Không nhận lỗi, không ký bất kỳ giấy tờ nào trước khi công ty bảo hiểm can thiệp. 5. Chụp ảnh hiện trường và ghi thông tin xe đối phương.',
      },
    ],
    officialLinks: [
      { label: '損害保険料率算出機構 — thông tin 自賠責保険', url: 'https://www.giroj.or.jp/ratemaking/cali/' },
      { label: '一般社団法人 日本損害保険協会 — so sánh bảo hiểm', url: 'https://www.sonpo.or.jp/' },
    ],
    steps: [
      {
        step: 1,
        title: 'Hiểu điểm khác nhau giữa 自賠責 và 任意保険',
        description: '自賠責保険 (bắt buộc):\n• Chi trả cho người bị thương/chết do xe bạn gây ra.\n• Mức tối đa: 120万 yên/người bị thương, 3,000万 yên/trường hợp tử vong.\n• KHÔNG chi trả: thiệt hại tài sản (xe, tường, cột), thương tật của chính bạn, xe của bạn.\n\n任意保険 (tự nguyện) thêm vào:\n• 対人賠償: bồi thường vượt mức 自賠責, thường vô hạn.\n• 対物賠償: bồi thường thiệt hại tài sản người khác.\n• 人身傷害補償: bảo vệ bản thân khi bị thương.\n• 車両保険: sửa chữa/thay xe của bạn (thường không bắt buộc với 原付).\n\nKết luận thực tế: 自賠責 bảo vệ người khác ở mức tối thiểu. 任意保険 bảo vệ bạn và người khác đầy đủ hơn.',
        documents: [],
        tip: 'Trường hợp thường gặp: đâm vào xe đạp hoặc làm hỏng cột bê tông → 自賠責 không chi trả vì đây là thiệt hại tài sản, không phải thương vong. 任意保険 mới bảo vệ bạn trong tình huống này.',
      },
      {
        step: 2,
        title: 'Kiểm tra ファミリーバイク特約 nếu gia đình có ô tô',
        description: 'Nếu bạn hoặc người thân trong cùng hộ gia đình đang có hợp đồng bảo hiểm ô tô, hãy hỏi công ty bảo hiểm về ファミリーバイク特約:\n\n• Có thể thêm vào hợp đồng hiện có, phí ~3,000–7,000 yên/năm.\n• Bao gồm 対人・対物 (bồi thường người và tài sản) cho bất kỳ xe máy ≤125cc nào trong hộ gia đình.\n• Một số gói bao gồm cả 人身傷害 (bảo vệ chính người lái).\n• KHÔNG bao gồm 車両保険 (thiệt hại chính xe của bạn).\n\nCách làm: gọi hotline trên hợp đồng bảo hiểm ô tô, nói "ファミリーバイク特約を追加したい". Thường xong trong 1 cuộc điện thoại.',
        documents: [
          'Hợp đồng bảo hiểm ô tô hiện có (証券番号)',
          'Thông tin xe máy: ナンバー, 排気量',
        ],
        tip: 'ファミリーバイク特約 là lựa chọn rẻ nhất và đơn giản nhất cho 原付. Nếu gia đình có ô tô, đây là bước đầu tiên nên kiểm tra trước khi mua bảo hiểm riêng.',
      },
      {
        step: 3,
        title: 'Mua 任意保険 riêng nếu không đủ điều kiện ファミリーバイク特約',
        description: 'Nếu không có ô tô trong gia đình hoặc xe > 125cc, mua 任意保険 riêng:\n\nCông ty lớn để so sánh: 損保ジャパン, 東京海上日動, 三井住友海上, AIG.\n\nBước thực hiện:\n1. Truy cập trang bảo hiểm trực tuyến hoặc gọi đại lý.\n2. Nhập thông tin: loại xe, 排気量, năm sản xuất, số năm có bằng lái, lịch sử tai nạn.\n3. Chọn mức bảo hiểm: ít nhất cần 対人・対物 vô hạn. 人身傷害 và 搭乗者傷害 nên có.\n4. Chọn mức 免責 (khấu trừ) — giảm phí nhưng phải tự trả một phần khi có sự cố.\n5. Thanh toán và nhận 証明書 (giấy xác nhận bảo hiểm).\n\nMang theo 証明書 bên người khi đi xe.',
        documents: [
          'Bằng lái xe (運転免許証)',
          'Thông tin xe: ナンバー, 車台番号, 排気量',
          '自賠責保険証 hiện có',
        ],
        tip: 'Nếu bằng lái còn mới và tuổi trẻ, phí sẽ cao hơn nhiều. Cách hạ phí: chọn 年齢条件 phù hợp (phổ biến: toàn độ tuổi = đắt hơn, 21歳以上 = rẻ hơn nếu bạn đủ tuổi). Không khai sai tuổi vì bị phát hiện sẽ mất quyền bồi thường.',
        image: require('../../../../../assets/content/daily-life/ag_moto-insurance_s3.jpg'),
        imageCaption: 'Điền đơn 任意保険 online hoặc tại đại lý — ít nhất cần 対人・対物 vô hạn',
      },
      {
        step: 4,
        title: 'Biết phải làm gì khi xảy ra tai nạn',
        description: 'Ngay tại hiện trường:\n1. Đảm bảo an toàn — di chuyển xe ra khỏi làn xe nếu được.\n2. Nếu có người bị thương: gọi 119 (cấp cứu) ngay.\n3. Gọi 110 (cảnh sát) — bắt buộc kể cả tai nạn nhỏ để lập biên bản 交通事故証明書 (cần cho bảo hiểm).\n4. Không di chuyển xe trước khi cảnh sát đến (trừ khi cản trở giao thông).\n5. Trao đổi thông tin: tên, địa chỉ, số điện thoại, ナンバー xe, tên công ty bảo hiểm.\n6. Gọi hotline công ty bảo hiểm của bạn — số in trên 証明書 bảo hiểm.\n\nKHÔNG nên:\n• Nhận lỗi hoặc đồng ý bồi thường tại chỗ trước khi có bảo hiểm can thiệp.\n• Ký bất kỳ giấy tờ nào tại hiện trường.\n• Rời đi nếu là bên gây tai nạn — đây là 当て逃げ, bị phạt nặng.',
        documents: [],
        tip: 'Lưu hotline công ty bảo hiểm vào danh bạ ngay hôm nay — khi tai nạn xảy ra, bạn không có thời gian tìm số. Phần lớn công ty bảo hiểm có dịch vụ điện thoại 24 giờ.',
        image: require('../../../../../assets/content/daily-life/ag_moto-insurance_s4.jpg'),
        imageCaption: 'Gọi hotline công ty bảo hiểm ngay tại hiện trường — số in trên 証明書 luôn mang theo',
      },
    ],
  };

export default motorcycleVoluntaryInsurance;
