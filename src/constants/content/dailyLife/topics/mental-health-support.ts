import type { DailyLifeTopic } from '../../../../types/content';

const mentalHealthSupport: DailyLifeTopic = {
    id: 'mental-health-support',
    title: 'Sức khỏe tâm thần và hỗ trợ khi khó khăn',
    titleJp: 'メンタルヘルスと相談窓口',
    icon: 'heart-circle-outline',
    color: '#8E44AD',
    description: 'Cô đơn, áp lực, không hiểu văn hóa — rất bình thường khi mới sang Nhật. Biết gọi cho ai và tìm hỗ trợ ở đâu là điều quan trọng.',
    sections: [
      {
        title: 'Đường dây hỗ trợ — gọi ngay khi cần',
        content:
          'Nhật Bản có nhiều đường dây hỗ trợ tâm lý miễn phí, một số có tiếng Việt hoặc tiếng Anh.',
        items: [
          'よりそいホットライン: 0120-279-338 — miễn phí, 24/7, có hỗ trợ đa ngôn ngữ kể cả tiếng Việt (bấm phím theo hướng dẫn). Hỗ trợ mọi vấn đề từ cô đơn, stress đến khủng hoảng tâm lý.',
          'よりそいホットライン web chat: yorisoi-hotline.or.jp — nếu không muốn gọi điện, có thể nhắn tin qua trình duyệt.',
          'いのちの電話: 0120-783-556 — miễn phí, hoạt động nhiều giờ trong ngày, tiếng Nhật.',
          'TELL Lifeline (tiếng Anh): 03-5774-0992 — hỗ trợ bằng tiếng Anh cho người không nói được tiếng Nhật.',
          'Khẩn cấp tâm thần: gọi 119 (miễn phí) nếu bản thân hoặc người quen đang trong tình trạng nguy hiểm ngay lập tức.',
        ],
        tip: 'よりそいホットライン hỗ trợ tiếng Việt — gọi 0120-279-338 và chờ hướng dẫn chọn ngôn ngữ. Miễn phí kể cả từ điện thoại di động.',
      },
      {
        title: 'Tại sao cảm thấy khó khăn — và điều đó hoàn toàn bình thường',
        content:
          'Phần lớn người Việt mới sang Nhật đều trải qua giai đoạn khó khăn tâm lý — không phải vì bạn yếu, mà đây là phản ứng tự nhiên.',
        items: [
          'Văn hóa sốc (カルチャーショック): mọi thứ từ cách giao tiếp, ứng xử nơi công cộng đến thói quen hàng ngày đều khác — não bộ cần thời gian thích nghi.',
          'Cô đơn và thiếu kết nối: xa gia đình, bạn bè, ngôn ngữ khó khăn khiến việc tạo mối quan hệ mới tốn nhiều công sức hơn ở Việt Nam.',
          'Áp lực công việc và học tập: kỳ vọng cao, văn hóa làm việc khắt khe, sợ mắc lỗi — đặc biệt nặng nề trong năm đầu.',
          'Homesickness (nhớ nhà): nhớ đồ ăn, gia đình, không khí quen thuộc là rất phổ biến và không có gì đáng xấu hổ.',
          'Nếu những cảm giác này kéo dài nhiều tuần và ảnh hưởng đến sinh hoạt hàng ngày — hãy tìm hỗ trợ chuyên môn.',
        ],
        tip: 'Cộng đồng người Việt tại địa phương thường có nhóm Facebook hoặc Zalo — tìm theo tên tỉnh + "người Việt ở Nhật" để kết nối với người có cùng hoàn cảnh.',
      },
      {
        title: 'Trung tâm tư vấn người nước ngoài',
        content:
          'Hầu hết tỉnh thành ở Nhật đều có 国際交流センター hoặc 外国人相談窓口 — hỗ trợ tư vấn miễn phí về cuộc sống, pháp lý và tâm lý.',
        items: [
          '外国人生活支援ポータルサイト (Bộ Tư pháp Nhật): moj.go.jp — danh sách trung tâm tư vấn đa ngôn ngữ theo từng tỉnh.',
          'FRESC (Foreign Residents Support Center): fresc.moj.go.jp — hỗ trợ pháp lý và cuộc sống, nhiều ngôn ngữ, trực tuyến và trực tiếp.',
          'AMDA多文化医療サービス研究会: amdamedicalcenter.com — hỗ trợ y tế và tâm lý cho người nước ngoài, có phiên dịch.',
          '国際交流センター địa phương: tìm bằng Google Maps với từ khóa "国際交流センター [tên tỉnh]" — thường có tư vấn viên nói tiếng Anh hoặc có phiên dịch.',
          'Các cộng đồng Facebook người Việt theo tỉnh: nguồn hỗ trợ thực tế từ người đồng hương đã sống ở tỉnh đó nhiều năm.',
        ],
        tip: 'Đến 国際交流センター không cần lý do cụ thể — nhiều người đến chỉ để hỏi về cuộc sống hàng ngày. Không chỉ dành cho tình huống khẩn cấp.',
      },
      {
        title: 'Chăm sóc bản thân hàng ngày',
        content:
          'Không phải lúc nào cũng cần gọi điện — những thói quen nhỏ giúp duy trì sức khỏe tâm thần mỗi ngày.',
        items: [
          'Duy trì giờ ngủ và ăn đều đặn — mất ngủ và bỏ bữa là dấu hiệu sớm của stress mãn tính.',
          'Ra ngoài đi bộ ít nhất 20 phút mỗi ngày — ánh sáng tự nhiên và vận động nhẹ có tác dụng rõ rệt với tâm trạng.',
          'Giữ liên lạc đều đặn với gia đình và bạn bè ở Việt Nam — video call 1–2 lần mỗi tuần giúp giảm cảm giác cô lập.',
          'Tham gia hoạt động cộng đồng — 図書館 (thư viện) địa phương thường có sự kiện miễn phí mở cho mọi người.',
          'Giới hạn thời gian mạng xã hội nếu nó khiến bạn so sánh bản thân và cảm thấy tệ hơn.',
        ],
        tip: '図書館 (thư viện công) ở Nhật hoàn toàn miễn phí, yên tĩnh và ấm/mát — là nơi tốt để đọc sách, học tiếng Nhật hoặc đơn giản là ra khỏi phòng. Không cần thẻ thư viện để vào đọc tại chỗ.',
      },
    ],
  };

export default mentalHealthSupport;
