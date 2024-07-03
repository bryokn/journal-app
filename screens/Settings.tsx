import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Settings() {
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.settingItem}>
        <ThemedText>Update Username</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <ThemedText>Change Password</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem}>
        <ThemedText>Logout</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  settingItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});