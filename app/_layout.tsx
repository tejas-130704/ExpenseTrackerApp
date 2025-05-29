import { Stack } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-expo'
import SafeScreen from "@/components/SafeScreen";
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot } from 'expo-router'


export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeScreen>
        <Slot screenOptions={{ headerShown: false}}/>
        {/* <Stack screenOptions={{ headerShown: false }} /> */}
      </SafeScreen>
    </ClerkProvider>
  );

}
