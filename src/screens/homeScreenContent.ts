import { Colors } from '../constants/colors';
import type { TabParamList } from '../navigation/AppNavigator';
import type { UserProfile } from '../types/profile';

type HomeIconName = keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
export type CategoryTarget = keyof TabParamList | 'DailyLife';
type TipScreen = 'ImportantDates' | 'Admin';

export const CATEGORIES: {
  id: string;
  title: string;
  icon: HomeIconName;
  color: string;
  bg: string;
  tab: CategoryTarget;
}[] = [
  { id: 'admin', title: 'Thủ tục\nhành chính', icon: 'document-text', color: Colors.primary, bg: Colors.accent, tab: 'Admin' },
  { id: 'daily', title: 'Cuộc sống\nhằng ngày', icon: 'sunny', color: '#27AE60', bg: Colors.successLight, tab: 'DailyLife' },
  { id: 'jobs', title: 'Việc làm\nvà quyền lợi', icon: 'briefcase', color: '#9B59B6', bg: '#F3EBF9', tab: 'Jobs' },
  { id: 'japanese', title: 'Tiếng\nNhật', icon: 'language', color: '#E74C3C', bg: '#FDECEA', tab: 'Japanese' },
];

export const GENERIC_TIPS: {
  id: string;
  title: string;
  description: string;
  urgency: 'info' | 'medium';
  icon: HomeIconName;
  screen: TipScreen;
}[] = [
  {
    id: 'tip1',
    title: 'Thiết lập ngày quan trọng',
    description: 'Thêm ngày hết hạn thẻ cư trú, bảo hiểm hoặc giấy tờ cá nhân để app nhắc trước khi quá hạn.',
    urgency: 'info',
    icon: 'calendar-outline',
    screen: 'ImportantDates',
  },
  {
    id: 'tip2',
    title: 'Kiểm tra lại bảo hiểm y tế',
    description: 'Nếu sống ở Nhật trên 3 tháng mà vẫn chưa chắc mình thuộc diện bảo hiểm nào, nên rà lại sớm.',
    urgency: 'medium',
    icon: 'heart-outline',
    screen: 'Admin',
  },
];

export const LAW_UPDATES = [
  {
    id: 'bike-2026',
    guideId: 'bicycle-rules-2026',
    title: 'Luật xe đạp 2026',
    description: 'Nắm phần blue ticket, điện thoại khi lái và các lỗi dễ bị phạt.',
    icon: 'bicycle' as HomeIconName,
    color: '#E67E22',
  },
  {
    id: 'health-insurance',
    guideId: 'health-insurance',
    title: 'Đi khám và giấy bảo hiểm',
    description: 'Kiểm tra lại thẻ bảo hiểm hoặc My Number liên kết bảo hiểm trước khi đi khám.',
    icon: 'heart' as HomeIconName,
    color: '#27AE60',
  },
  {
    id: 'labor-reform',
    guideId: 'ssw-training-worker-2027',
    title: 'Cập nhật lao động 2026-2027',
    description: 'Phần kỹ năng đặc định và cải cách lao động cần theo dõi đúng thời điểm.',
    icon: 'construct' as HomeIconName,
    color: '#9B59B6',
  },
];

export const ONBOARDING_GUIDES = [
  {
    guideId: 'first-7-days-in-japan',
    title: '7 ngày đầu mới sang Nhật',
    description: 'Checklist giấy tờ, địa chỉ, bảo hiểm, sim và ngân hàng trong tuần đầu.',
    icon: 'rocket-outline' as HomeIconName,
  },
  {
    guideId: 'first-30-days-work-study-japan',
    title: '30 ngày đầu đi làm / đi học',
    description: 'Rà lại việc đi làm, trường lớp, tiền bạc, đi lại và giấy tờ trong tháng đầu.',
    icon: 'calendar-outline' as HomeIconName,
  },
  {
    guideId: 'first-90-days-in-japan',
    title: '90 ngày đầu ở Nhật',
    description: 'Tổng rà 3 tháng đầu: giấy tờ, tiền bạc, sức khỏe và các rủi ro dễ bỏ sót.',
    icon: 'map-outline' as HomeIconName,
  },
];

