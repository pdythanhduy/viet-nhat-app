import type { IoniconName } from './content';

export type JourneyAction =
  | { kind: 'guide'; guideId: string }
  | { kind: 'tab'; tab: 'Admin' | 'Jobs' | 'Japanese' }
  | { kind: 'screen'; screen: 'ImportantDates' | 'DailyLife' | 'LaborGuide' | 'LaborHelp' };

export interface JourneyChecklistItem {
  id: string;
  label: string;
  description: string;
  actionLabel?: string;
  action?: JourneyAction;
}

export interface JourneyChecklistSection {
  id: string;
  title: string;
  description: string;
  items: JourneyChecklistItem[];
}

export interface JourneyChecklistPlan {
  id: string;
  title: string;
  subtitle: string;
  icon: IoniconName;
  color: string;
  sections: JourneyChecklistSection[];
}
