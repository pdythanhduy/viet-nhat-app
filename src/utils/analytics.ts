// Analytics utility - Firebase logging disabled for Expo Go compatibility
// All functions are no-ops to prevent Firebase errors in development

export async function logScreenView(screenName: string): Promise<void> {
  // Firebase analytics disabled in Expo Go
}

export async function logGuideOpened(guideId: string, guideTitle: string, category: string): Promise<void> {
  // Firebase analytics disabled
}

export async function logBookmarkToggled(type: string, id: string, added: boolean): Promise<void> {
  // Firebase analytics disabled
}

export async function logHtmlExported(type: string): Promise<void> {
  // Firebase analytics disabled
}

export async function logQuizStarted(quizType: string): Promise<void> {
  // Firebase analytics disabled
}

export async function logQuizCompleted(quizType: string, score: number, total: number): Promise<void> {
  // Firebase analytics disabled
}

export async function logJLPTQuizCompleted(level: string, score: number, total: number): Promise<void> {
  // Firebase analytics disabled
}

export async function logWordSaved(word: string, meaning: string): Promise<void> {
  // Firebase analytics disabled
}

export async function logStoryStarted(storyId: string, level: string): Promise<void> {
  // Firebase analytics disabled
}

export async function logStoryCompleted(storyId: string, level: string): Promise<void> {
  // Firebase analytics disabled
}

export async function logSearchPerformed(query: string, resultCount: number): Promise<void> {
  // Firebase analytics disabled
}
