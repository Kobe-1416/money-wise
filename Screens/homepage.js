import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function FinancialLiteracyScreen({ navigation }) {
  const quickActions = [
    { id: '1', name: 'Budget Tracker', category: 'Planning', icon: '📊', color: '#10B981' },
    { id: '3', name: 'Savings Goals', category: 'Future', icon: '🏦', color: '#3B82F6' },
    { id: '4', name: 'Expenses', category: 'Tracking', icon: '💳', color: '#EF4444' },
  ];

  const handlePress = (title) => Alert.alert(title);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Header: Greeting + Settings */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Good Evening,</Text>
            <Text style={styles.username}>Sarah Chen</Text>
          </View>
          <Pressable
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.settingsButtonText}>⚙️</Text>
          </Pressable>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceIcon}>💰</Text>
          <Text style={styles.balanceAmount}>$4,250.00</Text>
          <Text style={styles.balanceLabel}>Total Balance</Text>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <Pressable
              key={action.id}
              style={[styles.quickActionItem, { backgroundColor: action.color + '33', borderColor: action.color }]}
              onPress={() => handlePress(action.name)}
            >
              <Text style={styles.quickActionIcon}>{action.icon}</Text>
              <Text style={styles.quickActionName}>{action.name}</Text>
              <Text style={styles.quickActionCategory}>{action.category}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4a6cf7' },
  scrollContent: { padding: 20, paddingBottom: 40 },

  // Header
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { color: 'white', fontSize: 18 },
  username: { color: 'white', fontSize: 28, fontWeight: '600', marginTop: 2 },
  settingsButton: { padding: 10 },
  settingsButtonText: { color: 'white', fontSize: 24 },

  // Balance card
  balanceCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  balanceIcon: { fontSize: 30, marginBottom: 10 },
  balanceAmount: { color: 'white', fontSize: 24, fontWeight: '600', marginBottom: 2 },
  balanceLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },

  // Quick Actions
  sectionTitle: { color: 'white', fontSize: 16, marginBottom: 15, fontWeight: '500' },
  quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 25 },
  quickActionItem: { width: '48%', borderRadius: 12, padding: 15, marginBottom: 12, alignItems: 'center', borderWidth: 1 },
  quickActionIcon: { fontSize: 20, marginBottom: 8 },
  quickActionName: { color: 'white', fontSize: 14, fontWeight: '500', marginBottom: 2 },
  quickActionCategory: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
});
