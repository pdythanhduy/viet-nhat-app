import React from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screens/HomeScreen';
import AdminScreen from '../screens/AdminScreen';
import AdminDetailScreen from '../screens/AdminDetailScreen';
import DailyLifeScreen from '../screens/DailyLifeScreen';
import DailyLifeDetailScreen from '../screens/DailyLifeDetailScreen';
import JobsScreen from '../screens/JobsScreen';
import JapaneseScreen from '../screens/JapaneseScreen';
import BJTScreen from '../screens/BJTScreen';
import BJTVocabularyScreen from '../screens/BJTVocabularyScreen';
import BJTKeigoScreen from '../screens/BJTKeigoScreen';
import BJTScenariosScreen from '../screens/BJTScenariosScreen';
import BJTDocumentMockScreen from '../screens/BJTDocumentMockScreen';
import BJTBusinessToolkitScreen from '../screens/BJTBusinessToolkitScreen';
import BJTLanguageAssetsScreen from '../screens/BJTLanguageAssetsScreen';
import BJTJobDocsScreen from '../screens/BJTJobDocsScreen';
import BJTReadingPassagesScreen from '../screens/BJTReadingPassagesScreen';
import BJTFlashcardsScreen from '../screens/BJTFlashcardsScreen';
import BJTUltimateStudyPlanScreen from '../screens/BJTUltimateStudyPlanScreen';
import BJTMockExamsV2Screen from '../screens/BJTMockExamsV2Screen';
import BJTQuizScreen from '../screens/BJTQuizScreen';
import BJTMockTestScreen from '../screens/BJTMockTestScreen';
import BJTReviewScreen from '../screens/BJTReviewScreen';
import JapanesePracticeScreen from '../screens/JapanesePracticeScreen';
import JapaneseQuizScreen from '../screens/JapaneseQuizScreen';
import JapaneseKanaScreen from '../screens/JapaneseKanaScreen';
import JapaneseKanaQuizScreen from '../screens/JapaneseKanaQuizScreen';
import AIChatScreen from '../screens/AIChatScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SavedScreen from '../screens/SavedScreen';
import ImportantDatesScreen from '../screens/ImportantDatesScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import LaborGuideScreen from '../screens/LaborGuideScreen';
import LaborHelpScreen from '../screens/LaborHelpScreen';
import JourneyChecklistScreen from '../screens/JourneyChecklistScreen';
import EmergencyHubScreen from '../screens/EmergencyHubScreen';
import SearchScreen from '../screens/SearchScreen';
import { Colors } from '../constants/colors';
import { BjtTargetLevel } from '../utils/bjtQuestionLevels';

