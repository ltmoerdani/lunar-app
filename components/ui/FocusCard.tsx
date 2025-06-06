import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Button, Layout } from '@ui-kitten/components';
import { LinearGradient } from 'expo-linear-gradient';
import { FastingType, TodayAnalysis } from '@/types/fasting';

interface FocusCardProps {
  analysis: TodayAnalysis;
  onCommitFasting: (type: FastingType, niat: string) => void;
  onViewDetail: () => void;
  onReschedule: () => void;
  onSkipToday: () => void;
}

export function FocusCard({ 
  analysis, 
  onCommitFasting, 
  onViewDetail, 
  onReschedule, 
  onSkipToday 
}: FocusCardProps) {
  const getTypeDisplayName = (type: FastingType): string => {
    const names = {
      [FastingType.QADHA_RAMADAN]: 'Qadha Ramadan',
      [FastingType.SUNNAH_SENIN_KAMIS]: 'Puasa Senin',
      [FastingType.SUNNAH_AYYAMUL_BIDH]: 'Ayyamul Bidh',
      [FastingType.NAZAR]: 'Nazar',
      // Add other types as needed
    };
    return names[type] || type;
  };

  const handleCommit = () => {
    if (analysis.availableTypes.length > 0) {
      const primaryType = analysis.availableTypes[0];
      const niat = `Nawaitu shauma ghadin 'an ada'i fardhi Ramadhan lillahi ta'ala`;
      onCommitFasting(primaryType, niat);
    }
  };

  return (
    <Card style={styles.card}>
      <LinearGradient
        colors={analysis.isOptimal ? ['#E8F5E8', '#C8E6C9'] : ['#FFF3E0', '#FFE0B2']}
        style={styles.gradient}
      >
        <Layout style={styles.header}>
          <Text category="h6" style={styles.title}>
            🌟 TODAY'S FOCUS
          </Text>
        </Layout>

        <Layout style={styles.content}>
          <Text category="h6" style={styles.opportunityTitle}>
            PUASA SENIN OPPORTUNITY
          </Text>

          <Layout style={styles.section}>
            <Text category="s1" style={styles.sectionTitle}>
              💫 Bisa niat hari ini:
            </Text>
            {analysis.availableTypes.map((type, index) => (
              <Text key={index} category="p2" style={styles.typeItem}>
                ✨ {getTypeDisplayName(type)}
              </Text>
            ))}
          </Layout>

          <Layout style={styles.section}>
            <Text category="s1" style={styles.sectionTitle}>
              📊 Analysis Hari Ini:
            </Text>
            <Text category="p2" style={styles.analysisItem}>
              ✅ Schedule: {analysis.scheduleIntensity} (optimal)
            </Text>
            <Text category="p2" style={styles.analysisItem}>
              ⚡ Energy Level: High ({analysis.energyLevel}%)
            </Text>
            <Text category="p2" style={styles.analysisItem}>
              🎯 Success Rate: {analysis.successProbability}% based on pattern
            </Text>
          </Layout>

          <Layout style={styles.section}>
            <Text category="s1" style={styles.sectionTitle}>
              💡 Smart Recommendation:
            </Text>
            {analysis.recommendations.map((rec, index) => (
              <Text key={index} category="p2" style={styles.recommendation}>
                "{rec}"
              </Text>
            ))}
          </Layout>

          <Layout style={styles.buttonContainer}>
            <Button
              style={[styles.button, styles.primaryButton]}
              onPress={handleCommit}
              size="medium"
            >
              COMMIT PUASA 🚀
            </Button>
            <Button
              style={[styles.button, styles.secondaryButton]}
              appearance="outline"
              onPress={onViewDetail}
              size="medium"
            >
              LIHAT DETAIL 📋
            </Button>
          </Layout>

          <Layout style={styles.buttonContainer}>
            <Button
              style={[styles.button, styles.tertiaryButton]}
              appearance="ghost"
              onPress={onReschedule}
              size="small"
            >
              RESCHEDULE 🔄
            </Button>
            <Button
              style={[styles.button, styles.tertiaryButton]}
              appearance="ghost"
              onPress={onSkipToday}
              size="small"
            >
              SKIP HARI INI ⏭️
            </Button>
          </Layout>
        </Layout>
      </LinearGradient>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  gradient: {
    borderRadius: 16,
    padding: 0,
  },
  header: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    color: '#1A2138',
  },
  content: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  opportunityTitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1A2138',
  },
  section: {
    backgroundColor: 'transparent',
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 8,
    fontFamily: 'Poppins-SemiBold',
    color: '#1A2138',
  },
  typeItem: {
    marginLeft: 16,
    marginBottom: 4,
    color: '#1A2138',
  },
  analysisItem: {
    marginLeft: 16,
    marginBottom: 4,
    color: '#1A2138',
  },
  recommendation: {
    marginLeft: 16,
    fontStyle: 'italic',
    color: '#1A2138',
    lineHeight: 20,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  primaryButton: {
    backgroundColor: '#26A69A',
    borderColor: '#26A69A',
  },
  secondaryButton: {
    borderColor: '#26A69A',
  },
  tertiaryButton: {},
});