// My Japan Plan — Phase 0 UI mock data for "Mất thẻ cư trú" flow.
//
// Phase 0 = pure UI mock. NO real wizard branching, NO AsyncStorage,
// NO scheduled notifications, NO real Hỏi Cẩm Nang wire. Everything
// in this file is HARDCODED to render one specific sample plan output.
//
// When Phase 1 lands, this file is replaced by `planFlows/lostResidenceCard.ts`
// that takes wizard `answers` and returns a real `StoredPlan`. The screens
// shouldn't need to change shape — only the data source.
//
// See docs/feature-my-japan-plan-assessment.md §4 for the full design.

import type { Ionicons } from '@expo/vector-icons';

// ─────────────────────────────────────────────────────────────────
// Situations the user can pick on MyJapanPlanScreen.
// Phase 0 ships only "Mất thẻ cư trú" as interactive — others show
// "Sắp có" so the user gets a sense of where this is going.
// ─────────────────────────────────────────────────────────────────

export type PlanSituationId =
  | 'lost-residence-card'
  | 'moving'
  | 'visa-renewal';

export interface PlanSituation {
  id: PlanSituationId;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  available: boolean;          // false → Sắp có, not tappable
  estimatedDays?: string;      // shown next to title when available
}

export const PLAN_SITUATIONS: PlanSituation[] = [
  {
    id: 'lost-residence-card',
    title: 'Mất thẻ cư trú',
    description: 'Hạn ISA: 14 ngày từ khi biết mất. Có lộ trình từng bước.',
    icon: 'alert-circle',
    iconColor: '#C0392B',
    available: true,
    estimatedDays: '2–14 ngày',
  },
  {
    id: 'moving',
    title: 'Chuyển nhà',
    description: 'Đổi địa chỉ với 市役所 + ngân hàng + SIM + bảo hiểm.',
    icon: 'home',
    iconColor: '#27AE60',
    available: false,
  },
  {
    id: 'visa-renewal',
    title: 'Gia hạn visa',
    description: 'Chuẩn bị giấy tờ, đặt lịch ISA, theo dõi tiến độ.',
    icon: 'card',
    iconColor: '#2980B9',
    available: false,
  },
];

// ─────────────────────────────────────────────────────────────────
// Wizard questions for "Mất thẻ cư trú".
// Phase 0: shape only — every answer just routes to "next question"
// or "finish wizard". The actual branching (e.g. Q3=mất hộ chiếu →
// inject embassy step) lands in Phase 1's buildLostCardPlan().
// ─────────────────────────────────────────────────────────────────

export interface WizardOption {
  id: string;
  label: string;
  /** Optional sub-label shown below the option (e.g. urgency hint). */
  hint?: string;
}

export interface WizardQuestion {
  id: string;
  step: number;            // 1..4
  total: number;           // 4
  prompt: string;
  options: WizardOption[];
}