export type TabParamList = {
  Home: undefined;
  Admin: undefined;
  Jobs: undefined;
  Japanese: { initialSearch?: string } | undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList> | undefined;
  AIChat: { prefilledQuestion?: string; title?: string };
  AdminDetail: { guideId: string };
  DailyLife: undefined;
  DailyLifeDetail: { topicId: string };
  JapanesePractice: { categoryName: string; categoryColor?: string };
  JapaneseQuiz: { categoryName?: string; categoryColor?: string; direction?: 'jp-to-vn' | 'vn-to-jp' | 'mixed' };
  BJT: undefined;
  BJTVocabulary: undefined;
  BJTKeigo: undefined;
  BJTScenarios: undefined;
  BJTDocumentMock: undefined;
  BJTBusinessToolkit: undefined;
  BJTLanguageAssets: undefined;
  BJTJobDocs: undefined;
  BJTReadingPassages: undefined;
  BJTFlashcards: undefined;
  BJTUltimateStudyPlan: undefined;
  BJTMockExamsV2: undefined;
  BJTQuiz: { level?: BjtTargetLevel } | undefined;
  BJTMockTest: { level?: BjtTargetLevel } | undefined;
  BJTReview: { level?: BjtTargetLevel } | undefined;
  JapaneseKana: undefined;
  JapaneseKanaQuiz: { mode?: 'hiragana' | 'katakana' | 'mixed' } | undefined;
  Feedback: undefined;
  LaborGuide: undefined;
  LaborHelp: undefined;
  JourneyChecklist: undefined;
  EmergencyHub: undefined;
  Search: undefined;
  Saved: { filter?: 'all' | 'guide' | 'daily-life' | 'phrase' | 'dialogue' } | undefined;
  ImportantDates: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabNavigator() {
  const insets = useSafeAreaInsets();
  const androidBottomInset = Platform.OS === 'android' ? Math.max(insets.bottom, 8) : 0;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Admin') iconName = focused ? 'document-text' : 'document-text-outline';
          else if (route.name === 'Jobs') iconName = focused ? 'briefcase' : 'briefcase-outline';
          else if (route.name === 'Japanese') iconName = focused ? 'language' : 'language-outline';
          else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: [
          styles.tabBar,
          Platform.OS === 'android'
            ? {
                height: TAB_BAR.height + androidBottomInset,
                paddingBottom: TAB_BAR.paddingBottom + androidBottomInset,
              }
            : null,
        ],
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: Platform.OS === 'android' ? styles.androidTabItem : undefined,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Trang chủ' }} />
      <Tab.Screen name="Admin" component={AdminScreen} options={{ tabBarLabel: 'Thủ tục' }} />
      <Tab.Screen name="Jobs" component={JobsScreen} options={{ tabBarLabel: 'Việc làm' }} />
      <Tab.Screen name="Japanese" component={JapaneseScreen} options={{ tabBarLabel: 'Tiếng Nhật' }} />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Cài đặt',
          headerShown: true,
          headerTitle: 'Cài đặt',
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: '700', fontSize: 17 },
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen
          name="AIChat"
          component={AIChatScreen}
          options={{
            headerShown: true,
            headerTitle: 'Trợ lý AI',
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: Colors.white,
            headerTitleStyle: { fontWeight: '700', fontSize: 17 },
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="AdminDetail"
          component={AdminDetailScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: Colors.white,
            headerTitleStyle: { fontWeight: '700', fontSize: 17 },
          }}
        />
        <Stack.Screen
          name="DailyLife"
          component={DailyLifeScreen}
          options={{
            headerShown: true,
            headerTitle: 'Cuộc sống hằng ngày',
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: Colors.white,
            headerTitleStyle: { fontWeight: '700', fontSize: 17 },
          }}
        />
        <Stack.Screen
          name="DailyLifeDetail"
          component={DailyLifeDetailScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: Colors.white,
            headerTitleStyle: { fontWeight: '700', fontSize: 17 },
          }}
        />
        <Stack.Screen
          name="BJT"
          component={BJTScreen}
          options={{
            headerShown: true,
            headerTitle: 'BJT Business Japanese',
            headerStyle: { backgroundColor: Colors.primaryDark },
            headerTintColor: Colors.white,
            headerTitleStyle: { fontWeight: '700', fontSize: 17 },
          }}
        />
        <Stack.Screen
          name="BJTVocabulary"
          component={BJTVocabularyScreen}
          options={{
            headerShown: true,
            headerTitle: 'BJT Vocabulary',
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '700', fontSize: 17, color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="BJTKeigo"
          component={BJTKeigoScreen}
          options={{
            headerShown: true,
            headerTitle: 'BJT Keigo',
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '700', fontSize: 17, color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="BJTScenarios"
          component={BJTScenariosScreen}
          options={{
            headerShown: true,
            headerTitle: 'BJT Scenarios',
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '700', fontSize: 17, color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="BJTDocumentMock"
          component={BJTDocumentMockScreen}
          options={{
            headerShown: true,
            headerTitle: 'BJT Document Mock',
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '700', fontSize: 17, color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="BJTBusinessToolkit"
          component={BJTBusinessToolkitScreen}
          options={{
            headerShown: true,
            headerTitle: 'BJT Business Toolkit',
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '700', fontSize: 17, color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="BJTLanguageAssets"
          component={BJTLanguageAssetsScreen}
          options={{
            headerShown: true,
            headerTitle: 'BJT Language Assets',
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '700', fontSize: 17, color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="BJTJobDocs"
          component={BJTJobDocsScreen}
          options={{
            headerShown: true,
            headerTitle: 'BJT Job Docs',
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '700', fontSize: 17, color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="BJTReadingPassages"
          component={BJTReadingPassagesScreen}
          options={{
            headerShown: true,
            headerTitle: 'BJT Reading Passages',
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '700', fontSize: 17, color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="BJTFlashcards"
          component={BJTFlashcardsScreen}
          options={{
            headerShown: true,
            headerTitle: 'BJT Flashcards',
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '700', fontSize: 17, color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="BJTUltimateStudyPlan"
          component={BJTUltimateStudyPlanScreen}
          options={{
            headerShown: true,
            headerTitle: 'BJT 12-Week Plan',
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '700', fontSize: 17, color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="BJTMockExamsV2"
          component={BJTMockExamsV2Screen}
          options={{
            headerShown: true,
            headerTitle: 'BJT Mock Exams V2',
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '700', fontSize: 17, color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="BJTQuiz"
          component={BJTQuizScreen}
          options={{
            headerShown: true,
            headerTitle: 'BJT Scenario Practice',
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '700', fontSize: 17, color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="BJTMockTest"
          component={BJTMockTestScreen}
          options={{
            headerShown: true,
            headerTitle: 'BJT Mock Test',
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '700', fontSize: 17, color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="BJTReview"
          component={BJTReviewScreen}
          options={{
            headerShown: true,
            headerTitle: 'BJT Review Mode',
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '700', fontSize: 17, color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="JapanesePractice"
          component={JapanesePracticeScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '700', fontSize: 17, color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="JapaneseQuiz"
          component={JapaneseQuizScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '700', fontSize: 17, color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="JapaneseKana"
          component={JapaneseKanaScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="JapaneseKanaQuiz"
          component={JapaneseKanaQuizScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Feedback"
          component={FeedbackScreen}
          options={{
            headerShown: true,
            headerTitle: 'Góp ý và phản hồi',
            headerStyle: { backgroundColor: Colors.background },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '700', fontSize: 17, color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="LaborGuide"
          component={LaborGuideScreen}
          options={{
            headerShown: true,
            headerTitle: 'Cẩm nang lao động',
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: Colors.white,
            headerTitleStyle: { fontWeight: '700', fontSize: 17 },
          }}
        />
        <Stack.Screen
          name="LaborHelp"
          component={LaborHelpScreen}
          options={{
            headerShown: true,
            headerTitle: 'Khiếu nại / cần giúp gì',
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: Colors.white,
            headerTitleStyle: { fontWeight: '700', fontSize: 17 },
          }}
        />
        <Stack.Screen name="JourneyChecklist" component={JourneyChecklistScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EmergencyHub" component={EmergencyHubScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Saved" component={SavedScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ImportantDates" component={ImportantDatesScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Android tab bar is taller and more padded than iOS to ensure comfortable tap targets
// and readable Vietnamese labels on smaller screens. iOS values are kept unchanged.
const TAB_BAR = Platform.select({
  android: { height: 74, paddingTop: 8, paddingBottom: 12 },
  default: { height: 84, paddingTop: 6, paddingBottom: 20 },
});
const TAB_LABEL = Platform.select({
  android: { fontSize: 12, marginBottom: 2 },
  default: { fontSize: 11, marginBottom: 0 },
});

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.tabBar,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    height: TAB_BAR.height,
    paddingTop: TAB_BAR.paddingTop,
    paddingBottom: TAB_BAR.paddingBottom,
  },
  androidTabItem: {
    paddingTop: 2,
  },
  tabLabel: {
    fontWeight: '600',
    fontSize: TAB_LABEL.fontSize,
    marginBottom: TAB_LABEL.marginBottom,
  },
});
