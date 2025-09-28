// SettingsPage.js
import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsPage({ navigation }) {
  const updateUserData = (field) => {
    Alert.prompt(`Change ${field}`, `Enter new ${field.toLowerCase()}:`, (value) => {
      if (value && global.userData) {
        global.userData[field.toLowerCase()] = value;
        Alert.alert("Success", `${field} updated!`);
        navigation.goBack();
      }
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Account</Text>

            <Pressable style={styles.settingItem} onPress={() => updateUserData("Username")}>
              <Text style={styles.settingIcon}>👤</Text>
              <View>
                <Text style={styles.settingLabel}>Change Username</Text>
                <Text style={styles.settingValue}>{global.userData?.username}</Text>
              </View>
            </Pressable>

            <Pressable style={styles.settingItem} onPress={() => updateUserData("Email")}>
              <Text style={styles.settingIcon}>📧</Text>
              <View>
                <Text style={styles.settingLabel}>Change Email</Text>
                <Text style={styles.settingValue}>{global.userData?.email}</Text>
              </View>
            </Pressable>

            <Pressable style={styles.settingItem} onPress={() => updateUserData("Password")}>
              <Text style={styles.settingIcon}>🔒</Text>
              <View>
                <Text style={styles.settingLabel}>Change Password</Text>
                <Text style={styles.settingValue}>••••••••</Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4a6cf7' },
  safeArea: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  sectionContainer: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { color: 'white', fontSize: 18, fontWeight: '600', marginBottom: 16 },
  settingItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: 16, marginBottom: 12 },
  settingIcon: { fontSize: 22, marginRight: 12 },
  settingLabel: { color: 'white', fontSize: 14, fontWeight: '500' },
  settingValue: { color: 'rgba(255,255,255,0.7)', fontSize: 13 },
});
