import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
import { Colors } from '../constants/colors';

export type RootStackParamList = {
  MainTabs: undefined;
  AIChat: { prefilledQuestion?: string; title?: string };
  AdminDetail: { guideId: string };
  DailyLife: undefined;
};

export type TabParamList = {
  Home: undefined;
  Admin: undefined;
  Jobs: undefined;
  Japanese: undefined;
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
