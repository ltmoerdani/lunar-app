import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CalendarScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.content}>
        <Text category="h4" style={styles.title}>
          📅 Calendar
        </Text>
        <Text category="p1" style={styles.subtitle}>
          Islamic & Gregorian Calendar View
        </Text>
        <Text category="p2" style={styles.description}>
          Calendar screen will show dual calendar system with fasting records and Islamic events.
        </Text>
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    color: '#1A2138',
  },
  subtitle: {
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: '#26A69A',
  },
  description: {
    textAlign: 'center',
    color: '#8F9BB3',
    lineHeight: 20,
  },
});