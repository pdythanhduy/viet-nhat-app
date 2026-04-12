import AsyncStorage from '@react-native-async-storage/async-storage';

import { Colors } from '../constants/colors';
import { StorageKeys } from '../constants/storageKeys';
import type { JourneyChecklistPlan } from '../types/journey';
import type { UserProfile } from '../types/profile';

const STORAGE_KEY = StorageKeys.journeyChecklistProgress;

export async function loadJourneyChecklistProgress() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

export async function toggleJourneyChecklistItem(itemId: string) {
  const checkedIds = await loadJourneyChecklistProgress();
  const next = checkedIds.includes(itemId)
    ? checkedIds.filter((item) => item !== itemId)
    : [...checkedIds, itemId];

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function getJourneyChecklistCounts(plan: JourneyChecklistPlan, checkedIds: string[]) {
  const total = plan.sections.reduce((sum, section) => sum + section.items.length, 0);
  const checked = plan.sections.reduce(
    (sum, section) =>
      sum + section.items.filter((item) => checkedIds.includes(item.id)).length,
    0
  );

  return { total, checked };
}

export function buildJourneyChecklistPlan(profile: UserProfile | null): JourneyChecklistPlan {
  if (!profile || profile.lifeStage === 'new-arrival') {
    return {
      id: 'new-arrival',
      title: 'Checklist 90 ngày đầu',
      subtitle: 'Dành cho người mới sang Nhật, cần gom các việc quan trọng theo đúng thứ tự.',
      icon: 'rocket-outline',
      color: Colors.primary,
      sections: [
        {
          id: 'docs',
          title: 'Giấy tờ và hồ sơ',
          description: 'Chốt những việc dễ quá hạn hoặc dễ quên ngay tháng đầu.',
          items: [
            {
              id: 'new-arrival-zairyu',
              label: 'Rà lại thẻ cư trú, hộ chiếu và địa chỉ đang dùng',
              description: 'Đảm bảo thông tin khớp trước khi làm các thủ tục khác.',
              actionLabel: 'Mở guide 7 ngày đầu',
              action: { kind: 'guide', guideId: 'first-7-days-in-japan' },
            },
            {
              id: 'new-arrival-cityhall',
              label: 'Xong các thủ tục cần làm trong 7 ngày đầu',
              description: 'Kiểm tra đăng ký địa chỉ, bảo hiểm, sim và ngân hàng.',
              actionLabel: 'Xem checklist',
              action: { kind: 'guide', guideId: 'first-7-days-in-japan' },
            },
            {
              id: 'new-arrival-reminders',
              label: 'Thiết lập nhắc hạn giấy tờ ngay từ đầu',
              description: 'Bật trước hạn cho thẻ cư trú, bảo hiểm và hồ sơ cá nhân.',
              actionLabel: 'Mở ngày quan trọng',
              action: { kind: 'screen', screen: 'ImportantDates' },
            },
          ],
        },
        {
          id: 'daily-life',
          title: 'Sống ổn định trong tháng đầu',
          description: 'Giảm các lỗi vặt thường gặp khi mới bắt đầu cuộc sống ở Nhật.',
          items: [
            {
              id: 'new-arrival-rules',
              label: 'Hiểu rác, tàu xe, mua sắm và quy tắc cơ bản nơi đang sống',
              description: 'Không đợi đến khi gặp rắc rối mới đi tra cứu.',
              actionLabel: 'Mở đời sống hằng ngày',
              action: { kind: 'screen', screen: 'DailyLife' },
            },
            {
              id: 'new-arrival-30days',
              label: 'Rà lại checklist 30 ngày đầu đi học / đi làm',
              description: 'Đảm bảo không sót việc với trường, công ty, tài khoản và di chuyển.',
              actionLabel: 'Mở guide 30 ngày',
              action: { kind: 'guide', guideId: 'first-30-days-work-study-japan' },
            },
            {
              id: 'new-arrival-japanese',
              label: 'Luyện ít nhất 1 nhóm mẫu câu thực tế',
              description: 'Ưu tiên mẫu câu cho nhà ga, trường học, bệnh viện hoặc cửa hàng.',
              actionLabel: 'Mở tiếng Nhật',
              action: { kind: 'tab', tab: 'Japanese' },
            },
          ],
        },
      ],
    };
  }

  if (profile.lifeStage === 'changing-jobs') {
    return {
      id: 'changing-jobs',
      title: 'Checklist đổi việc an toàn',
      subtitle: 'Tập trung vào hợp đồng, quyền lợi và các rủi ro với công ty.',
      icon: 'swap-horizontal-outline',
      color: '#E67E22',
      sections: [
        {
          id: 'before-signing',
          title: 'Trước khi ký hoặc nhận việc',
          description: 'Những thứ cần rà kỹ trước khi đồng ý.',
          items: [
            {
              id: 'changing-jobs-contract',
              label: 'Đọc lại hợp đồng và mức lương thực nhận',
              description: 'Kiểm tra OT, ngày nghỉ, lương cơ bản và phụ cấp.',
              actionLabel: 'Mở cẩm nang lao động',
              action: { kind: 'screen', screen: 'LaborGuide' },
            },
            {
              id: 'changing-jobs-source',
              label: 'Đối chiếu nguồn tuyển và diện visa phù hợp',
              description: 'Không nộp đại trà khi chưa rõ quyền làm việc của mình.',
              actionLabel: 'Mở tab Việc làm',
              action: { kind: 'tab', tab: 'Jobs' },
            },
          ],
        },
        {
          id: 'trouble',
          title: 'Nếu công ty có dấu hiệu rủi ro',
          description: 'Đi từng bước thay vì xử lý theo cảm tính.',
          items: [
            {
              id: 'changing-jobs-docs',
              label: 'Không giao giấy tờ gốc nếu không thật sự cần',
              description: 'Giữ hộ chiếu, thẻ cư trú và tài liệu cá nhân ở trạng thái kiểm soát được.',
              actionLabel: 'Mở luồng cần giúp gì',
              action: { kind: 'screen', screen: 'LaborHelp' },
            },
            {
              id: 'changing-jobs-support',
              label: 'Chuẩn bị sẵn phương án khiếu nại hoặc hỏi luật',
              description: 'Biết rõ nơi cần liên hệ nếu bị nợ lương, ép OT hoặc cản nghỉ việc.',
              actionLabel: 'Mở luồng hỗ trợ',
              action: { kind: 'screen', screen: 'LaborHelp' },
            },
            {
              id: 'changing-jobs-reminders',
              label: 'Giữ nhắc hạn visa, bảo hiểm và mốc chuyển việc',
              description: 'Không để mốc giấy tờ bị trễ trong lúc đang đổi việc.',
              actionLabel: 'Mở ngày quan trọng',
              action: { kind: 'screen', screen: 'ImportantDates' },
            },
          ],
        },
      ],
    };
  }

  if (profile.lifeStage === 'family-life' || profile.household === 'with-family' || profile.visaStatus === 'family') {
    return {
      id: 'family-life',
      title: 'Checklist gia đình tại Nhật',
      subtitle: 'Ưu tiên các đầu việc liên quan người thân, giấy tờ và sinh hoạt gia đình.',
      icon: 'people-outline',
      color: '#2E86C1',
      sections: [
        {
          id: 'family-visa',
          title: 'Giấy tờ người thân',
          description: 'Giữ hồ sơ gia đình rõ ngay từ đầu để giảm hỏi đi hỏi lại.',
          items: [
            {
              id: 'family-life-invitation',
              label: 'Rà hồ sơ bảo lãnh người thân / sống cùng gia đình',
              description: 'Kiểm tra điều kiện tài chính, COE và hồ sơ người được bảo lãnh.',
              actionLabel: 'Mở guide gia đình',
              action: { kind: 'guide', guideId: 'family-stay-invitation' },
            },
            {
              id: 'family-life-visit',
              label: 'Phân biệt visa sống cùng và visa thăm thân',
              description: 'Tránh nhầm giữa mục đích ở dài hạn và sang thăm ngắn hạn.',
              actionLabel: 'Mở guide thăm thân',
              action: { kind: 'guide', guideId: 'short-stay-relative-visit' },
            },
          ],
        },
        {
          id: 'family-daily',
          title: 'Sinh hoạt gia đình',
          description: 'Những đầu việc thực tế phát sinh sau khi đã sống ổn định hơn.',
          items: [
            {
              id: 'family-life-routines',
              label: 'Rà nhà ở, bệnh viện, trường lớp và lịch sinh hoạt',
              description: 'Tập trung vào các việc dễ phát sinh khi sống cùng người thân.',
              actionLabel: 'Mở đời sống hằng ngày',
              action: { kind: 'screen', screen: 'DailyLife' },
            },
            {
              id: 'family-life-reminders',
              label: 'Theo dõi hạn giấy tờ của từng người trong nhà',
              description: 'Không chỉ nhắc cho bản thân mà còn cho vợ/chồng/con khi cần.',
              actionLabel: 'Mở ngày quan trọng',
              action: { kind: 'screen', screen: 'ImportantDates' },
            },
          ],
        },
      ],
    };
  }

  return {
    id: 'settling-in',
    title: 'Checklist sống ổn định',
    subtitle: 'Dành cho giai đoạn đã qua lúc mới sang và cần rà lại các nền tảng lâu dài.',
    icon: 'home-outline',
    color: '#27AE60',
    sections: [
      {
        id: 'foundations',
        title: 'Nền tảng cần giữ ổn',
        description: 'Những phần nên rà lại định kỳ để không bị đứt quãng.',
        items: [
          {
            id: 'settling-in-reminders',
            label: 'Giữ nhắc hạn cho hồ sơ cư trú, bảo hiểm và hợp đồng',
            description: 'Nhắc sớm giúp bạn tránh dồn nhiều việc vào phút cuối.',
            actionLabel: 'Mở ngày quan trọng',
            action: { kind: 'screen', screen: 'ImportantDates' },
          },
          {
            id: 'settling-in-daily-life',
            label: 'Cập nhật lại các luật đời sống hay đổi',
            description: 'Đặc biệt là xe đạp, y tế, rác và thủ tục địa phương.',
            actionLabel: 'Mở đời sống',
            action: { kind: 'screen', screen: 'DailyLife' },
          },
        ],
      },
      {
        id: 'growth',
        title: 'Nâng kỹ năng và cơ hội',
        description: 'Dùng app để tăng tính chủ động thay vì chỉ tra cứu khi có vấn đề.',
        items: [
          {
            id: 'settling-in-japanese',
            label: 'Duy trì học tiếng Nhật theo tình huống thật',
            description: 'Chọn các mẫu câu bạn dùng lặp lại trong công việc và sinh hoạt.',
            actionLabel: 'Mở tiếng Nhật',
            action: { kind: 'tab', tab: 'Japanese' },
          },
          {
            id: 'settling-in-jobs',
            label: 'Rà lại quyền lợi lao động và lựa chọn công việc',
            description: 'Ngay cả khi chưa đổi việc, nên biết rõ quyền của mình.',
            actionLabel: 'Mở việc làm',
            action: { kind: 'tab', tab: 'Jobs' },
          },
        ],
      },
    ],
  };
}
