import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  clearLaborHelpProgress,
  loadLaborHelpProgress,
  toggleLaborHelpEvidenceItem,
} from './laborHelpProgress';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('laborHelpProgress', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('toggles items per scenario', async () => {
    await expect(toggleLaborHelpEvidenceItem('unpaid-wages', 'Bảng lương')).resolves.toEqual([
      'Bảng lương',
    ]);
    await expect(
      toggleLaborHelpEvidenceItem('unpaid-wages', 'Sao kê ngân hàng')
    ).resolves.toEqual(['Bảng lương', 'Sao kê ngân hàng']);
    await expect(toggleLaborHelpEvidenceItem('unpaid-wages', 'Bảng lương')).resolves.toEqual([
      'Sao kê ngân hàng',
    ]);
  });

  it('loads and clears one scenario without affecting others', async () => {
    await toggleLaborHelpEvidenceItem('unpaid-wages', 'Bảng lương');
    await toggleLaborHelpEvidenceItem('forced-overtime', 'Chấm công');

    await expect(loadLaborHelpProgress('unpaid-wages')).resolves.toEqual(['Bảng lương']);
    await clearLaborHelpProgress('unpaid-wages');
    await expect(loadLaborHelpProgress('unpaid-wages')).resolves.toEqual([]);
    await expect(loadLaborHelpProgress('forced-overtime')).resolves.toEqual(['Chấm công']);
  });
});
