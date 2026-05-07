import type { PhraseCategory } from '../../../../types/content';

const postOffice: PhraseCategory = {
    category: 'Bưu điện và nhận hàng',
    icon: 'mail',
    color: '#A04000',
    phrases: [
      { jp: '再配達をお願いしたいです。', romaji: 'Saihaitatsu o onegai shitai desu.', vn: 'Tôi muốn yêu cầu giao lại hàng.' },
      { jp: '追跡番号はこちらです。', romaji: 'Tsuiseki bangou wa kochira desu.', vn: 'Mã theo dõi ở đây.' },
      { jp: '荷物はいつ届きますか。', romaji: 'Nimotsu wa itsu todokimasu ka.', vn: 'Khi nào hàng sẽ tới?' },
      { jp: '不在票が入っていました。', romaji: 'Fuzaihyou ga haitte imashita.', vn: 'Tôi có phiếu báo vắng nhà.' },
      { jp: '窓口で受け取れますか。', romaji: 'Madoguchi de uketoremasu ka.', vn: 'Tôi có thể nhận ở quầy không?' },
      { jp: '時間帯を変更したいです。', romaji: 'Jikantai o henkou shitai desu.', vn: 'Tôi muốn đổi khung giờ giao.' },
    ],
    dialogue: {
      situation: 'Yêu cầu giao lại hàng',
      lines: [
        {
          speaker: 'A',
          speakerLabel: 'Bạn',
          jp: '不在票が入っていました。再配達をお願いしたいです。',
          romaji: 'Fuzaihyou ga haitte imashita. Saihaitatsu o onegai shitai desu.',
          vn: 'Tôi có phiếu báo vắng nhà. Tôi muốn yêu cầu giao lại hàng.',
        },
        {
          speaker: 'B',
          speakerLabel: 'Bưu điện',
          jp: 'ご希望の時間帯はありますか。',
          romaji: 'Gokibou no jikantai wa arimasu ka.',
          vn: 'Bạn muốn giao lại vào khung giờ nào?',
        },
      ],
    },
  };

export default postOffice;
