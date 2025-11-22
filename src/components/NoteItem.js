import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function NoteItem({ note, onPress, onEdit, onDelete }){
  return (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <View style={{flex:1}}>
        <Text numberOfLines={1} style={styles.title}>{note.title}</Text>
        <Text numberOfLines={1} style={styles.preview}>{note.body}</Text>
      </View>
      {note.imageUri ? <Image source={{uri:note.imageUri}} style={styles.thumb}/> : <View style={styles.placeholder}/>}
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}><Text style={{color:'#007bff'}}>Edit</Text></TouchableOpacity>
        <TouchableOpacity onPress={onDelete}><Text style={{color:'#c00', marginTop:6}}>Delete</Text></TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row:{flexDirection:'row', padding:10, borderBottomWidth:1, borderColor:'#eee', alignItems:'center'},
  title:{fontSize:16, fontWeight:'600'},
  preview:{color:'#666', marginTop:4},
  thumb:{width:60, height:60, borderRadius:6, marginLeft:8},
  placeholder:{width:60, height:60, backgroundColor:'#f0f0f0', borderRadius:6, marginLeft:8},
  actions:{marginLeft:8, alignItems:'flex-end'}
});
