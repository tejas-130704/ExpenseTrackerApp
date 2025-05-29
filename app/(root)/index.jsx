import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SignOutButton } from '@/components/SignOutButton'
import { Image } from 'expo-image'
import { styles } from '@/assets/styles/home.styles'
import { FlatList, Alert, RefreshControl } from 'react-native';
import { TransactionList } from '@/components/TransactionList'
import {NoTransactionList} from '@/components/NoTransactionList'
import React, { useEffect, useState } from 'react';
import { useTransaction } from '@/hooks/useTransaction';
import { useRouter} from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import PageLoader  from '@/components/PageLoader';

export default function Page() {

  const [refreshing, setRefreshing] = useState(false);
const router = useRouter();

  const { user } = useUser();
  const userId = user?.id;
  const { transactions, summary, isLoading, loadData, deleteTransaction, saveTransaction } = useTransaction(userId);

  console.log("Transactions:", transactions);
  console.log("Summary:", summary);
  console.log("User ID:", userId);
  

  const totalIncome = summary.income || 0;
  const totalExpenses = summary.expense || 0;
  const balance = summary.balance || 0;


  const handleDelete = (index) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            deleteTransaction(index);
          }
        },
      ]
    );
  }

  useFocusEffect(
  useCallback(() => {
    loadData();
  }, [userId])
);
  


  const onRefreshing = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }

  useEffect(() => {
    loadData();
  }, [loadData])


  if (isLoading ) {
    return <PageLoader />;
  }

  return (

      <View style={styles.container}>
        {/* Navbar */}
        <View style={styles.navbar}>
          <Image
            source={require('@/assets/images/scroll.png')}
            style={{ width: 60, height: 60, ImageResizeMode: 'contain' }}
            contentFit="contain"
          />

          <SignedIn>
            <View style={styles.title}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.username}>
                {user?.username || user?.emailAddresses[0]?.emailAddress.split('@')[0]}
              </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/(root)/add')}>
              <Text style={styles.buttonText}>+ Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </SignedIn>

          <SignedOut>
            <View>
              <Link href="/(auth)/sign-in"><Text>Sign in</Text></Link>
              <Link href="/(auth)/sign-up"><Text>Sign up</Text></Link>
            </View>
          </SignedOut>
        </View>

        {/* Summary Card */}
        <View style={styles.summaryContainer}>
          <View>
            <Text style={{ color: "rgba(0,0,0,0.7)" }}>Total Balance</Text>
            <Text style={styles.balanceText}>₹{balance}</Text>
          </View>
          <View style={styles.summaryRow}>
            <View style={{ paddingRight: 130, borderRightWidth: 1, borderRightColor: '#ccc' }}>
              <Text style={styles.incomeText}>Income</Text>
              <Text style={styles.incomeText}>+₹{totalIncome}</Text>
            </View>
            <View style={{ paddingLeft: 20 }}>
              <Text style={styles.expenseText}>Expenses</Text>
              <Text style={styles.expenseText}>-₹{Math.abs(totalExpenses).toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Recent Transactions */}
        <Text style={styles.secondHead}>Recent Transactions</Text>
        <View style={styles.transactionContainer}>
          
          <FlatList
            data={transactions}
            vertical={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TransactionList item={item} onDelete={() => handleDelete(index)} />
            )}
            
            ListEmptyComponent={<NoTransactionList />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshing} />}
          />
        </View>
      </View>
   
  )
}