import type { AdminGuide } from '../../../../types/content';
import residenceCard from './residence-card';
import residenceCardValidity from './residence-card-validity';
import addressChange from './address-change';
import residenceCardInfoChange from './residence-card-info-change';
import jobChangeNotification from './job-change-notification';
import permissionActivityOutsideStatus from './permission-activity-outside-status';
import reEntry from './re-entry';
import spouseNotification from './spouse-notification';
import healthInsurance from './health-insurance';
import myNumber from './my-number';
import bankAccount from './bank-account';
import simCard from './sim-card';
import driversLicense from './drivers-license';
import driversLicenseRenewal from './drivers-license-renewal';
import remittance from './remittance';
import bicycleRules2026 from './bicycle-rules-2026';
import electricBikeMopedRules from './electric-bike-moped-rules';
import trafficAccidentResponse from './traffic-accident-response';
import visaStatusOverview from './visa-status-overview';
import sswTrainingWorker2027 from './ssw-training-worker-2027';
import first7DaysInJapan from './first-7-days-in-japan';
import first30DaysWorkStudyJapan from './first-30-days-work-study-japan';
import first90DaysInJapan from './first-90-days-in-japan';
import familyStayInvitation from './family-stay-invitation';
import shortStayRelativeVisit from './short-stay-relative-visit';
import japanPolicyUpdate2026ForeignResidents from './japan-policy-update-2026-foreign-residents';
import japanPolicy2026ActionByUserType from './japan-policy-2026-action-by-user-type';
import visaHighlights2026 from './visa-highlights-2026';
import businessManagerVisa2025 from './business-manager-visa-2025';
import parentsElderlyRelatives from './parents-elderly-relatives';
import pregnancyChildbirthPostpartum from './pregnancy-childbirth-postpartum';
import babyBornInJapan from './baby-born-in-japan';
import postpartum30DayTimeline from './postpartum-30-day-timeline';
import nurseryKindergartenGuide from './nursery-kindergarten-guide';
import divorceCustodyNameResidence from './divorce-custody-name-residence';
import rentingAndBuyingHome from './renting-and-buying-home';
import taxYearEndAdjustmentFiling from './tax-year-end-adjustment-filing';
import pensionExemptionRefund from './pension-exemption-refund';
import bankingRemittanceAntiFraud from './banking-remittance-anti-fraud';
import statusOfResidenceChange from './status-of-residence-change';
import movingInNotification from './moving-in-notification';
import myNumberCard from './my-number-card';
import dailyLawBasics from './daily-law-basics';
import hankoInkan from './hanko-inkan';
import unemploymentBenefits from './unemployment-benefits';
import returnToVietnamChecklist from './return-to-vietnam-checklist';
import mynaPortalDigital from './myna-portal-digital';
import schoolEnrollmentChildren from './school-enrollment-children';
import juminzeiLocalTax from './juminzei-local-tax';
import garbageSortingRules from './garbage-sorting-rules';
import workplaceAccidentRousai from './workplace-accident-rousai';
import marriageProceduresJapan from './marriage-procedures-japan';
import permanentResidencyEijuu from './permanent-residency-eijuu';
import highlySkilledProfessional from './highly-skilled-professional';
import ginouJisshuToTokuteiGinou from './ginou-jisshu-to-tokutei-ginou';
import tokuteiKatsudo46JobHunt from './tokutei-katsudo-46-job-hunt';
import annualHealthCheckupKensin from './annual-health-checkup-kensin';
import mopedMotorcycleRegistration from './moped-motorcycle-registration';
import homePurchaseMortgage from './home-purchase-mortgage';
import soleProprietorKojinJigyo from './sole-proprietor-kojin-jigyo';
import creditCardForForeigners from './credit-card-for-foreigners';
import carShakenInsurance from './car-shaken-insurance';
import childcareParentalLeave from './childcare-parental-leave';
import specialFraudTokushuSagi from './special-fraud-tokushu-sagi';
import kakuteiShinkoku from './kakutei-shinkoku';
import motorcycleVoluntaryInsurance from './motorcycle-voluntary-insurance';
import bicycleInsurance from './bicycle-insurance';
import payslipReading from './payslip-reading';
import kokuhoReduction from './kokuho-reduction';
import laborRightsDispute from './labor-rights-dispute';
import naturalizationKika from './naturalization-kika';
import nisaInvestment from './nisa-investment';
import marriageCertificateVnJapan from './marriage-certificate-vn-japan';
import visaRejectionAppealProcess from './visa-rejection-appeal-process';
import visaStatusChangeDetailedScenarios from './visa-status-change-detailed-scenarios';
import overstayingIllegalStayProcedures from './overstaying-illegal-stay-procedures';
import visaEmergencyMedicalDisasterExtension from './visa-emergency-medical-disaster-extension';
import freelanceSideJobWorkVisaRules from './freelance-side-job-work-visa-rules';
import employmentCrisisVisaJobLossLayoff from './employment-crisis-visa-job-loss-layoff';
import lostResidenceCard from './lost-residence-card';
import clinicHospitalVisitGuide from './clinic-hospital-visit-guide';
import emergencyCallsJapan from './emergency-calls-japan';
import dentistVisitJapan from './dentist-visit-japan';
import earthquakePreparednessJapan from './earthquake-preparedness-japan';
import typhoonEvacuationAlerts from './typhoon-evacuation-alerts';
import hazardMapFloodTsunamiVolcano from './hazard-map-flood-tsunami-volcano';
import electricityGasWaterContracts from './electricity-gas-water-contracts';
import homeInternetWifiContracts from './home-internet-wifi-contracts';
import nhkContractGuide from './nhk-contract-guide';
import postOfficeMailForwarding from './post-office-mail-forwarding';
import japaneseSchoolSystemChildren from './japanese-school-system-children';
import japaneseLanguageSupportChildren from './japanese-language-support-children';
import childAllowanceJidouTeate from './child-allowance-jidou-teate';
import policeQuestioningRightsJapan from './police-questioning-rights-japan';
import embassyConsulateVietnamJapan from './embassy-consulate-vietnam-japan';
import foreignResidentSupportCenters from './foreign-resident-support-centers';
import furusatoNozeiGuide from './furusato-nozei-guide';
import idecoPersonalPension from './ideco-personal-pension';
import taxOnRemittanceToVietnam from './tax-on-remittance-to-vietnam';
import mentalHealthStressSupport from './mental-health-stress-support';
import medicalInterpretationMultilingualHospitals from './medical-interpretation-multilingual-hospitals';
import holidayNightMedicalCare from './holiday-night-medical-care';
import pharmacyPrescriptionGuide from './pharmacy-prescription-guide';

