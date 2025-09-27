import React from 'react';
import { ScrollView, Pressable, StyleSheet, Text, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function LessonsPage() {
  const learningModules = [
    { id: '1', name: 'Basics', count: '12 lessons', icon: '🎓' },
    { id: '2', name: 'Budgeting', count: '10 lessons', icon: '💰' },
    { id: '3', name: 'Saving & Emergency Fund', count: '8 lessons', icon: '🏦' },
    { id: '4', name: 'Investing', count: '7 lessons', icon: '📈' },
    { id: '5', name: 'Credit & Loans', count: '6 lessons', icon: '💳' },
  ];

  const handlePress = (moduleName) => alert(moduleName);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Learning Modules</Text>
        <View style={styles.modulesGrid}>
          {learningModules.map((module) => (
            <Pressable
              key={module.id}
              style={styles.moduleCard}
              onPress={() => handlePress(module.name)}
            >
              <Text style={styles.moduleIcon}>{module.icon}</Text>
              <Text style={styles.moduleName}>{module.name}</Text>
              <Text style={styles.moduleCount}>{module.count}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4a6cf7' },
  scrollContent: { padding: 20 },
  title: { fontSize: 20, color: 'white', fontWeight: '600', marginBottom: 20 },
  modulesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  moduleCard: {
    width: (width - 60) / 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  moduleIcon: { fontSize: 24, marginBottom: 10 },
  moduleName: { color: 'white', fontSize: 14, fontWeight: '500', marginBottom: 2, textAlign: 'center' },
  moduleCount: { color: 'rgba(255,255,255,0.7)', fontSize: 12, textAlign: 'center' },
});
