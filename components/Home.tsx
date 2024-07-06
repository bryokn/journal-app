import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    console.log('Logout button pressed');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const tiles = [
    { title: 'New Journal', icon: 'journal-outline', screen: 'Journal' },
    { title: 'View All Journals', icon: 'book-outline', screen: 'AllJournals' },
    { title: 'Categories', icon: 'list-outline', screen: 'Categories' },
    { title: 'Summary', icon: 'bar-chart-outline', screen: 'Summary' },
    { title: 'Settings', icon: 'settings-outline', screen: 'Settings' },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <Text style={styles.logoutText}>Logout</Text>
        <Ionicons name="log-out-outline" size={24} color="#007AFF" />
      </TouchableOpacity>
      <Text style={styles.title}>Your Journal App</Text>
      <Text style={styles.subtitle}>Write your thoughts away!</Text>
      <View style={styles.tilesContainer}>
        {tiles.map((tile, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tile}
            onPress={() => navigation.navigate(tile.screen)}
          >
            <Ionicons name={tile.icon} size={40} color="#007AFF" />
            <Text style={styles.tileText}>{tile.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#666',
  },
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  tile: {
    width: '35%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tileText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 20,
  },
  logoutText: {
    marginRight: 5,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});