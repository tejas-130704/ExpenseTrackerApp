import { Redirect } from 'expo-router';
import { Stack } from 'expo-router/stack';
import React, { useEffect, useState } from 'react';
import { getFirebaseAuth } from '@/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function AuthLayout() {
  const auth = getFirebaseAuth();
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user?.email);
      setIsSignedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (isSignedIn === null) return null; // Or loading screen

  if (isSignedIn) return <Redirect href="/" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
