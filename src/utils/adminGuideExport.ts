import { ADMIN_CONTENT_META } from '../constants/content/adminGuides';
import { Disclaimers } from '../constants/disclaimers';
import type { AdminGuide, AdminGuideCategory, OfficialLink } from '../types/content';
import { formatLastUpdated, getSourceLabels } from './contentMetadata';

export const ADMIN_GUIDE_EXPORT_FORM_NOTICE =
  'Form/mẫu mới nhất hiện hành không được đính kèm sẵn trong file này. Khi chuẩn bị nộp hồ sơ, hãy mở link nguồn chính thức của từng thủ tục để tải mẫu đơn/form đang áp dụng, kiểm tra lại phí, nơi nộp và yêu cầu mới nhất.';

const ADMIN_GUIDE_EXPORT_TITLE = 'Viet-Nhat App - Hướng dẫn thủ tục hành chính';

const CATEGORY_LABELS: Record<AdminGuideCategory, string> = {
  immigration: 'Lưu trú',
  visa: 'Visa',
  'daily-law': 'Luật đời sống',
  traffic: 'Giao thông',
  health: 'Y tế',
  money: 'Tiền bạc',
  license: 'Bằng lái',
};

type ExportScope = 'all' | 'filtered';

interface BuildAdminGuideExportHtmlOptions {
  guides: readonly AdminGuide[];
  title?: string;
  scopeLabel?: string;
  generatedAt?: Date;
}

export function escapeAdminGuideExportHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function getAdminGuideExportFileName(
  options: { scope?: ExportScope; guide?: AdminGuide } = {}
): string {
  const date = options.guide?.lastVerified ?? ADMIN_CONTENT_META.lastUpdated;
  const base = options.guide
    ? `viet-nhat-thu-tuc-${options.guide.id}`
    : options.scope === 'filtered'
      ? 'viet-nhat-thu-tuc-danh-sach'
      : 'viet-nhat-thu-tuc-tat-ca';

  return `${sanitizeFilePart(base)}-${date}.html`;
}

