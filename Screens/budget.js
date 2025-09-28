import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, FlatList, Pressable, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Budget() {
  const [income, setIncome] = useState([
    { id: '1', name: 'Part-time Job', amount: 2000 },
    { id: '2', name: 'Scholarship', amount: 1500 },
  ]);
  const [expenses, setExpenses] = useState([
    { id: '1', name: 'Groceries', amount: 600 },
    { id: '2', name: 'Transport', amount: 200 },
  ]);
  const [savings, setSavings] = useState([
    { id: '1', amount: 500 },
  ]);
  const [goal, setGoal] = useState(5000);
  const [piggyBankAnimation] = useState(new Animated.Value(1));
  const [coinsCount, setCoinsCount] = useState(0);
  const [editingGoal, setEditingGoal] = useState(false);

  // calculations
  const totalIncome = income.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const totalSavings = savings.reduce((sum, s) => sum + (Number(s.amount) || 0), 0);
  const totalBalance = totalIncome - totalExpenses;
  const savingsProgress = ((totalSavings / goal) * 100);

  // Piggy bank animation when savings change
  useEffect(() => {
    if (totalSavings > 0) {
      setCoinsCount(Math.floor(totalSavings / 100));
      animatePiggyBank();
    }
  }, [totalSavings]);

  const animatePiggyBank = () => {
    Animated.sequence([
      Animated.timing(piggyBankAnimation, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(piggyBankAnimation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // update handlers
  const updateIncome = (id, field, value) => {
    setIncome((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: field === 'amount' ? Number(value) || 0 : value } : item))
    );
  };

  const updateExpense = (id, field, value) => {
    setExpenses((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: field === 'amount' ? Number(value) || 0 : value } : item))
    );
  };

  const updateSaving = (id, value) => {
    setSavings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, amount: Number(value) || 0 } : item))
    );
  };

  const addIncome = () => {
    setIncome((prev) => [...prev, { id: Date.now().toString(), name: 'New Income', amount: 0 }]);
  };

  const addExpense = () => {
    setExpenses((prev) => [...prev, { id: Date.now().toString(), name: 'New Expense', amount: 0 }]);
  };

  const addSaving = () => {
    setSavings((prev) => [...prev, { id: Date.now().toString(), amount: 0 }]);
  };

  // Delete functions
  const deleteIncome = (id) => {
    Alert.alert('Delete Income', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setIncome(prev => prev.filter(item => item.id !== id)) }
    ]);
  };

  const deleteExpense = (id) => {
    Alert.alert('Delete Expense', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setExpenses(prev => prev.filter(item => item.id !== id)) }
    ]);
  };

  const deleteSaving = (id) => {
    Alert.alert('Delete Saving', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setSavings(prev => prev.filter(item => item.id !== id)) }
    ]);
  };

  // Quick save to piggy bank
  const quickSave = (amount) => {
    if (totalBalance >= amount) {
      setSavings(prev => [...prev, { id: Date.now().toString(), amount: amount }]);
      animatePiggyBank();
    } else {
      Alert.alert('Insufficient Balance', 'You don\'t have enough balance to save this amount!');
    }
  };

  const renderEditableRow = (item, onChange, onDelete) => (
    <View style={styles.editableRow}>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.inputSmall, styles.nameInput]}
          placeholder="Name"
          placeholderTextColor="rgba(255,255,255,0.6)"
          value={item.name}
          onChangeText={(text) => onChange(item.id, 'name', text)}
        />
        <TextInput
          style={[styles.inputSmall, styles.amountInput]}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="rgba(255,255,255,0.6)"
          value={item.amount.toString()}
          onChangeText={(text) => onChange(item.id, 'amount', text)}
        />
        <Pressable onPress={() => onDelete(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderStaticRow = (item) => (
    <View style={styles.tableRow}>
      <Text style={[styles.cell, { flex: 1 }]}>{item.name || '-'}</Text>
      <Text style={[styles.cell, { width: 80, textAlign: 'right' }]}>R{item.amount}</Text>
    </View>
  );

  const getFinancialHealthStatus = () => {
    if (totalBalance > totalIncome * 0.2) {
      return { emoji: '💪', status: 'Excellent!', message: 'You\'re crushing it!', color: '#10B981' };
    } else if (totalBalance > 0) {
      return { emoji: '👍', status: 'Good job!', message: 'Room for improvement', color: '#F59E0B' };
    } else {
      return { emoji: '⚠️', status: 'Warning', message: 'Review your expenses', color: '#EF4444' };
    }
  };

  const healthStatus = getFinancialHealthStatus();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>💰 Budget 💰</Text>
        <Text style={styles.subtitle}>Take control of your finances!</Text>

        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.incomeCard]}>
            <Text style={styles.statLabel}>Income</Text>
            <Text style={styles.statValue}>R{totalIncome.toLocaleString()}</Text>
            <Text style={styles.statIcon}>📈</Text>
          </View>
          <View style={[styles.statCard, styles.expenseCard]}>
            <Text style={styles.statLabel}>Expenses</Text>
            <Text style={styles.statValue}>R{totalExpenses.toLocaleString()}</Text>
            <Text style={styles.statIcon}>📉</Text>
          </View>
          <View style={[styles.statCard, styles.balanceCard]}>
            <Text style={styles.statLabel}>Balance</Text>
            <Text style={[styles.statValue, { color: totalBalance >= 0 ? '#10B981' : '#EF4444' }]}>
              R{totalBalance.toLocaleString()}
            </Text>
            <Text style={styles.statIcon}>💰</Text>
          </View>
        </View>

        {/* Income */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>📈 Income Sources</Text>
            <Pressable onPress={addIncome} style={styles.addButtonSmall}>
              <Text style={styles.addButtonSmallText}>+</Text>
            </Pressable>
          </View>
          
          <FlatList
            scrollEnabled={false}
            data={income}
            renderItem={({ item }) => renderEditableRow(item, updateIncome, deleteIncome)}
            keyExtractor={(item) => item.id}
            style={{ marginTop: 10 }}
          />

          <View style={{ marginTop: 15 }}>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, { flex: 1 }]}>Name</Text>
              <Text style={[styles.headerCell, { width: 80, textAlign: 'right' }]}>Amount</Text>
            </View>
            {income.map((item) => (
              <View key={item.id}>{renderStaticRow(item)}</View>
            ))}
          </View>

          <Text style={styles.totalText}>Total Income: R{totalIncome.toLocaleString()}</Text>
        </View>

        {/* Expenses */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>📉 Expenses</Text>
            <Pressable onPress={addExpense} style={styles.addButtonSmall}>
              <Text style={styles.addButtonSmallText}>+</Text>
            </Pressable>
          </View>
          
          <FlatList
            scrollEnabled={false}
            data={expenses}
            renderItem={({ item }) => renderEditableRow(item, updateExpense, deleteExpense)}
            keyExtractor={(item) => item.id}
            style={{ marginTop: 10 }}
          />

          <View style={{ marginTop: 15 }}>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, { flex: 1 }]}>Name</Text>
              <Text style={[styles.headerCell, { width: 80, textAlign: 'right' }]}>Amount</Text>
            </View>
            {expenses.map((item) => (
              <View key={item.id}>{renderStaticRow(item)}</View>
            ))}
          </View>

          <Text style={styles.totalText}>Total Expenses: R{totalExpenses.toLocaleString()}</Text>
        </View>

        {/* Digital Piggy Bank */}
        <View style={[styles.card, styles.piggyBankCard]}>
          <Text style={styles.cardTitle}>🐷 Digital Piggy Bank</Text>
          
          {/* Piggy Bank Animation */}
          <View style={styles.piggyBankContainer}>
            <Animated.View style={[styles.piggyBank, { transform: [{ scale: piggyBankAnimation }] }]}>
              <Text style={styles.piggyBankEmoji}>🐷</Text>
              {coinsCount > 0 && (
                <View style={styles.coinsBadge}>
                  <Text style={styles.coinsText}>{coinsCount}</Text>
                </View>
              )}
            </Animated.View>
            <Text style={styles.piggyBankSubtext}>Feed me your savings! 🪙</Text>
          </View>

          {/* Savings Goal */}
          <View style={styles.goalContainer}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalLabel}>Savings Goal:</Text>
              {editingGoal ? (
                <View style={styles.goalEditContainer}>
                  <TextInput
                    style={styles.goalInput}
                    value={goal.toString()}
                    onChangeText={(text) => setGoal(Number(text) || 0)}
                    keyboardType="numeric"
                  />
                  <Pressable onPress={() => setEditingGoal(false)} style={styles.saveGoalButton}>
                    <Text style={styles.saveGoalText}>✅</Text>
                  </Pressable>
                </View>
              ) : (
                <View style={styles.goalDisplayContainer}>
                  <Text style={styles.goalAmount}>R{goal.toLocaleString()}</Text>
                  <Pressable onPress={() => setEditingGoal(true)} style={styles.editGoalButton}>
                    <Text style={styles.editGoalText}>✏️</Text>
                  </Pressable>
                </View>
              )}
            </View>
            
            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${Math.min(100, savingsProgress)}%` }]}>
                  {savingsProgress > 10 && (
                    <Text style={styles.progressText}>{savingsProgress.toFixed(1)}%</Text>
                  )}
                </View>
              </View>
              <Text style={styles.progressLabel}>
                R{totalSavings.toLocaleString()} / R{goal.toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Savings List */}
          <FlatList
            scrollEnabled={false}
            data={savings}
            renderItem={({ item }) => (
              <View style={styles.savingRow}>
                <Text style={styles.savingEmoji}>💰</Text>
                <TextInput
                  style={styles.savingInput}
                  keyboardType="numeric"
                  placeholder="Enter amount"
                  placeholderTextColor="rgba(255,255,255,0.6)"
                  value={item.amount.toString()}
                  onChangeText={(text) => updateSaving(item.id, text)}
                />
                <Pressable onPress={() => deleteSaving(item.id)} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>🗑️</Text>
                </Pressable>
              </View>
            )}
            keyExtractor={(item) => item.id}
            style={{ marginTop: 10 }}
          />

          <Pressable onPress={addSaving} style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Saving</Text>
          </Pressable>

          {/* Quick Save Buttons */}
          <View style={styles.quickSaveContainer}>
            <Text style={styles.quickSaveLabel}>Quick Save:</Text>
            <View style={styles.quickSaveButtons}>
              {[100, 500, 1000].map((amount) => (
                <Pressable
                  key={amount}
                  onPress={() => quickSave(amount)}
                  style={[
                    styles.quickSaveButton,
                    { opacity: totalBalance >= amount ? 1 : 0.5 }
                  ]}
                  disabled={totalBalance < amount}
                >
                  <Text style={styles.quickSaveButtonText}>+R{amount}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <Text style={styles.totalText}>Total Saved: R{totalSavings.toLocaleString()}</Text>
        </View>

        {/* Financial Health */}
        <View style={[styles.card, styles.healthCard]}>
          <Text style={styles.cardTitle}>💪 Financial Health</Text>
          <View style={styles.healthContainer}>
            <Text style={styles.healthEmoji}>{healthStatus.emoji}</Text>
            <Text style={[styles.healthStatus, { color: healthStatus.color }]}>{healthStatus.status}</Text>
            <Text style={styles.healthMessage}>{healthStatus.message}</Text>
          </View>
        </View>

        {/* Total Balance */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Balance</Text>
          <Text style={[styles.balanceAmount, { color: totalBalance >= 0 ? '#10B981' : '#EF4444' }]}>
            R{totalBalance.toLocaleString()}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4a6cf7' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  pageTitle: { 
    fontSize: 32, 
    fontWeight: '700', 
    color: 'white', 
    marginBottom: 5, 
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: { 
    fontSize: 16, 
    color: 'rgba(255,255,255,0.8)', 
    textAlign: 'center', 
    marginBottom: 25 
  },
  
  // Stats Cards
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 8,
  },
  statCard: {
    flex: 1,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    position: 'relative',
    minHeight: 90,
    justifyContent: 'center',
  },
  incomeCard: { backgroundColor: 'rgba(16, 185, 129, 0.2)' },
  expenseCard: { backgroundColor: 'rgba(239, 68, 68, 0.2)' },
  balanceCard: { backgroundColor: 'rgba(59, 130, 246, 0.2)' },
  statLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '500' },
  statValue: { color: 'white', fontSize: 18, fontWeight: '700', marginTop: 4 },
  statIcon: { position: 'absolute', top: 8, right: 8, fontSize: 16 },

  // Card styles
  card: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: { 
    color: 'white', 
    fontSize: 20, 
    fontWeight: '600', 
    marginBottom: 10 
  },
  
  // Input styles
  inputSmall: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    padding: 12,
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  editableRow: { marginBottom: 10 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  nameInput: { flex: 2 },
  amountInput: { flex: 1 },
  
  // Button styles
  addButton: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 12,
    padding: 12,
    marginTop: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  addButtonText: { color: 'white', fontWeight: '600', fontSize: 16 },
  addButtonSmall: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonSmallText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  
  deleteButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
  },
  deleteButtonText: { fontSize: 16 },
  
  // Table styles
  tableRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, paddingVertical: 4 },
  tableHeader: { 
    flexDirection: 'row', 
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(255,255,255,0.3)', 
    paddingBottom: 8, 
    marginBottom: 8 
  },
  headerCell: { color: 'white', fontWeight: '600', fontSize: 14 },
  cell: { color: 'white', fontSize: 14 },
  totalText: { 
    color: 'white', 
    fontWeight: '700', 
    marginTop: 15, 
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10,
    borderRadius: 8,
  },
  
  // Piggy Bank styles
  piggyBankCard: { 
    backgroundColor: 'rgba(236, 72, 153, 0.15)',
    borderColor: 'rgba(236, 72, 153, 0.3)',
  },
  piggyBankContainer: { alignItems: 'center', marginBottom: 20 },
  piggyBank: { position: 'relative', alignItems: 'center' },
  piggyBankEmoji: { fontSize: 80 },
  coinsBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinsText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  piggyBankSubtext: { 
    color: 'rgba(255,255,255,0.8)', 
    marginTop: 8, 
    textAlign: 'center' 
  },
  
  // Goal styles
  goalContainer: { marginBottom: 20 },
  goalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 10,
  },
  goalLabel: { color: 'rgba(255,255,255,0.9)', fontSize: 16 },
  goalEditContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  goalInput: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    padding: 8,
    borderRadius: 8,
    minWidth: 80,
    textAlign: 'center',
  },
  saveGoalButton: { padding: 4 },
  saveGoalText: { fontSize: 16 },
  goalDisplayContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  goalAmount: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  editGoalButton: { padding: 4 },
  editGoalText: { fontSize: 14 },
  
  // Progress bar
  progressBarContainer: { marginTop: 10 },
  progressBarBg: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    backgroundColor: '#EC4899',
    height: '100%',
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 8,
  },
  progressText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  progressLabel: { 
    color: 'rgba(255,255,255,0.8)', 
    textAlign: 'center', 
    marginTop: 8, 
    fontSize: 14 
  },
  
  // Saving row
  savingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  savingEmoji: { fontSize: 20 },
  savingInput: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    padding: 12,
    borderRadius: 10,
    fontSize: 14,
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  
  // Quick save
  quickSaveContainer: { marginTop: 15 },
  quickSaveLabel: { color: 'white', fontSize: 16, marginBottom: 8, textAlign: 'center' },
  quickSaveButtons: { flexDirection: 'row', justifyContent: 'space-around', gap: 8 },
  quickSaveButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  quickSaveButtonText: { color: '#92400E', fontWeight: 'bold', fontSize: 12 },
  
  // Health card
  healthCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  healthContainer: { alignItems: 'center' },
  healthEmoji: { fontSize: 60, marginBottom: 10 },
  healthStatus: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  healthMessage: { color: 'rgba(255,255,255,0.8)', textAlign: 'center' },
  
  balanceAmount: { fontSize: 28, fontWeight: '700', marginTop: 10, textAlign: 'center' },
});