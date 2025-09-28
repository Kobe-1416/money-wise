// login.js (Merged with Forgot Password + Social Login)
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

const { width, height } = Dimensions.get('window');

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Animations
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

  const handleSocialLogin = (provider) => {
    const defaultUserData = {
      username: `${provider}User`,
      email: `user@${provider.toLowerCase()}.com`,
      loginDate: new Date().toISOString(),
    };

    storeUserData(defaultUserData);

    navigation.replace('Tabs', { screen: 'Home' });
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
            <Animated.View
              style={[
                styles.contentContainer,
                { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] }
              ]}
            >
              {/* Brand Section */}
              <View style={styles.brandSection}>
                <View style={styles.logoContainer}>
                  <Text style={styles.logoEmoji}>💎</Text>
                </View>
                <Text style={styles.brandTitle}>MoneyWise</Text>
                <Text style={styles.brandSubtitle}>Your path to financial freedom</Text>
              </View>

              {/* Login Form */}
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

                {/* Forgot Password */}
                <Pressable style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </Pressable>

                {/* Login Button */}
                <Pressable 
                  style={[styles.loginButton, isLoading && styles.loginButtonLoading]} 
                  onPress={handleLogin}
                  disabled={isLoading}
                >
                  <Text style={styles.loginButtonText}>
                    {isLoading ? "Signing In..." : "Sign In ✨"}
                  </Text>
                </Pressable>

                {/* Divider */}
                <View style={styles.dividerContainer}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or continue with</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Social Login */}
                <View style={styles.socialContainer}>
                  <Pressable style={styles.socialButton} onPress={() => handleSocialLogin('Google')}>
                    <Text style={styles.socialIcon}>🔍</Text>
                    <Text style={styles.socialText}>Google</Text>
                  </Pressable>
                  <Pressable style={styles.socialButton} onPress={() => handleSocialLogin('Apple')}>
                    <Text style={styles.socialIcon}>🍎</Text>
                    <Text style={styles.socialText}>Apple</Text>
                  </Pressable>
                </View>
              </View>

              {/* Sign Up */}
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <Pressable onPress={() => console.log('Navigate to signup')}>
                  <Text style={styles.signupLink}>Sign Up</Text>
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
  brandSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', textAlign: 'center' },
  formContainer: { marginBottom: 30 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  inputIcon: { marginLeft: 16, marginRight: 12, fontSize: 18 },
  textInput: { flex: 1, paddingVertical: 16, fontSize: 16, color: 'white' },
  eyeIcon: { padding: 16 },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: 24 },
  forgotPasswordText: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  loginButton: { borderRadius: 12, overflow: 'hidden', marginTop: 10, backgroundColor: '#ff6b6b', alignItems: 'center', paddingVertical: 16 },
  loginButtonLoading: { backgroundColor: '#ff9999' },
  loginButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.3)' },
  dividerText: { color: 'rgba(255,255,255,0.6)', marginHorizontal: 16, fontSize: 14 },
  socialContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 16 },
  socialButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', gap: 8 },
  socialIcon: { fontSize: 18 },
  socialText: { color: 'white', fontSize: 14, fontWeight: '500' },
  signupContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  signupText: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  signupLink: { color: 'white', fontSize: 14, fontWeight: '600', textDecorationLine: 'underline' },
});
