// Login.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Animated,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 100, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  const storeUserData = (userData) => {
    global.userData = userData; // in-memory global storage
    console.log('User data stored successfully:', userData);
  };

  const handleLogin = () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    const userData = {
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
      loginDate: new Date().toISOString(),
    };

    storeUserData(userData);

    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('Tabs', { screen: 'Home' });
    }, 1500);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4a6cf7" />
      <View style={styles.loginContainer}>
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <Animated.View style={[
              styles.contentContainer,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] }
            ]}>
              <View style={styles.brandSection}>
                <View style={styles.logoContainer}>
                  <Text style={styles.logoEmoji}>💎</Text>
                </View>
                <Text style={styles.brandTitle}>MoneyWise</Text>
                <Text style={styles.brandSubtitle}>Your path to financial freedom</Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>👤</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Username"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>📧</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>🔒</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    <Text>{showPassword ? "🙈" : "👁️"}</Text>
                  </Pressable>
                </View>

                <Pressable 
                  style={[styles.loginButton, isLoading && styles.loginButtonLoading]} 
                  onPress={handleLogin}
                  disabled={isLoading}
                >
                  <Text style={styles.loginButtonText}>
                    {isLoading ? "Signing In..." : "Sign In ✨"}
                  </Text>
                </Pressable>
              </View>
            </Animated.View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loginContainer: { flex: 1, backgroundColor: '#4a6cf7' },
  safeArea: { flex: 1 },
  keyboardView: { flex: 1 },
  contentContainer: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  brandSection: { alignItems: 'center', marginBottom: 40 },
  logoContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  logoEmoji: { fontSize: 32 },
  brandTitle: { fontSize: 28, fontWeight: '700', color: 'white', marginBottom: 8 },
  brandSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)' },
  formContainer: { marginBottom: 30 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, marginBottom: 16, paddingHorizontal: 12 },
  inputIcon: { marginRight: 8, fontSize: 18 },
  textInput: { flex: 1, paddingVertical: 12, color: 'white' },
  eyeIcon: { padding: 8 },
  loginButton: { borderRadius: 12, padding: 16, alignItems: 'center', backgroundColor: '#ff6b6b' },
  loginButtonLoading: { backgroundColor: '#ff9999' },
  loginButtonText: { color: 'white', fontWeight: '600' },
});
