import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createEntry } from '../services/api';

export const JournalScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const navigation = useNavigation();

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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>New Journal Entry</Text>
      </View>
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





// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import { createEntry } from '../services/api';

// export const JournalScreen = ({ navigation }) => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [category, setCategory] = useState('');

//   const handleSubmit = async () => {
//     try {
//       await createEntry({ title, content, category });
//       Alert.alert('Success', 'Journal entry created successfully');
//       navigation.goBack();
//     } catch (error) {
//       console.error('Error creating entry:', error);
//       Alert.alert('Error', 'Failed to create journal entry');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>New Journal Entry</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Title"
//         value={title}
//         onChangeText={setTitle}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Category"
//         value={category}
//         onChangeText={setCategory}
//       />
//       <TextInput
//         style={[styles.input, styles.contentInput]}
//         placeholder="Write your thoughts..."
//         value={content}
//         onChangeText={setContent}
//         multiline
//       />
//       <Button title="Save Entry" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   contentInput: {
//     height: 150,
//     textAlignVertical: 'top',
//   },
// });