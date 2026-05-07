import type { AdminGuide } from '../../../../types/content';

const kokuhoReduction: AdminGuide = {
    id: 'kokuho-reduction',
    category: 'health',
    lastVerified: '2026-05-02',
    priority: 'high',
    title: 'Giảm phí bảo hiểm y tế quốc dân',
    titleJp: '国民健康保険料（税）の軽減・減額申請',
    icon: 'medkit',
    color: '#27AE60',
    description: 'Khi thu nhập thấp hoặc mất việc, phí 国民健康保険 có thể được giảm tự động hoặc theo đơn xin — nhiều người không biết và bỏ lỡ quyền lợi này.',
    heroImage: require('../../../../../assets/content/daily-life/ag_kokuho-reduction_hero.jpg'),
    heroImageCaption: 'Xin giảm phí 国民健康保険 khi thu nhập thấp',
    whoIsThisFor: [
      'Người thuộc 国民健康保険 (tự đóng, không qua công ty) với thu nhập thấp hoặc không có thu nhập.',
      'Người vừa nghỉ việc, bị sa thải hoặc công ty phá sản và chuyển sang 国保.',
      'Du học sinh hoặc người mới sang Nhật với thu nhập thấp trong năm đầu.',
    ],
    whenToDo: [
      'Ngay khi nhận thông báo phí 国保 có vẻ cao so với thu nhập thực tế.',
      'Ngay khi nghỉ việc không tự nguyện (bị sa thải, hợp đồng không gia hạn, công ty phá sản) — giảm phí đặc biệt áp dụng từ ngày hôm sau ngày nghỉ.',
      'Nếu thu nhập năm trước thấp, kiểm tra xem có thuộc diện giảm tự động không — không cần nộp đơn nhưng cần khai báo thu nhập đúng.',
    ],
    whereToDo: [
      '市区町村役場 — quầy 国民健康保険 hoặc 保険年金課.',
      'Không thể làm online hoặc qua bưu điện — bắt buộc đến quầy.',
    ],
    estimatedTime: 'Nộp tại quầy: 20–40 phút. Giảm phí thường áp dụng ngay trong tháng nộp hoặc hồi tố từ đầu năm tài khóa.',
    fees: ['Không mất phí — đây là chương trình hỗ trợ của nhà nước.'],
    documentsChecklist: [
      { label: 'Thẻ 国民健康保険', required: true },
      { label: 'Thẻ cư trú (在留カード)', required: true },
      { label: '雇用保険受給資格者証 hoặc 雇用保険受給資格通知', required: false, note: 'Chỉ cần khi xin giảm phí đặc biệt do nghỉ việc không tự nguyện.' },
      { label: 'Giấy tờ thu nhập năm trước (源泉徴収票, 確定申告の控え)', required: false, note: 'Để xác nhận thu nhập nếu chưa khai báo với municipal office.' },
      { label: 'My Number Card hoặc giấy tờ xác nhận danh tính', required: true },
    ],
    commonMistakes: [
      'Nghĩ phí 国保 cố định và không thể thay đổi — thực ra có thể giảm đáng kể nếu đủ điều kiện.',
      'Không khai báo thu nhập với municipal office — nếu không khai, hệ thống không biết thu nhập thấp và không tự động giảm.',
      'Xin giảm phí đặc biệt quá 1 năm sau ngày nghỉ việc — hết hạn và mất quyền hồi tố.',
      'Đóng phí đầy đủ rồi mới xin giảm — giảm phí áp dụng cho phần chưa đóng, phần đã đóng không được hoàn lại theo quy định thông thường.',
    ],
    faq: [
      {
        question: 'Giảm phí tự động có cần nộp đơn không?',
        answer: 'Giảm tự động theo thu nhập (均等割軽減) không cần nộp đơn riêng, nhưng cần đảm bảo municipal office đã có dữ liệu thu nhập của bạn — thông qua khai báo 住民税 hàng năm (5/31). Nếu chưa khai, hãy đến khai để hệ thống tự tính giảm.',
      },
      {
        question: 'Giảm đặc biệt do thất nghiệp áp dụng bao lâu?',
        answer: 'Áp dụng từ ngày hôm sau ngày nghỉ việc đến hết năm tài khóa tiếp theo (最長で離職日の翌日から翌翌年度末). Ví dụ nghỉ tháng 8/2025 → giảm áp dụng đến 3/2027. Nhưng phải nộp trong vòng 1 năm kể từ ngày nghỉ.',
      },
      {
        question: 'Du học sinh có được giảm phí không?',
        answer: 'Có thể được giảm tự động nếu thu nhập thấp. Du học sinh thường thuộc diện 7割 hoặc 5割 nếu không có thu nhập đáng kể. Cần đảm bảo đã khai báo thu nhập 0 hoặc thực tế qua 住民税申告.',
      },
      {
        question: 'Phí 国保 tính như thế nào để biết mình có bị giảm không?',
        answer: '国保 gồm 2 phần: 所得割 (tỷ lệ theo thu nhập) và 均等割 (cố định theo đầu người). Giảm phí tự động tác động vào phần 均等割. Mỗi municipality có mức phí khác nhau — tra cứu trang web thành phố/quận hoặc hỏi trực tiếp tại quầy.',
      },
    ],
    officialLinks: [
      { label: '国民健康保険の保険料・保険税について — 厚生労働省', url: 'https://www.mhlw.go.jp/stf/newpage_21517.html' },
      { label: '非自発的失業者の国保軽減 — 渋谷区（例）', url: 'https://www.city.shibuya.tokyo.jp/kurashi/kokuho/kenkohokenryo/hokenryo_hijihatsu.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Kiểm tra bạn có thuộc diện giảm tự động không',
        description: 'Nhà nước tự động giảm phần **均等割** (cố định theo đầu người) nếu thu nhập cả hộ gia đình thấp. Ngưỡng **令和8年度** (từ 4/2026):\n\n| Mức giảm | Điều kiện thu nhập hộ gia đình |\n|---|---|\n| **7割減** (giảm 70%) | ≤ 43万円 (*) |\n| **5割減** (giảm 50%) | ≤ 43万円 + **31万円 × số người tham gia 国保** (*) |\n| **2割減** (giảm 20%) | ≤ 43万円 + **57万円 × số người tham gia 国保** (*) |\n\n(*) Cộng thêm 10万円 nếu trong hộ có ≥2 người đi làm có lương (給与所得者等).\n\n⚠️ Đây là thu nhập theo nghĩa "所得" sau các khoản khấu trừ, không phải tổng tiền nhận — người không có thu nhập tính là 0, không phải "thiếu dữ liệu". Phải khai báo thu nhập 0 mới được tính.',
        documents: ['Thông báo 国保 có ghi mức phí hiện tại', 'Giấy khai báo thu nhập hoặc xác nhận thu nhập 0'],
        image: require('../../../../../assets/content/daily-life/ag_kokuho-reduction_s1.jpg'),
        imageCaption: '国民健康保険料通知書 - kiểm tra mức phí và phần giảm tự động nếu thu nhập thấp',
        tip: 'Nếu bạn là người duy nhất trong hộ, tham gia 国保 một mình không có thu nhập → Thu nhập hộ = 0 ≤ 43万円 → thuộc diện 7割減. Nhưng cần đã khai báo thu nhập 0 với municipal office.',
      },
      {
        step: 2,
        title: 'Nếu vừa mất việc không tự nguyện — xin giảm phí đặc biệt',
        description: 'Chương trình **非自発的失業者の国保軽減** (giảm phí đặc biệt khi thất nghiệp không tự nguyện):\n\n**Điều kiện:**\n- Thuộc 国民健康保険\n- Dưới 65 tuổi\n- Có 雇用保険受給資格者証 với mã 離職理由 thuộc nhóm: 11, 12, 21, 22, 23, 31, 32, 33, 34 (bị sa thải, hợp đồng không gia hạn, công ty phá sản...)\n\n**Cách giảm:** Municipal office tính lại phí bằng cách coi **thu nhập làm lương năm trước chỉ tính 30%** (phần còn lại 70% bị bỏ qua). Giảm đáng kể phần 所得割.\n\n**Thời hạn:** Áp dụng từ ngày sau ngày nghỉ việc đến hết năm tài khóa tiếp theo. Phải nộp trong vòng 1 năm từ ngày nghỉ.\n\n**Hồ sơ:**\n| Giấy tờ | Ghi chú |\n|---|---|\n| 雇用保険受給資格者証 | Bản gốc + bản sao, xác nhận mã 離職理由 |\n| 在留カード | Bản gốc |\n| 国民健康保険証 | Thẻ bảo hiểm hiện tại |\n| My Number Card hoặc giấy tờ tùy thân | |\n\nForm **nhận tại quầy** municipal office — không có form quốc gia để tải trước.',
        documents: ['雇用保険受給資格者証 (bản gốc)', '在留カード', '国民健康保険証'],
        image: require('../../../../../assets/content/daily-life/ag_kokuho-reduction_s2.jpg'),
        imageCaption: '雇用保険受給資格者証 - mã 離職理由 dùng để xin giảm phí 国保 khi mất việc không tự nguyện',
        tip: 'Mã 離職理由 in trên 雇用保険受給資格者証. Các mã 11 (会社都合解雇), 23 (雇い止め), 33 (上司のパワハラ) v.v. đều thuộc diện. Nếu không rõ mã của mình, hỏi nhân viên quầy.',
      },
      {
        step: 3,
        title: 'Nếu gặp khó khăn tài chính đặc biệt — xin giảm/miễn theo hoàn cảnh',
        description: 'Ngoài 2 chương trình trên, nhiều municipal office có chương trình **減免** (giảm/miễn) riêng theo hoàn cảnh khó khăn cụ thể:\n\n- Thiên tai, hỏa hoạn ảnh hưởng tài sản\n- Thu nhập giảm đột ngột do tai nạn, bệnh tật\n- Khó khăn kinh tế khác theo quyết định của municipality\n\nCác chương trình này **không chuẩn hóa toàn quốc** — tên, điều kiện và mức giảm khác nhau mỗi nơi. Hỏi trực tiếp quầy 保険年金課 để biết municipality của bạn có chương trình nào phù hợp.',
        documents: [],
        tip: 'Nếu đang khó khăn nhưng không chắc có đủ điều kiện không, cứ đến quầy hỏi — nhân viên sẽ tự kiểm tra và tư vấn phương án phù hợp nhất cho hoàn cảnh của bạn.',
      },
      {
        step: 4,
        title: 'Khai báo thu nhập đúng hạn — bước nền tảng',
        description: 'Cả giảm tự động và nhiều chương trình giảm khác đều dựa trên **dữ liệu thu nhập** mà municipal office có. Nếu bạn không khai báo, hệ thống không biết và không giảm.\n\n**Cách khai:**\n- Nếu đi làm: công ty khấu trừ thuế và báo cáo cho cơ quan thuế — dữ liệu tự động có.\n- Nếu không đi làm / thu nhập 0: phải tự đến khai báo 住民税の申告 trước 31/5 hàng năm tại municipal office.\n- Nếu đã nộp 確定申告: dữ liệu tự động có.\n\n⚠️ Không khai báo = hệ thống coi bạn có thu nhập không xác định → không được giảm tự động.',
        documents: ['源泉徴収票 (nếu có)', 'Hoặc tự khai báo thu nhập 0 tại municipal office'],
        tip: 'Ngay cả khi không có thu nhập, đến khai báo 住民税 (0円申告) trước 31/5 là bước quan trọng để được hưởng giảm 国保 và 住民税 đúng mức.',
      },
    ],
  };

export default kokuhoReduction;
