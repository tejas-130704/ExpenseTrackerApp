import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signOut } from 'firebase/auth';
import { getFirebaseAuth } from '@/firebaseConfig'; // Adjust path if needed

export const SignOutButton = () => {
  const auth = getFirebaseAuth();

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Sign Out",
          onPress: async () => {
            try {
              await signOut(auth);
              console.log("User signed out");
              // Optional: redirect to sign-in manually if needed
            } catch (err) {
              console.error("Error signing out:", err);
            }
          }
        }
      ]
    );
  };

  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Icon
        name="sign-out"
        size={23}
        style={{ fontWeight: 'light' }}
        color="rgba(0,0,0,0.8)"
      />
    </TouchableOpacity>
  );
};
