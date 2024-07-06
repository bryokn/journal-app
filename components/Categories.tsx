import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getCategories, getEntriesByCategory } from '../services/api';

export const CategoriesScreen = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [entries, setEntries] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchEntriesByCategory = async (category) => {
    try {
      const response = await getEntriesByCategory(category);
      setEntries(response);
      setSelectedCategory(category);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryItem} 
      onPress={() => fetchEntriesByCategory(item)}
    >
      <Ionicons name="bookmark-outline" size={24} color="#007AFF" />
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderEntryItem = ({ item }) => (
    <TouchableOpacity style={styles.entryItem}>
      <Text style={styles.entryTitle}>{item.title}</Text>
      <Text style={styles.entryDate}>{new Date(item.date).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Categories</Text>
      </View>
      {selectedCategory ? (
        <View style={styles.entriesContainer}>
          <TouchableOpacity onPress={() => setSelectedCategory(null)} style={styles.backToCategoriesButton}>
            <Ionicons name="arrow-back" size={20} color="#007AFF" />
            <Text style={styles.backToCategoriesText}>Back to Categories</Text>
          </TouchableOpacity>
          <Text style={styles.selectedCategoryTitle}>{selectedCategory}</Text>
          <FlatList
            data={entries}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderEntryItem}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          renderItem={renderCategoryItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
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
    backgroundColor: 'white',
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
  listContainer: {
    padding: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  entriesContainer: {
    flex: 1,
  },
  backToCategoriesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backToCategoriesText: {
    marginLeft: 5,
    color: '#007AFF',
    fontSize: 16,
  },
  selectedCategoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    padding: 10,
  },
  entryItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  entryDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});