export function buildAdminGuideExportHtml({
  guides,
  title = ADMIN_GUIDE_EXPORT_TITLE,
  scopeLabel = 'Tất cả thủ tục',
  generatedAt = new Date(),
}: BuildAdminGuideExportHtmlOptions): string {
  const sortedGuides = [...guides].sort((a, b) => {
    const priorityDiff = Number(b.priority === 'high') - Number(a.priority === 'high');
    if (priorityDiff !== 0) return priorityDiff;
    return a.title.localeCompare(b.title, 'vi');
  });

  const escapedTitle = escapeAdminGuideExportHtml(title);
  const escapedScope = escapeAdminGuideExportHtml(scopeLabel);
  const generatedLabel = formatDateForExport(generatedAt);

  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapedTitle}</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f4f7fb;
      --card: #ffffff;
      --text: #16324f;
      --muted: #607085;
      --line: #dce5f0;
      --primary: #185fa5;
      --warning: #a95d00;
      --warning-bg: #fff4df;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
      line-height: 1.55;
    }
    main {
      width: min(980px, 100%);
      margin: 0 auto;
      padding: 22px 14px 40px;
    }
    header, section, article {
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 14px;
    }
    h1, h2, h3, h4 { line-height: 1.25; margin: 0 0 10px; }
    h1 { font-size: 24px; }
    h2 { font-size: 20px; }
    h3 { font-size: 16px; }
    h4 { font-size: 14px; }
    p { margin: 0 0 10px; }
    ul, ol { margin-top: 8px; padding-left: 22px; }
    li { margin-bottom: 6px; }
    a { color: var(--primary); overflow-wrap: anywhere; }
    .muted { color: var(--muted); font-size: 13px; }
    .notice {
      background: var(--warning-bg);
      border-color: #f2cf8f;
      color: var(--warning);
    }
    .toc a { text-decoration: none; }
    .badge {
      display: inline-block;
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 3px 9px;
      margin: 0 6px 8px 0;
      color: var(--muted);
      font-size: 12px;
      font-weight: 700;
    }
    .guide { border-left: 5px solid var(--primary); }
    .guide-meta { margin-bottom: 12px; }
    .body {
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      font-family: inherit;
      margin: 0 0 10px;
    }
    .step {
      background: #f9fbfe;
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 12px;
      margin-top: 10px;
    }
    .link-list { padding-left: 0; list-style: none; }
    .link-list li {
      border-top: 1px solid var(--line);
      padding-top: 9px;
    }
    @media print {
      body { background: #fff; }
      main { width: 100%; padding: 0; }
      header, section, article { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <main>
    <header>
      <h1>${escapedTitle}</h1>
      <p class="muted">Phạm vi: ${escapedScope}. Số thủ tục: ${sortedGuides.length}. Tạo file: ${generatedLabel}.</p>
      <p class="muted">Cập nhật nội dung: ${escapeAdminGuideExportHtml(
        formatLastUpdated(ADMIN_CONTENT_META.lastUpdated)
      )}. Nguồn tổng quát: ${escapeAdminGuideExportHtml(getSourceLabels(ADMIN_CONTENT_META))}.</p>
    </header>

    <section class="notice">
      <h2>Form/mẫu hiện hành</h2>
      <p>${escapeAdminGuideExportHtml(ADMIN_GUIDE_EXPORT_FORM_NOTICE)}</p>
      <p>${escapeAdminGuideExportHtml(Disclaimers.legal)}</p>
    </section>

    ${renderOfficialSourceOverview(ADMIN_CONTENT_META.sources)}
    ${renderTableOfContents(sortedGuides)}
    ${sortedGuides.map(renderGuide).join('\n')}
  </main>
</body>
</html>`;
}

function renderOfficialSourceOverview(sources: readonly OfficialLink[]): string {
  if (!sources.length) return '';

  return `<section>
      <h2>Nguồn chính thức tổng quát</h2>
      <ul class="link-list">
        ${sources.map(renderOfficialLink).join('\n')}
      </ul>
    </section>`;
}

function renderTableOfContents(guides: readonly AdminGuide[]): string {
  if (!guides.length) {
    return `<section><h2>Danh sách thủ tục</h2><p class="muted">Không có thủ tục nào trong phạm vi xuất file.</p></section>`;
  }

  return `<section class="toc">
      <h2>Danh sách thủ tục</h2>
      <ol>
        ${guides
          .map(
            (guide) =>
              `<li><a href="#${escapeAdminGuideExportHtml(getGuideAnchor(guide))}">${escapeAdminGuideExportHtml(
                guide.title
              )}</a> <span class="muted">${escapeAdminGuideExportHtml(guide.titleJp)}</span></li>`
          )
          .join('\n')}
      </ol>
    </section>`;
}

function renderGuide(guide: AdminGuide): string {
  const guideColor = getSafeCssColor(guide.color);

  return `<article id="${escapeAdminGuideExportHtml(getGuideAnchor(guide))}" class="guide" style="border-left-color: ${guideColor}">
      <h2>${escapeAdminGuideExportHtml(guide.title)}</h2>
      <p class="muted">${escapeAdminGuideExportHtml(guide.titleJp)}</p>
      <div class="guide-meta">
        <span class="badge">${escapeAdminGuideExportHtml(CATEGORY_LABELS[guide.category])}</span>
        <span class="badge">Xác minh: ${escapeAdminGuideExportHtml(formatLastUpdated(guide.lastVerified))}</span>
        <span class="badge">${guide.steps.length} bước</span>
        ${guide.priority === 'high' ? '<span class="badge">Quan trọng</span>' : ''}
      </div>
      ${renderTextBlock(guide.description)}
      ${renderListSection('Ai cần làm', guide.whoIsThisFor)}
      ${renderListSection('Khi nào làm', guide.whenToDo)}
      ${renderListSection('Làm ở đâu', guide.whereToDo)}
      ${renderTextSection('Thời gian xử lý', guide.estimatedTime)}
      ${renderListSection('Chi phí', guide.fees)}
      ${renderChecklist(guide)}
      ${renderSteps(guide)}
      ${renderListSection('Lỗi thường gặp', guide.commonMistakes)}
      ${renderFaq(guide)}
      ${renderGuideOfficialLinks(guide)}
    </article>`;
}

function renderTextBlock(value: string): string {
  return `<pre class="body">${escapeAdminGuideExportHtml(value.trim())}</pre>`;
}

function renderTextSection(title: string, value?: string): string {
  if (!value?.trim()) return '';

  return `<section>
      <h3>${escapeAdminGuideExportHtml(title)}</h3>
      ${renderTextBlock(value)}
    </section>`;
}

function renderListSection(title: string, items?: readonly string[]): string {
  if (!items?.length) return '';

  return `<section>
      <h3>${escapeAdminGuideExportHtml(title)}</h3>
      <ul>
        ${items.map((item) => `<li>${escapeAdminGuideExportHtml(item)}</li>`).join('\n')}
      </ul>
    </section>`;
}

function renderChecklist(guide: AdminGuide): string {
  if (!guide.documentsChecklist?.length) return '';

  return `<section>
      <h3>Checklist giấy tờ</h3>
      <ul>
        ${guide.documentsChecklist
          .map((item) => {
            const requiredLabel = item.required ? 'Bắt buộc' : 'Tùy trường hợp';
            const note = item.note ? ` - ${item.note}` : '';
            return `<li><strong>${escapeAdminGuideExportHtml(requiredLabel)}:</strong> ${escapeAdminGuideExportHtml(
              item.label + note
            )}</li>`;
          })
          .join('\n')}
      </ul>
    </section>`;
}

function renderSteps(guide: AdminGuide): string {
  if (!guide.steps.length) return '';

  return `<section>
      <h3>Các bước thực hiện</h3>
      ${guide.steps
        .map(
          (step) => `<div class="step">
          <h4>Bước ${step.step}: ${escapeAdminGuideExportHtml(step.title)}</h4>
          ${renderTextBlock(step.description)}
          ${renderListSection('Giấy tờ ở bước này', step.documents)}
          ${step.tip ? renderTextSection('Mẹo đáng nhớ', step.tip) : ''}
        </div>`
        )
        .join('\n')}
    </section>`;
}

function renderFaq(guide: AdminGuide): string {
  if (!guide.faq?.length) return '';

  return `<section>
      <h3>Câu hỏi thường gặp</h3>
      ${guide.faq
        .map(
          (item) => `<div class="step">
          <h4>${escapeAdminGuideExportHtml(item.question)}</h4>
          ${renderTextBlock(item.answer)}
        </div>`
        )
        .join('\n')}
    </section>`;
}

function renderGuideOfficialLinks(guide: AdminGuide): string {
  if (!guide.officialLinks.length) return '';

  return `<section>
      <h3>Link nguồn chính thức / tải form hiện hành</h3>
      <p class="muted">Luôn mở các link này trước khi nộp hồ sơ để lấy form/mẫu mới nhất do cơ quan chính thức công bố.</p>
      <ul class="link-list">
        ${guide.officialLinks.map(renderOfficialLink).join('\n')}
      </ul>
    </section>`;
}

function renderOfficialLink(link: OfficialLink): string {
  return `<li><a href="${escapeAdminGuideExportHtml(link.url)}" rel="noopener noreferrer">${escapeAdminGuideExportHtml(
    link.label
  )}</a><br /><span class="muted">${escapeAdminGuideExportHtml(link.url)}</span></li>`;
}

function getGuideAnchor(guide: AdminGuide): string {
  return `guide-${sanitizeFilePart(guide.id)}`;
}

function sanitizeFilePart(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);
}

function getSafeCssColor(value: string): string {
  return /^#[0-9a-f]{3,8}$/i.test(value) ? value : '#185fa5';
}

function formatDateForExport(date: Date): string {
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
}
