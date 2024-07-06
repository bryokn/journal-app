import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getUserInfo, updateUserInfo } from '../services/api';

export const SettingsScreen = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();

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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>
      <Text style={styles.inputLabel}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.inputLabel}>New Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Your New Password (leave blank to keep current)"
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#0033cc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
