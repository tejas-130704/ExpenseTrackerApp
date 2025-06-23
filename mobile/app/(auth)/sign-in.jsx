
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Image } from 'react-native';
import {Alert} from 'react-native';

// import auth from '../../firebaseConfig';
import { getFirebaseAuth } from '@/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/assets/styles/auth.styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// const auth = ""// Adjust the path as necessary
const Page = () => {
    
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [error, setError] = React.useState('')


    const handleInputChange = (setter) => (text) => {
        setter(text);
        if (error) {
            setError(''); // Clear error when user starts typing
        }   
    }

    // Handle the submission of the sign-in form
    const onSignInPress = async () => {
    
        setError(''); // Clear any previous error
        // Start the sign-in process using the email and password provided
        try {
            if (!emailAddress || !password) {
                setError('Please enter both email and password.');
                return;
            }
            const auth = getFirebaseAuth(); // Lazy load here

            await signInWithEmailAndPassword(auth, emailAddress, password).then(async (userCredential) => {
                const user = userCredential.user;
                if (user.emailVerified) {
                    // alert('User signed in successfully:');
                    Alert.alert("Success", "User Signed in successfully.");
                    //   setActive({ session: user });
                    router.push('/(root)/'); // Navigate to home page after successful sign-in
                } else {
                    // User is signed in but email is not verified
                    console.log('User email not verified:', user.email);
                    setError('Please verify your email before signing in.');
                }
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error signing in:', errorCode, errorMessage);
                setError(errorMessage);
            });


        } catch (err) {
            setError("Error: " + err.message)
            console.error(JSON.stringify(err, null, 2))
        }

    }

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
        >

            <View style={styles.signinContainer}>
                <Image
                    source={require('@/assets/images/madara2.png')}
                    style={styles.verifyLogo}
                />

                <Text style={styles.title}>Welcome Back</Text>


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
                    value={emailAddress}
                    placeholder="Enter email"
                    onChangeText={handleInputChange(setEmailAddress)}
                />

                <TextInput
                    value={password}
                    style={styles.input}
                    placeholder="Enter password"
                    secureTextEntry={true}
                    onChangeText={handleInputChange(setPassword)}
                />
                <TouchableOpacity style={styles.button} onPress={onSignInPress}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={()=>{router.push('/(auth)/sign-up')}}>
                        <Text style={styles.linkText}> Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default Page;