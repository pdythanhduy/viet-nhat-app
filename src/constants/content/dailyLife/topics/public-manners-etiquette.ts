import type { DailyLifeTopic } from '../../../../types/content';

const publicMannersEtiquette: DailyLifeTopic = {
    id: 'public-manners-etiquette',
    title: 'Phép lịch sự và văn hóa nơi công cộng',
    titleJp: 'マナー・公共の場でのルール',
    icon: 'people-circle',
    color: '#2E4057',
    description: 'Quy tắc trên tàu điện, với hàng xóm, nơi làm việc và chỗ công cộng — tránh vô tình gây phiền dù không cố ý.',
    sections: [
      {
        title: 'Trên tàu điện và tàu ngầm',
        content:
          'Tàu điện Nhật rất trật tự — nhưng quy tắc không được viết ra hết. Người mới rất dễ vô tình làm phiền.',
        items: [
          'Không nghe điện thoại trên tàu: bắt máy và nói chuyện điện thoại trong toa là điều tối kỵ. Nhắn tin và xem video (tai nghe) là bình thường.',
          'Chế độ im lặng (マナーモード): để điện thoại ở silent mode khi lên tàu.',
          'Ghế ưu tiên (優先席): nhường cho người cao tuổi, khuyết tật, phụ nữ mang thai, người bế con nhỏ — dù có vẻ không ai đang cần, vẫn nên để ý.',
          'Balô và túi to: trong giờ cao điểm (rush hour) nên đặt ba lô xuống cầm tay hoặc để lên kệ — không đeo sau lưng làm chật chỗ người đứng.',
          'Xếp hàng lên tàu: đứng đúng ô vạch kẻ sẵn dưới đất, nhường người xuống trước rồi mới lên.',
          'Thang cuốn (escalator): ở Tokyo — đứng bên trái, bên phải để người đi nhanh. Ở Osaka — ngược lại, đứng bên phải. Hiện các ga khuyến khích đứng cả hai bên nhưng thực tế vẫn theo thói quen cũ.',
        ],
        tip: 'Ăn uống trên tàu thường (trừ Shinkansen và tàu đường dài có ghế ngồi) là điều khiến hành khách Nhật khó chịu dù không ai nói thẳng.',
        image: require('../../../../../assets/content/daily-life/dl_manners_s1.jpg'),
        imageCaption: 'Biển nội quy trên tàu điện Nhật — không gọi điện, nhường ghế ưu tiên, giữ yên lặng trong toa',
      },
      {
        title: 'Hàng xóm và tòa nhà chung cư',
        content:
          'Quan hệ với hàng xóm ở Nhật thường ít tiếp xúc — nhưng có một số quy tắc không viết ra mà ai cũng kỳ vọng.',
        items: [
          'Chào hỏi khi mới chuyển đến (引越し挨拶): nên ghé 2–3 nhà hai bên và phía trên tặng một món quà nhỏ (bánh, khăn, xà phòng — khoảng 500–1.000 yên) và giới thiệu bản thân. Không làm điều này bị coi là thiếu lịch sự.',
          'Tiếng ồn sau 22h: căn hộ Nhật vách mỏng — tiếng giặt, tiếng giày, tiếng nhạc lớn đều vọng sang. Máy giặt và hút bụi sau 22h thường gây phàn nàn.',
          'Hành lang và cầu thang chung: không để đồ đạc, xe đạp hoặc thùng rác ra ngoài hành lang — đây là vi phạm quy định chung cư ở phần lớn tòa nhà.',
          'Nếu gây ra vấn đề (nước rò, tiếng ồn...): chủ động liên hệ hàng xóm hoặc quản lý tòa nhà sớm — ở Nhật người ta thường nhịn một thời gian dài trước khi khiếu nại.',
        ],
        tip: 'Giấy tờ liên quan tòa nhà (quy định nội bộ, lịch vệ sinh chung, phân loại rác) thường được để trong hòm thư ngay khi mới chuyển đến — đọc kỹ trước khi bỏ.',
      },
      {
        title: 'Nơi làm việc và trường học',
        content:
          'Văn hóa Nhật có nhiều tầng ngầm không được nói thẳng — đặc biệt trong môi trường làm việc.',
        items: [
          'Đến sớm hơn giờ làm: đúng giờ ở Nhật nghĩa là đến trước 5–10 phút. Đến đúng giờ đã bị coi là hơi trễ ở nhiều công ty.',
          'Báo nghỉ trước: nếu nghỉ ốm hoặc có việc, thông báo cho quản lý càng sớm càng tốt — ngay buổi sáng sớm hôm đó là chuẩn, không phải nhắn đêm hôm trước.',
          'Không ăn tại bàn làm việc ở nhiều môi trường công sở: có chỗ thì OK, nhưng nên quan sát trước.',
          'Trao nhận danh thiếp (名刺交換): dùng cả hai tay khi đưa và nhận, đọc qua trước khi cất — không nhét vào túi quần ngay.',
          'Ở trường: chào giáo viên khi vào/ra lớp, không ăn uống trong lớp học, không ngồi trên bàn là chuẩn mực cơ bản.',
        ],
        tip: 'Nếu không hiểu quy tắc không viết ra của công ty hoặc trường, cách an toàn nhất là quan sát người xung quanh làm gì trong tuần đầu tiên.',
      },
      {
        title: 'Tắm công cộng (銭湯 / 温泉) và các nơi đặc biệt',
        content:
          'Văn hóa tắm công cộng là một phần của đời sống Nhật — nhưng có quy tắc riêng mà người nước ngoài hay bỏ qua.',
        items: [
          'Tắm sạch người tại vòi sen (シャワー) trước khi vào bồn ngâm chung (浸かり湯) — đây là quy tắc tuyệt đối.',
          'Hình xăm (タトゥー): nhiều cơ sở cấm người có hình xăm vào bồn chung. Một số nơi có phòng riêng hoặc thời gian riêng — hỏi trước khi đến.',
          'Không mang điện thoại vào khu tắm — vi phạm quyền riêng tư và thường bị nhắc nhở.',
          'Khăn tắm nhỏ: được mang vào khu tắm nhưng không được thả xuống bồn chung — gấp lại để trên đầu hoặc để ngoài bồn.',
        ],
        tip: 'Nhiều 銭湯 (senTO) địa phương có giá rất rẻ (500–600 yên ở Tokyo) và là trải nghiệm văn hóa thực sự đáng thử.',
        image: require('../../../../../assets/content/daily-life/dl_manners_s4.jpg'),
        imageCaption: 'Cổng vào銭湯 / 温泉 — tắm sạch tại vòi sen trước khi vào bồn chung, không mang điện thoại vào khu tắm',
      },
    ],
  };

export default publicMannersEtiquette;
