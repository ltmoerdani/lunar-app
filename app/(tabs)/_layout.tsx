import { Tabs } from 'expo-router';
import { Icon } from '@ui-kitten/components';
import { Calendar, Target, ChartBar as BarChart3, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabIcon = ({ name, color, size }: { name: string; color: string; size: number }) => {
  const iconComponents = {
    today: () => <Icon name="moon-outline" fill={color} style={{ width: size, height: size }} />,
    calendar: () => <Calendar color={color} size={size} />,
    planning: () => <Target color={color} size={size} />,
    progress: () => <BarChart3 color={color} size={size} />,
    more: () => <MoreHorizontal color={color} size={size} />,
  };

  const IconComponent = iconComponents[name as keyof typeof iconComponents];
  return IconComponent ? IconComponent() : null;
};

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
          tabBarIcon: ({ color, size }) => <TabIcon name="today" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color, size }) => <TabIcon name="calendar" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="planning"
        options={{
          title: 'Planning',
          tabBarIcon: ({ color, size }) => <TabIcon name="planning" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => <TabIcon name="progress" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, size }) => <TabIcon name="more" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}