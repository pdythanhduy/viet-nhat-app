import type { PhraseCategory } from '../../../../types/content';
import greetings from './greetings';
import comprehension from './comprehension';
import combini from './combini';
import train from './train';
import hospital from './hospital';
import workContract from './workContract';
import workSchedule from './workSchedule';
import documents from './documents';
import payroll from './payroll';
import trainDelay from './trainDelay';
import cityHall from './cityHall';
import bank from './bank';
import phoneInternet from './phoneInternet';
import postOffice from './postOffice';
import naturalSpeech from './naturalSpeech';
import avoidPhrases from './avoidPhrases';
import callHospital from './callHospital';
import callCompany from './callCompany';
import callServices from './callServices';
import factory from './factory';
import construction from './construction';
import agriculture from './agriculture';
import restaurant from './restaurant';

export const ALL_PHRASE_CATEGORIES: PhraseCategory[] = [
  greetings,
  comprehension,
  combini,
  train,
  hospital,
  workContract,
  workSchedule,
  documents,
  payroll,
  trainDelay,
  cityHall,
  bank,
  phoneInternet,
  postOffice,
  naturalSpeech,
  avoidPhrases,
  callHospital,
  callCompany,
  callServices,
  factory,
  construction,
  agriculture,
  restaurant,
];

export interface PhraseCategoryMeta {
  slug: string;
  category: string;
  icon?: PhraseCategory['icon'];
  color?: string;
  hasDialogue: boolean;
}

export const PHRASE_CATEGORY_META: PhraseCategoryMeta[] = [
  { slug: 'greetings', category: greetings.category, icon: greetings.icon, color: greetings.color, hasDialogue: Boolean(greetings.dialogue) },
  { slug: 'comprehension', category: comprehension.category, icon: comprehension.icon, color: comprehension.color, hasDialogue: Boolean(comprehension.dialogue) },
  { slug: 'combini', category: combini.category, icon: combini.icon, color: combini.color, hasDialogue: Boolean(combini.dialogue) },
  { slug: 'train', category: train.category, icon: train.icon, color: train.color, hasDialogue: Boolean(train.dialogue) },
  { slug: 'hospital', category: hospital.category, icon: hospital.icon, color: hospital.color, hasDialogue: Boolean(hospital.dialogue) },
  { slug: 'workContract', category: workContract.category, icon: workContract.icon, color: workContract.color, hasDialogue: Boolean(workContract.dialogue) },
  { slug: 'workSchedule', category: workSchedule.category, icon: workSchedule.icon, color: workSchedule.color, hasDialogue: Boolean(workSchedule.dialogue) },
  { slug: 'documents', category: documents.category, icon: documents.icon, color: documents.color, hasDialogue: Boolean(documents.dialogue) },
  { slug: 'payroll', category: payroll.category, icon: payroll.icon, color: payroll.color, hasDialogue: Boolean(payroll.dialogue) },
  { slug: 'trainDelay', category: trainDelay.category, icon: trainDelay.icon, color: trainDelay.color, hasDialogue: Boolean(trainDelay.dialogue) },
  { slug: 'cityHall', category: cityHall.category, icon: cityHall.icon, color: cityHall.color, hasDialogue: Boolean(cityHall.dialogue) },
  { slug: 'bank', category: bank.category, icon: bank.icon, color: bank.color, hasDialogue: Boolean(bank.dialogue) },
  { slug: 'phoneInternet', category: phoneInternet.category, icon: phoneInternet.icon, color: phoneInternet.color, hasDialogue: Boolean(phoneInternet.dialogue) },
  { slug: 'postOffice', category: postOffice.category, icon: postOffice.icon, color: postOffice.color, hasDialogue: Boolean(postOffice.dialogue) },
  { slug: 'naturalSpeech', category: naturalSpeech.category, icon: naturalSpeech.icon, color: naturalSpeech.color, hasDialogue: Boolean(naturalSpeech.dialogue) },
  { slug: 'avoidPhrases', category: avoidPhrases.category, icon: avoidPhrases.icon, color: avoidPhrases.color, hasDialogue: Boolean(avoidPhrases.dialogue) },
  { slug: 'callHospital', category: callHospital.category, icon: callHospital.icon, color: callHospital.color, hasDialogue: Boolean(callHospital.dialogue) },
  { slug: 'callCompany', category: callCompany.category, icon: callCompany.icon, color: callCompany.color, hasDialogue: Boolean(callCompany.dialogue) },
  { slug: 'callServices', category: callServices.category, icon: callServices.icon, color: callServices.color, hasDialogue: Boolean(callServices.dialogue) },
  { slug: 'factory', category: factory.category, icon: factory.icon, color: factory.color, hasDialogue: Boolean(factory.dialogue) },
  { slug: 'construction', category: construction.category, icon: construction.icon, color: construction.color, hasDialogue: Boolean(construction.dialogue) },
  { slug: 'agriculture', category: agriculture.category, icon: agriculture.icon, color: agriculture.color, hasDialogue: Boolean(agriculture.dialogue) },
  { slug: 'restaurant', category: restaurant.category, icon: restaurant.icon, color: restaurant.color, hasDialogue: Boolean(restaurant.dialogue) },
];

export const PHRASE_SLUG_BY_CATEGORY: Record<string, string> = {
  'Chào hỏi cơ bản': 'greetings',
  'Khi không hiểu': 'comprehension',
  'Combini và mua sắm': 'combini',
  'Tàu điện và đi lại': 'train',
  'Đi khám và bệnh viện': 'hospital',
  'Công việc và hợp đồng': 'workContract',
  'Xin nghỉ, đi trễ và đổi ca': 'workSchedule',
  'Bị hỏi giấy tờ hoặc thông tin cá nhân': 'documents',
  'Phiếu lương và làm thêm giờ': 'payroll',
  'Trễ tàu, lạc ga và đi nhầm tuyến': 'trainDelay',
  'Cơ quan và giấy tờ': 'cityHall',
  'Ngân hàng và chuyển tiền': 'bank',
  'Điện thoại và internet': 'phoneInternet',
  'Bưu điện và nhận hàng': 'postOffice',
  'Nói tự nhiên hơn trong đời sống': 'naturalSpeech',
  'Câu nên tránh hoặc nên đổi cách nói': 'avoidPhrases',
  'Gọi điện cho bệnh viện hoặc phòng khám': 'callHospital',
  'Gọi công ty để báo vắng hoặc báo trễ': 'callCompany',
  'Gọi nhà mạng, quản lý nhà hoặc bưu điện': 'callServices',
  'Công việc nhà máy': 'factory',
  'Công việc xây dựng': 'construction',
  'Công việc nông nghiệp': 'agriculture',
  'Công việc nhà hàng': 'restaurant',
};
