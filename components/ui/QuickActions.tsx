import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Text, Layout, Icon } from '@ui-kitten/components';
import { Calendar, Target, ChartBar as BarChart3, BookOpen, Bell, Settings, MessageCircle, FileText } from 'lucide-react-native';

interface QuickActionsProps {
  onActionPress: (action: string) => void;
}

interface ActionItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  sublabel: string;
}

export function QuickActions({ onActionPress }: QuickActionsProps) {
  const actions: ActionItem[] = [
    {
      id: 'calendar',
      icon: <Calendar color="#26A69A" size={24} />,
      label: 'Calendar',
      sublabel: 'View'
    },
    {
      id: 'planning',
      icon: <Target color="#26A69A\" size={24} />,
      label: 'Planning',
      sublabel: 'Mode'
    },
    {
      id: 'progress',
      icon: <BarChart3 color="#26A69A" size={24} />,
      label: 'Progress',
      sublabel: 'Track'
    },
    {
      id: 'learning',
      icon: <BookOpen color="#26A69A\" size={24} />,
      label: 'Learning',
      sublabel: 'Hub'
    },
    {
      id: 'reminder',
      icon: <Bell color="#26A69A" size={24} />,
      label: 'Reminder',
      sublabel: 'Setup'
    },
    {
      id: 'settings',
      icon: <Settings color="#26A69A\" size={24} />,
      label: 'Settings',
      sublabel: '& Sync'
    },
    {
      id: 'dua',
      icon: <MessageCircle color="#26A69A" size={24} />,
      label: 'Dua',
      sublabel: 'Corner'
    },
    {
      id: 'niat',
      icon: <FileText color="#26A69A\" size={24} />,
      label: 'Niat',
      sublabel: 'Builder'
    },
  ];

  return (
    <Layout style={styles.container}>
      <Text category="h6" style={styles.title}>
        ⚡ QUICK ACTIONS
      </Text>
      
      <Layout style={styles.grid}>
        {actions.map((action) => (
          <Pressable
            key={action.id}
            style={styles.actionItem}
            onPress={() => onActionPress(action.id)}
          >
            <Layout style={styles.iconContainer}>
              {action.icon}
            </Layout>
            <Text category="s2" style={styles.actionLabel}>
              {action.label}
            </Text>
            <Text category="c1" style={styles.actionSublabel}>
              {action.sublabel}
            </Text>
          </Pressable>
        ))}
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Poppins-Bold',
    color: '#1A2138',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  actionItem: {
    width: '23%',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  iconContainer: {
    backgroundColor: '#F7F9FC',
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
  },
  actionLabel: {
    textAlign: 'center',
    marginBottom: 2,
    fontFamily: 'Poppins-Medium',
    color: '#1A2138',
    fontSize: 12,
  },
  actionSublabel: {
    textAlign: 'center',
    color: '#8F9BB3',
    fontSize: 10,
  },
});