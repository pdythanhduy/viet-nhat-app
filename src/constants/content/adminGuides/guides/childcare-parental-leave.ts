import type { AdminGuide } from '../../../../types/content';

const childcareParentalLeave: AdminGuide = {
    id: 'childcare-parental-leave',
    category: 'daily-law',
    lastVerified: '2026-08-22',
    priority: 'high',
    title: 'Nghỉ sinh và nghỉ nuôi con (育児休業)',
    titleJp: '育児休業・産後パパ育休・育児休業給付金',
    icon: 'happy-outline',
    color: '#1E8449',
    description: 'Người lao động tại Nhật có quyền nghỉ để chăm con nhỏ và nhận 育児休業給付金 từ ハローワーク. Luật sửa đổi 2022–2025 mở rộng quyền cho cả cha và mẹ, kể cả người nước ngoài cư trú hợp pháp.',
    heroImage: require('../../../../../assets/content/daily-life/ag_parental-leave_hero.jpg'),
    heroImageCaption: '育児休業 - quyền nghỉ nuôi con và nhận trợ cấp qua ハローワーク',
    whoIsThisFor: [
      'Người đang đi làm tại Nhật và chuẩn bị sinh con hoặc vừa có con nhỏ.',
      'Người muốn biết cha có được nghỉ nuôi con không và sẽ nhận tiền gì trong thời gian nghỉ.',
      'Người lo công ty sẽ không cho nghỉ hoặc chưa rõ mình có đủ điều kiện không.',
    ],
    whenToDo: [
      'Thông báo cho công ty sớm — luật yêu cầu báo trước ít nhất 1 tháng, nhưng nên báo sớm hơn để bàn giao công việc.',
      '産後パパ育休 (nghỉ của cha trong 8 tuần đầu sau sinh): đăng ký với công ty trước ít nhất 2 tuần.',
      '育児休業給付金: nộp qua công ty lên ハローワーク sau khi bắt đầu nghỉ — không cần tự đi ハローワーク.',
    ],
    whereToDo: [
      'Công ty nơi bạn làm: thông báo và làm thủ tục xin nghỉ nội bộ.',
      'ハローワーク: công ty nộp hồ sơ xin 育児休業給付金 thay bạn.',
      '年金事務所 / 健康保険組合: miễn đóng bảo hiểm xã hội trong thời gian nghỉ — công ty thường xử lý tự động.',
    ],
    estimatedTime: 'Thông báo nội bộ và nộp hồ sơ: vài tuần. Tiền trợ cấp bắt đầu chi trả: thường 2–3 tháng sau khi bắt đầu nghỉ (chi trả hồi tố cho giai đoạn đã nghỉ).',
    fees: [
      'Miễn phí — đây là quyền lợi từ 雇用保険 bạn đã đóng trong thời gian làm việc.',
      'Trong thời gian nghỉ 育児休業: miễn đóng 健康保険 và 厚生年金 — không mất quyền lợi bảo hiểm và lương hưu.',
    ],
    documentsChecklist: [
      { label: '育児休業申出書 (đơn xin nghỉ nộp cho công ty)', required: true, note: 'Mẫu do công ty cấp. Một số nơi có quy định nội bộ riêng.' },
      { label: 'Giấy khai sinh hoặc giấy xác nhận mang thai', required: true, note: 'Chứng minh quan hệ với con.' },
      { label: '雇用保険被保険者証 (thẻ bảo hiểm thất nghiệp)', required: false, note: 'Công ty thường có sẵn — dùng để nộp hồ sơ 給付金 lên ハローワーク.' },
    ],
    commonMistakes: [
      'Nghĩ chỉ có mẹ mới được nghỉ — cha cũng có quyền và nhận trợ cấp, kể cả nghỉ 産後パパ育休 ngay sau sinh.',
      'Không thông báo công ty đúng thời hạn khiến thủ tục bị trễ và tiền về muộn.',
      'Lo công ty "gây khó" mà không dám xin — pháp luật nghiêm cấm sa thải hoặc trả thù người xin nghỉ 育児休業.',
      'Không biết tiền trợ cấp trả hồi tố — nhiều người lo không có tiền giai đoạn đầu, nhưng tiền sẽ về sau tính từ ngày bắt đầu nghỉ.',
      'Nghĩ không đủ điều kiện vì đang là hợp đồng ngắn hạn — từ 2022, điều kiện được nới, nên hỏi lại công ty hoặc ハローワーク để xác nhận.',
    ],
    faq: [
      {
        question: '育児休業給付金 nhận được bao nhiêu?',
        answer: '厚生労働省 công bố mức hiện hành: 67% lương trước khi nghỉ trong 180 ngày đầu, 50% từ ngày 181 trở đi. Từ 2025-04-01 có thêm 出生後休業支援給付金: nếu cả cha và mẹ cùng nghỉ ≥14 ngày trong vòng 8 tuần sau sinh (16 tuần nếu mẹ nghỉ sản), được cộng thêm 13% → tổng ≈ 80% lương gross (xấp xỉ 100% lương ròng take-home), áp dụng tối đa 28 ngày. Kiểm tra bảng tính mới nhất trên trang ハローワーク.',
      },
      {
        question: 'Hợp đồng thời hạn có được nghỉ không?',
        answer: 'Theo luật sửa đổi từ 2022, lao động hợp đồng không còn bắt buộc phải làm việc 1 năm mới được nghỉ như trước. Điều kiện cụ thể phụ thuộc nội dung hợp đồng — nên xác nhận trực tiếp với HR hoặc ハローワーク.',
      },
      {
        question: 'Công ty từ chối cho nghỉ hoặc gây áp lực thì làm gì?',
        answer: '育児・介護休業法 nghiêm cấm công ty cản trở quyền nghỉ hoặc xử lý bất lợi với người xin nghỉ. Nếu gặp tình huống này, liên hệ 都道府県労働局の雇用環境・均等部 (室) để được tư vấn và hỗ trợ giải quyết.',
      },
      {
        question: 'Sau khi nghỉ, có thể xin gia hạn không?',
        answer: 'Có — nếu không tìm được chỗ nhà trẻ, có thể gia hạn đến 1 năm 6 tháng, và thêm đến 2 tuổi nếu vẫn chưa có chỗ. Cần có 不承諾通知書 (giấy từ chối nhà trẻ) từ phường khi xin gia hạn.',
      },
    ],
    officialLinks: [
      { label: '育児休業給付について — ハローワーク', url: 'https://www.hellowork.mhlw.go.jp/insurance/insurance_childcareleave.html' },
      { label: '育児・介護休業法のあらまし — 厚生労働省', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/000103504.html' },
      { label: '産後パパ育休（出生時育児休業）— 厚生労働省', url: 'https://www.mhlw.go.jp/seisakunitsuite/bunya/koyou_roudou/koyoukintou/ryouritsu/ikuji/paternity/' },
      { label: '育児休業等給付について — 厚生労働省', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000135090_00001.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Thông báo công ty sớm',
        description: 'Nộp 育児休業申出書 cho HR/nhân sự. Luật yêu cầu báo trước ít nhất 1 tháng cho 育児休業 thông thường, và 2 tuần cho 産後パパ育休. Thực tế nên báo sớm hơn để bàn giao công việc.',
        documents: ['育児休業申出書', 'Giấy khai sinh hoặc giấy xác nhận mang thai'],
        tip: 'Nếu công ty chưa có quy trình rõ, yêu cầu HR cung cấp mẫu đơn và xác nhận ngày bắt đầu/kết thúc nghỉ bằng văn bản.',
      },
      {
        step: 2,
        title: 'Công ty nộp hồ sơ 育児休業給付金 lên ハローワーク',
        description: 'Công ty (không phải bạn) nộp hồ sơ lên ハローワーク thay mặt bạn. Tiền được chuyển thẳng vào tài khoản ngân hàng theo chu kỳ 2 tháng một lần, hồi tố từ ngày bắt đầu nghỉ.',
        documents: [],
        tip: 'Theo dõi với HR để đảm bảo hồ sơ được nộp đúng hạn — trễ hồ sơ sẽ làm trễ tiền về.',
        image: require('../../../../../assets/content/daily-life/ag_childcare-leave_s2.jpg'),
        imageCaption: 'Hồ sơ 育児休業給付金 do công ty nộp lên ハローワーク để nhận trợ cấp nghỉ nuôi con',
      },
      {
        step: 3,
        title: 'Miễn đóng bảo hiểm xã hội trong thời gian nghỉ',
        description: 'Phí 健康保険 và 厚生年金 của cả người lao động lẫn công ty đều được miễn trong thời gian nghỉ 育児休業. Công ty xử lý tự động với 年金事務所. Quyền hưởng bảo hiểm y tế vẫn giữ nguyên.',
        documents: [],
        tip: 'Sau khi đi làm lại, lương tháng đầu tiên có thể bị trừ bảo hiểm nhiều hơn bình thường do điều chỉnh — đây là bình thường.',
      },
      {
        step: 4,
        title: 'Trở lại làm hoặc xin gia hạn',
        description: 'Báo công ty ngày đi làm lại trước ít nhất 2 tuần. Nếu cần gia hạn vì chưa tìm được nhà trẻ, nộp 育児休業期間変更申出書 kèm 不承諾通知書 từ phường xác nhận không có chỗ nhà trẻ.',
        documents: ['育児休業期間変更申出書 (nếu gia hạn)', '不承諾通知書 từ phường (nếu gia hạn)'],
        tip: 'Nộp đơn xin nhà trẻ (保育園) sớm — thường phải nộp trước 4–6 tháng, ngay cả khi con chưa đến tuổi nhận.',
        image: require('../../../../../assets/content/daily-life/ag_childcare-leave_s1.jpg'),
        imageCaption: 'Văn bản thông báo nghỉ 育児休業 — nộp cho công ty ít nhất 1 tháng trước ngày nghỉ',
      },
    ],
  };

export default childcareParentalLeave;
