import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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
});