export const LOST_CARD_WIZARD: WizardQuestion[] = [
  {
    id: 'q1-when',
    step: 1,
    total: 4,
    prompt: 'Bạn phát hiện mất thẻ khi nào?',
    options: [
      { id: 'today', label: 'Hôm nay', hint: 'Còn 14 ngày trong hạn ISA' },
      { id: 'recent', label: 'Vài ngày trước', hint: 'Chưa quá 14 ngày' },
      { id: 'over-14', label: 'Đã quá 14 ngày', hint: 'Cần đi gấp + chuẩn bị giải trình' },
      { id: 'unsure', label: 'Không nhớ chính xác' },
    ],
  },
  {
    id: 'q2-where',
    step: 2,
    total: 4,
    prompt: 'Bạn nghĩ thẻ mất ở đâu?',
    options: [
      { id: 'outdoor', label: 'Ngoài đường / trên tàu / nơi công cộng', hint: 'Bắt buộc báo cảnh sát' },
      { id: 'indoor', label: 'Ở nhà / công ty / trường', hint: 'Có thể đi 入管 trực tiếp' },
      { id: 'unsure', label: 'Không chắc' },
    ],
  },
  {
    id: 'q3-passport',
    step: 3,
    total: 4,
    prompt: 'Bạn còn hộ chiếu bản gốc không?',
    options: [
      { id: 'have', label: 'Có, hộ chiếu vẫn còn' },
      { id: 'lost', label: 'Cũng mất hộ chiếu', hint: 'Cần xử lý với Đại sứ quán trước' },
    ],
  },
  {
    id: 'q4-visa',
    step: 4,
    total: 4,
    prompt: 'Visa của bạn còn hạn bao lâu nữa?',
    options: [
      { id: 'long', label: 'Còn trên 3 tháng' },
      { id: 'medium', label: 'Còn dưới 3 tháng' },
      { id: 'short', label: 'Còn dưới 2 tuần', hint: 'Khẩn cấp — visa sắp hết' },
      { id: 'unsure', label: 'Tôi không chắc' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
// Sample plan output rendered by PlanDetailScreen.
//
// Phase 0 = hardcoded sample. The shape mirrors the StoredPlan
// schema described in docs/feature-my-japan-plan-assessment.md §4.8
// so Phase 1 can replace the source with a real builder without
// touching the screen.
// ─────────────────────────────────────────────────────────────────

export interface PlanGlossaryChip {
  /** Japanese term as it appears on the form/sign. */
  term: string;
  /** Hiragana reading; optional. */
  reading?: string;
  /** Short Vietnamese gloss shown on tap. */
  meaningVi: string;
}

export interface PlanCounterPhraseChip {
  jp: string;
  romaji?: string;
  vn: string;
}

export interface PlanStep {
  id: string;
  /** Short imperative — "Đi 交番 báo mất, lấy 受理番号" */
  title: string;
  /** Optional 1–2 line elaboration. */
  detail?: string;
  /** If present, render an open-document link with this guide id. */
  sourceGuideId?: string;
  sourceGuideLabel?: string;
  /** Optional inline chips (Phase 0 = at most 1 of each per step). */
  glossary?: PlanGlossaryChip;
  counterPhrase?: PlanCounterPhraseChip;
}

export interface PlanGroup {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  accent: string;     // text + bar color
  steps: PlanStep[];
}

export interface SamplePlan {
  flowId: PlanSituationId;
  title: string;
  /** Vietnamese pretty deadline, e.g. "30/05/2026 (còn 14 ngày)". */
  deadlineLabel: string;
  /** Optional red banner above all groups. */
  urgencyBanner?: string;
  groups: PlanGroup[];
}

export const LOST_CARD_SAMPLE_PLAN: SamplePlan = {
  flowId: 'lost-residence-card',
  title: 'Mất thẻ cư trú',
  deadlineLabel: 'Hạn ISA: trong 14 ngày kể từ hôm nay',
  urgencyBanner: undefined,
  groups: [
    {
      label: 'Hôm nay',
      icon: 'today',
      accent: '#C0392B',
      steps: [
        {
          id: 'today-1',
          title: 'Đi 交番 báo mất, lấy 受理番号',
          detail:
            'Cảnh sát ghi 遺失届 + cấp mã 受理番号. ISA cần mã này. Mất ở nhà thì có thể bỏ qua bước này.',
          sourceGuideId: 'lost-residence-card',
          sourceGuideLabel: 'Mất thẻ cư trú — xin cấp lại',
          glossary: {
            term: '受理番号',
            reading: 'じゅりばんごう',
            meaningVi: 'Mã biên nhận khai báo (cảnh sát đưa khi bạn báo mất)',
          },
          counterPhrase: {
            jp: '在留カードを紛失しました。',
            romaji: 'Zairyuu kaado o funshitsu shimashita.',
            vn: 'Tôi đã làm mất thẻ cư trú.',
          },
        },
        {
          id: 'today-2',
          title: 'Tìm kỹ ở nhà / công ty / trường 30 phút',
          detail:
            'Trước khi tới 入管, bỏ ra 30 phút lục lại ba lô, túi áo, bàn làm việc. Nhiều người tìm thấy ngay sau khi báo.',
        },
      ],
    },
    {
      label: 'Trong 14 ngày tới',
      icon: 'time',
      accent: '#E67E22',
      steps: [
        {
          id: 'soon-1',
          title: 'Chuẩn bị ảnh thẻ 4×3 cm',
          detail:
            'Chụp trong 3 tháng gần. Mỗi ガード photobooth tầm 800–1000円. Mang ảnh chính chủ, không kính.',
        },
        {
          id: 'soon-2',
          title: 'Đến 入国管理局 nộp đơn 再交付',
          detail:
            'Mang: hộ chiếu gốc, ảnh thẻ, 受理番号 (nếu có), điền 再交付申請書 tại quầy.',
          sourceGuideId: 'lost-residence-card',
          sourceGuideLabel: 'Mất thẻ cư trú — xin cấp lại',
          glossary: {
            term: '再交付申請書',
            reading: 'さいこうふしんせいしょ',
            meaningVi: 'Đơn xin cấp lại thẻ (lấy + điền tại quầy ISA)',
          },
          counterPhrase: {
            jp: '在留カードを紛失したので、再交付をお願いします。',
            romaji: 'Zairyuu kaado o funshitsu shita node, saikoufu o onegai shimasu.',
            vn: 'Tôi đã làm mất thẻ cư trú, xin được cấp lại.',
          },
        },
      ],
    },
    {
      label: 'Sau khi nhận thẻ mới',
      icon: 'checkmark-done',
      accent: '#27AE60',
      steps: [
        {
          id: 'after-1',
          title: 'Đến 市役所 đăng ký lại địa chỉ (trong 14 ngày)',
          detail:
            'Thẻ mới không có địa chỉ in sẵn — phải mang lên 市役所 nơi đang ở để in dán.',
          sourceGuideId: 'moving-in-notification',
          sourceGuideLabel: 'Đăng ký cư trú (転入届)',
        },
        {
          id: 'after-2',
          title: 'Báo ngân hàng / công ty / SIM số thẻ mới',
          detail:
            'Số thẻ mới khác số cũ. Một số dịch vụ link với số thẻ — cập nhật để khỏi bị khóa tài khoản.',
          sourceGuideId: 'bank-account',
          sourceGuideLabel: 'Mở / cập nhật tài khoản ngân hàng',
        },
      ],
    },
  ],
};
