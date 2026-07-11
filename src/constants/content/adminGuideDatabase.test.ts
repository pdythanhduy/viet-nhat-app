import { ADMIN_CONTENT_META, ADMIN_GUIDES } from './adminGuides';
import {
  ADMIN_GUIDE_DATABASE_SCHEMA_VERSION,
  buildAdminGuideDatabaseRows,
  buildAdminGuideDatabaseSnapshot,
  validateAdminGuideDatabaseSnapshot,
} from './adminGuideDatabase';

const snapshot = buildAdminGuideDatabaseSnapshot(ADMIN_CONTENT_META, ADMIN_GUIDES);
const rows = buildAdminGuideDatabaseRows(snapshot);

function collectUndefinedPaths(value: unknown, path = '$'): string[] {
  if (value === undefined) return [path];
  if (value === null || typeof value !== 'object') return [];

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectUndefinedPaths(item, `${path}[${index}]`));
  }

  return Object.entries(value).flatMap(([key, item]) => collectUndefinedPaths(item, `${path}.${key}`));
}

describe('admin guide database snapshot', () => {
  it('builds a versioned database-ready snapshot', () => {
    expect(snapshot.schemaVersion).toBe(ADMIN_GUIDE_DATABASE_SCHEMA_VERSION);
    expect(snapshot.contentVersion).toBe(ADMIN_CONTENT_META.lastUpdated);
    expect(snapshot.recordCount).toBe(ADMIN_GUIDES.length);
    expect(snapshot.guides.length).toBeGreaterThan(0);
  });

  it('validates the current bundled admin guide dataset', () => {
    expect(validateAdminGuideDatabaseSnapshot(snapshot)).toEqual([]);
  });

  it('serializes without native image require payloads or undefined fields', () => {
    const serialized = JSON.stringify(snapshot);

    expect(() => JSON.parse(serialized)).not.toThrow();
    expect(serialized).not.toContain('"heroImage"');
    expect(serialized).not.toContain('"image"');
    expect(collectUndefinedPaths(snapshot)).toEqual([]);
  });

  it('uses stable image keys for app-managed assets', () => {
    const guide = snapshot.guides.find((item) => item.id === 'drivers-license');

    expect(guide?.heroImageKey).toBe('admin-guides/drivers-license/hero');
    expect(guide?.steps.find((step) => step.step === 2)?.imageKey).toBe(
      'admin-guides/drivers-license/steps/2'
    );
  });

  it('keeps source verification fields on every database record', () => {
    for (const guide of snapshot.guides) {
      expect(guide.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(guide.officialLinks.length).toBeGreaterThan(0);
    }
  });

  it('maps records to Postgres-ready snake_case rows', () => {
    expect(rows).toHaveLength(snapshot.recordCount);
    expect(collectUndefinedPaths(rows)).toEqual([]);

    const guide = rows.find((item) => item.id === 'business-manager-visa-2025');

    expect(guide?.schema_version).toBe(ADMIN_GUIDE_DATABASE_SCHEMA_VERSION);
    expect(guide?.content_version).toBe(snapshot.contentVersion);
    expect(guide?.last_verified).toBe('2026-07-11');
    expect(guide?.legal_scope?.riskLevel).toBe('high');
    expect(guide?.quick_action?.doNow.length).toBeGreaterThan(0);
    expect(guide?.official_links.length).toBeGreaterThan(0);
    expect(guide?.steps.length).toBeGreaterThanOrEqual(2);
  });
});
