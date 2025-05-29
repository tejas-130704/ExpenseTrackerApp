import { useClerk } from '@clerk/clerk-expo'
import { Text, View, TouchableOpacity } from 'react-native'
import Icon from '@react-native-vector-icons/fontawesome';
import { Alert } from 'react-native';

export const SignOutButton = () => {

  const { signOut } = useClerk()

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
              await signOut();
              
            } catch (err) {
              console.error("Error signing out:", err);
            }
          }
        }
      ]
    );
  }

  return (
    <TouchableOpacity onPress={handleSignOut}>
      {/* <Text>Sign out</Text> */}

      <Icon name="sign-out" size={23} style={{ fontWeight: 'light' }} color="rgba(0,0,0,0.8)" />

    </TouchableOpacity>
  )
}