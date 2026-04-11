import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteType = RouteProp<RootStackParamList, 'AdminDetail'>;

export default function AdminDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteType>();
  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [checkedChecklistItems, setCheckedChecklistItems] = useState<Set<string>>(new Set());

  const guide = ADMIN_GUIDES.find((g) => g.id === route.params.guideId);

  if (!guide) return null;

  useEffect(() => {
    isBookmarked(guide.id, 'guide').then(setBookmarked);
  }, [guide.id]);

  useEffect(() => {
    loadGuideChecklistProgress(guide.id).then((checked) => {
      setCheckedChecklistItems(new Set(checked));
    });
  }, [guide.id]);

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

  const handleToggleChecklistItem = async (label: string) => {
    const next = await toggleGuideChecklistItem(guide.id, label);
    setCheckedChecklistItems(new Set(next));
  };

  const handleClearChecklist = async () => {
    await clearGuideChecklistProgress(guide.id);
    setCheckedChecklistItems(new Set());
  };

  const checklistTotal = guide.documentsChecklist?.length ?? 0;
  const checklistDone = guide.documentsChecklist?.filter((item) =>
    checkedChecklistItems.has(item.label)
  ).length ?? 0;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: guide.title,
      headerRight: () => (
        <TouchableOpacity onPress={handleBookmark} style={{ marginRight: 4 }}>
          <Ionicons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={Colors.white}
          />
        </TouchableOpacity>
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
        <Text style={styles.detailSectionTitle}>Các bước thực hiện</Text>
        <View style={styles.progressContainer}>
          {guide.steps.map((step, index) => (
            <React.Fragment key={step.step}>
              <View
                style={[
                  styles.progressDot,
                  { backgroundColor: guide.color },
                ]}
              >
                <Text style={styles.progressNum}>{step.step}</Text>
              </View>
              {index < guide.steps.length - 1 && (
                <View style={[styles.progressLine, { backgroundColor: guide.color + '40' }]} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Steps */}
        {guide.steps.map((step, index) => (
          <TouchableOpacity
            key={step.step}
            style={styles.stepCard}
            onPress={() => setExpandedStep(expandedStep === index ? null : index)}
            activeOpacity={0.8}
          >
            <View style={styles.stepHeader}>
              <View style={[styles.stepNum, { backgroundColor: guide.color }]}>
                <Text style={styles.stepNumText}>{step.step}</Text>
              </View>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Ionicons
                name={expandedStep === index ? 'chevron-up' : 'chevron-down'}
                size={18}
                color={Colors.textMuted}
              />
            </View>

            {expandedStep === index && (
              <View style={styles.stepBody}>
                <Text style={styles.stepDesc}>{step.description}</Text>

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
        ))}

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
            {guide.faq.map((item) => (
              <View key={item.question} style={styles.faqItem}>
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <Text style={styles.faqAnswer}>{item.answer}</Text>
              </View>
            ))}
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

        {/* Ask AI about this guide */}
        <TouchableOpacity
          style={[styles.askAiButton, { backgroundColor: guide.color }]}
          onPress={() =>
            navigation.navigate('AIChat', {
              title: guide.title,
              prefilledQuestion: `Tôi cần được tư vấn chi tiết hơn về quy trình "${guide.title}" (${guide.titleJp}) ở Nhật Bản. `,
            })
          }
        >
          <Ionicons name="sparkles" size={20} color={Colors.white} />
          <Text style={styles.askAiText}>Hỏi AI về {guide.title}</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
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
    fontWeight: '800',
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
    fontWeight: '800',
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
    fontWeight: '800',
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
    fontWeight: '700',
    color: Colors.textSecondary,
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
    fontWeight: '800',
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
    fontWeight: '800',
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
    fontWeight: '700',
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
    paddingTop: 10,
    marginTop: 10,
  },
  faqQuestion: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 5,
  },
  faqAnswer: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  progressDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressNum: {
    fontSize: 13,
    fontWeight: '700',
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
  stepNum: {
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.white,
  },
  stepTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  stepBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  stepDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginTop: 12,
    marginBottom: 12,
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
    fontWeight: '700',
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
    fontWeight: '700',
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
  askAiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 16,
    borderRadius: 16,
    marginTop: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  askAiText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },
});
