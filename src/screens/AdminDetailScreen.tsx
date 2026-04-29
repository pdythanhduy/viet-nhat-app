import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  Clipboard,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { Disclaimers } from '../constants/disclaimers';
import { ADMIN_CONTENT_META, ADMIN_GUIDES } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';
import { formatLastUpdated, getSourceLabels } from '../utils/contentMetadata';
import { toggleBookmark, isBookmarked } from '../utils/bookmarks';
import {
  clearGuideChecklistProgress,
  loadGuideChecklistProgress,
  toggleGuideChecklistItem,
} from '../utils/guideChecklistProgress';
import {
  clearGuideStepProgress,
  loadGuideStepProgress,
  toggleGuideStep,
} from '../utils/guideStepProgress';
import RichText from '../components/RichText';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteType = RouteProp<RootStackParamList, 'AdminDetail'>;

export default function AdminDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteType>();
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const guideId = route.params.guideId;
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [checkedChecklistItems, setCheckedChecklistItems] = useState<Set<string>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Hooks must be called unconditionally — before any early return.
  useEffect(() => {
    if (!guideId) return;
    isBookmarked(guideId, 'guide').then(setBookmarked);
  }, [guideId]);

  useEffect(() => {
    if (!guideId) return;
    loadGuideChecklistProgress(guideId).then((checked) => {
      setCheckedChecklistItems(new Set(checked));
    });
  }, [guideId]);

  useEffect(() => {
    if (!guideId) return;
    loadGuideStepProgress(guideId).then(setCompletedSteps);
  }, [guideId]);

  const guide = ADMIN_GUIDES.find((g) => g.id === guideId);

  if (!guide) return null;

  const handleBookmark = async () => {
    const added = await toggleBookmark({
      type: 'guide',
      id: guide.id,
      title: guide.title,
      titleJp: guide.titleJp,
      description: guide.description,
      color: guide.color,
      savedAt: '',
    });
    setBookmarked(added);
  };

  const formatStepForCopy = (step: (typeof guide.steps)[number]) => {
    const parts: string[] = [
      `Bước ${step.step}: ${step.title}`,
      step.description,
    ];

    if (step.documents.length > 0) {
      parts.push('Giấy tờ cần chuẩn bị:');
      parts.push(...step.documents.map((doc) => `- ${doc}`));
    }

    if (step.tip) {
      parts.push(`Mẹo đáng nhớ: ${step.tip}`);
    }

    return parts.join('\n');
  };

  const copyWholeGuide = () => {
    const parts: string[] = [
      `${guide.title} (${guide.titleJp})`,
      guide.description,
    ];

    if (guide.whoIsThisFor?.length) {
      parts.push('\nAi cần làm:');
      parts.push(...guide.whoIsThisFor.map((item) => `- ${item}`));
    }

    if (guide.whenToDo?.length) {
      parts.push('\nKhi nào làm:');
      parts.push(...guide.whenToDo.map((item) => `- ${item}`));
    }

    if (guide.whereToDo?.length) {
      parts.push('\nLàm ở đâu:');
      parts.push(...guide.whereToDo.map((item) => `- ${item}`));
    }

    if (guide.estimatedTime) {
      parts.push(`\nThời gian xử lý:\n${guide.estimatedTime}`);
    }

    if (guide.fees?.length) {
      parts.push('\nChi phí:');
      parts.push(...guide.fees.map((item) => `- ${item}`));
    }

    if (guide.documentsChecklist?.length) {
      parts.push('\nChecklist giấy tờ:');
      parts.push(
        ...guide.documentsChecklist.map(
          (item) =>
            `- ${item.label} [${item.required ? 'Bắt buộc' : 'Tùy trường hợp'}]${
              item.note ? ` - ${item.note}` : ''
            }`
        )
      );
    }

    if (guide.steps.length) {
      parts.push(...guide.steps.map((step) => `\n${formatStepForCopy(step)}`));
    }

    if (guide.commonMistakes?.length) {
      parts.push('\nLỗi thường gặp:');
      parts.push(...guide.commonMistakes.map((item) => `- ${item}`));
    }

    Clipboard.setString(parts.join('\n'));
    Alert.alert('Đã copy', 'Đã copy toàn bộ nội dung tóm tắt của thủ tục này.');
  };

  const copyChecklist = () => {
    if (!guide.documentsChecklist?.length) return;

    const content = [
      `${guide.title} - Checklist giấy tờ`,
      ...guide.documentsChecklist.map(
        (item) =>
          `- ${item.label} [${item.required ? 'Bắt buộc' : 'Tùy trường hợp'}]${
            item.note ? ` - ${item.note}` : ''
          }`
      ),
    ].join('\n');

    Clipboard.setString(content);
    Alert.alert('Đã copy', 'Đã copy checklist giấy tờ.');
  };

  const copyStep = (step: (typeof guide.steps)[number]) => {
    Clipboard.setString(`${guide.title}\n${formatStepForCopy(step)}`);
    Alert.alert('Đã copy', `Đã copy bước ${step.step}.`);
  };

  const handleToggleChecklistItem = async (label: string) => {
    const next = await toggleGuideChecklistItem(guide.id, label);
    setCheckedChecklistItems(new Set(next));
  };

  const handleClearChecklist = async () => {
    await clearGuideChecklistProgress(guide.id);
    setCheckedChecklistItems(new Set());
  };

  const handleToggleStep = async (stepIndex: number) => {
    const next = await toggleGuideStep(guide.id, stepIndex);
    setCompletedSteps(new Set(next));
  };

  const handleClearStepProgress = async () => {
    await clearGuideStepProgress(guide.id);
    setCompletedSteps(new Set());
  };

  const checklistTotal = guide.documentsChecklist?.length ?? 0;
  const checklistDone = guide.documentsChecklist?.filter((item) =>
    checkedChecklistItems.has(item.label)
  ).length ?? 0;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: guide.title,
      headerRight: () => (
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={copyWholeGuide} style={styles.headerIconBtn}>
            <Ionicons name="copy-outline" size={20} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBookmark} style={styles.headerIconBtn}>
            <Ionicons
              name={bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={22}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [guide, bookmarked]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Guide Header */}
      <View style={[styles.guideHeader, { backgroundColor: guide.color }]}>
        <Text style={styles.guideJp}>{guide.titleJp}</Text>
        <Text style={styles.guideTitle}>{guide.title}</Text>
        <Text style={styles.guideDesc}>{guide.description}</Text>
      </View>

      <View style={styles.content}>
        {guide.heroImage && (
          <View style={styles.heroImageCard}>
            <Image source={guide.heroImage} style={[styles.heroImage, { width: windowWidth - 32 }]} resizeMode="cover" />
            {guide.heroImageCaption ? (
              <Text style={styles.imageCaption}>{guide.heroImageCaption}</Text>
            ) : null}
          </View>
        )}

        <View style={styles.disclaimerBox}>
          <Ionicons name="information-circle-outline" size={16} color={Colors.primary} />
          <Text style={styles.disclaimerText}>
            {Disclaimers.legal}
            {'\n'}Xác minh: {formatLastUpdated(guide.lastVerified ?? ADMIN_CONTENT_META.lastUpdated)}. Nguồn: {getSourceLabels(ADMIN_CONTENT_META)}.
          </Text>
        </View>

        {guide.priority === 'high' && (
          <View style={styles.priorityBox}>
            <Ionicons name="warning-outline" size={18} color={Colors.warning} />
            <View style={styles.priorityTextBlock}>
              <Text style={styles.priorityTitle}>Mục quan trọng</Text>
              <Text style={styles.priorityText}>
                Nội dung này có thể ảnh hưởng đến visa, tiền, bảo hiểm hoặc xử phạt. Hãy mở nguồn chính thức trước khi nộp hồ sơ hoặc ký giấy tờ.
              </Text>
            </View>
          </View>
        )}

        {(guide.whoIsThisFor || guide.whenToDo || guide.whereToDo || guide.estimatedTime || guide.fees) && (
          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>Tổng quan cần biết</Text>
            {guide.whoIsThisFor && (
              <InfoList title="Ai cần làm" items={guide.whoIsThisFor} color={guide.color} />
            )}
            {guide.whenToDo && (
              <InfoList title="Khi nào làm" items={guide.whenToDo} color={guide.color} />
            )}
            {guide.whereToDo && (
              <InfoList title="Làm ở đâu" items={guide.whereToDo} color={guide.color} />
            )}
            {guide.estimatedTime && (
              <InfoText title="Thời gian xử lý" text={guide.estimatedTime} color={guide.color} />
            )}
            {guide.fees && (
              <InfoList title="Chi phí" items={guide.fees} color={guide.color} />
            )}
          </View>
        )}

        {guide.documentsChecklist && guide.documentsChecklist.length > 0 && (
          <View style={styles.detailSection}>
            <View style={styles.sectionTitleRow}>
              <View>
                <Text style={styles.detailSectionTitle}>Checklist giấy tờ</Text>
                <Text style={styles.checklistProgressText}>
                  Đã chuẩn bị {checklistDone}/{checklistTotal}
                </Text>
              </View>
              {checklistDone > 0 && (
                <TouchableOpacity onPress={handleClearChecklist} style={styles.resetChecklistButton}>
                  <Text style={styles.resetChecklistText}>Đặt lại</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity style={styles.copySectionButton} onPress={copyChecklist}>
              <Ionicons name="copy-outline" size={15} color={guide.color} />
              <Text style={[styles.copySectionButtonText, { color: guide.color }]}>Copy checklist</Text>
            </TouchableOpacity>
            <View style={styles.checklistProgressBar}>
              <View
                style={[
                  styles.checklistProgressFill,
                  {
                    width: `${checklistTotal > 0 ? (checklistDone / checklistTotal) * 100 : 0}%`,
                    backgroundColor: guide.color,
                  },
                ]}
              />
            </View>
            {guide.documentsChecklist.map((item) => (
              <TouchableOpacity
                key={item.label}
                style={styles.checklistItem}
                onPress={() => handleToggleChecklistItem(item.label)}
                activeOpacity={0.75}
              >
                <View style={styles.checkIconColumn}>
                  <View
                    style={[
                      styles.checkCircle,
                      checkedChecklistItems.has(item.label) && {
                        backgroundColor: guide.color,
                        borderColor: guide.color,
                      },
                    ]}
                  >
                    {checkedChecklistItems.has(item.label) && (
                      <Ionicons name="checkmark" size={15} color={Colors.white} />
                    )}
                  </View>
                  <View style={[styles.requiredBadge, item.required ? styles.requiredBadgeOn : styles.requiredBadgeOff]}>
                    <Text style={[styles.requiredText, item.required ? styles.requiredTextOn : styles.requiredTextOff]}>
                      {item.required ? 'Bắt buộc' : 'Tùy trường hợp'}
                    </Text>
                  </View>
                </View>
                <View style={styles.checklistTextBlock}>
                  <Text
                    style={[
                      styles.checklistLabel,
                      checkedChecklistItems.has(item.label) && styles.checklistLabelDone,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.note ? <Text style={styles.checklistNote}>{item.note}</Text> : null}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Progress indicator */}
        <View style={styles.stepProgressHeader}>
          <Text style={[styles.detailSectionTitle, { marginBottom: 0 }]}>Các bước thực hiện</Text>
          {completedSteps.size > 0 && (
            <Text style={styles.stepProgressCount}>
              {completedSteps.size}/{guide.steps.length} bước đã xong
            </Text>
          )}
        </View>
        <View style={styles.progressContainer}>
          {guide.steps.map((step, index) => {
            const isActive = expandedStep === index;
            const isDone = completedSteps.has(index);
            const dotColor = isDone ? '#27AE60' : isActive ? guide.color : guide.color + '40';
            const lineColor =
              isDone && completedSteps.has(index + 1) ? '#27AE60' : guide.color + '40';
            return (
              <React.Fragment key={step.step}>
                <TouchableOpacity
                  onPress={() => setExpandedStep(isActive ? null : index)}
                  style={[
                    styles.progressDot,
                    { backgroundColor: dotColor },
                    isActive && styles.progressDotActive,
                  ]}
                >
                  {isDone ? (
                    <Ionicons name="checkmark" size={14} color={Colors.white} />
                  ) : (
                    <Text style={[styles.progressNum, { color: isActive ? Colors.white : guide.color }]}>
                      {step.step}
                    </Text>
                  )}
                </TouchableOpacity>
                {index < guide.steps.length - 1 && (
                  <View style={[styles.progressLine, { backgroundColor: lineColor }]} />
                )}
              </React.Fragment>
            );
          })}
        </View>

        {/* Steps */}
        {guide.steps.map((step, index) => {
          const stepDone = completedSteps.has(index);
          return (
          <TouchableOpacity
            key={step.step}
            style={[
              styles.stepCard,
              expandedStep === index && { borderColor: guide.color, borderWidth: 1.5 },
              stepDone && styles.stepCardDone,
            ]}
            onPress={() => setExpandedStep(expandedStep === index ? null : index)}
            activeOpacity={0.8}
          >
            <View style={styles.stepHeader}>
              <View style={styles.stepHeaderLeft}>
                <View style={[styles.stepNum, { backgroundColor: stepDone ? '#27AE60' : guide.color }]}>
                  {stepDone ? (
                    <Ionicons name="checkmark" size={14} color={Colors.white} />
                  ) : (
                    <Text style={styles.stepNumText}>{step.step}</Text>
                  )}
                </View>
                <Text style={[styles.stepTitle, stepDone && styles.stepTitleDone]}>{step.title}</Text>
              </View>
              <View style={styles.stepHeaderActions}>
                <TouchableOpacity
                  style={[
                    styles.stepDoneButton,
                    stepDone && { backgroundColor: '#27AE60', borderColor: '#27AE60' },
                  ]}
                  onPress={() => handleToggleStep(index)}
                  hitSlop={8}
                >
                  {stepDone && <Ionicons name="checkmark" size={13} color={Colors.white} />}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.stepCopyButton}
                  onPress={() => copyStep(step)}
                  hitSlop={8}
                >
                  <Ionicons name="copy-outline" size={16} color={Colors.textMuted} />
                </TouchableOpacity>
                <Ionicons
                  name={expandedStep === index ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={Colors.textMuted}
                />
              </View>
            </View>

            {expandedStep === index && (
              <View style={styles.stepBody}>
                <RichText
                  text={step.description}
                  textStyle={styles.stepDesc}
                  containerStyle={styles.stepDescContainer}
                  accentColor={guide.color}
                />

                {step.image && (
                  <View style={styles.stepImageBlock}>
                    <Image source={step.image} style={[styles.stepImage, { width: windowWidth - 64 }]} resizeMode="cover" />
                    {step.imageCaption ? (
                      <Text style={styles.imageCaption}>{step.imageCaption}</Text>
                    ) : null}
                  </View>
                )}

                {step.documents.length > 0 && (
                  <View style={styles.docsSection}>
                    <View style={styles.docsSectionTitle}>
                      <Ionicons name="documents" size={15} color={guide.color} />
                      <Text style={[styles.docsTitleText, { color: guide.color }]}>
                        Giấy tờ cần chuẩn bị
                      </Text>
                    </View>
                    {step.documents.map((doc, i) => (
                      <View key={i} style={styles.docItem}>
                        <View style={[styles.docBullet, { backgroundColor: guide.color }]} />
                        <Text style={styles.docText}>{doc}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {step.tip && (
                  <View style={[styles.tipBox, { backgroundColor: guide.color + '12', borderColor: guide.color + '30' }]}>
                    <Ionicons name="bulb" size={15} color={guide.color} />
                    <Text style={[styles.tipText, { color: guide.color === Colors.primary ? Colors.primaryDark : guide.color }]}>
                      {step.tip}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </TouchableOpacity>
          );
        })}

        {completedSteps.size > 0 && completedSteps.size === guide.steps.length && (
          <View style={[styles.completionBanner, { backgroundColor: '#27AE6010', borderColor: '#27AE6030' }]}>
            <Ionicons name="checkmark-done-circle" size={26} color="#27AE60" />
            <View style={styles.completionTextBlock}>
              <Text style={[styles.completionTitle, { color: '#27AE60' }]}>Đã hoàn thành tất cả bước!</Text>
              <Text style={styles.completionSubtitle}>Đặt lại nếu bạn cần làm lại từ đầu.</Text>
            </View>
            <TouchableOpacity onPress={handleClearStepProgress} style={styles.completionResetBtn}>
              <Text style={styles.completionResetText}>Đặt lại</Text>
            </TouchableOpacity>
          </View>
        )}

        {guide.commonMistakes && guide.commonMistakes.length > 0 && (
          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>Lỗi thường gặp</Text>
            {guide.commonMistakes.map((mistake) => (
              <View key={mistake} style={styles.mistakeItem}>
                <Ionicons name="alert-circle-outline" size={16} color={Colors.warning} />
                <Text style={styles.mistakeText}>{mistake}</Text>
              </View>
            ))}
          </View>
        )}

        {guide.faq && guide.faq.length > 0 && (
          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>Câu hỏi thường gặp</Text>
            {guide.faq.map((item, index) => {
              const open = expandedFaqIndex === index;
              return (
                <TouchableOpacity
                  key={item.question}
                  style={styles.faqItem}
                  onPress={() => setExpandedFaqIndex(open ? null : index)}
                  activeOpacity={0.8}
                >
                  <View style={styles.faqHeader}>
                    <Text style={[styles.faqQuestion, { flex: 1 }]}>{item.question}</Text>
                    <Ionicons
                      name={open ? 'chevron-up' : 'chevron-down'}
                      size={16}
                      color={Colors.textMuted}
                    />
                  </View>
                  {open && <Text style={styles.faqAnswer}>{item.answer}</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Official Links */}
        {guide.officialLinks && guide.officialLinks.length > 0 && (
          <View style={styles.linksSection}>
            <View style={styles.linksSectionHeader}>
              <Ionicons name="shield-checkmark-outline" size={17} color={guide.color} />
              <View style={styles.linksHeaderTextBlock}>
                <Text style={styles.linksSectionTitle}>Nguồn chính thức</Text>
                <Text style={styles.linksHint}>
                  Mở nguồn trước khi nộp hồ sơ để kiểm tra mẫu đơn, phí và điều kiện mới nhất.
                </Text>
              </View>
            </View>
            {guide.officialLinks.map((link, i) => (
              <TouchableOpacity
                key={i}
                style={styles.linkItem}
                onPress={() => {
                  Linking.openURL(link.url).catch(() =>
                    Alert.alert('Không thể mở link', 'Vui lòng kiểm tra kết nối mạng.')
                  );
                }}
              >
                <View style={[styles.linkIconBg, { backgroundColor: guide.color + '15' }]}>
                  <Ionicons name="globe-outline" size={16} color={guide.color} />
                </View>
                <Text style={styles.linkLabel} numberOfLines={2}>{link.label}</Text>
                <Ionicons name="open-outline" size={16} color={Colors.textMuted} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ height: 32 + Math.max(insets.bottom, 12) }} />
      </View>
    </ScrollView>
  );
}

function InfoList({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <View style={styles.infoBlock}>
      <Text style={[styles.infoBlockTitle, { color }]}>{title}</Text>
      {items.map((item) => (
        <View key={item} style={styles.infoListItem}>
          <View style={[styles.infoBullet, { backgroundColor: color }]} />
          <Text style={styles.infoListText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function InfoText({ title, text, color }: { title: string; text: string; color: string }) {
  return (
    <View style={styles.infoBlock}>
      <Text style={[styles.infoBlockTitle, { color }]}>{title}</Text>
      <Text style={styles.infoListText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  guideHeader: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
  },
  guideJp: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 4,
  },
  guideTitle: {
    fontSize: 22,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.white,
    marginBottom: 6,
  },
  guideDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 19,
  },
  content: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  heroImageCard: {
    marginBottom: 16,
  },
  heroImage: {
    height: 188,
    borderRadius: 18,
    backgroundColor: Colors.border,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 4,
  },
  headerIconBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  disclaimerBox: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: Colors.accent,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  priorityBox: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: Colors.warningLight,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.warning + '35',
  },
  priorityTextBlock: {
    flex: 1,
  },
  priorityTitle: {
    fontSize: 13,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  priorityText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  detailSection: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  detailSectionTitle: {
    fontSize: 15,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 10,
  },
  checklistProgressText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: -7,
  },
  resetChecklistButton: {
    borderRadius: 8,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  resetChecklistText: {
    fontSize: 12,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textSecondary,
  },
  copySectionButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginBottom: 10,
  },
  copySectionButtonText: {
    fontSize: 12,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
  },
  checklistProgressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.background,
    overflow: 'hidden',
    marginBottom: 8,
  },
  checklistProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  infoBlock: {
    marginBottom: 12,
  },
  infoBlockTitle: {
    fontSize: 12,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    marginBottom: 7,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  infoListItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
    marginBottom: 6,
  },
  infoBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    flexShrink: 0,
  },
  infoListText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 9,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  checkIconColumn: {
    width: 88,
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 1,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  requiredBadge: {
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginTop: 1,
  },
  requiredBadgeOn: {
    backgroundColor: Colors.dangerLight,
  },
  requiredBadgeOff: {
    backgroundColor: Colors.accent,
  },
  requiredText: {
    fontSize: 10,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
  },
  requiredTextOn: {
    color: Colors.danger,
  },
  requiredTextOff: {
    color: Colors.primary,
  },
  checklistTextBlock: {
    flex: 1,
  },
  checklistLabel: {
    fontSize: 13,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  checklistLabelDone: {
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  checklistNote: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  mistakeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingVertical: 7,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  mistakeText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  faqItem: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
    paddingBottom: 4,
    marginTop: 8,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 4,
  },
  faqQuestion: {
    fontSize: 13,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.textPrimary,
    lineHeight: 19,
  },
  faqAnswer: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
    marginTop: 6,
    marginBottom: 6,
  },
  progressDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDotActive: {
    width: 38,
    height: 38,
    borderRadius: 19,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
  progressNum: {
    fontSize: 13,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.white,
  },
  progressLine: {
    flex: 1,
    height: 2,
    marginHorizontal: 4,
  },
  stepCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  stepHeaderLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepNum: {
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumText: {
    fontSize: 13,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    color: Colors.white,
  },
  stepTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
  },
  stepCopyButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  stepBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  stepDescContainer: {
    marginTop: 12,
    marginBottom: 12,
  },
  stepDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  stepImageBlock: {
    marginBottom: 12,
  },
  stepImage: {
    height: 192,
    borderRadius: 14,
    backgroundColor: Colors.border,
  },
  imageCaption: {
    marginTop: 8,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  docsSection: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  docsSectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  docsTitleText: {
    fontSize: 12,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 5,
  },
  docBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 5,
    flexShrink: 0,
  },
  docText: {
    flex: 1,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  tipBox: {
    flexDirection: 'row',
    gap: 8,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
  linksSection: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  linksSectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 7,
    marginBottom: 12,
  },
  linksHeaderTextBlock: {
    flex: 1,
  },
  linksSectionTitle: {
    fontSize: 13,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  linksHint: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
    marginTop: 4,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  linkIconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkLabel: {
    flex: 1,
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '500',
    lineHeight: 18,
  },
  stepProgressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  stepProgressCount: {
    fontSize: 12,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: '#27AE60',
  },
  stepCardDone: {
    opacity: 0.72,
  },
  stepTitleDone: {
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  stepDoneButton: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 14,
  },
  completionTextBlock: {
    flex: 1,
  },
  completionTitle: {
    fontSize: 13,
    fontWeight: '800', fontFamily: 'BeVietnamPro_800ExtraBold',
    marginBottom: 2,
  },
  completionSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  completionResetBtn: {
    borderRadius: 8,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  completionResetText: {
    fontSize: 12,
    fontWeight: '700', fontFamily: 'BeVietnamPro_700Bold',
    color: Colors.textSecondary,
  },
});
