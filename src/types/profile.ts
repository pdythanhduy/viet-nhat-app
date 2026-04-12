export type UserVisaStatus =
  | 'student'
  | 'tokutei'
  | 'engineer'
  | 'trainee'
  | 'family'
  | 'other';

export type UserLifeStage =
  | 'new-arrival'
  | 'settling-in'
  | 'changing-jobs'
  | 'family-life';

export type UserHousehold =
  | 'alone'
  | 'with-family';

export interface UserProfile {
  visaStatus: UserVisaStatus;
  lifeStage: UserLifeStage;
  household: UserHousehold;
  prefecture: string;
  createdAt: string;
  updatedAt: string;
}
