import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    console.log('Logout button pressed');
    // Navigate back to the Login screen
    // setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

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
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Journal"
          onPress={() => navigation.navigate('Journal')}
        />
        <Button
          title="View Categories"
          onPress={() => navigation.navigate('Categories')}
        />
        <Button
          title="See Summary"
          onPress={() => navigation.navigate('Summary')}
        />
        <Button
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
        />
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
});