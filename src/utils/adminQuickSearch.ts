import type { AdminGuideCategory, IoniconName } from '../types/content';

export interface AdminQuickSearchChip {
  id: string;
  label: string;
  query: string;
  category: AdminGuideCategory;
  icon: IoniconName;
  color: string;
  targetGuideIds: readonly string[];
}

export const ADMIN_QUICK_SEARCH_CHIPS = [
  {
    id: 'visa',
    label: 'Visa',
    query: 'visa',
    category: 'visa',
    icon: 'albums',
    color: '#185FA5',
    targetGuideIds: ['visa-status-overview'],
  },
  {
    id: 'visa-renewal',
    label: 'Gia hạn visa',
    query: 'gia han visa',
    category: 'immigration',
    icon: 'card',
    color: '#2E86C1',
    targetGuideIds: ['residence-card'],
  },
  {
    id: 'job-change',
    label: 'Đổi việc',
    query: 'doi viec',
    category: 'immigration',
    icon: 'briefcase',
    color: '#D35400',
    targetGuideIds: ['job-change-notification'],
  },
  {
    id: 'tax',
    label: 'Thuế',
    query: 'thue',
    category: 'money',
    icon: 'receipt',
    color: '#1F7A4D',
    targetGuideIds: ['juminzei-local-tax', 'kakutei-shinkoku'],
  },
  {
    id: 'health-insurance',
    label: 'Bảo hiểm y tế',
    query: 'bao hiem y te',
    category: 'health',
    icon: 'medkit',
    color: '#16A085',
    targetGuideIds: ['health-insurance'],
  },
  {
    id: 'traffic-accident',
    label: 'Tai nạn',
    query: 'tai nan',
    category: 'traffic',
    icon: 'warning',
    color: '#C0392B',
    targetGuideIds: ['traffic-accident-response'],
  },
  {
    id: 'children',
    label: 'Con đi học',
    query: 'nhap hoc cho con',
    category: 'daily-law',
    icon: 'school',
    color: '#8E44AD',
    targetGuideIds: ['school-enrollment-children'],
  },
  {
    id: 'housing',
    label: 'Nhà ở',
    query: 'thue nha',
    category: 'money',
    icon: 'home',
    color: '#6C7A99',
    targetGuideIds: ['renting-and-buying-home'],
  },
  {
    id: 'money',
    label: 'Tiền',
    query: 'gui tien',
    category: 'money',
    icon: 'cash',
    color: '#8E44AD',
    targetGuideIds: ['remittance'],
  },
  {
    id: 'license',
    label: 'Bằng lái',
    query: 'bang lai',
    category: 'license',
    icon: 'car',
    color: '#E74C3C',
    targetGuideIds: ['drivers-license'],
  },
] as const satisfies readonly AdminQuickSearchChip[];

const ADMIN_EMPTY_SEARCH_SUGGESTION_IDS = [
  'tax',
  'health-insurance',
  'traffic-accident',
  'visa',
] as const;

export const ADMIN_EMPTY_SEARCH_SUGGESTION_CHIPS = ADMIN_EMPTY_SEARCH_SUGGESTION_IDS.map((id) => {
  const chip = ADMIN_QUICK_SEARCH_CHIPS.find((item) => item.id === id);
  if (!chip) throw new Error(`Missing admin quick search chip: ${id}`);
  return chip;
});
