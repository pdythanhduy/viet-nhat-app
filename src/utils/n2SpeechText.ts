function stripPitchAccent(text: string): string {
  return text.replace(/\s*\[[^\]]+\]\s*/g, ' ');
}

function replaceSurfaceWithReading(text: string): string {
  return text.replace(/([^\s()（）]+)[(（]([\u3040-\u309f\u30a0-\u30ffー]+)[)）]/g, (_match, _surface: string, reading: string) => reading);
}

export function normalizeN2SpeechText(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';

  let text = stripPitchAccent(trimmed);
  text = replaceSurfaceWithReading(text);
  text = text.replace(/[(（][^()（）]*[)）]/g, '');
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

export function getN2VocabSpeechText(text: string): string {
  return normalizeN2SpeechText(text);
}
