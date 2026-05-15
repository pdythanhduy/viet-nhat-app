// Phase 1 fake sample data for "Dịch Thư Nhật" UI mock.
// NO real AI processing. Schema mirrors docs/feature-translate-japanese-mail-audit.md section 5.1.
// When Phase 2 backend is wired, this file can be deleted and the same shape returned by the API.

import type { Ionicons } from '@expo/vector-icons';

export type MailWarningSeverity = 'info' | 'warning' | 'danger';
export type MailPriority = 'urgent' | 'important' | 'normal' | 'info';

export type MailWarning = {
  severity: MailWarningSeverity;
  messageVi: string;
};

export type MailVocabItem = {
  jp: string;
  reading: string;
  vi: string;
};

export type MailSample = {
  id: string;
  documentType: string;
  documentTypeVi: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  priority: MailPriority;
  summaryVi: string;
  requiredActionVi: string;
  deadline: string | null;
  amountYen: number | null;
  warnings: MailWarning[];
  keyVocabulary: MailVocabItem[];
  relatedGuideId: string | null;
  aiConfidenceScore: number;
};

export const MAIL_SAMPLES: MailSample[] = [
  {
    id: 'sample-juuminzei',
    documentType: 'juuminzei_notification',
    documentTypeVi: 'Thông báo thuế cư trú (住民税)',
    iconName: 'document-text',
    iconColor: '#185FA5',
    priority: 'important',
    summaryVi:
      'Thông báo nộp thuế cư trú năm 2026 từ 市役所. Có 4 đợt nộp trong năm. Có thể nộp tại convenience store hoặc chuyển khoản.',
    requiredActionVi:
      'Mang phiếu nộp đến convenience store hoặc ngân hàng để thanh toán đợt 1 trước hạn. Giữ biên lai để tham chiếu sau này.',
    deadline: '2026-06-30',
    amountYen: 48000,
    warnings: [
      {
        severity: 'warning',
        messageVi: 'Nếu trễ hạn sẽ phát sinh tiền chậm nộp (延滞金) ~2.4–8.7%/năm.',
      },
    ],
    keyVocabulary: [
      { jp: '住民税', reading: 'じゅうみんぜい', vi: 'Thuế cư trú' },
      { jp: '納付書', reading: 'のうふしょ', vi: 'Phiếu nộp tiền' },
      { jp: '納期限', reading: 'のうきげん', vi: 'Hạn nộp' },
      { jp: '延滞金', reading: 'えんたいきん', vi: 'Tiền chậm nộp' },
      { jp: '分納', reading: 'ぶんのう', vi: 'Chia nhỏ thành nhiều đợt nộp' },
    ],
    relatedGuideId: 'tax-on-remittance-to-vietnam',
    aiConfidenceScore: 0.92,
  },
  {
    id: 'sample-nhk',
    documentType: 'nhk_contract_request',
    documentTypeVi: 'Yêu cầu ký hợp đồng NHK 受信契約',
    iconName: 'tv',
    iconColor: '#E67E22',
    priority: 'normal',
    summaryVi:
      'Bưu thiếp từ NHK yêu cầu ký hợp đồng phí thu sóng truyền hình. Đây là thư chính thức, không phải lừa đảo.',
    requiredActionVi:
      'Đọc kỹ điều kiện trước khi ký. Nếu nhà bạn không có TV / thiết bị thu sóng, bạn có quyền từ chối — xem hướng dẫn chi tiết.',
    deadline: null,
    amountYen: null,
    warnings: [
      {
        severity: 'info',
        messageVi: 'NHK collector đến tận nhà — bạn không bắt buộc mở cửa. Có thể yêu cầu liên lạc qua thư.',
      },
    ],
    keyVocabulary: [
      { jp: '受信契約', reading: 'じゅしんけいやく', vi: 'Hợp đồng thu sóng' },
      { jp: '受信料', reading: 'じゅしんりょう', vi: 'Phí thu sóng' },
      { jp: '放送法', reading: 'ほうそうほう', vi: 'Luật phát sóng' },
      { jp: '訪問員', reading: 'ほうもんいん', vi: 'Nhân viên đến nhà' },
    ],
    relatedGuideId: 'nhk-contract-guide',
    aiConfidenceScore: 0.88,
  },
  {
    id: 'sample-scam',
    documentType: 'scam_suspected',
    documentTypeVi: 'Nghi ngờ thư lừa đảo (詐欺メール)',
    iconName: 'warning',
    iconColor: '#E74C3C',
    priority: 'urgent',
    summaryVi:
      'Email/SMS giả mạo cơ quan thuế (国税庁) yêu cầu thanh toán "thuế quá hạn" qua link bên ngoài. Có nhiều dấu hiệu lừa đảo: link rút gọn, deadline trong 24h, đe doạ pháp lý.',
    requiredActionVi:
      'KHÔNG bấm vào link. KHÔNG cung cấp số thẻ. Báo ngay 国民生活センター 188 hoặc 警察相談電話 #9110 nếu cần.',
    deadline: null,
    amountYen: null,
    warnings: [
      {
        severity: 'danger',
        messageVi: 'Cơ quan thuế Nhật KHÔNG bao giờ gửi link thanh toán qua SMS/email. Đây gần như chắc chắn là lừa đảo.',
      },
      {
        severity: 'warning',
        messageVi: 'Nếu đã bấm link / nhập thông tin: đổi mật khẩu, khoá thẻ, gọi ngân hàng ngay.',
      },
    ],
    keyVocabulary: [
      { jp: '国税庁', reading: 'こくぜいちょう', vi: 'Tổng cục thuế Nhật' },
      { jp: '詐欺', reading: 'さぎ', vi: 'Lừa đảo' },
      { jp: '督促', reading: 'とくそく', vi: 'Đốc thúc / nhắc nợ' },
      { jp: '差押え', reading: 'さしおさえ', vi: 'Tịch thu tài sản' },
    ],
    relatedGuideId: null,
    aiConfidenceScore: 0.78,
  },
];

export function getMailSampleById(id: string): MailSample | undefined {
  return MAIL_SAMPLES.find((s) => s.id === id);
}