export const ADMIN_GUIDES: AdminGuide[] = [
  residenceCard,
  residenceCardValidity,
  addressChange,
  residenceCardInfoChange,
  jobChangeNotification,
  permissionActivityOutsideStatus,
  reEntry,
  spouseNotification,
  healthInsurance,
  myNumber,
  bankAccount,
  simCard,
  driversLicense,
  driversLicenseRenewal,
  remittance,
  bicycleRules2026,
  electricBikeMopedRules,
  trafficAccidentResponse,
  visaStatusOverview,
  sswTrainingWorker2027,
  first7DaysInJapan,
  first30DaysWorkStudyJapan,
  first90DaysInJapan,
  familyStayInvitation,
  shortStayRelativeVisit,
  japanPolicyUpdate2026ForeignResidents,
  japanPolicy2026ActionByUserType,
  visaHighlights2026,
  businessManagerVisa2025,
  parentsElderlyRelatives,
  pregnancyChildbirthPostpartum,
  babyBornInJapan,
  postpartum30DayTimeline,
  nurseryKindergartenGuide,
  divorceCustodyNameResidence,
  rentingAndBuyingHome,
  taxYearEndAdjustmentFiling,
  pensionExemptionRefund,
  bankingRemittanceAntiFraud,
  statusOfResidenceChange,
  movingInNotification,
  myNumberCard,
  dailyLawBasics,
  hankoInkan,
  unemploymentBenefits,
  returnToVietnamChecklist,
  mynaPortalDigital,
  schoolEnrollmentChildren,
  juminzeiLocalTax,
  garbageSortingRules,
  workplaceAccidentRousai,
  marriageProceduresJapan,
  permanentResidencyEijuu,
  highlySkilledProfessional,
  ginouJisshuToTokuteiGinou,
  tokuteiKatsudo46JobHunt,
  annualHealthCheckupKensin,
  mopedMotorcycleRegistration,
  homePurchaseMortgage,
  soleProprietorKojinJigyo,
  creditCardForForeigners,
  carShakenInsurance,
  childcareParentalLeave,
  specialFraudTokushuSagi,
  kakuteiShinkoku,
  motorcycleVoluntaryInsurance,
  bicycleInsurance,
  payslipReading,
  kokuhoReduction,
  laborRightsDispute,
  naturalizationKika,
  nisaInvestment,
  marriageCertificateVnJapan,
  visaRejectionAppealProcess,
  visaStatusChangeDetailedScenarios,
  overstayingIllegalStayProcedures,
  visaEmergencyMedicalDisasterExtension,
  freelanceSideJobWorkVisaRules,
  employmentCrisisVisaJobLossLayoff,
  lostResidenceCard,
  clinicHospitalVisitGuide,
  emergencyCallsJapan,
  dentistVisitJapan,
  earthquakePreparednessJapan,
  typhoonEvacuationAlerts,
  hazardMapFloodTsunamiVolcano,
  electricityGasWaterContracts,
  homeInternetWifiContracts,
  nhkContractGuide,
  postOfficeMailForwarding,
  japaneseSchoolSystemChildren,
  japaneseLanguageSupportChildren,
  childAllowanceJidouTeate,
  policeQuestioningRightsJapan,
  embassyConsulateVietnamJapan,
  foreignResidentSupportCenters,
  furusatoNozeiGuide,
  idecoPersonalPension,
  taxOnRemittanceToVietnam,
  mentalHealthStressSupport,
  medicalInterpretationMultilingualHospitals,
  holidayNightMedicalCare,
  pharmacyPrescriptionGuide,
];
