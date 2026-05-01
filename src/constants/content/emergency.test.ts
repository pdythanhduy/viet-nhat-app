import { Ionicons } from '@expo/vector-icons';

import { ALERTS, EMERGENCY_CONTACTS } from './emergency';
import type { AlertActionScreen, AlertUrgency } from '../../types/content';

const VALID_ALERT_URGENCIES: AlertUrgency[] = ['high', 'medium', 'low', 'info'];
const VALID_ALERT_ACTION_SCREENS: AlertActionScreen[] = ['Admin', 'DailyLife', 'Jobs', 'Japanese', 'BJT'];

describe('emergency content quality', () => {
  it('keeps unique emergency contact ids and the primary emergency numbers', () => {
    const ids = EMERGENCY_CONTACTS.map((contact) => contact.id);
    const primaryContact = EMERGENCY_CONTACTS[0];

    expect(EMERGENCY_CONTACTS.length).toBeGreaterThanOrEqual(5);
    expect(new Set(ids).size).toBe(ids.length);
    expect(primaryContact?.number).toContain('110');
    expect(primaryContact?.number).toContain('119');
  });

  it('has complete emergency contact display fields', () => {
    for (const contact of EMERGENCY_CONTACTS) {
      expect(contact.name.trim().length).toBeGreaterThan(0);
      expect(contact.nameJp.trim().length).toBeGreaterThan(0);
      expect(contact.number).toMatch(/^[+0-9\s/-]+$/);
      expect(contact.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(Ionicons.glyphMap[contact.icon]).toBeDefined();
    }
  });

  it('has valid alert actions and urgency metadata', () => {
    const ids = ALERTS.map((alert) => alert.id);

    expect(new Set(ids).size).toBe(ids.length);

    for (const alert of ALERTS) {
      expect(alert.title.trim().length).toBeGreaterThan(0);
      expect(alert.description.trim().length).toBeGreaterThan(0);
      expect(VALID_ALERT_URGENCIES).toContain(alert.urgency);
      expect(alert.actionLabel.trim().length).toBeGreaterThan(0);
      expect(VALID_ALERT_ACTION_SCREENS).toContain(alert.actionScreen);

      if (alert.daysLeft !== undefined) {
        expect(alert.daysLeft).toBeGreaterThanOrEqual(0);
      }
    }
  });
});
