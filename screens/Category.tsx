// import React from 'react';
// import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// const categories = ['Personal', 'Work', 'Travel', 'Health', 'Other'];

// export default function Category() {
//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.categoryItem}>
//       <ThemedText>{item}</ThemedText>
//     </TouchableOpacity>
//   );

//   return (
//     <ThemedView style={styles.container}>
//       <FlatList
//         data={categories}
//         renderItem={renderItem}
//         keyExtractor={(item) => item}
//       />
//     </ThemedView>
//   );
// }


import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const categories: string[] = ['Personal', 'Work', 'Travel', 'Health', 'Other'];

export default function Category() {
  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <ThemedText>{item}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  categoryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});