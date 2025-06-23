import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import SafeScreen from "@/components/SafeScreen";


export default function RootLayout() {
    return (
  
        <SafeScreen>
          <Slot screenOptions={{ headerShown: false }} />     
        </SafeScreen>
 
    );

}
