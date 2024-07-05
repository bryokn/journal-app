import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import { getSummary } from '../services/api';

export const SummaryScreen = () => {
  const [summary, setSummary] = useState(null);
  const [period, setPeriod] = useState('weekly');

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
    <View style={styles.container}>
      <Text style={styles.title}>Journal Summary</Text>
      <Picker
        selectedValue={period}
        onValueChange={(itemValue) => setPeriod(itemValue)}
      >
        <Picker.Item label="Daily" value="daily" />
        <Picker.Item label="Weekly" value="weekly" />
        <Picker.Item label="Monthly" value="monthly" />
      </Picker>
      {summary && (
        <View>
          <Text>Total Entries: {summary.total_entries}</Text>
          <Text>Categories:</Text>
          {Object.entries(summary.categories).map(([category, count]) => (
            <Text key={category}>{category}: {count}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});