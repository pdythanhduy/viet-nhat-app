import type { OfficialFormLink, OfficialFormLinkType } from '../../types/content';

export const MUNICIPAL_FORM_NOTICE =
  'Form tại 市役所/区役所 thường khác theo thành phố/quận. Chỉ dùng PDF nếu đúng cơ quan bạn sẽ nộp hồ sơ; nếu khác địa phương, hãy mở trang chính thức của nơi cư trú để lấy mẫu hiện hành.';

const VERIFIED_AT = '2026-05-03';

const SHIBUYA_FOREIGN_TRANSFER_OUT_PAGE =
  'https://www.city.shibuya.tokyo.jp/kurashi/gaikokujin/jumin/f_out_postal.html';
const SHIBUYA_PROXY_PAGE = 'https://www.city.shibuya.tokyo.jp/kurashi/ininjo/kakunin/inin03.html';
const SHINJUKU_TRANSFER_OUT_PAGE =
  'https://www.city.shinjuku.lg.jp/todokede/koseki03_000004_f.html';
const SHINJUKU_PROXY_PAGE = 'https://www.city.shinjuku.lg.jp/todokede/koseki03_000105.html';

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
    {
      label: '新宿区: 転出届（郵送届出用）案内',
      url: SHINJUKU_TRANSFER_OUT_PAGE,
      type: 'official-page',
      jurisdiction: 'municipality',
      jurisdictionLabel: '東京都新宿区',
      verifiedAt: VERIFIED_AT,
      note: 'Trang chính thức của Shinjuku-ku cho thủ tục chuyển ra khỏi quận. Dùng để xác nhận điều kiện, nơi gửi và PDF hiện hành.',
    },
    {
      label: '新宿区: 転出届（郵送届出用）PDF',
      url: 'https://www.city.shinjuku.lg.jp/content/000300958.pdf',
      type: 'pdf',
      jurisdiction: 'municipality',
      jurisdictionLabel: '東京都新宿区',
      verifiedAt: VERIFIED_AT,
      sourceUrl: SHINJUKU_TRANSFER_OUT_PAGE,
      note: 'PDF tiếng Nhật cho thủ tục chuyển ra khỏi Shinjuku-ku qua bưu điện. Không dùng cho municipality khác.',
    },
    {
      label: '新宿区: 外国語版 転出届（郵送届出用）PDF',
      url: 'https://www.city.shinjuku.lg.jp/content/000300959.pdf',
      type: 'pdf',
      jurisdiction: 'municipality',
      jurisdictionLabel: '東京都新宿区',
      verifiedAt: VERIFIED_AT,
      sourceUrl: SHINJUKU_TRANSFER_OUT_PAGE,
      note: 'PDF bản ngoại ngữ của Shinjuku-ku cho 転出届 gửi bưu điện; trang nguồn ghi có tiếng Anh, Trung, Hàn.',
    },
    {
      label: '新宿区: 委任状（住所変更等）PDF',
      url: 'https://www.city.shinjuku.lg.jp/content/000320084.pdf',
      type: 'pdf',
      jurisdiction: 'municipality',
      jurisdictionLabel: '東京都新宿区',
      verifiedAt: VERIFIED_AT,
      sourceUrl: SHINJUKU_PROXY_PAGE,
      note: 'Mẫu ủy quyền của Shinjuku-ku cho thủ tục địa chỉ như 転入・転出・転居 khi có người đại diện.',
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
    {
      label: '新宿区: 転出届（郵送届出用）PDF',
      url: 'https://www.city.shinjuku.lg.jp/content/000300958.pdf',
      type: 'pdf',
      jurisdiction: 'municipality',
      jurisdictionLabel: '東京都新宿区',
      verifiedAt: VERIFIED_AT,
      sourceUrl: SHINJUKU_TRANSFER_OUT_PAGE,
      note: 'Chỉ dùng nếu địa chỉ hiện tại thuộc Shinjuku-ku và làm 転出届 qua bưu điện trước khi rời Nhật/chuyển đi.',
    },
    {
      label: '新宿区: 外国語版 転出届（郵送届出用）PDF',
      url: 'https://www.city.shinjuku.lg.jp/content/000300959.pdf',
      type: 'pdf',
      jurisdiction: 'municipality',
      jurisdictionLabel: '東京都新宿区',
      verifiedAt: VERIFIED_AT,
      sourceUrl: SHINJUKU_TRANSFER_OUT_PAGE,
      note: 'Bản ngoại ngữ của Shinjuku-ku cho người cần điền 転出届 qua bưu điện.',
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
    {
      label: '新宿区: 委任状（印鑑登録等）PDF',
      url: 'https://www.city.shinjuku.lg.jp/content/000320085.pdf',
      type: 'pdf',
      jurisdiction: 'municipality',
      jurisdictionLabel: '東京都新宿区',
      verifiedAt: VERIFIED_AT,
      sourceUrl: SHINJUKU_PROXY_PAGE,
      note: 'Mẫu ủy quyền của Shinjuku-ku cho 印鑑登録など. Chỉ dùng khi thủ tục nộp tại Shinjuku-ku.',
    },
  ],
};

export function getAdminGuideOfficialFormLinks(guideId: string): OfficialFormLink[] {
  return ADMIN_GUIDE_FORM_LINKS[guideId] ?? [];
}

export function getOfficialFormJurisdictionKey(link: OfficialFormLink): string {
  return `${link.jurisdiction}:${link.jurisdictionLabel ?? link.jurisdiction}`;
}

export function getOfficialFormJurisdictionLabel(link: OfficialFormLink): string {
  return link.jurisdictionLabel ?? getOfficialFormJurisdictionTypeLabel(link.jurisdiction);
}

export function getOfficialFormJurisdictionOptions(links: readonly OfficialFormLink[]) {
  const options = new Map<string, string>();

  for (const link of links) {
    options.set(getOfficialFormJurisdictionKey(link), getOfficialFormJurisdictionLabel(link));
  }

  return [...options.entries()]
    .map(([id, label]) => ({ id, label }))
    .sort((a, b) => a.label.localeCompare(b.label, 'ja'));
}

export function filterOfficialFormLinksByJurisdiction(
  links: readonly OfficialFormLink[],
  jurisdictionKey: string
): OfficialFormLink[] {
  if (jurisdictionKey === 'all') return [...links];
  return links.filter((link) => getOfficialFormJurisdictionKey(link) === jurisdictionKey);
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

function getOfficialFormJurisdictionTypeLabel(jurisdiction: OfficialFormLink['jurisdiction']): string {
  switch (jurisdiction) {
    case 'national':
      return 'Toàn quốc';
    case 'prefecture':
      return 'Tỉnh/thành';
    case 'municipality':
    default:
      return 'Municipality';
  }
}
