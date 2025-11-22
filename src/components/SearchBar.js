import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function SearchBar({ value, onChange }){
  return (
    <View style={styles.container}>
      <TextInput placeholder="Search" value={value} onChangeText={onChange} style={styles.input}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{padding:8},
  input:{borderWidth:1,borderColor:'#ccc',padding:8, borderRadius:6}
});
