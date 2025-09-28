import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';

export default function Settings({ navigation }) {
  const handlePress = (section) => {
    // handle navigation or alerts for now
    alert(`Open ${section}`);
  };

  const settingsSections = [
    { id: '1', title: 'Profile', description: 'Edit your personal info', icon: '👤' },
    { id: '2', title: 'Account', description: 'Change email, phone', icon: '📧' },
    { id: '3', title: 'Security', description: 'Change password, 2FA', icon: '🔒' },
    { id: '4', title: 'Preferences', description: 'Notifications, theme', icon: '⚙️' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Settings</Text>
        {settingsSections.map((section) => (
          <Pressable
            key={section.id}
            style={styles.card}
            onPress={() => handlePress(section.title)}
          >
            <Text style={styles.cardIcon}>{section.icon}</Text>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.cardTitle}>{section.title}</Text>
              <Text style={styles.cardDescription}>{section.description}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4a6cf7' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  pageTitle: { fontSize: 28, fontWeight: '600', color: 'white', marginBottom: 20 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  cardIcon: { fontSize: 24, marginRight: 10 },
  cardTitle: { color: 'white', fontSize: 18, fontWeight: '500' },
  cardDescription: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
});