export const FAMILY_VISA_GROUPS = [
  {
    id: 'visa-entry',
    title: 'Visa và mời người thân',
    description: 'Chọn đúng loại hồ sơ ngay từ đầu để đỡ mất thời gian hỏi lại.',
    items: [
      {
        id: 'family-stay',
        title: 'Sống cùng gia đình ở Nhật',
        description: 'Bảo lãnh vợ/chồng/con, COE và điều kiện sống dài hạn.',
        icon: 'people' as HomeIconName,
        color: '#2E86C1',
        guideId: 'family-stay-invitation',
      },
      {
        id: 'visit-relatives',
        title: 'Mời người thân sang thăm',
        description: 'Visa thăm thân ngắn hạn, hồ sơ người mời và người đi khác nhau thế nào.',
        icon: 'airplane' as HomeIconName,
        color: '#E67E22',
        guideId: 'short-stay-relative-visit',
      },
      {
        id: 'visa-highlights',
        title: 'Các diện visa đáng chú ý 2026',
        description: 'J-Find, Digital Nomad, Start-up, eVISA và cách phân biệt nhanh.',
        icon: 'globe-outline' as HomeIconName,
        color: '#8E44AD',
        guideId: 'visa-highlights-2026',
      },
    ],
  },
  {
    id: 'family-life',
    title: 'Gia đình và con nhỏ',
    description: 'Các việc hay phát sinh sau khi đã sống ở Nhật cùng gia đình.',
    items: [
      {
        id: 'pregnancy-childbirth',
        title: 'Mang thai và sinh con ở Nhật',
        description: 'Các mốc trước sinh, sau sinh, trợ cấp và giấy tờ bắt buộc.',
        icon: 'heart-circle' as HomeIconName,
        color: '#D35454',
        guideId: 'pregnancy-childbirth-postpartum',
      },
      {
        id: 'baby-born-in-japan',
        title: 'Con sinh ở Nhật',
        description: 'Quốc tịch, hộ chiếu, cư trú, My Number và bảo hiểm của em bé.',
        icon: 'happy' as HomeIconName,
        color: '#F39C12',
        guideId: 'baby-born-in-japan',
      },
      {
        id: 'parents-elderly',
        title: 'Cha mẹ và người thân lớn tuổi',
        description: 'Hiểu đúng giới hạn bảo lãnh dài hạn và các ngoại lệ hiếm.',
        icon: 'people-circle' as HomeIconName,
        color: '#6C7A99',
        guideId: 'parents-elderly-relatives',
      },
    ],
  },
] as const;

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Chào buổi sáng';
  if (hour < 18) return 'Chào buổi chiều';
  return 'Chào buổi tối';
}

export interface ActiveAlert {
  id: string;
  label: string;
  daysLeft: number;
}

export interface SavedCounts {
  guide: number;
  'daily-life': number;
  phrase: number;
  dialogue: number;
}

export interface InProgressGuide {
  guideId: string;
  title: string;
  checked: number;
  total: number;
  color: string;
}

export interface ReadyGuide {
  guideId: string;
  title: string;
  total: number;
  color: string;
}

export type PersonalizedAction =
  | {
      id: string;
      title: string;
      description: string;
      icon: HomeIconName;
      color: string;
      kind: 'guide';
      guideId: string;
    }
  | {
      id: string;
      title: string;
      description: string;
      icon: HomeIconName;
      color: string;
      kind: 'tab';
      tab: keyof TabParamList;
    }
  | {
      id: string;
      title: string;
      description: string;
      icon: HomeIconName;
      color: string;
      kind: 'screen';
      screen: 'ImportantDates' | 'DailyLife' | 'LaborGuide' | 'LaborHelp' | 'JourneyChecklist';
    };

