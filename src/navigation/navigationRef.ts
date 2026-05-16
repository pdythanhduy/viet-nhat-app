import { createNavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from './AppNavigator';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T]
) {
  if (!navigationRef.isReady()) return false;
  // @ts-expect-error react-navigation typings for dynamic routes are awkward
  navigationRef.navigate(name, params);
  return true;
}
