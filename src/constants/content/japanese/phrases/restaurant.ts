import type { PhraseCategory } from '../../../../types/content';

const restaurant: PhraseCategory = {
    category: 'Công việc nhà hàng',
    icon: 'restaurant',
    color: '#8E44AD',
    phrases: [
      { jp: 'ご注文をお伺いします。', romaji: 'Gochuumon o oukagai shimasu.', vn: 'Em xin nhận món ạ.' },
      { jp: '申し訳ありません。本日は満席です。', romaji: 'Moushiwake arimasen. Honjitsu wa manseki desu.', vn: 'Xin lỗi, hôm nay quán đã hết chỗ.' },
      { jp: '店内ですか、持ち帰りですか。', romaji: 'Tennai desu ka, mochikaeri desu ka.', vn: 'Quý khách dùng tại quán hay mang về ạ?' },
      { jp: 'おすすめはこちらです。', romaji: 'Osusume wa kochira desu.', vn: 'Món gợi ý là món này ạ.' },
      { jp: '品切れのため、別の料理をお願いします。', romaji: 'Shinagire no tame, betsu no ryouri o onegaishimasu.', vn: 'Vì món đó đã hết, xin quý khách chọn món khác ạ.' },
      { jp: 'お会計はこちらでお願いします。', romaji: 'Okaikei wa kochira de onegaishimasu.', vn: 'Xin thanh toán tại đây ạ.' },
    ],
    dialogue: {
      situation: 'Xác nhận lại món khách gọi',
      lines: [
        { speaker: 'A', speakerLabel: 'Bạn', jp: 'ご注文はラーメン一つと餃子一つでよろしいですか。', romaji: 'Gochuumon wa raamen hitotsu to gyouza hitotsu de yoroshii desu ka.', vn: 'Em xin xác nhận, mình gọi 1 ramen và 1 gyoza đúng không ạ?' },
        { speaker: 'B', speakerLabel: 'Khách', jp: 'はい。あと水をお願いします。', romaji: 'Hai. Ato mizu o onegaishimasu.', vn: 'Vâng. Và cho tôi thêm nước nhé.' },
      ],
    },
  };

export default restaurant;
