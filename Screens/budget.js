import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Budget() {
  const [savings, setSavings] = useState(500);
  const [income, setIncome] = useState([
    { id: '1', name: 'Part-time Job', amount: 2000 },
    { id: '2', name: 'Scholarship', amount: 1500 },
  ]);
  const [expenses, setExpenses] = useState([
    { id: '1', name: 'Groceries', amount: 600 },
    { id: '2', name: 'Transport', amount: 200 },
  ]);

  // calculations
  const totalIncome = income.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const remaining = totalIncome - totalExpenses;

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Budget Tracker</Text>

        {/* Savings */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Savings</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={savings.toString()}
            onChangeText={(text) => setSavings(Number(text))}
          />
        </View>

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
          <Text style={styles.totalText}>Total Income: ${totalIncome}</Text>
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
          <Text style={styles.totalText}>Total Expenses: ${totalExpenses}</Text>
        </View>

        {/* Remaining */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Remaining Balance</Text>
          <Text style={styles.remainingAmount}>${remaining}</Text>
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
  savingsAmount: { color: 'white', fontSize: 24, fontWeight: '600', marginBottom: 10 },
  remainingAmount: { color: '#10B981', fontSize: 24, fontWeight: '600', marginTop: 10 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  inputSmall: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    padding: 8,
    borderRadius: 6,
    fontSize: 14,
  },
  tableRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  totalText: { color: 'rgba(255,255,255,0.8)', fontWeight: '500', marginTop: 8 },
  addButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  addButtonText: { color: 'white', fontWeight: '500' },
});
