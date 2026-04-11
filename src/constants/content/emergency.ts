import type { AlertItem, EmergencyContact } from '../../types/content';

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: '1',
    name: 'Cảnh sát / Cấp cứu',
    nameJp: '警察・救急',
    number: '110 / 119',
    icon: 'alert-circle',
    color: '#E74C3C',
  },
  {
    id: '2',
    name: 'Tư vấn người nước ngoài (miễn phí)',
    nameJp: '外国人在留支援センター (FRESC)',
    number: '0570-011000',
    icon: 'phone-portrait',
    color: '#185FA5',
  },
  {
    id: '3',
    name: 'Bảo vệ thực tập sinh / kỹ năng đặc định',
    nameJp: '外国人技能実習機構 (OTIT)',
    number: '0120-250-168',
    icon: 'shield-checkmark',
    color: '#E67E22',
  },
  {
    id: '4',
    name: 'Tư vấn lao động (miễn phí)',
    nameJp: '労働基準監督署・相談ダイヤル',
    number: '0120-811-610',
    icon: 'briefcase',
    color: '#8E44AD',
  },
  {
    id: '5',
    name: 'Đại sứ quán Việt Nam tại Nhật',
    nameJp: 'ベトナム大使館',
    number: '+81-3-3466-3313',
    icon: 'flag',
    color: '#27AE60',
  },
];

export const ALERTS: AlertItem[] = [
  {
    id: '1',
    title: 'Gia hạn thẻ cư trú sắp đến hạn',
    description: 'Thẻ cư trú của bạn sẽ hết hạn trong vòng 3 tháng. Hãy chuẩn bị hồ sơ sớm!',
    urgency: 'high' as const,
    daysLeft: 87,
    actionLabel: 'Xem hướng dẫn',
    actionScreen: 'Admin',
  },
  {
    id: '2',
    title: 'Đăng ký bảo hiểm y tế',
    description: 'Tất cả người nước ngoài ở Nhật trên 3 tháng đều phải có bảo hiểm y tế quốc gia.',
    urgency: 'medium' as const,
    actionLabel: 'Tìm hiểu thêm',
    actionScreen: 'Admin',
  },
];

