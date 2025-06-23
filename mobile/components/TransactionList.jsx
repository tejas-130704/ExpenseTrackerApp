import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '@/assets/styles/home.styles';

export const TransactionList = ({ item, onDelete }) => {
    const handleDateFormat = (dateString) => {
        const dateUTC = new Date(dateString);

        const options = {
            day: '2-digit',
            month: 'short',
            year: 'numeric',

        };

        const formatted = dateUTC.toLocaleString('en-US', options);

        return formatted;
    }
    return (
        <View style={styles.transactionList}>
            <View style={styles.transactionTextGroup}>
                <Text style={styles.transactionLabel} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={styles.transactionCategory}>{item.category}</Text>
            </View>

            <View style={styles.transactionDetails}>
                <View style={styles.transactionAmount}>
                    <Text
                        style={item.amount >= 0 ? styles.positive : styles.negative}
                        numberOfLines={1}
                    >
                        {item.amount >= 0 ? '+' : '-'}₹{Math.abs(item.amount).toFixed(2)}
                    </Text>
                    <Text style={styles.transactionDate}>
                        {handleDateFormat(item.created_at)}
                    </Text>
                </View>

                <TouchableOpacity onPress={() => onDelete(item.id)}>
                    <Icon name="trash" size={16} style={styles.dustbin} />
                </TouchableOpacity>
            </View>
        </View>

    );
};
