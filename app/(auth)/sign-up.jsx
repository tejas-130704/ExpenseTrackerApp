import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { styles } from '@/assets/styles/auth.styles'
import { Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Ionicons} from '@expo/vector-icons';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [error, setError] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      setError("Error: "+ err.message+password)
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        setError('Verification failed. Please try again.')
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setError('An error occurred during verification. Please try again.')
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
      >

        <View style={styles.verifyContainer}>
          <Image
            source={require('@/assets/images/itachi2.png')}
            style={styles.verifyLogo}
          />
          <Text style={styles.verifyText}>Verify your email</Text>



          {error ? (
            <View>
              <Ionicons name="alert-circle" size={20}/>
              <Text style={styles.error}>{error}</Text>
              <TouchableOpacity onPress={()=>{setError("")}}>
                <Ionicons name="close" size={20} color='black'/>
              </TouchableOpacity>
            </View>
          ) : null}

          <TextInput
            value={code}
            keyboardType='numeric'
            style={styles.verifyInput}
            placeholder="Enter your verification code"
            onChangeText={(code) => setCode(code)}
          />
          <TouchableOpacity onPress={onVerifyPress}>
            <Text style={[styles.buttonVerify, styles.buttonText]} >Verify</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    )
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
          value={emailAddress}
          onChangeText={setEmailAddress}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Link href="/sign-in">
            <Text style={styles.linkText}>Sign in</Text>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}