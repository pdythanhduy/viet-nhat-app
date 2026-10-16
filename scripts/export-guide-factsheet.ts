/**
 * Export one admin guide as a plain-text fact sheet — the source that the
 * japan-news-bot `nb24h_ai.from_guide` video pipeline is allowed to use.
 *
 * usage: npx tsx scripts/export-guide-factsheet.ts <guide-id> [out.md]
 *        npx tsx scripts/export-guide-factsheet.ts --list   (ids in app order)
 */
import fs from 'fs';

// Guides `require()` their hero images; the fact sheet only needs text.
for (const ext of ['.jpg', '.jpeg', '.png', '.webp']) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require.extensions[ext] = () => undefined;
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { ADMIN_GUIDES } = require('../src/constants/content/adminGuides');

type Faq = { question: string; answer: string };
type Step = { title: string; description: string };
type Doc = { label: string; note?: string };
type Link = { label: string; url: string };

const clean = (s: string) => s.replace(/\*\*/g, '').replace(/\[\[([^\]]+)\]\]/g, '$1').trim();
const list = (title: string, items?: string[]) =>
  items?.length ? `\n${title}:\n${items.map((x) => `- ${clean(x)}`).join('\n')}\n` : '';

function factsheet(g: any): string {
  const out: string[] = [];
  out.push(`${clean(g.title)}${g.titleJp ? ` (${g.titleJp})` : ''}`);
  const links: Link[] = g.officialLinks ?? [];
  out.push(`\nNguồn: ${links.map((l) => `${l.label} — ${l.url}`).join('; ') || 'trang chính thức của cơ quan Nhật'}`);
  out.push(`Ngày kiểm tra nội dung: ${g.legalScope?.sourceVerifiedAt ?? g.lastVerified}`);
  out.push(`\nTóm tắt: ${clean(g.description ?? '')}`);
  if (g.legalScope?.jurisdictionNote) out.push(`Phạm vi: ${clean(g.legalScope.jurisdictionNote)}`);
  const qa = g.quickAction;
  if (qa) {
    out.push(`\nHạn / thời điểm: ${clean(qa.deadline)}`);
    out.push(`Làm ở đâu: ${clean(qa.office)}`);
    out.push(list('Việc cần làm ngay', qa.doNow));
    out.push(list('Mang theo', qa.bring));
    out.push(`Nếu trễ: ${clean(qa.ifLate)}`);
  }
  out.push(list('Dành cho ai', g.whoIsThisFor));
  out.push(list('Khi nào làm', g.whenToDo));
  out.push(list('Làm ở đâu', g.whereToDo));
  if (g.estimatedTime) out.push(`\nThời gian: ${clean(g.estimatedTime)}`);
  out.push(list('Phí', g.fees));
  out.push(list('Giấy tờ', (g.documentsChecklist ?? []).map((d: Doc) => d.label + (d.note ? ` — ${d.note}` : ''))));
  out.push(list('Lỗi hay gặp', g.commonMistakes));
  const faq: Faq[] = g.faq ?? [];
  if (faq.length) out.push(`\nHỏi đáp:\n${faq.map((f) => `- H: ${clean(f.question)}\n  Đ: ${clean(f.answer)}`).join('\n')}`);
  const steps: Step[] = g.steps ?? [];
  if (steps.length) out.push(`\nCác bước:\n${steps.map((s, i) => `${i + 1}. ${clean(s.title)}: ${clean(s.description)}`).join('\n')}`);
  return out.filter(Boolean).join('\n').replace(/\n{3,}/g, '\n\n') + '\n';
}

const [arg, outPath] = process.argv.slice(2);
if (arg === '--list') {
  console.log(ADMIN_GUIDES.map((g: any) => g.id).join('\n'));
} else {
  const g = ADMIN_GUIDES.find((x: any) => x.id === arg);
  if (!g) {
    console.error(`unknown guide id: ${arg}`);
    process.exit(1);
  }
  const text = factsheet(g);
  if (outPath) fs.writeFileSync(outPath, text, 'utf-8');
  else process.stdout.write(text);
}
