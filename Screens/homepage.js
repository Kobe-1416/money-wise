// HomePage.js (Updated with Welcome + Tip of the Day styling, no Balance section)

import React, { useRef, useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HomePage({ navigation, route }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [username, setUsername] = useState('User'); // Default fallback

  const quickActions = [
    {
      id: '1',
      name: 'Budget Tracker',
      category: 'Planning',
      icon: '📊',
      color: '#10B981',
      route: 'Budget',
    },
    {
      id: '2',
      name: 'Lessons',
      category: 'Learning',
      icon: '📚',
      color: '#8B5CF6',
      route: 'Lessons',
    },
    {
      id: '3',
      name: 'Savings Goals',
      category: 'Future',
      icon: '🎯',
      color: '#3B82F6',
      route: 'Budget', // redirected to Budget
    },
    {
      id: '4',
      name: 'Expenses',
      category: 'Tracking',
      icon: '💳',
      color: '#EF4444',
      route: 'Budget', // redirected to Budget
    },
  ];

  useEffect(() => {
    const getUserData = () => {
      try {
        if (route?.params?.username) {
          setUsername(route.params.username);
          return;
        }
        if (global.userData && global.userData.username) {
          setUsername(global.userData.username);
          return;
        }
        console.log('No username found, using default');
      } catch (error) {
        console.error('Error getting user data:', error);
      }
    };

    getUserData();

    const timeoutId = setTimeout(() => {
      getUserData();
    }, 100);

    const unsubscribe = navigation?.addListener('focus', () => {
      getUserData();
    });

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    return () => {
      clearTimeout(timeoutId);
      unsubscribe?.();
    };
  }, [navigation, route?.params?.username]);

  const handleActionPress = (action) => {
    if (action.route && navigation.navigate) {
      navigation.navigate(action.route);
    } else {
      Alert.alert(action.name, `Navigate to ${action.name} screen`);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const displayUsername =
    username.charAt(0).toUpperCase() + username.slice(1);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Animated.ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {/* Header */}
          <Animated.View style={[styles.headerSection, { opacity: fadeAnim }]}>
            <View style={styles.headerRow}>
              <View style={styles.greetingContainer}>
                <Text style={styles.greeting}>{getGreeting()},</Text>
                <Text style={styles.username}>{displayUsername} 👋</Text>
              </View>
              <Pressable
                style={styles.settingsButton}
                onPress={() => navigation.navigate('Settings')}
              >
                <Text style={styles.settingsIcon}>⚙️</Text>
              </Pressable>
            </View>
          </Animated.View>

          {/* Welcome Message */}
          {username !== 'User' && (
            <View style={styles.sectionContainer}>
              <View
                style={[
                  styles.insightCard,
                  {
                    backgroundColor: '#F59E0B' + '15',
                    borderColor: '#F59E0B',
                  },
                ]}
              >
                <Text style={styles.insightIcon}>🎉</Text>
                <Text style={styles.insightTitle}>
                  Welcome, {displayUsername}!
                </Text>
                <Text style={styles.insightText}>
                  Great to have you here! Start by exploring your budget
                  tracker and setting up your first savings goal.
                </Text>
              </View>
            </View>
          )}

          {/* Tip Of The Day */}
          <View style={styles.sectionContainer}>
            <View
              style={[
                styles.insightCard,
                {
                  backgroundColor: '#F59E0B' + '15',
                  borderColor: '#F59E0B',
                },
              ]}
            >
              <Text style={styles.insightIcon}>💡</Text>
              <Text style={styles.insightTitle}>Tip Of The Day</Text>
              <Text style={styles.insightText}>
                Consider reducing dining out expenses to reach your savings
                goal faster.
              </Text>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                <Animated.View
                  key={action.id}
                  style={[
                    styles.quickActionWrapper,
                    {
                      opacity: fadeAnim,
                      transform: [
                        {
                          translateY: fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [30 * (index + 1), 0],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <Pressable
                    style={[
                      styles.quickActionItem,
                      {
                        borderColor: action.color,
                        backgroundColor: action.color + '15',
                      },
                    ]}
                    onPress={() => handleActionPress(action)}
                  >
                    <View
                      style={[
                        styles.quickActionIconContainer,
                        { backgroundColor: action.color },
                      ]}
                    >
                      <Text style={styles.quickActionEmoji}>
                        {action.icon}
                      </Text>
                    </View>
                    <Text style={styles.quickActionName}>{action.name}</Text>
                    <Text style={styles.quickActionCategory}>
                      {action.category}
                    </Text>
                  </Pressable>
                </Animated.View>
              ))}
            </View>
          </View>

          {/* Financial Insights */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Financial Insights</Text>
            <View style={styles.insightsContainer}>
              <View
                style={[
                  styles.insightCard,
                  {
                    backgroundColor: '#10B981' + '15',
                    borderColor: '#10B981',
                  },
                ]}
              >
                <Text style={styles.insightIcon}>📈</Text>
                <Text style={styles.insightTitle}>Great Progress!</Text>
                <Text style={styles.insightText}>
                  You saved 15% more this month compared to last month.
                </Text>
              </View>
            </View>
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4a6cf7' },
  safeArea: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  headerSection: { paddingHorizontal: 20, paddingTop: 20 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingContainer: { flex: 1 },
  greeting: { color: 'rgba(255,255,255,0.9)', fontSize: 16, marginBottom: 4 },
  username: { color: 'white', fontSize: 24, fontWeight: '700' },
  settingsButton: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  settingsIcon: { fontSize: 20 },
  sectionContainer: { paddingHorizontal: 20, marginTop: 32 },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionWrapper: { width: (width - 52) / 2 },
  quickActionItem: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  quickActionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionEmoji: { fontSize: 20 },
  quickActionName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickActionCategory: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    textAlign: 'center',
  },
  insightsContainer: { gap: 12 },
  insightCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  insightIcon: { fontSize: 20, marginBottom: 8 },
  insightTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  insightText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    lineHeight: 16,
  },
});