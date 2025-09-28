import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native';
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
  const [savings, setSavings] = useState([]);
  const [goal, setGoal] = useState(5000);

  // calculations
  const totalIncome = income.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const totalSavings = savings.reduce((sum, s) => sum + (Number(s.amount) || 0), 0);
  const totalBalance = totalIncome - totalExpenses; // <-- NEW BALANCE

  // update handlers
  const updateIncome = (id, field, value) => {
    setIncome((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: field === 'amount' ? Number(value) : value } : item))
    );
  };

  const updateExpense = (id, field, value) => {
    setExpenses((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: field === 'amount' ? Number(value) : value } : item))
    );
  };

  const addIncome = () => {
    setIncome((prev) => [...prev, { id: Date.now().toString(), name: '', amount: 0 }]);
  };

  const addExpense = () => {
    setExpenses((prev) => [...prev, { id: Date.now().toString(), name: '', amount: 0 }]);
  };

  const addSaving = () => {
    setSavings((prev) => [...prev, { id: Date.now().toString(), amount: 0 }]);
  };

  const updateSaving = (id, value) => {
    setSavings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, amount: Number(value) } : item))
    );
  };

  const renderEditableRow = (item, onChange) => (
    <View style={styles.tableRow}>
      <TextInput
        style={[styles.inputSmall, { flex: 1 }]}
        placeholder="Name"
        placeholderTextColor="rgba(255,255,255,0.6)"
        value={item.name}
        onChangeText={(text) => onChange(item.id, 'name', text)}
      />
      <TextInput
        style={[styles.inputSmall, { width: 80, marginLeft: 10 }]}
        keyboardType="numeric"
        placeholder="0"
        placeholderTextColor="rgba(255,255,255,0.6)"
        value={item.amount.toString()}
        onChangeText={(text) => onChange(item.id, 'amount', text)}
      />
    </View>
  );

  const renderStaticRow = (item) => (
    <View style={styles.tableRow}>
      <Text style={[styles.cell, { flex: 1 }]}>{item.name || '-'}</Text>
      <Text style={[styles.cell, { width: 80, textAlign: 'right' }]}>R{item.amount}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Budget Tracker</Text>

        {/* Income */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Income</Text>
          <FlatList
            scrollEnabled={false}
            data={income}
            renderItem={({ item }) => renderEditableRow(item, updateIncome)}
            keyExtractor={(item) => item.id}
            style={{ marginTop: 10 }}
          />
          <Pressable onPress={addIncome} style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Income</Text>
          </Pressable>

          <View style={{ marginTop: 15 }}>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, { flex: 1 }]}>Name</Text>
              <Text style={[styles.headerCell, { width: 80, textAlign: 'right' }]}>Amount</Text>
            </View>
            {income.map((item) => (
              <View key={item.id}>{renderStaticRow(item)}</View>
            ))}
          </View>

          <Text style={styles.totalText}>Total Income: R{totalIncome}</Text>
        </View>

        {/* Expenses */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Expenses</Text>
          <FlatList
            scrollEnabled={false}
            data={expenses}
            renderItem={({ item }) => renderEditableRow(item, updateExpense)}
            keyExtractor={(item) => item.id}
            style={{ marginTop: 10 }}
          />
          <Pressable onPress={addExpense} style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Expense</Text>
          </Pressable>

          <View style={{ marginTop: 15 }}>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, { flex: 1 }]}>Name</Text>
              <Text style={[styles.headerCell, { width: 80, textAlign: 'right' }]}>Amount</Text>
            </View>
            {expenses.map((item) => (
              <View key={item.id}>{renderStaticRow(item)}</View>
            ))}
          </View>

          <Text style={styles.totalText}>Total Expenses: R{totalExpenses}</Text>
        </View>

        {/* Savings Tracker */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Savings Goal: R{goal}</Text>
          <FlatList
            scrollEnabled={false}
            data={savings}
            renderItem={({ item }) => (
              <TextInput
                style={[styles.inputSmall, { marginBottom: 8 }]}
                keyboardType="numeric"
                placeholder="Enter amount"
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={item.amount.toString()}
                onChangeText={(text) => updateSaving(item.id, text)}
              />
            )}
            keyExtractor={(item) => item.id}
            style={{ marginTop: 10 }}
          />
          <Pressable onPress={addSaving} style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add Saving</Text>
          </Pressable>

          <Text style={styles.totalText}>Total Saved: R{totalSavings}</Text>
          <Text style={styles.totalText}>
            Progress: {((totalSavings / goal) * 100).toFixed(1)}%
          </Text>
        </View>

        {/* Total Balance */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Balance</Text>
          <Text style={styles.balanceAmount}>R{totalBalance}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4a6cf7' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  pageTitle: { fontSize: 28, fontWeight: '600', color: 'white', marginBottom: 20 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  cardTitle: { color: 'white', fontSize: 18, fontWeight: '500', marginBottom: 10 },
  inputSmall: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    padding: 8,
    borderRadius: 6,
    fontSize: 14,
  },
  tableRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.3)', paddingBottom: 4, marginBottom: 6 },
  headerCell: { color: 'white', fontWeight: '600', fontSize: 14 },
  cell: { color: 'white', fontSize: 14 },
  totalText: { color: 'rgba(255,255,255,0.9)', fontWeight: '600', marginTop: 8 },
  addButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  addButtonText: { color: 'white', fontWeight: '500' },
  balanceAmount: { color: '#10B981', fontSize: 24, fontWeight: '700', marginTop: 10 },
});
