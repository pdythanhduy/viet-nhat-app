import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StorageKeys } from '../constants/storageKeys';
import { useGuideProgress } from './useGuideProgress';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

type HookState = ReturnType<typeof useGuideProgress>;
type TestRendererInstance = {
  unmount: () => void;
  update: (element: React.ReactElement) => void;
};
type TestRendererApi = {
  act: (callback: () => void | Promise<void>) => Promise<void>;
  create: (element: React.ReactElement) => TestRendererInstance;
};

const TestRenderer = require('react-test-renderer') as TestRendererApi;

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let latest: HookState | undefined;

function ProgressProbe({ guideId, totalSteps }: { guideId: string; totalSteps: number }) {
  latest = useGuideProgress(guideId, totalSteps);
  return null;
}

async function renderProgressProbe(guideId: string, totalSteps: number) {
  let renderer: TestRendererInstance | undefined;

  await TestRenderer.act(async () => {
    renderer = TestRenderer.create(React.createElement(ProgressProbe, { guideId, totalSteps }));
  });

  await flushAsyncEffects();

  if (!renderer) {
    throw new Error('Failed to render progress probe');
  }

  return renderer;
}

async function flushAsyncEffects() {
  await TestRenderer.act(async () => {
    await Promise.resolve();
  });
}

function getLatest() {
  if (!latest) {
    throw new Error('Hook state was not captured');
  }

  return latest;
}

function completedIndices() {
  return Array.from(getLatest().completedSteps).sort((a, b) => a - b);
}

async function loadStoredProgress() {
  const raw = await AsyncStorage.getItem(StorageKeys.guideStepProgress);
  return raw ? (JSON.parse(raw) as Record<string, number[]>) : {};
}

describe('useGuideProgress', () => {
  beforeEach(async () => {
    latest = undefined;
    await AsyncStorage.clear();
  });

  it('loads saved step progress and computes the progress ratio', async () => {
    await AsyncStorage.setItem(
      StorageKeys.guideStepProgress,
      JSON.stringify({ 'drivers-license-renewal': [0, 2], 'other-guide': [1] })
    );

    const renderer = await renderProgressProbe('drivers-license-renewal', 4);

    expect(completedIndices()).toEqual([0, 2]);
    expect(getLatest().progressRatio).toBe(0.5);

    await TestRenderer.act(async () => {
      renderer.unmount();
    });
  });

  it('toggles a step and persists the updated set', async () => {
    const renderer = await renderProgressProbe('drivers-license-renewal', 4);

    await TestRenderer.act(async () => {
      await getLatest().toggleStep(1);
    });

    expect(completedIndices()).toEqual([1]);
    expect(getLatest().progressRatio).toBe(0.25);
    await expect(loadStoredProgress()).resolves.toEqual({ 'drivers-license-renewal': [1] });

    await TestRenderer.act(async () => {
      await getLatest().toggleStep(1);
    });

    expect(completedIndices()).toEqual([]);
    expect(getLatest().progressRatio).toBe(0);
    await expect(loadStoredProgress()).resolves.toEqual({ 'drivers-license-renewal': [] });

    await TestRenderer.act(async () => {
      renderer.unmount();
    });
  });

  it('resets one guide without clearing progress from other guides', async () => {
    await AsyncStorage.setItem(
      StorageKeys.guideStepProgress,
      JSON.stringify({ 'drivers-license-renewal': [0, 1], 'other-guide': [2] })
    );

    const renderer = await renderProgressProbe('drivers-license-renewal', 4);

    await TestRenderer.act(async () => {
      await getLatest().resetProgress();
    });

    expect(completedIndices()).toEqual([]);
    expect(getLatest().progressRatio).toBe(0);
    await expect(loadStoredProgress()).resolves.toEqual({ 'other-guide': [2] });

    await TestRenderer.act(async () => {
      renderer.unmount();
    });
  });

  it('reloads progress when the guide id changes', async () => {
    await AsyncStorage.setItem(
      StorageKeys.guideStepProgress,
      JSON.stringify({ 'first-guide': [0], 'second-guide': [1, 3] })
    );

    const renderer = await renderProgressProbe('first-guide', 4);

    expect(completedIndices()).toEqual([0]);
    expect(getLatest().progressRatio).toBe(0.25);

    await TestRenderer.act(async () => {
      renderer.update(React.createElement(ProgressProbe, { guideId: 'second-guide', totalSteps: 4 }));
    });
    await flushAsyncEffects();

    expect(completedIndices()).toEqual([1, 3]);
    expect(getLatest().progressRatio).toBe(0.5);

    await TestRenderer.act(async () => {
      renderer.unmount();
    });
  });
});
