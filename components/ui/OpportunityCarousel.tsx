import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button, Layout } from '@ui-kitten/components';
import { FastingOpportunity } from '@/types/fasting';

interface OpportunityCarouselProps {
  opportunities: FastingOpportunity[];
  onQuickPlan: (opportunity: FastingOpportunity) => void;
}

export function OpportunityCarousel({ opportunities, onQuickPlan }: OpportunityCarouselProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#FF9800';
      case 'medium': return '#2196F3';
      case 'low': return '#4CAF50';
      default: return '#8F9BB3';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '⭐';
      case 'medium': return '🌟';
      case 'low': return '💫';
      default: return '✨';
    }
  };

  return (
    <Layout style={styles.container}>
      <Text category="h6" style={styles.title}>
        🎯 UPCOMING OPPORTUNITIES
      </Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {opportunities.map((opportunity, index) => (
          <Card key={index} style={styles.card}>
            <Layout style={styles.cardContent}>
              <Text category="s1" style={styles.dateText}>
                {getPriorityIcon(opportunity.priority)} {opportunity.description.split(' - ')[1]}
              </Text>
              
              <Text category="h6" style={styles.titleText}>
                {opportunity.specialEvent || opportunity.description.split(' - ')[0]}
              </Text>
              
              <Text category="p2" style={styles.successRate}>
                {opportunity.successRate}% success
              </Text>
              
              <Text category="c1" style={[styles.priority, { color: getPriorityColor(opportunity.priority) }]}>
                {opportunity.specialEvent ? 'Perfect timing' : 'Good opportunity'}
              </Text>
              
              <Button
                size="small"
                style={[styles.button, { backgroundColor: getPriorityColor(opportunity.priority) }]}
                onPress={() => onQuickPlan(opportunity)}
              >
                {opportunity.priority === 'high' ? 'High Priority' : 'Quick Plan'}
              </Button>
            </Layout>
          </Card>
        ))}
        
        {/* Next Week Card */}
        <Card style={styles.card}>
          <Layout style={styles.cardContent}>
            <Text category="s1" style={styles.dateText}>
              🌟 Senin
            </Text>
            
            <Text category="h6" style={styles.titleText}>
              21 Nov
            </Text>
            
            <Text category="p2" style={styles.successRate}>
              Next week
            </Text>
            
            <Text category="c1" style={styles.priority}>
              Good timing
            </Text>
            
            <Button
              size="small"
              appearance="outline"
              style={styles.outlineButton}
            >
              Reserve
            </Button>
          </Layout>
        </Card>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    marginHorizontal: 16,
    fontFamily: 'Poppins-Bold',
    color: '#1A2138',
  },
  scrollContent: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  card: {
    width: 140,
    marginRight: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardContent: {
    backgroundColor: 'transparent',
    padding: 12,
    alignItems: 'center',
  },
  dateText: {
    marginBottom: 4,
    fontFamily: 'Poppins-Medium',
    color: '#1A2138',
    textAlign: 'center',
  },
  titleText: {
    marginBottom: 8,
    fontFamily: 'Poppins-Bold',
    color: '#1A2138',
    textAlign: 'center',
    fontSize: 14,
  },
  successRate: {
    marginBottom: 4,
    color: '#8F9BB3',
    textAlign: 'center',
    fontSize: 12,
  },
  priority: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
  },
  button: {
    width: '100%',
    borderRadius: 8,
  },
  outlineButton: {
    width: '100%',
    borderRadius: 8,
    borderColor: '#8F9BB3',
  },
});