// import React, { useState } from 'react';
// import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// const mockEntries = [
//   { id: '1', title: 'My first entry', date: '2023-07-01' },
//   { id: '2', title: 'A great day', date: '2023-07-02' },
//   // Add more mock entries as needed
// ];

// export default function Journal() {
//   const [entries, setEntries] = useState(mockEntries);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.entryItem}>
//       <ThemedText type="subtitle">{item.title}</ThemedText>
//       <ThemedText>{item.date}</ThemedText>
//     </TouchableOpacity>
//   );

//   return (
//     <ThemedView style={styles.container}>
//       <FlatList
//         data={entries}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//       />
//       <TouchableOpacity style={styles.addButton}>
//         <ThemedText>Add New Entry</ThemedText>
//       </TouchableOpacity>
//     </ThemedView>
//   );
// }


import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Define an interface for your journal entry
interface JournalEntry {
  id: string;
  title: string;
  date: string;
}

const mockEntries: JournalEntry[] = [
  { id: '1', title: 'My first entry', date: '2023-07-01' },
  { id: '2', title: 'A great day', date: '2023-07-02' },
  // Add more mock entries as needed
];

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries);

  const renderItem = ({ item }: { item: JournalEntry }) => (
    <TouchableOpacity style={styles.entryItem}>
      <ThemedText type="subtitle">{item.title}</ThemedText>
      <ThemedText>{item.date}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton}>
        <ThemedText>Add New Entry</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  entryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addButton: {
    backgroundColor: '#A1CEDC',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
});