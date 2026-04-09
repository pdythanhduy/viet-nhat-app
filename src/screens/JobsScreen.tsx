import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../constants/colors';
import { JOBS_DATA, WORKER_RIGHTS } from '../constants/content';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type JobCategory = 'all' | 'restaurant' | 'it' | 'manufacturing' | 'service';

const FILTERS: { id: JobCategory; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'restaurant', label: 'Nhà hàng' },
  { id: 'it', label: 'IT' },
  { id: 'manufacturing', label: 'Sản xuất' },
  { id: 'service', label: 'Dịch vụ' },
];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  'N4 trở lên': { bg: Colors.tagBlue, text: Colors.primary },
  'N3 trở lên': { bg: Colors.tagBlue, text: Colors.primary },
  'N2 trở lên': { bg: Colors.tagBlue, text: Colors.primaryDark },
  'Không cần tiếng Nhật': { bg: Colors.tagGreen, text: '#1A7A45' },
  'Part-time': { bg: Colors.tagOrange, text: '#B05A00' },
  'Full-time': { bg: Colors.tagGreen, text: '#1A7A45' },
  'Bảo hiểm': { bg: '#F0E8FF', text: '#6C2EB9' },
  'Visa hỗ trợ': { bg: '#FDE8FF', text: '#9B1EB0' },
  'Ký túc xá': { bg: '#E8FFF0', text: '#1A7A45' },
  'Ca linh hoạt': { bg: Colors.tagOrange, text: '#B05A00' },
  'Discount sản phẩm': { bg: '#FFF0F0', text: '#B01A1A' },
  'Đào tạo': { bg: Colors.tagBlue, text: Colors.primary },
};

