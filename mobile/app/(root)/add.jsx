import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from '@/assets/styles/create.styles';
import { useRouter } from 'expo-router';
import { useTransaction } from '@/hooks/useTransaction'; // Adjust path
import { getFirebaseAuth } from '@/firebaseConfig'; // Adjust path

const categories = [
  { icon: 'silverware-fork-knife', label: 'Food & Drinks' },
  { icon: 'cart-outline', label: 'Shopping' },
  { icon: 'bus', label: 'Transportation' },
  { icon: 'movie', label: 'Entertainment' },
  { icon: 'file-document', label: 'Bills' },
  { icon: 'cash', label: 'Income' },
  { icon: 'dots-horizontal', label: 'Other' },
];

export default function NewTransaction() {
  const router = useRouter();
  const [type, setType] = useState('Expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState('');
  const auth = getFirebaseAuth();
  const user = auth.currentUser;
  const email = user?.email;
  const userId = email ? email.split('@')[0] : null;

  const { saveTransaction, loadData } = useTransaction(userId); // ✅ get the function

  const handleSave = async () => {
    if (!title || !amount || !selectedCategory) {
      setError("All fields are required");
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    const actualAmount = type === 'Expense' ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount));

    const formData = {
      title,
      amount: actualAmount,
      category: selectedCategory,
      user_id: userId,
    };

    try {
      await saveTransaction(formData); // ✅ save it
    
      router.back(); // Navigate back after saving
    } catch (error) {
      console.error("Transaction failed to save");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-left" size={24} color="rgba(0,0,0,0.7)" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Transaction</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveText}>Save ✔</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              type === 'Expense' && styles.activeExpense,
              type === 'Expense' && { backgroundColor: '#e53935' },
            ]}
            onPress={() => setType('Expense')}
          >
            <Text style={[styles.toggleText, type === 'Expense' && styles.activeText]}>Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              type === 'Income' && styles.activeIncome,
              type === 'Income' && { backgroundColor: '#43a047' },
            ]}
            onPress={() => setType('Income')}
          >
            <Text style={[styles.toggleText, type === 'Income' && styles.activeText]}>Income</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amountIcon}>₹</Text>
          <TextInput
            placeholder="Enter Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={styles.amount}
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={styles.titleContainer}>
          <AntDesign name="form" size={24} color="#000" />
          <TextInput
            placeholder="Transaction Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
        </View>

        <Text style={styles.categoryLabel}>Category</Text>
        <View  style={styles.categoryScroll}>
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryBtn,
                selectedCategory === cat.label && styles.selectedCategory,
                selectedCategory === cat.label && { backgroundColor: 'rgba(160, 96, 62, 0.2)' },
              ]}
              onPress={() => setSelectedCategory(cat.label)}
            >
              <Icon name={cat.icon} size={20} />
              <Text style={styles.categoryText}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
