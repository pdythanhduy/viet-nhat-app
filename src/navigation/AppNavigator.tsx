import React from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Platform } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import AdminScreen from '../screens/AdminScreen';
import AdminDetailScreen from '../screens/AdminDetailScreen';
import DailyLifeScreen from '../screens/DailyLifeScreen';
import JobsScreen from '../screens/JobsScreen';
import JapaneseScreen from '../screens/JapaneseScreen';
import AIChatScreen from '../screens/AIChatScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SavedScreen from '../screens/SavedScreen';
import ImportantDatesScreen from '../screens/ImportantDatesScreen';
import DailyLifeDetailScreen from '../screens/DailyLifeDetailScreen';
import JapanesePracticeScreen from '../screens/JapanesePracticeScreen';
import JapaneseQuizScreen from '../screens/JapaneseQuizScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import LaborGuideScreen from '../screens/LaborGuideScreen';
import LaborHelpScreen from '../screens/LaborHelpScreen';
import { Colors } from '../constants/colors';

export type TabParamList = {
  Home: undefined;
  Admin: undefined;
  Jobs: undefined;
  Japanese: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList> | undefined;
  AIChat: { prefilledQuestion?: string; title?: string };
  AdminDetail: { guideId: string };
  DailyLife: undefined;
  DailyLifeDetail: { topicId: string };
  JapanesePractice: { categoryName: string; categoryColor?: string };
  JapaneseQuiz: { categoryName?: string; categoryColor?: string };
  Feedback: undefined;
  LaborGuide: undefined;
  LaborHelp: undefined;
  Saved: undefined;
  ImportantDates: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabNavigator() {
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
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Trang chủ' }} />
      <Tab.Screen name="Admin" component={AdminScreen} options={{ tabBarLabel: 'Thủ tục' }} />
      <Tab.Screen name="Jobs" component={JobsScreen} options={{ tabBarLabel: 'Việc làm' }} />
      <Tab.Screen name="Japanese" component={JapaneseScreen} options={{ tabBarLabel: 'Tiếng Nhật' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'Cài đặt', headerShown: true, headerTitle: 'Cài đặt', headerStyle: { backgroundColor: Colors.primary }, headerTintColor: Colors.white, headerTitleStyle: { fontWeight: '700', fontSize: 17 } }} />
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
            headerTitle: 'Cuộc sống hàng ngày',
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
          name="Feedback"
          component={FeedbackScreen}
          options={{
            headerShown: true,
            headerTitle: 'Góp ý & Phản hồi',
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
        <Stack.Screen
          name="Saved"
          component={SavedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ImportantDates"
          component={ImportantDatesScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.tabBar,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    paddingTop: 6,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    height: Platform.OS === 'ios' ? 82 : 64,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
});
