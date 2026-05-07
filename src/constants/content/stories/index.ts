import type { Story } from '../../../types/story';
import { withComputedMetadata } from './helpers';
import { HANDWRITTEN_STORIES } from './handwritten';
import { N1_STORIES, N2_STORIES, N3_STORIES } from './seeds';

const ALL_STORIES: Story[] = [
  ...HANDWRITTEN_STORIES,
  ...N3_STORIES,
  ...N2_STORIES,
  ...N1_STORIES,
];

export const SAMPLE_STORIES: Story[] = withComputedMetadata(ALL_STORIES);
