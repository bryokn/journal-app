import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getSummary } from '../services/api';
import { Picker } from '@react-native-picker/picker';

export const SummaryScreen = () => {
  const [summary, setSummary] = useState(null);
  const [period, setPeriod] = useState('weekly');
  const navigation = useNavigation();

  useEffect(() => {
    fetchSummary();
  }, [period]);

  const fetchSummary = async () => {
    try {
      const response = await getSummary(period);
      setSummary(response);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Journal Summary</Text>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.inputLabel}>View Summary By:</Text>
        <Picker
          selectedValue={period}
          onValueChange={(itemValue) => setPeriod(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Daily" value="daily" />
          <Picker.Item label="Weekly" value="weekly" />
          <Picker.Item label="Monthly" value="monthly" />
        </Picker>
      </View>
      <ScrollView style={styles.summaryContainer}>
        {summary && (
          <View>
            <View style={styles.totalEntriesContainer}>
              <Text style={styles.totalEntriesText}>Total Entries</Text>
              <Text style={styles.totalEntriesNumber}>{summary.total_entries}</Text>
            </View>
            <Text style={styles.categoriesTitle}>Categories:</Text>
            {Object.entries(summary.categories).map(([category, count]) => (
              <View key={category} style={styles.categoryItem}>
                <Text style={styles.categoryName}>{category}</Text>
                <Text style={styles.categoryCount}>{count}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#0033cc',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  summaryContainer: {
    flex: 1,
    padding: 20,
  },
  totalEntriesContainer: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  totalEntriesText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalEntriesNumber: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  categoryName: {
    fontSize: 16,
    color: '#333',
  },
  categoryCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});