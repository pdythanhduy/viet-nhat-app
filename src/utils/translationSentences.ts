export function splitJapaneseSentences(text: string): string[] {
  const normalized = text.replace(/\r\n/g, '\n').trim();
  if (!normalized) return [];

  const segments = normalized.match(/[^。！？!?.\n]+[。！？!?\.]*/g) ?? [normalized];
  return segments.map((segment) => segment.trim()).filter(Boolean);
}

