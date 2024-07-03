import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Summary() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Journal Summary</ThemedText>
      <ThemedText>Total Entries: 10</ThemedText>
      <ThemedText>Most Used Category: Personal</ThemedText>
      <ThemedText>Longest Streak: 5 days</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});