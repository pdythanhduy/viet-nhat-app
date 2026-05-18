import { Share } from 'react-native';
import { track } from './analytics';

// Phase G1 — native share for admin guides.
//
// Uses React Native's built-in Share API — no new dependency, no
// social-network SDKs, no third-party deep-link service. The shared
// message includes:
//   - guide title (public-as-content)
//   - the app's marketing URL (placeholder for now; will become a
//     deep-link to the specific guide once app-link infrastructure
//     ships in a later phase)
//   - a one-line credit so the share is attributable back to the app
//
// PII posture: the analytics event fires only the guide_id (already
// bundled content, not personal). The shared text NEVER contains the
// user's name, profile, or any local state. The OS share sheet
// chooses the destination — the app doesn't know whether the user
// shared to Messenger, Zalo, SMS, or copy-to-clipboard.

// Will be replaced with a real universal/app link in a later phase.
// For now, point to the App Store + Play Store landing.
const MARKETING_URL = 'https://camnangvietnhat.app';

export interface ShareGuidePayload {
  guideId: string;
  title: string;
  titleJp?: string;
}

export async function shareGuide(payload: ShareGuidePayload): Promise<void> {
  const headline = payload.titleJp
    ? `${payload.title} (${payload.titleJp})`
    : payload.title;
  const message = [
    `${headline}`,
    '',
    `Cẩm Nang Việt Nhật — hướng dẫn thủ tục, đời sống và pháp lý cho người Việt ở Nhật.`,
    MARKETING_URL,
  ].join('\n');

  try {
    const result = await Share.share({ message, title: headline });
    // result.action is 'sharedAction' | 'dismissedAction' — we don't
    // know the destination platform (Messenger / Zalo / SMS / copy).
    // Track only that a share was completed (action !== dismissed).
    const completed = result.action !== Share.dismissedAction;
    track('guide_share', { guide_id: payload.guideId, completed });
  } catch {
    // Sharing failed (user cancelled mid-flow OR platform threw).
    // Still emit the event so we can see attempt rate, but mark it
    // not-completed. No raw error surfaced — keep the surface calm.
    track('guide_share', { guide_id: payload.guideId, completed: false });
  }
}