export function buildPersonalizedActions(profile: UserProfile): PersonalizedAction[] {
  const checklistAction: PersonalizedAction = {
    id: 'journey-checklist',
    title: 'Mở checklist hành trình',
    description: 'Danh sách việc nên chốt theo đúng giai đoạn bạn đang ở.',
    icon: 'list-outline',
    color: Colors.primary,
    kind: 'screen',
    screen: 'JourneyChecklist',
  };

  if (profile.lifeStage === 'new-arrival') {
    return [
      checklistAction,
      {
        id: 'first-7-days',
        title: 'Chốt checklist 7 ngày đầu',
        description: 'Rà giấy tờ, địa chỉ, bảo hiểm và việc cần làm ngay tuần đầu.',
        icon: 'rocket-outline',
        color: Colors.primary,
        kind: 'guide',
        guideId: 'first-7-days-in-japan',
      },
      {
        id: 'first-30-days',
        title: 'Rà 30 ngày đầu',
        description: 'Kiểm tra sim, ngân hàng, trường/làm việc và các khoản đang dễ quên.',
        icon: 'calendar-outline',
        color: '#27AE60',
        kind: 'guide',
        guideId: 'first-30-days-work-study-japan',
      },
      {
        id: 'important-dates',
        title: 'Thiết lập ngày quan trọng',
        description: 'Bật nhắc trước hạn cho thẻ cư trú, bảo hiểm và các hồ sơ cần gia hạn.',
        icon: 'alarm-outline',
        color: '#E67E22',
        kind: 'screen',
        screen: 'ImportantDates',
      },
    ];
  }

  if (profile.lifeStage === 'changing-jobs') {
    return [
      checklistAction,
      {
        id: 'jobs',
        title: 'Mở tab Việc làm',
        description: 'Đi thẳng vào nguồn việc phù hợp và các thay đổi luật lao động mới.',
        icon: 'briefcase-outline',
        color: '#8E44AD',
        kind: 'tab',
        tab: 'Jobs',
      },
      {
        id: 'labor-guide',
        title: 'Rà hợp đồng trước khi ký',
        description: 'Xem checklist hỏi lại công ty và các dấu hiệu rủi ro cần tránh.',
        icon: 'document-text-outline',
        color: Colors.primary,
        kind: 'screen',
        screen: 'LaborGuide',
      },
      {
        id: 'labor-help',
        title: 'Có vấn đề với công ty',
        description: 'Đi vào luồng nợ lương, ép OT, giữ giấy tờ hoặc nghỉ việc đúng luật.',
        icon: 'warning-outline',
        color: '#E67E22',
        kind: 'screen',
        screen: 'LaborHelp',
      },
    ];
  }

  if (profile.lifeStage === 'family-life' || profile.household === 'with-family' || profile.visaStatus === 'family') {
    return [
      checklistAction,
      {
        id: 'family-stay',
        title: 'Sống cùng gia đình ở Nhật',
        description: 'Mở guide bảo lãnh vợ/chồng/con và những điều kiện cần chuẩn bị.',
        icon: 'people-outline',
        color: '#2E86C1',
        kind: 'guide',
        guideId: 'family-stay-invitation',
      },
      {
        id: 'visit-relatives',
        title: 'Mời người thân sang thăm',
        description: 'Phân biệt hồ sơ ngắn hạn, giấy tờ người mời và người đi.',
        icon: 'airplane-outline',
        color: '#E67E22',
        kind: 'guide',
        guideId: 'short-stay-relative-visit',
      },
      {
        id: 'daily-life',
        title: 'Mở đời sống hằng ngày',
        description: 'Rà nhà ở, rác, trường lớp, bệnh viện và việc phát sinh trong gia đình.',
        icon: 'home-outline',
        color: '#27AE60',
        kind: 'screen',
        screen: 'DailyLife',
      },
    ];
  }

  if (profile.visaStatus === 'student') {
    return [
      checklistAction,
      {
        id: 'student-30-days',
        title: 'Rà 30 ngày đầu đi học',
        description: 'Gom các việc hay phát sinh với trường, baito, sim, ngân hàng và di chuyển.',
        icon: 'school-outline',
        color: Colors.primary,
        kind: 'guide',
        guideId: 'first-30-days-work-study-japan',
      },
      {
        id: 'jobs-student',
        title: 'Xem việc làm phù hợp',
        description: 'Ưu tiên nguồn part-time đúng visa và xem lại giới hạn giờ làm.',
        icon: 'briefcase-outline',
        color: '#8E44AD',
        kind: 'tab',
        tab: 'Jobs',
      },
      {
        id: 'japanese',
        title: 'Luyện tiếng Nhật thực tế',
        description: 'Vào nhanh các mẫu câu dùng ở trường, cửa hàng, bệnh viện và công việc.',
        icon: 'language-outline',
        color: '#E74C3C',
        kind: 'tab',
        tab: 'Japanese',
      },
    ];
  }

  return [
    checklistAction,
    {
      id: 'important-dates-general',
      title: 'Giữ nhắc hạn giấy tờ',
      description: 'Thiết lập nhắc trước hạn cho thẻ cư trú, hộ chiếu và các lịch quan trọng.',
      icon: 'calendar-outline',
      color: Colors.primary,
      kind: 'screen',
      screen: 'ImportantDates',
    },
    {
      id: 'jobs-general',
      title: 'Rà quyền lợi công việc',
      description: 'Kiểm tra lại nguồn việc, hợp đồng và các cập nhật lao động đang áp dụng.',
      icon: 'briefcase-outline',
      color: '#8E44AD',
      kind: 'tab',
      tab: 'Jobs',
    },
    {
      id: 'daily-life-general',
      title: 'Cập nhật đời sống thực tế',
      description: 'Xem lại các chủ đề hay dùng như nhà ở, đi lại, rác, y tế và thủ tục địa phương.',
      icon: 'sunny-outline',
      color: '#27AE60',
      kind: 'screen',
      screen: 'DailyLife',
    },
  ];
}
