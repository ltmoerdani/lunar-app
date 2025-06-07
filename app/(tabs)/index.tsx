import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Target, ChartBar as BarChart3, BookOpen, Bell, Settings, MessageCircle, FileText } from 'lucide-react-native';
import { useFastingStore } from '@/stores/fasting';
import { FastingType } from '@/types/fasting';
import { shadowPresets } from '@/utils/shadows';

// Fungsi helper untuk menghitung responsive width
const getResponsiveActionItemWidth = () => {
  const screenWidth = Dimensions.get('window').width;
  const horizontalPadding = 48; // 24px x 2
  const gap = 12;
  const availableWidth = screenWidth - horizontalPadding;
  
  // Tentukan jumlah kolom berdasarkan lebar layar
  let columns: number;
  if (screenWidth < 350) {
    columns = 3; // iPhone SE dan layar sangat kecil
  } else {
    columns = 4; // iPhone normal dan layar besar
  }
  
  // Hitung width per item dengan mempertimbangkan gap
  const totalGapWidth = (columns - 1) * gap;
  const itemWidth = (availableWidth - totalGapWidth) / columns;
  
  return Math.floor(itemWidth);
};

export default function TodayScreen() {
  const {
    loadTodayAnalysis,
    loadOpportunities,
    calculateStats,
    commitTodayPlan,
  } = useFastingStore();

  useEffect(() => {
    loadTodayAnalysis();
    loadOpportunities();
    calculateStats();
  }, [loadTodayAnalysis, loadOpportunities, calculateStats]);

  const handleCommitFasting = (type: FastingType, niat: string) => {
    commitTodayPlan(type, niat);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('en-US', options);
  };

  const getHijriDate = () => {
    return 'Monday 20 Rabi\' al-Awwal 1446';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.logoContainer}>
              <Text style={styles.moonIcon}>🌙</Text>
              <Text style={styles.appTitle}>LUNAR</Text>
            </View>
            <View style={styles.syncContainer}>
              <Text style={styles.syncStatus}>Synced ✓</Text>
            </View>
          </View>
          
          <Text style={styles.greeting}>Assalamualaikum, Ahmad</Text>
          <Text style={styles.dateGregorian}>{getCurrentDate()}</Text>
          <Text style={styles.dateHijri}>{getHijriDate()}</Text>
        </View>

        {/* Today's Focus Card */}
        <View style={styles.focusCard}>
          <Text style={styles.focusTitle}>Today's Focus</Text>
          <Text style={styles.focusSubtitle}>Monday Fasting Opportunity</Text>
          
          <View style={styles.focusContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Available today:</Text>
              <Text style={styles.sectionItem}>✨ Monday Sunnah Fasting</Text>
              <Text style={styles.sectionItem}>🎯 Qadha Ramadan (if needed)</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Today's Analysis:</Text>
              <Text style={styles.sectionItem}>✅ Schedule: Light (optimal)</Text>
              <Text style={styles.sectionItem}>⚡ Energy Level: High (90%)</Text>
              <Text style={styles.sectionItem}>🎯 Success Rate: 95%</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommendation:</Text>
              <Text style={styles.recommendation}>
                "Perfect for combining qadha with Monday sunnah! Great opportunity before the busy week."
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => handleCommitFasting(FastingType.SUNNAH_SENIN_KAMIS, 'Nawaitu shauma ghadin...')}
              >
                <Text style={styles.primaryButtonText}>Commit to Fast</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Status */}
        <View style={styles.statusSection}>
          <Text style={styles.sectionHeaderTitle}>Quick Status</Text>
          
          <View style={styles.statusGrid}>
            <View style={styles.statusCard}>
              <Text style={styles.statusTitle}>This Month</Text>
              <Text style={styles.statusValue}>8/12 Fasts</Text>
              <Text style={styles.statusSubtext}>67% complete</Text>
              <Text style={styles.statusIndicator}>🎯 On track!</Text>
            </View>

            <View style={styles.statusCard}>
              <Text style={styles.statusTitle}>Debt Tracking</Text>
              <Text style={styles.statusValue}>2/5 Qadha</Text>
              <Text style={styles.statusSubtext}>0/3 Nazar</Text>
              <Text style={styles.statusIndicator}>⏰ Deadline ok</Text>
            </View>

            <View style={styles.statusCard}>
              <Text style={styles.statusTitle}>Streak</Text>
              <Text style={styles.statusValue}>2 weeks</Text>
              <Text style={styles.statusSubtext}>🔥 Best: 6 weeks</Text>
              <Text style={styles.statusIndicator}>💪 Strong!</Text>
            </View>

            <View style={styles.statusCard}>
              <Text style={styles.statusTitle}>Next Target</Text>
              <Text style={styles.statusValue}>Ayyamul Bidh</Text>
              <Text style={styles.statusSubtext}>📅 15-17 Nov</Text>
              <Text style={styles.statusIndicator}>⭐ High reward</Text>
            </View>
          </View>
        </View>

        {/* Upcoming Opportunities */}
        <View style={styles.opportunitiesSection}>
          <Text style={styles.sectionHeaderTitle}>Upcoming Opportunities</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.opportunitiesScroll}
          >
            <View style={styles.opportunityCard}>
              <Text style={styles.opportunityDate}>🌟 Tuesday 14</Text>
              <Text style={styles.opportunityTitle}>Regular Fast</Text>
              <Text style={styles.opportunitySuccess}>95% success</Text>
              <TouchableOpacity style={styles.opportunityButton}>
                <Text style={styles.opportunityButtonText}>Quick Plan</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.opportunityCard}>
              <Text style={styles.opportunityDate}>⭐ Thursday 16</Text>
              <Text style={styles.opportunityTitle}>Ayyamul Bidh</Text>
              <Text style={styles.opportunitySuccess}>Perfect timing</Text>
              <TouchableOpacity style={[styles.opportunityButton, styles.highPriorityButton]}>
                <Text style={styles.opportunityButtonText}>High Priority</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.opportunityCard}>
              <Text style={styles.opportunityDate}>🌟 Monday 21</Text>
              <Text style={styles.opportunityTitle}>Next Week</Text>
              <Text style={styles.opportunitySuccess}>Good timing</Text>
              <TouchableOpacity style={styles.opportunityButton}>
                <Text style={styles.opportunityButtonText}>Reserve</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionHeaderTitle}>Quick Actions</Text>
          
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionItem}>
              <Calendar color="#52C4A0" size={24} />
              <Text style={styles.actionLabel}>Calendar</Text>
              <Text style={styles.actionSublabel}>View</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
              <Target color="#52C4A0" size={24} />
              <Text style={styles.actionLabel}>Planning</Text>
              <Text style={styles.actionSublabel}>Mode</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
              <BarChart3 color="#52C4A0" size={24} />
              <Text style={styles.actionLabel}>Progress</Text>
              <Text style={styles.actionSublabel}>Track</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
              <BookOpen color="#52C4A0" size={24} />
              <Text style={styles.actionLabel}>Learning</Text>
              <Text style={styles.actionSublabel}>Hub</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
              <Bell color="#52C4A0" size={24} />
              <Text style={styles.actionLabel}>Reminder</Text>
              <Text style={styles.actionSublabel}>Setup</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
              <Settings color="#52C4A0" size={24} />
              <Text style={styles.actionLabel}>Settings</Text>
              <Text style={styles.actionSublabel}>& Sync</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
              <MessageCircle color="#52C4A0" size={24} />
              <Text style={styles.actionLabel}>Dua</Text>
              <Text style={styles.actionSublabel}>Corner</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
              <FileText color="#52C4A0" size={24} />
              <Text style={styles.actionLabel}>Niat</Text>
              <Text style={styles.actionSublabel}>Builder</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  appTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#212121',
  },
  syncContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  syncStatus: {
    backgroundColor: '#F1F8E9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    color: '#558B2F',
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  greeting: {
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#212121',
  },
  dateGregorian: {
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#424242',
  },
  dateHijri: {
    textAlign: 'center',
    color: '#757575',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  focusCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    ...shadowPresets.large,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  focusTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 4,
  },
  focusSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#52C4A0',
    textAlign: 'center',
    marginBottom: 20,
  },
  focusContent: {
    gap: 16,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#424242',
  },
  sectionItem: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#616161',
    marginLeft: 16,
  },
  recommendation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#616161',
    fontStyle: 'italic',
    lineHeight: 20,
    marginLeft: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#52C4A0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  secondaryButtonText: {
    color: '#424242',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  statusSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeaderTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#212121',
    marginBottom: 16,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statusCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    ...shadowPresets.medium,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  statusTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#757575',
    marginBottom: 8,
  },
  statusValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#212121',
    marginBottom: 4,
  },
  statusSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9E9E9E',
    marginBottom: 4,
  },
  statusIndicator: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#52C4A0',
  },
  opportunitiesSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  opportunitiesScroll: {
    paddingRight: 12,
  },
  opportunityCard: {
    width: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    ...shadowPresets.medium,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  opportunityDate: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#424242',
    marginBottom: 4,
  },
  opportunityTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#212121',
    marginBottom: 4,
  },
  opportunitySuccess: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#757575',
    marginBottom: 8,
  },
  opportunityButton: {
    backgroundColor: '#52C4A0',
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  highPriorityButton: {
    backgroundColor: '#FF9800',
  },
  opportunityButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  actionsSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionItem: {
    width: getResponsiveActionItemWidth(),
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    ...shadowPresets.medium,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  actionLabel: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#212121',
    marginTop: 8,
    textAlign: 'center',
  },
  actionSublabel: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#9E9E9E',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 20,
  },
});