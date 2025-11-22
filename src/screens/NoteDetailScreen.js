import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

export default function NoteDetailScreen({ route, navigation }){
  const { note } = route.params;
  return (
    <View style={{flex:1,padding:12}}>
      <Text style={{fontSize:22, fontWeight:'600', marginBottom:8}}>{note.title}</Text>
      {note.imageUri ? <Image source={{uri:note.imageUri}} style={{width:'100%',height:240, marginBottom:12}} /> : null}
      <Text style={{fontSize:16}}>{note.body}</Text>
    </View>
  );
}
