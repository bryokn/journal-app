import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { getEntry, updateEntry } from '../services/api'; 

type RootStackParamList = {
  EditJournal: { journalId: number };
};

type EditJournalScreenRouteProp = RouteProp<RootStackParamList, 'EditJournal'>;
type EditJournalScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditJournal'>;

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
}

export const EditJournalScreen: React.FC = () => {
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<EditJournalScreenNavigationProp>();
  const route = useRoute<EditJournalScreenRouteProp>();
  const { journalId } = route.params;

  useEffect(() => {
    fetchEntry();
  }, []);

  const fetchEntry = async () => {
    try {
      const fetchedEntry = await getEntry(journalId);
      setEntry(fetchedEntry);
      setTitle(fetchedEntry.title);
      setContent(fetchedEntry.content);
      setCategory(fetchedEntry.category);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch journal entry', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to load journal entry. Please try again.');
    }
  };

  const handleSave = async () => {
    try {
      const updatedEntry = await updateEntry(journalId, { title, content, category });
      Alert.alert('Success', 'Journal entry updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to update journal entry', error);
      Alert.alert('Error', 'Failed to update journal entry. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading journal entry...</Text>
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
        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
        />
        <Text style={styles.label}>Category:</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="Enter category"
        />
        <Text style={styles.label}>Content:</Text>
        <TextInput
          style={[styles.input, styles.contentInput]}
          value={content}
          onChangeText={setContent}
          placeholder="Enter content"
          multiline
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  contentInput: {
    height: 200,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});