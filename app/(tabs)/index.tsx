import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Layout, Text, Card } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFastingStore } from '@/stores/fasting';
import { FocusCard } from '@/components/ui/FocusCard';
import { StatusCards } from '@/components/ui/StatusCards';
import { OpportunityCarousel } from '@/components/ui/OpportunityCarousel';
import { QuickActions } from '@/components/ui/QuickActions';
import { FastingType } from '@/types/fasting';

export default function TodayScreen() {
  const {
    stats,
    todayAnalysis,
    opportunities,
    loadTodayAnalysis,
    loadOpportunities,
    calculateStats,
    commitTodayPlan,
  } = useFastingStore();

  useEffect(() => {
    loadTodayAnalysis();
    loadOpportunities();
    calculateStats();
  }, []);

  const handleCommitFasting = (type: FastingType, niat: string) => {
    commitTodayPlan(type, niat);
    // Show success message or navigate to active fasting screen
  };

  const handleViewDetail = () => {
    // Navigate to detailed analysis screen
    console.log('View detail pressed');
  };

  const handleReschedule = () => {
    // Navigate to reschedule screen
    console.log('Reschedule pressed');
  };

  const handleSkipToday = () => {
    // Handle skip today logic
    console.log('Skip today pressed');
  };

  const handleQuickPlan = (opportunity: any) => {
    // Navigate to quick planning for this opportunity
    console.log('Quick plan pressed for:', opportunity);
  };

  const handleActionPress = (action: string) => {
    // Handle quick action navigation
    console.log('Action pressed:', action);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('id-ID', options);
  };

  const getHijriDate = () => {
    // Mock hijri date - in real app, use proper conversion
    return 'الاثنين ٢٠ ربيع الأول ١٤٤٦';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Layout style={styles.header}>
          <Layout style={styles.headerTop}>
            <Text category="h5" style={styles.appTitle}>
              🌙 LUNAR
            </Text>
            <Layout style={styles.headerIcons}>
              <Text category="c1" style={styles.syncStatus}>
                Sync ✅
              </Text>
            </Layout>
          </Layout>
          
          <Text category="h6" style={styles.greeting}>
            Assalamualaikum, Ahmad
          </Text>
          <Text category="s1" style={styles.dateGregorian}>
            {getCurrentDate()}
          </Text>
          <Text category="p2" style={styles.dateHijri}>
            {getHijriDate()}
          </Text>
        </Layout>

        {/* Today's Focus Card */}
        {todayAnalysis && (
          <FocusCard
            analysis={todayAnalysis}
            onCommitFasting={handleCommitFasting}
            onViewDetail={handleViewDetail}
            onReschedule={handleReschedule}
            onSkipToday={handleSkipToday}
          />
        )}

        {/* Quick Status */}
        {stats && <StatusCards stats={stats} />}

        {/* Upcoming Opportunities */}
        <OpportunityCarousel
          opportunities={opportunities}
          onQuickPlan={handleQuickPlan}
        />

        {/* Quick Actions */}
        <QuickActions onActionPress={handleActionPress} />

        {/* Bottom Spacing */}
        <Layout style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTop: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  appTitle: {
    fontFamily: 'Poppins-Bold',
    color: '#26A69A',
  },
  headerIcons: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncStatus: {
    color: '#4CAF50',
    fontFamily: 'Poppins-Medium',
  },
  greeting: {
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'Poppins-SemiBold',
    color: '#1A2138',
  },
  dateGregorian: {
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'Poppins-Medium',
    color: '#1A2138',
  },
  dateHijri: {
    textAlign: 'center',
    color: '#8F9BB3',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  bottomSpacing: {
    height: 20,
    backgroundColor: 'transparent',
  },
});