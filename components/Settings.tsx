import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getUserInfo, updateUserInfo } from '../services/api';

export const SettingsScreen = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await getUserInfo();
      setUsername(response.username);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUserInfo({ username, password: newPassword });
      Alert.alert('Success', 'User information updated successfully');
      setNewPassword('');
    } catch (error) {
      console.error('Error updating user info:', error);
      Alert.alert('Error', 'Failed to update user information');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password (leave blank to keep current)"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Button title="Update Information" onPress={handleUpdateUser} />
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
});