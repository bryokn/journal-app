import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createEntry } from '../services/api';

export const JournalScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async () => {
    try {
      await createEntry({ title, content, category });
      Alert.alert('Success', 'Journal entry created successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error creating entry:', error);
      Alert.alert('Error', 'Failed to create journal entry');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Journal Entry</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Write your thoughts..."
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Save Entry" onPress={handleSubmit} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  contentInput: {
    height: 150,
    textAlignVertical: 'top',
  },
});