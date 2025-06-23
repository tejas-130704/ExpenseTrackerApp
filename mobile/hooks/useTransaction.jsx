import { useState, useCallback } from 'react';
import { Alert, Platform } from 'react-native';

const API_URL = 'https://mobile-backend-v23t.onrender.com';

export const useTransaction = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/transactions/${userId}`);
      if (response.status === 404) {
        console.warn("No transactions found for user:", userId);
        setTransactions([]);
        return;
      }
      if (!response.ok) throw new Error('Failed to fetch transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
      Alert.alert("Error", "Failed to fetch transactions. Please try again later.");
      throw error;
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/transactions/summary/${userId}`);
      console.log("Fetching summary for userssssssss:", response.status);
      if (response.status === 404) {
        console.warn("No transactions summary found for user:", userId);
        setSummary({ balance: 0, income: 0, expenses: 0 });
        return;
      }
      if (!response.ok) throw new Error('Failed to fetch summary');
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("Error fetching summary:", error.message);
      throw error;
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
      // await fetchTransactions(); // Ensure transactions are fetched after summary
      // await fetchSummary(); // Ensure summary is fetched after transactions
      console.log("Transactions and summary loaded successfully");
    } catch (error) {
      console.error("Failed to load transactions: b", error.message);
    } finally {
      setIsLoading(false);
    }
  }, [userId, fetchTransactions, fetchSummary]);

  const deleteTransaction = async (index) => {
    try {
      const transactionId = transactions[index].id;
      const response = await fetch(`${API_URL}/api/transactions/${transactionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete transaction');

      await loadData(); // Refresh data
      Alert.alert("Success", "Transaction deleted successfully.");
    } catch (error) {
      console.error("Failed to delete transaction:", error.message);
      Alert.alert("Error", "Failed to delete transaction. Please try again later.");
    }
  };

  const saveTransaction = async (formData)=>{
    try {
      const response = await fetch(`${API_URL}/api/transactions/`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to Save transaction');
      
      Alert.alert("Success", "Transaction Save successfully.");
    } catch (error) {
      console.error("Failed to save transaction:", error.message);
      Alert.alert("Error", "Failed to save transaction. Please try again later.");
    }
  } 


  return {
    transactions,
    summary,
    isLoading,
    loadData,
    deleteTransaction,
    saveTransaction,
  };
};
