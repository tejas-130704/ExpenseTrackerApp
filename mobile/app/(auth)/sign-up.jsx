import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { getFirebaseAuth } from '@/firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useRouter, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/assets/styles/auth.styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

 const SignUpScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);

  const handleInputChange = (setter) => (text) => {
    setter(text);
    if (error) setError('');
  };

  const onSignUpPress = async () => {
    try {
      setError('');
      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }
      const auth = getFirebaseAuth();
      

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      sendEmailVerification(user);
      Alert.alert("Success", 'Verification email sent to: ' + user.email);
      setPendingVerification(true);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message);
    }
  };

  if (pendingVerification) {
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
      >
        <View style={styles.verifyContainer}>
          <Image source={require('@/assets/images/itachi2.png')} style={styles.verifyLogo} />
          <Text style={styles.verifyText}>
            A verification mail is sent to your email address.{'\n'}Please verify your email before Login!
          </Text>
          <TouchableOpacity
            onPress={async () => {
              router.push('/sign-in');
              await setPendingVerification(false);
            }}
          >
            <Text style={[styles.buttonVerify, styles.buttonText]}>Log in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
    >
      <View style={styles.signupContainer}>
        <Image source={require('@/assets/images/bg21.png')} style={styles.logo} />
        <Text style={styles.title}>Create Account</Text>

        {error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={20} color="red" style={styles.errorIcon} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")} style={styles.closeButton}>
              <Ionicons name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>
        ) : null}

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="Enter email"
          value={email}
          onChangeText={handleInputChange(setEmail)}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={handleInputChange(setPassword)}
        />

        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Link href="/(auth)/sign-in">
            <Text style={styles.linkText}>Sign in</Text>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default SignUpScreen;