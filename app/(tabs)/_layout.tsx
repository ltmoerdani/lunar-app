import React from 'react';
import { Tabs } from 'expo-router';
import { Calendar, Target, ChartBar as BarChart3, MoveHorizontal as MoreHorizontal, Chrome as Home } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Define types for tab icon props
type TabIconProps = {
  color: string;
  size: number;
};

// Extracted tab icon components for better performance
const TodayTabIcon = React.memo(({ color, size }: TabIconProps) => (
  <Home color={color} size={size} />
));

const CalendarTabIcon = React.memo(({ color, size }: TabIconProps) => (
  <Calendar color={color} size={size} />
));

const PlanningTabIcon = React.memo(({ color, size }: TabIconProps) => (
  <Target color={color} size={size} />
));

const ProgressTabIcon = React.memo(({ color, size }: TabIconProps) => (
  <BarChart3 color={color} size={size} />
));

const MoreTabIcon = React.memo(({ color, size }: TabIconProps) => (
  <MoreHorizontal color={color} size={size} />
));

// Display names for debugging
TodayTabIcon.displayName = 'TodayTabIcon';
CalendarTabIcon.displayName = 'CalendarTabIcon';
PlanningTabIcon.displayName = 'PlanningTabIcon';
ProgressTabIcon.displayName = 'ProgressTabIcon';
MoreTabIcon.displayName = 'MoreTabIcon';

// Wrapper functions for React Navigation tabBarIcon prop
const renderTodayIcon = ({ color, size }: TabIconProps) => (
  <TodayTabIcon color={color} size={size} />
);

const renderCalendarIcon = ({ color, size }: TabIconProps) => (
  <CalendarTabIcon color={color} size={size} />
);

const renderPlanningIcon = ({ color, size }: TabIconProps) => (
  <PlanningTabIcon color={color} size={size} />
);

const renderProgressIcon = ({ color, size }: TabIconProps) => (
  <ProgressTabIcon color={color} size={size} />
);

const renderMoreIcon = ({ color, size }: TabIconProps) => (
  <MoreTabIcon color={color} size={size} />
);

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#52C4A0',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F5F5F5',
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.04,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter-Medium',
          marginBottom: 4,
        },
        tabBarIconStyle: {
          marginBottom: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: renderTodayIcon,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: renderCalendarIcon,
        }}
      />
      <Tabs.Screen
        name="planning"
        options={{
          title: 'Planning',
          tabBarIcon: renderPlanningIcon,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: renderProgressIcon,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: renderMoreIcon,
        }}
      />
    </Tabs>
  );
}