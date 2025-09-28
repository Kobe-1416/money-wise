// HomePage.js (Updated with improved username handling from multiple sources)
import React, { useRef, useEffect, useState } from 'react';
import { 
  Alert, 
  Pressable, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View, 
  Dimensions,
  Animated 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HomePage({ navigation, route }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [username, setUsername] = useState('User'); // Default fallback

  const quickActions = [
    { id: '1', name: 'Budget Tracker', category: 'Planning', icon: '📊', color: '#10B981', route: 'Budget' },
    { id: '2', name: 'Lessons', category: 'Learning', icon: '📚', color: '#8B5CF6', route: 'Lessons' },
    { id: '3', name: 'Savings Goals', category: 'Future', icon: '🎯', color: '#3B82F6', route: 'Savings' },
    { id: '4', name: 'Expenses', category: 'Tracking', icon: '💳', color: '#EF4444', route: 'Expenses' },
  ];

  const recentTransactions = [
    { id: '1', name: 'Grocery Store', amount: '-$45.67', type: 'expense', icon: '🏪', time: '2:30 PM' },
    { id: '2', name: 'Salary Deposit', amount: '+$2,500.00', type: 'income', icon: '💰', time: '9:00 AM' },
    { id: '3', name: 'Netflix', amount: '-$14.99', type: 'expense', icon: '📺', time: 'Yesterday' },
    { id: '4', name: 'Coffee Shop', amount: '-$5.40', type: 'expense', icon: '☕', time: 'Yesterday' },
  ];

  useEffect(() => {
    const getUserData = () => {
      try {
        // Priority 1: Check navigation params first
        if (route?.params?.username) {
          console.log('Found username in navigation params:', route.params.username);
          setUsername(route.params.username);
          return;
        }

        // Priority 2: Check global storage
        if (global.userData && global.userData.username) {
          console.log('Found username in global storage:', global.userData.username);
          setUsername(global.userData.username);
          return;
        }

        // Priority 3: AsyncStorage (when available)
        // Uncomment below when AsyncStorage is available
        /*
        const getUserDataAsync = async () => {
          try {
            const storedUserData = await AsyncStorage.getItem('userData');
            if (storedUserData) {
              const userData = JSON.parse(storedUserData);
              if (userData.username) {
                console.log('Found username in AsyncStorage:', userData.username);
                setUsername(userData.username);
                return;
              }
            }
          } catch (error) {
            console.error('Error retrieving user data from AsyncStorage:', error);
          }
        };
        getUserDataAsync();
        */

        console.log('No username found, using default');
      } catch (error) {
        console.error('Error getting user data:', error);
      }
    };

    // Check immediately
    getUserData();

    // Also check after a short delay in case of navigation timing issues
    const timeoutId = setTimeout(() => {
      getUserData();
    }, 100);

    // Set up navigation listener to check when screen comes into focus
    const unsubscribe = navigation?.addListener('focus', () => {
      console.log('HomePage focused, checking for user data...');
      getUserData();
    });

    // Start animations
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    return () => {
      clearTimeout(timeoutId);
      unsubscribe?.();
    };
  }, [navigation, route?.params?.username]); // Added route params as dependency

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  // Capitalize first letter of username for better display
  const displayUsername = username.charAt(0).toUpperCase() + username.slice(1);

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
          {/* Animated Header */}
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

          {/* Enhanced Balance Card */}
          <Animated.View style={[styles.balanceCardContainer, { opacity: fadeAnim }]}>
            <View style={styles.balanceCard}>
              <View style={styles.balanceHeader}>
                <View style={styles.balanceIconContainer}>
                  <Text style={styles.balanceIcon}>💎</Text>
                </View>
                <Pressable style={styles.eyeButton}>
                  <Text style={styles.eyeIcon}>👁️</Text>
                </Pressable>
              </View>
              <Text style={styles.balanceAmount}>$4,250.00</Text>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <View style={styles.balanceStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>+$340</Text>
                  <Text style={styles.statLabel}>This Month</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>-$180</Text>
                  <Text style={styles.statLabel}>Last Week</Text>
                </View>
              </View>
            </View>
          </Animated.View>

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
                      }
                    ]}
                    onPress={() => handleActionPress(action)}
                  >
                    <View style={[styles.quickActionIconContainer, { backgroundColor: action.color }]}>
                      <Text style={styles.quickActionEmoji}>{action.icon}</Text>
                    </View>
                    <Text style={styles.quickActionName}>{action.name}</Text>
                    <Text style={styles.quickActionCategory}>{action.category}</Text>
                  </Pressable>
                </Animated.View>
              ))}
            </View>
          </View>

          {/* Recent Transactions */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
              <Pressable>
                <Text style={styles.seeAllText}>See All →</Text>
              </Pressable>
            </View>
            <View style={styles.transactionsContainer}>
              {recentTransactions.map((transaction, index) => (
                <Animated.View
                  key={transaction.id}
                  style={[
                    styles.transactionItem,
                    index === recentTransactions.length - 1 && styles.lastTransaction,
                    {
                      opacity: fadeAnim,
                      transform: [
                        {
                          translateX: fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-50, 0],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <View style={styles.transactionLeft}>
                    <View style={[
                      styles.transactionIconContainer,
                      { backgroundColor: transaction.type === 'income' ? '#10B981' : '#EF4444' }
                    ]}>
                      <Text style={styles.transactionEmoji}>{transaction.icon}</Text>
                    </View>
                    <View style={styles.transactionDetails}>
                      <Text style={styles.transactionName}>{transaction.name}</Text>
                      <Text style={styles.transactionTime}>{transaction.time}</Text>
                    </View>
                  </View>
                  <Text style={[
                    styles.transactionAmount,
                    { color: transaction.type === 'income' ? '#10B981' : '#EF4444' }
                  ]}>
                    {transaction.amount}
                  </Text>
                </Animated.View>
              ))}
            </View>
          </View>

          {/* Financial Insights */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Financial Insights</Text>
            <View style={styles.insightsContainer}>
              <View style={[styles.insightCard, { backgroundColor: '#10B981' + '15', borderColor: '#10B981' }]}>
                <Text style={styles.insightIcon}>📈</Text>
                <Text style={styles.insightTitle}>Great Progress!</Text>
                <Text style={styles.insightText}>You saved 15% more this month compared to last month.</Text>
              </View>
              <View style={[styles.insightCard, { backgroundColor: '#F59E0B' + '15', borderColor: '#F59E0B' }]}>
                <Text style={styles.insightIcon}>💡</Text>
                <Text style={styles.insightTitle}>Budget Tip</Text>
                <Text style={styles.insightText}>Consider reducing dining out expenses to reach your savings goal faster.</Text>
              </View>
            </View>
          </View>

          {/* Welcome Message for New Users */}
          {username !== 'User' && (
            <View style={styles.sectionContainer}>
              <View style={[styles.insightCard, { backgroundColor: '#8B5CF6' + '15', borderColor: '#8B5CF6' }]}>
                <Text style={styles.insightIcon}>🎉</Text>
                <Text style={styles.insightTitle}>Welcome, {displayUsername}!</Text>
                <Text style={styles.insightText}>Great to have you here! Start by exploring your budget tracker and setting up your first savings goal.</Text>
              </View>
            </View>
          )}
        </Animated.ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a6cf7',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    marginBottom: 4,
  },
  username: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  settingsButton: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  settingsIcon: {
    fontSize: 20,
  },
  balanceCardContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  balanceCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceIcon: {
    fontSize: 20,
  },
  eyeButton: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  eyeIcon: {
    fontSize: 16,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    marginBottom: 20,
  },
  balanceStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 16,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  seeAllText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickActionWrapper: {
    width: (width - 52) / 2,
  },
  quickActionItem: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  quickActionEmoji: {
    fontSize: 20,
  },
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
  transactionsContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  lastTransaction: {
    borderBottomWidth: 0,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionEmoji: {
    fontSize: 16,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  transactionTime: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '600',
  },
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  insightIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
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