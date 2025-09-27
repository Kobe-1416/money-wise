import React, { useState } from 'react';
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function FinancialLiteracyScreen() {
  const [activeTab, setActiveTab] = useState('Home');

  const quickActions = [
    { id: '1', name: 'Budget Tracker', category: 'Planning', icon: '📊', color: '#10B981' },
    { id: '2', name: 'Investments', category: 'Portfolio', icon: '📈', color: '#F59E0B' },
    { id: '3', name: 'Savings Goals', category: 'Future', icon: '🏦', color: '#3B82F6' },
    { id: '4', name: 'Expenses', category: 'Tracking', icon: '💳', color: '#EF4444' },
  ];

  const tools = [
    { id: '1', name: 'Budget Planner', category: 'Planning', icon: '📊', count: '5 Categories', color: '#10B981' },
    { id: '2', name: 'Goal Tracker', category: 'Savings', icon: '🎯', count: '3 Goals', color: '#3B82F6' },
    { id: '3', name: 'Portfolio Manager', category: 'Investing', icon: '📈', count: '8 Assets', color: '#F59E0B' },
    { id: '4', name: 'Loan Calculator', category: 'Planning', icon: '🧮', count: '2 Loans', color: '#8B5CF6' },
    { id: '5', name: 'Credit Monitor', category: 'Credit Health', icon: '📋', count: '750 Score', color: '#06B6D4' },
    { id: '6', name: 'Emergency Fund', category: 'Safety Net', icon: '🔒', count: '$2,500', color: '#F97316' },
  ];

  const learningModules = [
    { id: '1', name: 'Basics', count: '12 lessons', icon: '🎓' },
    { id: '2', name: 'Investing', count: '8 courses', icon: '💼' },
    { id: '3', name: 'Real Estate', count: '6 guides', icon: '🏠' },
  ];

  const handleQuickActionPress = (action) => {
    Alert.alert(`${action.name}`, `Opening ${action.name} - ${action.category}`);
  };

  const handleToolPress = (tool) => {
    Alert.alert(`${tool.name}`, `${tool.category}: ${tool.count}`);
  };

  const handleLearningModulePress = (module) => {
    Alert.alert(`${module.name}`, `Start learning: ${module.count}`);
  };

  const handleAddPress = () => {
    Alert.alert('Add New', 'Create a new financial tool or goal');
  };

  const renderHomeScreen = () => (
    <ScrollView contentContainerStyle={styles.screenContent}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.hamburger}>
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
        </View>
        <Text style={styles.statusIcons}>📊 📶</Text>
      </View>

      <Text style={styles.greeting}>Good Evening,</Text>
      <Text style={styles.username}>Sarah Chen</Text>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <View style={styles.balanceIcon}>
          <Text style={styles.balanceIconText}>💰</Text>
        </View>
        <Text style={styles.balanceAmount}>$4,250.00</Text>
        <Text style={styles.balanceLabel}>Total Balance</Text>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        {quickActions.map((action) => (
          <Pressable
            key={action.id}
            style={styles.quickActionItem}
            onPress={() => handleQuickActionPress(action)}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
              <Text style={styles.quickActionIconText}>{action.icon}</Text>
            </View>
            <Text style={styles.quickActionName}>{action.name}</Text>
            <Text style={styles.quickActionCategory}>{action.category}</Text>
          </Pressable>
        ))}
      </View>

      {/* Learning Modules */}
      <Text style={styles.sectionTitle}>Learning Modules</Text>
      <View style={styles.learningModulesGrid}>
        {learningModules.map((module) => (
          <Pressable
            key={module.id}
            style={styles.learningModuleCard}
            onPress={() => handleLearningModulePress(module)}
          >
            <View style={styles.learningModuleImage}>
              <Text style={styles.learningModuleIcon}>{module.icon}</Text>
            </View>
            <Text style={styles.learningModuleName}>{module.name}</Text>
            <Text style={styles.learningModuleCount}>{module.count}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );

  const renderToolsScreen = () => (
    <ScrollView contentContainerStyle={styles.screenContent}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.hamburger}>
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
        </View>
        <Text style={styles.statusIcons}>📊 📶</Text>
      </View>

      <Text style={styles.sectionTitle}>Financial Tools</Text>

      {/* Tools List */}
      <View style={styles.toolsList}>
        {tools.map((tool) => (
          <Pressable
            key={tool.id}
            style={styles.toolItem}
            onPress={() => handleToolPress(tool)}
          >
            <View style={styles.toolLeft}>
              <View style={[styles.toolIcon, { backgroundColor: tool.color }]}>
                <Text style={styles.toolIconText}>{tool.icon}</Text>
              </View>
              <View style={styles.toolInfo}>
                <Text style={styles.toolName}>{tool.name}</Text>
                <Text style={styles.toolCategory}>{tool.category}</Text>
              </View>
            </View>
            <Text style={styles.toolCount}>{tool.count} ›</Text>
          </Pressable>
        ))}
      </View>

      {/* Add Button */}
      <Pressable style={styles.addButton} onPress={handleAddPress}>
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.phoneScreen}>
        {activeTab === 'Home' ? renderHomeScreen() : renderToolsScreen()}

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          {['Home', 'Tools', 'Learn', 'Reports'].map((tab) => (
            <Pressable
              key={tab}
              style={[styles.navItem, activeTab === tab && styles.navItemActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.navIcon, activeTab === tab && styles.navIconActive]}>
                {tab === 'Home' ? '🏠' : tab === 'Tools' ? '🛠️' : tab === 'Learn' ? '📚' : '📊'}
              </Text>
              <Text style={[styles.navText, activeTab === tab && styles.navTextActive]}>
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  phoneScreen: {
    width: Math.min(350, width - 40),
    height: 650,
    backgroundColor: '#4a6cf7',
    borderRadius: 30,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 20,
    position: 'relative',
  },
  screenContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  hamburger: {
    width: 20,
    height: 14,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    width: 20,
    height: 2,
    backgroundColor: 'white',
  },
  statusIcons: {
    color: 'white',
    fontSize: 16,
  },
  greeting: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    marginBottom: 5,
  },
  username: {
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
  },
  balanceCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  balanceIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#667eea',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  balanceIconText: {
    fontSize: 20,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 2,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  sectionTitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    marginBottom: 15,
    fontWeight: '500',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  quickActionItem: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  quickActionIcon: {
    width: 35,
    height: 35,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionIconText: {
    fontSize: 16,
  },
  quickActionName: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  quickActionCategory: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
  },
  learningModulesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  learningModuleCard: {
    width: '31%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  learningModuleImage: {
    width: 60,
    height: 45,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  learningModuleIcon: {
    fontSize: 20,
  },
  learningModuleName: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  learningModuleCount: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
  },
  toolsList: {
    marginBottom: 80,
  },
  toolItem: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  toolIconText: {
    fontSize: 16,
  },
  toolInfo: {
    flexDirection: 'column',
  },
  toolName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  toolCategory: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  toolCount: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 15,
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  navItem: {
    alignItems: 'center',
  },
  navItemActive: {},
  navIcon: {
    fontSize: 18,
    marginBottom: 4,
    color: 'rgba(255,255,255,0.7)',
  },
  navIconActive: {
    color: 'white',
  },
  navText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
  },
  navTextActive: {
    color: 'white',
  },
});
