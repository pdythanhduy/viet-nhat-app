// Curated "Hành trình" collections shown on Home.
//
// The app's 120+ guides assume the reader is already in Japan. These
// collections give an entry point to the people the guide list doesn't
// address directly: someone still in Việt Nam preparing to go, someone
// bringing family over, someone wrapping up to go home. Each collection
// only points at existing guides — no new content lives here — and
// guideCollections.test.ts keeps every id honest.

import type { Ionicons } from '@expo/vector-icons';

type IconName = keyof typeof Ionicons.glyphMap;

export type GuideCollectionId = 'pre-departure' | 'newcomer' | 'family' | 'homeland' | 'return-home';

export interface GuideCollection {
  id: GuideCollectionId;
  title: string;
  /** Who this is for, one line, shown on the Home rail card. */
  audience: string;
  description: string;
  icon: IconName;
  color: string;
  bg: string;
  /** Ordered: the first guide is the one to read first. */
  guideIds: string[];
  /** Newcomers already have a profile-shaped checklist; reuse it. */
  checklistScreen?: 'JourneyChecklist';
}

export const GUIDE_COLLECTIONS: ReadonlyArray<GuideCollection> = [
  {
    id: 'pre-departure',
    title: 'Chuẩn bị sang Nhật',
    audience: 'Đang ở Việt Nam',
    description:
      'Bạn còn ở Việt Nam và sắp sang Nhật du học, làm việc hay đoàn tụ? Đọc trước những bài này để hiểu visa, chế độ lao động mới và tuần đầu tiên sẽ ra sao.',
    icon: 'airplane-outline',
    color: '#0F766E',
    bg: '#E0F2EF',
    guideIds: [
      'visa-status-overview',
      'study-in-japan-student-guide',
      'ikusei-shuro-system-guide',
      'ginou-jisshu-to-tokutei-ginou',
      'jista-entry-system-guide',
      'first-7-days-in-japan',
      'essential-apps-japan-life',
    ],
  },
  {
    id: 'newcomer',
    title: 'Mới sang Nhật',
    audience: '3 tháng đầu',
    description:
      'Đăng ký địa chỉ, bảo hiểm, My Number, sim, ngân hàng — làm theo đúng thứ tự để khỏi chạy đi chạy lại.',
    icon: 'compass-outline',
    color: '#185FA5',
    bg: '#E5EFF8',
    guideIds: [
      'first-7-days-in-japan',
      'moving-in-notification',
      'residence-card',
      'health-insurance',
      'my-number-card',
      'bank-account',
      'sim-card',
      'first-30-days-work-study-japan',
      'first-90-days-in-japan',
    ],
    checklistScreen: 'JourneyChecklist',
  },
  {
    id: 'family',
    title: 'Đưa gia đình sang',
    audience: 'Vợ/chồng, con, bố mẹ',
    description:
      'Bảo lãnh vợ/chồng con sang sống cùng, mời bố mẹ sang thăm, đăng ký kết hôn giữa hai nước.',
    icon: 'people-outline',
    color: '#B45309',
    bg: '#FDF0DC',
    guideIds: [
      'family-stay-invitation',
      'short-stay-relative-visit',
      'parents-elderly-relatives',
      'marriage-certificate-vn-japan',
      'marriage-procedures-japan',
      'baby-born-in-japan',
    ],
  },
  {
    id: 'homeland',
    title: 'Kết nối quê nhà',
    audience: 'Gửi tiền, giấy tờ VN',
    description:
      'Gửi tiền về nhà an toàn, làm giấy tờ ở Đại sứ quán, tìm cộng đồng người Việt gần bạn và tạm về Việt Nam mà không mất visa.',
    icon: 'heart-outline',
    color: '#C62828',
    bg: '#FCE8E6',
    guideIds: [
      'remittance',
      'tax-on-remittance-to-vietnam',
      'banking-remittance-anti-fraud',
      'embassy-consulate-vietnam-japan',
      'vietnamese-community-japan',
      're-entry',
    ],
  },
  {
    id: 'return-home',
    title: 'Chuẩn bị về nước',
    audience: 'Hết hợp đồng, về hẳn',
    description:
      'Kết thúc hợp đồng, hoàn tiền nenkin, đóng thuế, cắt điện nước — xong hết trước khi lên máy bay.',
    icon: 'home-outline',
    color: '#6D28D9',
    bg: '#EFE7FB',
    guideIds: [
      'return-to-vietnam-checklist',
      'pension-exemption-refund',
      'juminzei-local-tax',
      'electricity-gas-water-contracts',
      'home-internet-wifi-contracts',
      'post-office-mail-forwarding',
    ],
  },
];

export function getGuideCollection(id: GuideCollectionId): GuideCollection | undefined {
  return GUIDE_COLLECTIONS.find((collection) => collection.id === id);
}
