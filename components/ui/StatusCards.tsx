import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Layout, ProgressBar } from '@ui-kitten/components';
import { FastingStats } from '@/types/fasting';

interface StatusCardsProps {
  stats: FastingStats;
}

export function StatusCards({ stats }: StatusCardsProps) {
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 60) return '#FF9800';
    return '#F44336';
  };

  const monthlyProgress = (stats.monthlyCompleted / stats.monthlyTarget) * 100;

  return (
    <Layout style={styles.container}>
      <Text category="h6" style={styles.title}>
        📊 QUICK STATUS
      </Text>
      
      <Layout style={styles.grid}>
        {/* Monthly Progress */}
        <Card style={styles.card}>
          <Layout style={styles.cardContent}>
            <Text category="s1" style={styles.cardTitle}>
              Bulan Ini
            </Text>
            <Text category="h6" style={styles.cardValue}>
              Puasa: {stats.monthlyCompleted}/{stats.monthlyTarget}
            </Text>
            <ProgressBar
              progress={monthlyProgress / 100}
              style={styles.progressBar}
            />
            <Text category="c1" style={styles.cardSubtext}>
              📈 {Math.round(monthlyProgress)}% complete
            </Text>
            <Text category="c1" style={[styles.cardSubtext, { color: getProgressColor(monthlyProgress) }]}>
              🎯 On track!
            </Text>
          </Layout>
        </Card>

        {/* Debt Tracking */}
        <Card style={styles.card}>
          <Layout style={styles.cardContent}>
            <Text category="s1" style={styles.cardTitle}>
              Utang Puasa
            </Text>
            <Text category="h6" style={styles.cardValue}>
              Qadha: {stats.qadhaRemaining}/5 hari
            </Text>
            <Text category="p2" style={styles.cardSubtext}>
              Nazar: {stats.nazarRemaining}/3 hari
            </Text>
            <Text category="c1" style={styles.cardSubtext}>
              ⏰ Deadline ok
            </Text>
          </Layout>
        </Card>

        {/* Streak */}
        <Card style={styles.card}>
          <Layout style={styles.cardContent}>
            <Text category="s1" style={styles.cardTitle}>
              Streak
            </Text>
            <Text category="h6" style={styles.cardValue}>
              Current: {stats.currentStreak} weeks
            </Text>
            <Text category="p2" style={styles.cardSubtext}>
              🔥 Best: {stats.bestStreak} weeks
            </Text>
            <Text category="c1" style={[styles.cardSubtext, { color: '#4CAF50' }]}>
              💪 Strong!
            </Text>
          </Layout>
        </Card>

        {/* Next Target */}
        <Card style={styles.card}>
          <Layout style={styles.cardContent}>
            <Text category="s1" style={styles.cardTitle}>
              Next Target
            </Text>
            <Text category="h6" style={styles.cardValue}>
              Ayyamul Bidh
            </Text>
            <Text category="p2" style={styles.cardSubtext}>
              📅 15-17 Nov
            </Text>
            <Text category="c1" style={[styles.cardSubtext, { color: '#FF9800' }]}>
              ⭐ High reward
            </Text>
          </Layout>
        </Card>
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
  card: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardContent: {
    backgroundColor: 'transparent',
    padding: 16,
  },
  cardTitle: {
    marginBottom: 8,
    fontFamily: 'Poppins-SemiBold',
    color: '#8F9BB3',
    textAlign: 'center',
  },
  cardValue: {
    marginBottom: 8,
    fontFamily: 'Poppins-Bold',
    color: '#1A2138',
    textAlign: 'center',
    fontSize: 14,
  },
  cardSubtext: {
    textAlign: 'center',
    marginBottom: 2,
    color: '#8F9BB3',
  },
  progressBar: {
    marginVertical: 8,
    height: 6,
    borderRadius: 3,
  },
});