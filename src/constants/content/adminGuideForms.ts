import type { OfficialFormLink, OfficialFormLinkType } from '../../types/content';

export const MUNICIPAL_FORM_NOTICE =
  'Form tại 市役所/区役所 thường khác theo thành phố/quận. Chỉ dùng PDF nếu đúng cơ quan bạn sẽ nộp hồ sơ; nếu khác địa phương, hãy mở trang chính thức của nơi cư trú để lấy mẫu hiện hành.';

const VERIFIED_AT = '2026-05-03';

const SHIBUYA_FOREIGN_TRANSFER_OUT_PAGE =
  'https://www.city.shibuya.tokyo.jp/kurashi/gaikokujin/jumin/f_out_postal.html';
const SHIBUYA_PROXY_PAGE = 'https://www.city.shibuya.tokyo.jp/kurashi/ininjo/kakunin/inin03.html';

export const ADMIN_GUIDE_FORM_LINKS: Record<string, OfficialFormLink[]> = {
  'address-change': [
    {
      label: '渋谷区: 転入届・転居届（外国人住民）',
      url: 'https://www.city.shibuya.tokyo.jp/kurashi/gaikokujin/jumin/f_t_tennyu.html',
      type: 'official-page',
      jurisdiction: 'municipality',
      jurisdictionLabel: '東京都渋谷区',
      verifiedAt: VERIFIED_AT,
      note: 'Trang hướng dẫn chính thức của Shibuya-ku cho người nước ngoài khi chuyển vào/chuyển trong quận. Không dùng cho thành phố/quận khác.',
    },
    {
      label: '渋谷区: 転出届（外国人住民・郵送用）PDF',
      url: 'https://files.city.shibuya.tokyo.jp/assets/12995aba8b194961be709ba879857f70/203930f713a04f04a3e2b52f11408b56/yu-so_tensyutu_gaikoku.pdf',
      type: 'pdf',
      jurisdiction: 'municipality',
      jurisdictionLabel: '東京都渋谷区',
      verifiedAt: VERIFIED_AT,
      sourceUrl: SHIBUYA_FOREIGN_TRANSFER_OUT_PAGE,
      note: 'Chỉ dùng khi chuyển ra khỏi Shibuya-ku. Nếu bạn ở nơi khác, phải tải form của municipality nơi đang đăng ký cư trú.',
    },
    {
      label: '渋谷区: 記入例 転出届（外国人住民）PDF',
      url: 'https://files.city.shibuya.tokyo.jp/assets/12995aba8b194961be709ba879857f70/24a28c232ff347ad967776511aa4f541/assets_com_000040810.pdf',
      type: 'example-pdf',
      jurisdiction: 'municipality',
      jurisdictionLabel: '東京都渋谷区',
      verifiedAt: VERIFIED_AT,
      sourceUrl: SHIBUYA_FOREIGN_TRANSFER_OUT_PAGE,
      note: 'Bản ví dụ cách điền của Shibuya-ku, dùng để tham khảo khi đúng cơ quan nộp hồ sơ là Shibuya-ku.',
    },
  ],
  'moving-in-notification': [
    {
      label: '渋谷区: 転入届・転居届（外国人住民）',
      url: 'https://www.city.shibuya.tokyo.jp/kurashi/gaikokujin/jumin/f_t_tennyu.html',
      type: 'official-page',
      jurisdiction: 'municipality',
      jurisdictionLabel: '東京都渋谷区',
      verifiedAt: VERIFIED_AT,
      note: 'Trang hướng dẫn chính thức của Shibuya-ku. Nếu bạn đăng ký ở city/ward khác, không dùng form/trang này.',
    },
  ],
  'return-to-vietnam-checklist': [
    {
      label: '渋谷区: 転出届（外国人住民・郵送用）PDF',
      url: 'https://files.city.shibuya.tokyo.jp/assets/12995aba8b194961be709ba879857f70/203930f713a04f04a3e2b52f11408b56/yu-so_tensyutu_gaikoku.pdf',
      type: 'pdf',
      jurisdiction: 'municipality',
      jurisdictionLabel: '東京都渋谷区',
      verifiedAt: VERIFIED_AT,
      sourceUrl: SHIBUYA_FOREIGN_TRANSFER_OUT_PAGE,
      note: 'Chỉ phù hợp nếu địa chỉ cư trú đang đăng ký ở Shibuya-ku. Khi rời Nhật từ nơi khác, tải form 転出届 của municipality đó.',
    },
    {
      label: '渋谷区: 記入例 転出届（外国人住民）PDF',
      url: 'https://files.city.shibuya.tokyo.jp/assets/12995aba8b194961be709ba879857f70/24a28c232ff347ad967776511aa4f541/assets_com_000040810.pdf',
      type: 'example-pdf',
      jurisdiction: 'municipality',
      jurisdictionLabel: '東京都渋谷区',
      verifiedAt: VERIFIED_AT,
      sourceUrl: SHIBUYA_FOREIGN_TRANSFER_OUT_PAGE,
      note: 'Bản ví dụ cách điền, không phải form nộp cho municipality khác.',
    },
  ],
  'hanko-inkan': [
    {
      label: '渋谷区: 委任状（印鑑登録など）PDF',
      url: 'https://files.city.shibuya.tokyo.jp/assets/12995aba8b194961be709ba879857f70/efb1eb4f352742fea7d551ea8705a6c2/ininjyou_inkan.pdf',
      type: 'pdf',
      jurisdiction: 'municipality',
      jurisdictionLabel: '東京都渋谷区',
      verifiedAt: VERIFIED_AT,
      sourceUrl: SHIBUYA_PROXY_PAGE,
      note: 'Chỉ dùng khi làm thủ tục với Shibuya-ku và cần ủy quyền. Nơi khác thường có mẫu 委任状 riêng.',
    },
  ],
};

export function getAdminGuideOfficialFormLinks(guideId: string): OfficialFormLink[] {
  return ADMIN_GUIDE_FORM_LINKS[guideId] ?? [];
}

export function getOfficialFormLinkTypeLabel(type: OfficialFormLinkType): string {
  switch (type) {
    case 'pdf':
      return 'PDF';
    case 'fillable-pdf':
      return 'PDF điền';
    case 'example-pdf':
      return 'Ví dụ PDF';
    case 'official-page':
    default:
      return 'Trang chính thức';
  }
}
