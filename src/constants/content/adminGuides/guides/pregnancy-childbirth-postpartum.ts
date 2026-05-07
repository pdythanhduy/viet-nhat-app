import type { AdminGuide } from '../../../../types/content';

const pregnancyChildbirthPostpartum: AdminGuide = {
    id: 'pregnancy-childbirth-postpartum',
    category: 'health',
    lastVerified: '2026-04-11',
    priority: 'high',
    title: 'Mang thai, sinh con và sau sinh ở Nhật',
    titleJp: '妊娠・出産・産後の手続き',
    icon: 'heart-circle',
    color: '#D35454',
    description: 'Hướng dẫn thực tế cho người Việt mang thai, sinh con và làm thủ tục sau sinh tại Nhật: mẹ bầu, trợ cấp sinh, giấy khai sinh, cư trú của em bé, 児童手当 và việc mời người thân sang hỗ trợ.',
    heroImage: require('../../../../../assets/content/daily-life/ag_pregnancy_hero.jpg'),
    heroImageCaption: 'Hành trình mang thai và sinh con tại Nhật',
    whoIsThisFor: [
      'Người đang mang thai hoặc chuẩn bị sinh con tại Nhật.',
      'Gia đình cần biết sau khi sinh phải đi city hall, bảo hiểm và ISA theo thứ tự nào.',
      'Người muốn gọi cha mẹ sang hỗ trợ sau sinh nhưng chưa rõ nên đi ngắn hạn hay có ngoại lệ ở dài hạn.',
    ],
    whenToDo: [
      'Ngay khi biết có thai để làm 妊娠届 và nhận 母子健康手帳 cùng phiếu hỗ trợ khám thai của địa phương.',
      'Trước ngày sinh để chốt bệnh viện, kiểm tra cách nhận 出産育児一時金 và nếu đang đi làm thì chuẩn bị giấy tờ nghỉ thai sản/出産手当金.',
      'Ngay sau khi sinh để không trễ các mốc rất quan trọng như 出生届 14 ngày, 在留資格取得 nếu con là người nước ngoài và 児童手当 15 ngày.',
    ],
    whereToDo: [
      'City hall / ward office: 妊娠届, 母子健康手帳, 出生届, đăng ký cư trú của em bé, 児童手当 và nhiều trợ cấp địa phương.',
      'Bệnh viện / phòng khám: giấy chứng sinh, hóa đơn, thỏa thuận trực tiếp thanh toán 出産育児一時金, hồ sơ khám thai và sinh nở.',
      'Bảo hiểm y tế hoặc 協会けんぽ: 出産育児一時金, 出産手当金 hoặc thủ tục chênh lệch/hoàn trả tùy cách thanh toán.',
      'ISA: 在留資格取得許可申請 nếu con là người nước ngoài sẽ ở Nhật quá 60 ngày.',
      'Đại sứ quán / Lãnh sự quán của nước mang quốc tịch của cha mẹ: đăng ký khai sinh theo quốc tịch và xin hộ chiếu cho em bé khi cần.',
    ],
    estimatedTime: 'Có nhiều mốc chồng lên nhau. Thực tế gia đình thường phải xử lý trong 2 nhóm thời gian: trước sinh vài tuần để chốt bệnh viện, bảo hiểm, nghỉ việc; và sau sinh 14 đến 30 ngày để làm khai sinh, trợ cấp và cư trú cho em bé.',
    fees: [
      'Theo MHLW và 協会けんぽ, 出産育児一時金 hiện nguyên tắc là 500,000 yên mỗi bé khi sinh từ 22 tuần trở lên tại cơ sở thuộc産科医療補償制度; một số trường hợp là 488,000 yên.',
      'Chi phí sinh thực tế có thể cao hơn hoặc thấp hơn khoản trợ cấp này. Nếu cao hơn, gia đình phải trả phần chênh; nếu thấp hơn, có thể nhận lại phần dư tùy chế độ thanh toán.',
      '帝王切開 và một số can thiệp y tế là phần có thể áp dụng bảo hiểm y tế; trong trường hợp chi phí bảo hiểm cao, có thể liên quan đến高額療養費.',
      'Các hỗ trợ như khám thai, khám sơ sinh, trợ cấp địa phương, phí giấy tờ, dịch thuật hoặc hộ chiếu cho em bé tùy thành phố và quốc tịch nên không có một mức chung toàn quốc.',
    ],
    documentsChecklist: [
      { label: 'Thẻ cư trú, My Number / giấy tờ bảo hiểm của cha mẹ', required: true },
      { label: '母子健康手帳 (sổ mẹ con) và phiếu khám thai của địa phương', required: true },
      { label: 'Giấy tờ bệnh viện: giấy chứng sinh, hóa đơn, thỏa thuận trực tiếp thanh toán 出産育児一時金', required: true },
      { label: 'Thông tin tài khoản ngân hàng để nhận các khoản trợ cấp', required: true },
      { label: 'Giấy chứng minh quốc tịch của cha mẹ và yêu cầu của đại sứ quán để làm khai sinh/hộ chiếu cho em bé', required: false },
      { label: 'Nếu con là người nước ngoài: hồ sơ để xin 在留資格取得許可', required: false, note: 'Rất quan trọng nếu em bé ở Nhật quá 60 ngày.' },
      { label: 'Nếu muốn mời cha mẹ sang hỗ trợ: hồ sơ visa thăm thân ngắn hạn hoặc giấy tờ ngoại lệ 高度専門職', required: false },
    ],
    commonMistakes: [
      'Tập trung vào việc sinh xong rồi mới nghĩ tới thủ tục, dẫn tới trễ 出生届 hoặc 児童手当.',
      'Nhầm rằng sinh con ở Nhật thì con tự động có quốc tịch Nhật.',
      'Quên rằng nếu cả cha và mẹ đều là người nước ngoài, con sinh ở Nhật mà ở quá 60 ngày thì phải làm 在留資格取得許可 trong 30 ngày từ ngày sinh.',
      'Nghĩ 出産育児一時金 là tiền mặt chắc chắn nhận đủ 500,000 yên vào tài khoản, trong khi thực tế thường đi qua cơ chế bệnh viện nhận trực tiếp hoặc chỉ nhận phần chênh.',
      'Nhầm rằng cha mẹ sang hỗ trợ sau sinh thì có thể ở dài hạn như diện 家族滞在.',
    ],
    faq: [
      {
        question: 'Có thai ở Nhật thì việc đầu tiên nên làm là gì?',
        answer: 'Việc hành chính đầu tiên thường là nộp 妊娠届 tại city hall để nhận 母子健康手帳. MHLW nêu đây là sổ sức khỏe mẹ con rất quan trọng; thủ tục và giấy tờ cụ thể do từng địa phương quy định.',
      },
      {
        question: 'Sinh con ở Nhật thì con có tự động có quốc tịch Nhật không?',
        answer: 'Không nên mặc định như vậy. ISA nêu rõ nếu cả cha và mẹ đều có quốc tịch nước ngoài thì việc sinh ở Nhật không tự động làm em bé có quốc tịch Nhật. Gia đình phải làm thủ tục khai sinh theo quốc tịch của cha hoặc mẹ và xin hộ chiếu cho em bé theo hướng dẫn của cơ quan ngoại giao liên quan.',
      },
      {
        question: 'Con sinh ở Nhật là người nước ngoài thì khi nào phải làm hồ sơ cư trú?',
        answer: 'Theo ISA, nếu em bé sẽ ở Nhật quá 60 ngày thì phải nộp 在留資格取得許可申請 trong vòng 30 ngày kể từ ngày sinh. Trước mốc 60 ngày em bé được ở Nhật mà chưa có tư cách lưu trú, nhưng nếu định ở lại lâu hơn thì không nên để quá hạn nộp hồ sơ.',
      },
      {
        question: '児童手当 sau khi sinh có tự động có không?',
        answer: 'Không. こども家庭庁 nêu khi có con sinh ra thì phải nộp 認定請求 tại city hall nơi đang cư trú. Mốc quan trọng là trong vòng 15 ngày từ ngày sau ngày sinh; nộp muộn có thể mất tháng trợ cấp đáng ra được hưởng.',
      },
      {
        question: 'Cha mẹ có thể sang chăm con gái sau sinh bằng diện ở dài hạn không?',
        answer: 'Trong đa số trường hợp là không. Phương án thực tế thường là visa thăm thân ngắn hạn. Ngoại lệ ở dài hạn chỉ rất hẹp và gắn với 高度専門職/J-Skip theo diện 特定活動, đúng như guide riêng về cha mẹ đã giải thích.',
      },
    ],
    officialLinks: [
      { label: '母子健康手帳 — 厚生労働省', url: 'https://www.bosei-navi.mhlw.go.jp/glossary/life01.html' },
      { label: 'すこやかな妊娠と出産のために — 厚生労働省', url: 'https://www.mhlw.go.jp/bunya/kodomo/boshi-hoken10/index.html' },
      { label: '出産育児一時金等について — 厚生労働省', url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussan/index.html' },
      { label: '出産育児一時金 — 協会けんぽ', url: 'https://www.kyoukaikenpo.or.jp/benefit/childbirth/002/index.html' },
      { label: '児童手当制度のご案内 — こども家庭庁', url: 'https://www.cfa.go.jp/policies/kokoseido/jidouteate/annai/' },
      { label: '在留資格取得許可申請 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/procedures/16-10.html' },
      { label: '出生届 — 法務省', url: 'https://www.moj.go.jp/ONLINE/FAMILYREGISTER/5-1.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Khi biết có thai: làm 妊娠届 và nhận 母子健康手帳',
        description: 'Theo MHLW, khi mang thai bạn nên nhanh chóng làm 妊娠届 tại city hall để được cấp 母子健康手帳. Thực tế nhiều địa phương đi kèm phiếu hỗ trợ khám thai, tư vấn sinh nở, lớp học cha mẹ và các thông tin trợ cấp địa phương.',
        documents: [
          'Giấy tờ tùy thân và thông tin cư trú',
          'Thẻ bảo hiểm / My Number nếu địa phương yêu cầu',
          'Giấy xác nhận mang thai nếu địa phương hoặc bệnh viện yêu cầu',
        ],
        tip: 'Pháp luật không ấn định một ngày chót cứng cho 妊娠届, nhưng MHLW khuyến khích làm sớm; trên thực tế làm sớm sẽ đỡ mất quyền lợi khám thai được hỗ trợ.',
        image: require('../../../../../assets/content/daily-life/ag_pregnancy_s1.jpg'),
        imageCaption: 'Cuốn 母子健康手帳 nhận tại 役所 — theo dõi toàn bộ thai kỳ và sức khỏe trẻ',
      },
      {
        step: 2,
        title: 'Trước khi sinh: chốt bệnh viện, kiểm tra bảo hiểm và khoản tiền sinh',
        description: 'Trước ngày sinh, gia đình nên xác nhận bệnh viện đã đặt chỗ, có dùng trực tiếp thanh toán 出産育児一時金 hay không, và nếu người mẹ đang đi làm thì hỏi rõ công ty/bảo hiểm về nghỉ trước sinh, sau sinh và 出産手当金.',
        documents: [
          'Mẫu thỏa thuận trực tiếp thanh toán với bệnh viện nếu có',
          'Giấy tờ bảo hiểm của người mẹ hoặc người bảo hiểm chính',
          'Thông tin công ty, nghỉ thai sản và mẫu申請 nếu đang tham gia保険 của doanh nghiệp',
        ],
        tip: '500,000 yên không có nghĩa là bệnh viện miễn phí. Ở nhiều nơi, chi phí sinh vẫn cao hơn nên gia đình cần chuẩn bị phần chênh.',
      },
      {
        step: 3,
        title: 'Sau khi sinh: làm 出生届 trong 14 ngày',
        description: 'Pháp vụ Nhật nêu rõ 出生届 phải nộp trong vòng 14 ngày kể từ ngày sinh tại city hall/ward office có thẩm quyền. Đây là mốc cứng, nên đừng để quá hạn vì nghĩ rằng bệnh viện sẽ tự làm hộ.',
        documents: [
          'Mẫu 出生届 có phần出生証明書 do bác sĩ/hộ sinh lập',
          'Thông tin cha mẹ và địa chỉ cư trú',
          'Con dấu nếu địa phương hoặc người nộp vẫn sử dụng',
        ],
        tip: 'Hãy hỏi bệnh viện ngay lúc xuất viện xem giấy出生証明書 khi nào nhận được, vì đây là giấy gốc quan trọng cho bước khai sinh.',
        image: require('../../../../../assets/content/daily-life/ag_pregnancy_s3.jpg'),
        imageCaption: 'Nộp 出生届 trong 14 ngày sau sinh tại 市区町村役所',
      },
      {
        step: 4,
        title: 'Làm quốc tịch, hộ chiếu và tư cách lưu trú của em bé',
        description: 'Nếu em bé không có quốc tịch Nhật, gia đình phải đồng thời nghĩ tới 2 việc: đăng ký khai sinh/hộ chiếu theo quốc tịch của cha hoặc mẹ tại đại sứ quán, và nếu em bé ở Nhật quá 60 ngày thì nộp 在留資格取得許可 trong vòng 30 ngày kể từ ngày sinh.',
        documents: [
          'Giấy khai sinh/出生届 đã nộp hoặc giấy tờ liên quan theo yêu cầu của đại sứ quán',
          'Hộ chiếu hoặc giấy tờ quốc tịch của cha mẹ',
          'Hồ sơ xin 在留資格取得許可 cho em bé nếu ở quá 60 ngày',
        ],
        tip: 'Nhiều gia đình nhầm rằng chỉ cần làm ở đại sứ quán là xong. Nếu em bé sẽ cư trú tiếp ở Nhật, bước với ISA là mốc riêng và rất quan trọng.',
      },
      {
        step: 5,
        title: 'Xin 児童手当 và kiểm tra trợ cấp địa phương',
        description: 'こども家庭庁 nêu rõ sau khi có con sinh ra, người nuôi dưỡng phải nộp 認定請求 để nhận 児童手当. Nguyên tắc rất quan trọng là nộp trong vòng 15 ngày từ ngày sau ngày sinh để tránh mất tháng trợ cấp. Ngoài 児童手当, thành phố còn có thể có trợ cấp sinh con, khám sơ sinh và hỗ trợ y tế riêng.',
        documents: [
          'Đơn 認定請求 của địa phương',
          'Giấy tờ tài khoản ngân hàng người nhận',
          'Giấy tờ tham gia bảo hiểm / lương hưu theo hướng dẫn của địa phương',
        ],
        tip: 'Đừng giả định city hall sẽ tự động cấp vì đã có 出生届. Ở nhiều nơi đây là bộ hồ sơ khác, phải nộp riêng.',
      },
      {
        step: 6,
        title: 'Nếu muốn gọi người thân sang hỗ trợ sau sinh',
        description: 'Phương án thực tế và phổ biến nhất là visa thăm thân ngắn hạn cho cha mẹ hoặc người thân sang hỗ trợ một thời gian. Nếu bạn không thuộc 高度専門職/J-Skip, đừng hứa với gia đình rằng có thể làm diện ở dài hạn chỉ để chăm mẹ sau sinh hoặc chăm cháu.',
        documents: [
          'Hồ sơ visa thăm thân ngắn hạn',
          'Giấy tờ chứng minh quan hệ và lý do chuyến đi',
          'Nếu thuộc ngoại lệ 高度専門職: hồ sơ theo guide cha mẹ / người thân lớn tuổi',
        ],
        tip: 'Sau sinh là lúc gia đình dễ nghe theo tư vấn cảm tính. Cứ tách thành hai câu hỏi: “sang thăm vài tuần/vài tháng” hay “ở lâu dài”. Đa số chỉ hợp pháp ở vế đầu.',
      },
    ],
  };

export default pregnancyChildbirthPostpartum;
