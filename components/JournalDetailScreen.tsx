import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { getEntry, deleteEntry } from '../services/api';

type RootStackParamList = {
  JournalDetail: { journalId: number };
  EditJournal: { journalId: number };
};

type JournalDetailScreenRouteProp = RouteProp<RootStackParamList, 'JournalDetail'>;
type JournalDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'JournalDetail'>;

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
}

export const JournalDetailScreen: React.FC = () => {
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<JournalDetailScreenNavigationProp>();
  const route = useRoute<JournalDetailScreenRouteProp>();
  const { journalId } = route.params;

  useEffect(() => {
    fetchEntry();
  }, []);

  const fetchEntry = async () => {
    try {
      const fetchedEntry = await getEntry(journalId);
      setEntry(fetchedEntry);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch journal entry', error);
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigation.navigate('EditJournal', { journalId });
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this journal entry?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: async () => {
            try {
              await deleteEntry(journalId);
              navigation.goBack();
            } catch (error) {
              console.error('Failed to delete entry', error);
              Alert.alert("Error", "Failed to delete the entry. Please try again.");
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading journal entry...</Text>
      </View>
    );
  }

  if (!entry) {
    return (
      <View style={styles.container}>
        <Text>Journal entry not found</Text>
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
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.date}>{new Date(entry.date).toLocaleString()}</Text>
        <Text style={styles.category}>{entry.category}</Text>
        <Text style={styles.content}>{entry.content}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});