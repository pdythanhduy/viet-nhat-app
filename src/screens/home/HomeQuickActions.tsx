// Home — the "Tôi đang cần gì?" situation catalog.
//
// Each situation maps to a safe destination (Search query, dedicated
// screen, or the matching tab); that mapping lives in HomeScreen. The
// chips themselves are drawn by HomeHero's `situations` variant, so this
// file owns only the catalog and its analytics contract.

import { Ionicons } from '@expo/vector-icons';

import type { EventMap } from '../../utils/analytics';

export type QuickActionId =
  | 'newcomer'
  | 'visa-renewal'
  | 'moving'
  | 'official-mail'
  | 'tax-insurance'
  | 'lost-document'
  | 'emergency';

// Compile-time contract: QuickActionId must stay bidirectionally
// equal to the analytics event's action_id enum. Adding a quick
// action here without extending EventMap (or vice versa) makes the
// type below resolve to `false` and breaks tsc — protects against
// silent analytics drift when the situations catalog evolves.
//
// Uses the standard variance trick for type equality (rather than
// importing the union into analytics.ts, which would drag UI deps
// into the otherwise pure analytics module).
type _QuickActionIdMatchesAnalytics = (<T>() => T extends QuickActionId ? 1 : 2) extends (
  <T>() => T extends EventMap['home_quick_action_pressed']['action_id'] ? 1 : 2
)
  ? true
  : false;
// The constant must be assignable to `true`. If the unions drift the
// type resolves to `false` and this line fails.
const _quickActionIdContract: _QuickActionIdMatchesAnalytics = true;
void _quickActionIdContract;

export interface QuickAction {
  id: QuickActionId;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bg: string;
}

export const QUICK_ACTIONS: ReadonlyArray<QuickAction> = [
  { id: 'newcomer',       title: 'Mới sang Nhật',         icon: 'compass-outline',       color: '#185FA5', bg: '#E5EFF8' },
  { id: 'visa-renewal',   title: 'Gia hạn visa',          icon: 'card-outline',          color: '#16A085', bg: '#E5F5F1' },
  { id: 'moving',         title: 'Chuyển nhà',            icon: 'home-outline',          color: '#D35400', bg: '#FBEDE0' },
  { id: 'official-mail',  title: 'Nhận thư từ cơ quan',   icon: 'mail-outline',          color: '#8E44AD', bg: '#F1E9F6' },
  { id: 'tax-insurance',  title: 'Thuế / bảo hiểm',       icon: 'receipt-outline',       color: '#2C7A7B', bg: '#E1EFEF' },
  { id: 'lost-document',  title: 'Mất giấy tờ',           icon: 'alert-circle-outline',  color: '#C0392B', bg: '#F9E5E2' },
  { id: 'emergency',      title: 'Khẩn cấp',              icon: 'medkit-outline',        color: '#E74C3C', bg: '#FDECEA' },
];
