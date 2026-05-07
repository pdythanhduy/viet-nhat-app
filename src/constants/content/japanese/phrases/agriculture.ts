import type { PhraseCategory } from '../../../../types/content';

const agriculture: PhraseCategory = {
    category: 'Công việc nông nghiệp',
    icon: 'leaf',
    color: '#27AE60',
    phrases: [
      { jp: '今日はトマトを収穫します。', romaji: 'Kyou wa tomato o shuukaku shimasu.', vn: 'Hôm nay tôi thu hoạch cà chua.' },
      { jp: '苗を植える前に土を確認してください。', romaji: 'Nae o ueru mae ni tsuchi o kakunin shite kudasai.', vn: 'Xin hãy kiểm tra đất trước khi trồng cây giống.' },
      { jp: '朝のうちに水やりをします。', romaji: 'Asa no uchi ni mizuyari o shimasu.', vn: 'Tôi sẽ tưới nước trong buổi sáng.' },
      { jp: '大きさごとに選別してください。', romaji: 'Ookisa goto ni senbetsu shite kudasai.', vn: 'Xin hãy phân loại theo từng cỡ.' },
      { jp: '暑いので熱中症に気をつけましょう。', romaji: 'Atsui node necchuushou ni ki o tsukemashou.', vn: 'Trời nóng nên hãy cẩn thận sốc nhiệt.' },
      { jp: '箱詰めが終わったら出荷場へ運びます。', romaji: 'Hakodume ga owattara shukkajou e hakobimasu.', vn: 'Đóng thùng xong thì chuyển đến khu xuất hàng.' },
    ],
    dialogue: {
      situation: 'Báo đau lưng và xin đổi việc nặng',
      lines: [
        { speaker: 'A', speakerLabel: 'Bạn', jp: 'すみません。少し腰が痛いので、軽い作業に変えてもいいですか。', romaji: 'Sumimasen. Sukoshi koshi ga itai node, karui sagyou ni kaete mo ii desu ka.', vn: 'Xin lỗi, tôi hơi đau lưng nên có thể đổi sang việc nhẹ hơn không?' },
        { speaker: 'B', speakerLabel: 'Quản lý', jp: 'わかりました。今日は選別をお願いします。', romaji: 'Wakarimashita. Kyou wa senbetsu o onegaishimasu.', vn: 'Được. Hôm nay bạn làm phần phân loại nhé.' },
      ],
    },
  };

export default agriculture;
