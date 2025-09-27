import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // <- use this

export default function BudgetPage() {
  const [savings, setSavings] = useState(500);
  const [income, setIncome] = useState([
    { id: '1', name: 'Part-time Job', amount: 2000 },
    { id: '2', name: 'Scholarship', amount: 1500 },
  ]);
  const [expenses, setExpenses] = useState([
    { id: '1', name: 'Groceries', amount: 600 },
    { id: '2', name: 'Transport', amount: 200 },
    { id: '3', name: 'Utilities', amount: 300 },
  ]);

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remaining = totalIncome - totalExpenses;

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.name}</Text>
      <Text style={styles.tableCell}>${item.amount}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Budget Tracker</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Savings Made</Text>
          <Text style={styles.savingsAmount}>${savings}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={savings.toString()}
            onChangeText={(text) => setSavings(Number(text))}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Income</Text>
          <FlatList
            scrollEnabled={false}
            data={income}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={{ marginTop: 10 }}
          />
          <Text style={styles.totalText}>Total Income: ${totalIncome}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Expenses</Text>
          <FlatList
            scrollEnabled={false}
            data={expenses}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={{ marginTop: 10 }}
          />
          <Text style={styles.totalText}>Total Expenses: ${totalExpenses}</Text>
        </View>

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
  tableRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  tableCell: { color: 'white', fontSize: 14 },
  totalText: { color: 'rgba(255,255,255,0.8)', fontWeight: '500', marginTop: 8 },
});
