import React from 'react';
import { Tabs } from 'expo-router';
import { Icon } from '@ui-kitten/components';
import { Calendar, Target, ChartBar as BarChart3, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Define types for tab icon props
type TabIconProps = {
  color: string;
  size: number;
};

// Extracted tab icon components for better performance
const TodayTabIcon = React.memo(({ color, size }: TabIconProps) => (
  <Icon name="moon-outline" fill={color} style={{ width: size, height: size }} />
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

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#26A69A',
        tabBarInactiveTintColor: '#8F9BB3',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E4E9F2',
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Poppins-Medium',
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
          tabBarIcon: TodayTabIcon,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: CalendarTabIcon,
        }}
      />
      <Tabs.Screen
        name="planning"
        options={{
          title: 'Planning',
          tabBarIcon: PlanningTabIcon,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ProgressTabIcon,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: MoreTabIcon,
        }}
      />
    </Tabs>
  );
}