export default function JobsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<JobCategory>('all');
  const [selectedJob, setSelectedJob] = useState<typeof JOBS_DATA[0] | null>(null);

  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((job) => {
      const matchesFilter = activeFilter === 'all' || job.category === activeFilter;
      const matchesSearch =
        search.trim() === '' ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Việc làm tại Nhật</Text>
        <Text style={styles.headerSub}>Tìm công việc phù hợp với bạn</Text>

        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm theo tên, công ty, địa điểm..."
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterPill,
                activeFilter === filter.id && styles.filterPillActive,
              ]}
              onPress={() => setActiveFilter(filter.id)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter.id && styles.filterTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results count */}
        <Text style={styles.resultsCount}>
          Tìm thấy <Text style={styles.resultsNum}>{filteredJobs.length}</Text> công việc
        </Text>

        {/* Job Cards */}
        {filteredJobs.map((job) => (
          <TouchableOpacity
            key={job.id}
            style={styles.jobCard}
            onPress={() => setSelectedJob(job)}
          >
            <View style={styles.jobTop}>
              <View style={styles.jobTitleContainer}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobTitleJp}>{job.titleJp}</Text>
              </View>
              <View style={[styles.typeBadge, job.type === 'full-time' ? styles.fullTime : styles.partTime]}>
                <Text style={[styles.typeText, job.type === 'full-time' ? styles.fullTimeText : styles.partTimeText]}>
                  {job.type === 'full-time' ? 'Full-time' : 'Part-time'}
                </Text>
              </View>
            </View>

            <View style={styles.jobMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="business" size={13} color={Colors.textMuted} />
                <Text style={styles.metaText}>{job.company}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="location" size={13} color={Colors.textMuted} />
                <Text style={styles.metaText}>{job.location}</Text>
              </View>
            </View>

            <View style={styles.salary}>
              <Ionicons name="cash" size={15} color={Colors.success} />
              <Text style={styles.salaryText}>{job.salary}</Text>
            </View>

            <View style={styles.tagsRow}>
              {job.tags.map((tag) => {
                const colors = TAG_COLORS[tag] || { bg: Colors.tagBlue, text: Colors.primary };
                return (
                  <View key={tag} style={[styles.tag, { backgroundColor: colors.bg }]}>
                    <Text style={[styles.tagText, { color: colors.text }]}>{tag}</Text>
                  </View>
                );
              })}
            </View>
          </TouchableOpacity>
        ))}

        {filteredJobs.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={40} color={Colors.textMuted} />
            <Text style={styles.emptyText}>Không tìm thấy công việc phù hợp</Text>
            <Text style={styles.emptySubText}>Thử thay đổi từ khóa hoặc bộ lọc</Text>
          </View>
        )}

        {/* Worker Rights */}
        <Text style={styles.sectionTitle}>Quyền lợi người lao động 🛡️</Text>
        {WORKER_RIGHTS.map((right, i) => (
          <View key={i} style={styles.rightCard}>
            <View style={styles.rightIcon}>
              <Ionicons name={right.icon as any} size={20} color={Colors.primary} />
            </View>
            <View style={styles.rightInfo}>
              <Text style={styles.rightTitle}>{right.title}</Text>
              <Text style={styles.rightDesc}>{right.description}</Text>
            </View>
          </View>
        ))}

        {/* Ask AI about Jobs */}
        <TouchableOpacity
          style={styles.aiCard}
          onPress={() =>
            navigation.navigate('AIChat', {
              title: 'Tư vấn việc làm',
              prefilledQuestion:
                'Tôi là người Việt Nam muốn tìm việc làm tại Nhật Bản. Hãy tư vấn cho tôi về: loại visa phù hợp, cách tìm việc, phỏng vấn bằng tiếng Nhật, và những điều cần biết khi đi làm tại Nhật.',
            })
          }
        >
          <Ionicons name="sparkles" size={20} color={Colors.white} />
          <View style={styles.aiTextContainer}>
            <Text style={styles.aiTitle}>Tư vấn việc làm với AI</Text>
            <Text style={styles.aiSub}>Hỏi về quy trình, visa, phỏng vấn...</Text>
          </View>
          <Ionicons name="arrow-forward" size={18} color={Colors.white} />
        </TouchableOpacity>

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Job Detail Modal */}
      <Modal visible={selectedJob !== null} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedJob && (
                <>
                  <View style={styles.modalHeader}>
                    <View style={styles.modalTitleContainer}>
                      <Text style={styles.modalTitle}>{selectedJob.title}</Text>
                      <Text style={styles.modalTitleJp}>{selectedJob.titleJp}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setSelectedJob(null)}>
                      <Ionicons name="close-circle" size={28} color={Colors.textMuted} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.modalMeta}>
                    <View style={styles.metaRow}>
                      <Ionicons name="business" size={15} color={Colors.primary} />
                      <Text style={styles.modalMetaText}>{selectedJob.company}</Text>
                    </View>
                    <View style={styles.metaRow}>
                      <Ionicons name="location" size={15} color={Colors.primary} />
                      <Text style={styles.modalMetaText}>{selectedJob.location}</Text>
                    </View>
                    <View style={styles.metaRow}>
                      <Ionicons name="cash" size={15} color={Colors.success} />
                      <Text style={[styles.modalMetaText, { color: Colors.success, fontWeight: '700' }]}>
                        {selectedJob.salary}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.modalSectionTitle}>Mô tả công việc</Text>
                  <Text style={styles.modalDesc}>{selectedJob.description}</Text>

                  <Text style={styles.modalSectionTitle}>Phúc lợi</Text>
                  {selectedJob.benefits.map((benefit, i) => (
                    <View key={i} style={styles.benefitItem}>
                      <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                      <Text style={styles.benefitText}>{benefit}</Text>
                    </View>
                  ))}

                  <Text style={styles.modalSectionTitle}>Yêu cầu tiếng Nhật</Text>
                  <View style={styles.jpLevel}>
                    <Ionicons name="language" size={18} color={Colors.primary} />
                    <Text style={styles.jpLevelText}>{selectedJob.japaneseLevel}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.modalAiButton}
                    onPress={() => {
                      setSelectedJob(null);
                      navigation.navigate('AIChat', {
                        title: selectedJob.title,
                        prefilledQuestion: `Tôi muốn biết thêm về vị trí "${selectedJob.title}" tại "${selectedJob.company}" ở ${selectedJob.location}. Hãy tư vấn cho tôi cách chuẩn bị hồ sơ, phỏng vấn và những điều cần lưu ý.`,
                      });
                    }}
                  >
                    <Ionicons name="sparkles" size={18} color={Colors.white} />
                    <Text style={styles.modalAiText}>Hỏi AI về công việc này</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.white,
  },
  headerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
    marginBottom: 12,
  },
  searchBox: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -8,
    paddingTop: 4,
  },
  filtersScroll: {
    marginTop: 14,
  },
  filtersContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  filterPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.white,
  },
  resultsCount: {
    fontSize: 13,
    color: Colors.textMuted,
    paddingHorizontal: 16,
    marginTop: 14,
    marginBottom: 8,
  },
  resultsNum: {
    fontWeight: '700',
    color: Colors.primary,
  },
  jobCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 10,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  jobTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobTitleContainer: {
    flex: 1,
    marginRight: 8,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  jobTitleJp: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  fullTime: {
    backgroundColor: Colors.tagGreen,
  },
  partTime: {
    backgroundColor: Colors.tagOrange,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  fullTimeText: {
    color: '#1A7A45',
  },
  partTimeText: {
    color: '#B05A00',
  },
  jobMeta: {
    gap: 4,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  salary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  salaryText: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.success,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 8,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  emptySubText: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 20,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  rightCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  rightIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightInfo: {
    flex: 1,
  },
  rightTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  rightDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  aiCard: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 16,
    marginTop: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  aiTextContainer: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
  aiSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    padding: 20,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  modalTitleContainer: {
    flex: 1,
    marginRight: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  modalTitleJp: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 3,
  },
  modalMeta: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 12,
    gap: 8,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalMetaText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  modalSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 14,
    marginBottom: 8,
  },
  modalDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  benefitText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  jpLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.accent,
    padding: 10,
    borderRadius: 10,
  },
  jpLevelText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  modalAiButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
    marginBottom: 8,
  },
  modalAiText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
});
