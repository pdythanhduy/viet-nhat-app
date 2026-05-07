import type { AdminGuide } from '../../../../types/content';

const highlySkilledProfessional: AdminGuide = {
    id: 'highly-skilled-professional',
    category: 'visa',
    lastVerified: '2026-05-06',
    priority: 'normal',
    title: 'Visa 高度専門職 — Highly Skilled Professional',
    titleJp: '高度専門職ビザ・ポイント制度',
    icon: 'star',
    color: '#D4AC0D',
    description: 'Tư cách lưu trú 高度専門職 dùng hệ thống tính điểm — người đủ 70 điểm được ưu đãi vượt trội so với visa lao động thông thường. Nhiều người Việt làm IT, nghiên cứu hoặc quản lý đủ điều kiện mà không biết.',
    legalScope: {
      jurisdiction: 'national',
      jurisdictionNote: '高度専門職 là tư cách lưu trú do ISA xét toàn quốc theo hệ thống điểm; công ty/trường chỉ cung cấp tài liệu chứng minh, không quyết định kết quả.',
      sourceVerifiedAt: '2026-05-06',
      nextReviewAt: '2026-12-01',
      riskLevel: 'high',
      whenToAskExpert: [
        'Bạn đổi công ty, đổi nội dung hoạt động hoặc chuyển giữa 高度専門職1号イ/ロ/ハ.',
        'Điểm số sát 70/80, có bằng cấp hoặc kinh nghiệm nước ngoài khó chứng minh.',
        'Bạn muốn dùng 高度専門職 để rút ngắn 永住 hoặc mời cha mẹ/người giúp việc đi cùng.',
      ],
    },
    quickAction: {
      deadline: 'Nộp trước khi bắt đầu hoạt động mới nếu đang đổi nội dung công việc/cơ quan; không chờ đến kỳ gia hạn nếu hoạt động đã thay đổi.',
      office: 'Cục xuất nhập cảnh có thẩm quyền theo nơi cư trú hoặc nơi làm việc.',
      doNow: [
        'Tính điểm bằng bảng ISA đúng nhóm 1号イ/ロ/ハ.',
        'Chỉ cộng các mục có tài liệu chứng minh rõ ràng.',
        'Nếu đang 高度専門職1号 và đổi công ty, hỏi ISA trước vì có thể cần 在留資格変更許可申請.',
      ],
      bring: ['ポイント計算表', 'Tài liệu chứng minh từng mục điểm', 'Hợp đồng/chức vụ/lương', 'Bằng cấp và chứng chỉ', 'Hộ chiếu và thẻ cư trú'],
      ifLate: 'Nếu đã bắt đầu công việc khác hoặc đổi cơ quan mà chưa hỏi ISA, cần xác nhận ngay để tránh làm sai phạm vi hoạt động.',
      officialSourceLabels: [
        '在留資格「高度専門職」— 出入国在留管理庁',
        '高度専門職ポイント計算表 — 出入国在留管理庁',
        '高度人材の優遇措置 — 出入国在留管理庁',
      ],
    },
    heroImage: require('../../../../../assets/content/daily-life/ag_hsp_hero.jpg'),
    heroImageCaption: '高度専門職 - hệ thống điểm giúp rút ngắn đường đến vĩnh trú',
    whoIsThisFor: [
      'Người đang làm việc tại Nhật theo tư cách 技術・人文知識・国際業務 hoặc tương đương, muốn nâng cấp quyền lợi.',
      'Người có bằng thạc sĩ/tiến sĩ, thu nhập khá, kinh nghiệm công việc tại Nhật và muốn rút ngắn đường đến 永住者.',
      'Người chuẩn bị xin visa từ Việt Nam để sang Nhật làm việc trong lĩnh vực kỹ thuật, nghiên cứu hoặc quản lý.',
    ],
    whenToDo: [
      'Bất cứ lúc nào khi đang có tư cách lưu trú hợp lệ tại Nhật — đây là đổi tư cách (在留資格変更), không phải gia hạn.',
      'Nên kiểm tra điểm số trước khi gia hạn visa thường: nếu đủ 70 điểm, đổi sang 高度専門職 có lợi hơn nhiều.',
      'Nếu đang xin visa từ nước ngoài: xin 高度専門職 thẳng thay vì xin visa lao động thông thường nếu đủ điều kiện.',
    ],
    whereToDo: [
      'Cục xuất nhập cảnh (ISA) có thẩm quyền theo nơi cư trú hoặc nơi làm việc.',
      'Bộ phận HR/công ty tiếp nhận: xin hợp đồng, giấy xác nhận chức vụ, lương và mô tả công việc.',
      'Trường đại học, tổ chức cấp bằng, JLPT/BJT hoặc cơ quan chuyên môn: lấy giấy chứng minh cho các mục cộng điểm.',
      'Hệ thống online của ISA nếu bạn và tổ chức liên quan thuộc đối tượng được phép nộp online.',
    ],
    documentsChecklist: [
      { label: '在留資格変更許可申請書 hoặc 在留資格認定証明書交付申請書', required: true, note: 'Chọn đúng mẫu theo xin từ trong Nhật hay từ nước ngoài.' },
      { label: 'ポイント計算表', required: true, note: 'Chọn đúng nhóm 高度専門職1号イ/ロ/ハ.' },
      { label: 'Tài liệu chứng minh từng mục điểm muốn dùng', required: true, note: 'Chỉ tính điểm khi có giấy tờ chứng minh.' },
      { label: 'Giấy tờ chứng minh hoạt động nền: hợp đồng, chức vụ, lương, tài liệu công ty', required: true },
      { label: 'Bằng cấp, chứng chỉ tiếng Nhật, chứng nhận kinh nghiệm hoặc thành tích', required: false, note: 'Nộp những mục dùng để cộng điểm.' },
      { label: 'Hộ chiếu, 在留カード và ảnh thẻ', required: true },
    ],
    commonMistakes: [
      'Tự cộng đủ 70 điểm nhưng không có giấy tờ chứng minh từng mục.',
      'Chọn sai nhóm 高度専門職1号イ/ロ/ハ so với hoạt động thực tế.',
      'Tưởng 高度専門職 chỉ cần điểm số; thực tế hoạt động vẫn phải phù hợp tư cách lưu trú nền.',
      'Đổi công ty hoặc đổi nội dung hoạt động khi đang ở 高度専門職1号 nhưng không kiểm tra thủ tục đổi tư cách cần làm.',
      'Tưởng 高度専門職2号 tự động có sau 3 năm; vẫn phải nộp hồ sơ và được ISA xét.',
    ],
    faq: [
      {
        question: 'Đủ 70 điểm có chắc được 高度専門職 không?',
        answer: 'Không chắc tuyệt đối. 70 điểm là điều kiện quan trọng, nhưng hoạt động dự kiến, công ty tiếp nhận và hồ sơ chứng minh vẫn phải phù hợp quy định ISA.',
      },
      {
        question: '高度専門職1号 có lợi gì rõ nhất?',
        answer: 'ISA nêu các ưu đãi như thời hạn lưu trú 5 năm, cho phép một số hoạt động kết hợp, rút ngắn điều kiện cư trú khi xin 永住, ưu đãi cho vợ/chồng làm việc và một số trường hợp cho cha mẹ/người giúp việc đi cùng.',
      },
      {
        question: 'Đổi công ty khi đang 高度専門職1号 có chỉ cần báo cáo không?',
        answer: 'Không nên xử lý như visa lao động thường. ISA nêu việc thay đổi nội dung hoạt động hoặc cơ quan thuộc 高度専門職1号 có thể cần 在留資格変更許可申請, nên kiểm tra trước khi chuyển.',
      },
    ],
    officialLinks: [
      { label: '在留資格「高度専門職」— 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html' },
      { label: '高度専門職ポイント計算表 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/resources/newimmiact_3_system_index.html' },
      { label: '高度人材の優遇措置 — 出入国在留管理庁', url: 'https://www.moj.go.jp/isa/applications/resources/newimmiact_3_preferential_index.html' },
    ],
    steps: [
      {
        step: 1,
        title: 'Tự tính điểm theo bảng của ISA',
        description: 'ISA công bố bảng điểm cho 3 nhóm tư cách:\n\n• 高度専門職1号イ (学術研究): nghiên cứu khoa học, giảng dạy đại học.\n• 高度専門職1号ロ (高度専門・技術): kỹ sư, IT, công nghệ — nhóm phổ biến nhất với người Việt.\n• 高度専門職1号ハ (経営・管理): quản lý doanh nghiệp, điều hành.\n\nĐiểm từ các hạng mục: bằng cấp (tối đa 30 điểm — tiến sĩ 30, thạc sĩ 20, cử nhân 10), kinh nghiệm làm việc, thu nhập năm (tối đa 40 điểm, tùy nhóm), tuổi (dưới 30 được cộng thêm), tiếng Nhật (N1 = 15 điểm, N2 = 10 điểm), tốt nghiệp trường Nhật (10 điểm), nghiên cứu/bằng sáng chế/thành tích đặc biệt.\n\nNgưỡng: 70 điểm → 高度専門職1号; 80 điểm trở lên → ưu đãi đặc biệt khi xin 永住.',
        documents: [],
        tip: 'Dùng công cụ tính điểm chính thức trên trang ISA (tra "高度専門職ポイント計算" hoặc xem link trong officialLinks). Điền thực tế — nếu khai sai điểm khi nộp hồ sơ, hồ sơ có thể bị từ chối.',
      },
      {
        step: 2,
        title: 'Hiểu các ưu đãi của 高度専門職',
        description: 'So với visa lao động thông thường (技術・人文知識・国際業務), 高度専門職 có:\n\n• Thời hạn lưu trú: 5 năm thay vì 1–3 năm.\n• Hoạt động kép: được làm công việc liên quan đến tư cách khác trong giới hạn nhất định (ví dụ: kỹ sư vừa làm kỹ thuật vừa dạy thêm).\n• Ưu tiên xử lý hồ sơ: ISA xử lý ưu tiên — thường nhanh hơn.\n• Đưa cha mẹ sang ở cùng: đặc quyền hẹp — cả hai vợ chồng đi làm hoặc có con nhỏ, thu nhập hộ gia đình trên ngưỡng quy định.\n• 永住 rút ngắn: 70 điểm → xin 永住 sau 3 năm; 80 điểm → sau 1 năm (thay vì 10 năm thông thường).',
        documents: [],
        tip: '高度専門職2号 là bước tiếp theo sau khi đủ điều kiện từ 高度専門職1号. ISA nêu 高度専門職2号 có thời hạn lưu trú vô thời hạn, nhưng vẫn là tư cách lưu trú riêng và cần hồ sơ xét duyệt.',
      },
      {
        step: 3,
        title: 'Chuẩn bị hồ sơ xin đổi tư cách',
        description: 'Nộp 在留資格変更許可申請 tại ISA kèm:\n• Đơn xin và bảng tính điểm (ポイント計算表) điền đầy đủ\n• Bằng cấp cao nhất (bản gốc + bản dịch tiếng Nhật nếu là bằng VN)\n• Hợp đồng lao động / thư chào mời / xác nhận của công ty (showing chức vụ và mức lương)\n• 源泉徴収票 hoặc sao kê lương gần nhất để chứng minh thu nhập\n• Kết quả JLPT nếu cộng điểm tiếng Nhật\n• Thư xác nhận từ trường Nhật nếu đã tốt nghiệp tại Nhật\n• Hộ chiếu và 在留カード hiện tại',
        documents: [
          'Đơn 在留資格変更許可申請 + ポイント計算表',
          'Bằng cấp (bản gốc + dịch tiếng Nhật nếu là bằng VN)',
          'Hợp đồng lao động hoặc thư xác nhận của công ty',
          '源泉徴収票 hoặc sao kê lương',
          'Kết quả JLPT (nếu cộng điểm tiếng Nhật)',
          'Hộ chiếu và 在留カード',
        ],
        tip: 'Nếu bằng đại học/thạc sĩ là bằng Việt Nam, cần dịch thuật có công chứng — không phải tự dịch. ISA thường kiểm tra tên trường, chuyên ngành và năm tốt nghiệp.',
      },
      {
        step: 4,
        title: 'Nộp hồ sơ và theo dõi',
        description: 'Nộp tại ISA hoặc qua ủy quyền (nếu đủ điều kiện ủy quyền). Thời gian xử lý thông thường 1–3 tháng. Trong thời gian chờ, tư cách lưu trú cũ vẫn có giá trị.\n\nNếu được chấp thuận: nhận 在留カード mới ghi "高度専門職1号ロ" (hoặc イ/ハ tùy nhóm), thời hạn 5 năm. Báo công ty để họ cập nhật hồ sơ nhân sự.\n\nNếu bị từ chối: ISA không giải thích chi tiết nhưng thường do điểm không đủ hoặc tài liệu thiếu. Có thể xem lại và nộp lại sau khi bổ sung.',
        documents: [],
        tip: 'Sau khi được 高度専門職, kiểm tra ngay bảng điểm lại: nếu điểm đạt 70 và bạn có 3 năm lưu trú liên tục tính từ trước, bạn có thể đủ điều kiện xin 永住 gần hơn bạn nghĩ.',
      },
    ],
  };

export default highlySkilledProfessional;
