import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getEntries } from '../services/api';

export const AllJournalsScreen = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const fetchedJournals = await getEntries();
      setJournals(fetchedJournals);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch journals', error);
      setLoading(false);
    }
  };

  const renderJournalItem = ({ item }) => (
    <TouchableOpacity
      style={styles.journalItem}
      onPress={() => navigation.navigate('JournalDetail', { journalId: item.id })}
    >
      <Text style={styles.journalTitle}>{item.title}</Text>
      <Text style={styles.journalDate}>{new Date(item.date).toLocaleDateString()}</Text>
      <Text style={styles.journalCategory}>{item.category}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading journals...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#007AFF" />
      </TouchableOpacity>
      <Text style={styles.title}>All Journals</Text>
      {journals.length > 0 ? (
        <FlatList
          data={journals}
          renderItem={renderJournalItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.emptyText}>No journals found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  journalItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  journalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  journalDate: {
    fontSize: 14,
    color: '#666',
  },
  journalCategory: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
});