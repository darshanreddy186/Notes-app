import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { persistImageAsync, loadNotes, saveNotes } from '../storage';
import { AuthContext } from '../AuthContext';
import { v4 as uuidv4 } from 'uuid';

export default function NoteEditorScreen({ route, navigation }){
  const { mode, note } = route.params || {};
  const { currentUser } = useContext(AuthContext);

  const [title, setTitle] = useState(note?.title || '');
  const [body, setBody] = useState(note?.body || '');
  const [imageUri, setImageUri] = useState(note?.imageUri || null);

  async function pickImage(){
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) { Alert.alert('Permission required'); return; }
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality:0.7 });
    if (res.cancelled) return;
    const saved = await persistImageAsync(res.uri);
    setImageUri(saved);
  }

  async function takePhoto(){
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) { Alert.alert('Camera permission required'); return; }
    const res = await ImagePicker.launchCameraAsync({ quality:0.7 });
    if (res.cancelled) return;
    const saved = await persistImageAsync(res.uri);
    setImageUri(saved);
  }

  async function onSave(){
    if (!title.trim()) { Alert.alert('Title required'); return; }
    const all = await loadNotes(currentUser.username);
    if (mode === 'edit' && note?.id){
      const idx = all.findIndex(n => n.id === note.id);
      if (idx >= 0){ all[idx] = { ...all[idx], title, body, imageUri, updatedAt: Date.now() }; }
    } else {
      all.push({ id: uuidv4(), title, body, imageUri, createdAt: Date.now(), updatedAt: Date.now() });
    }
    await saveNotes(currentUser.username, all);
    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={{padding:12}}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input}/>
      <TextInput placeholder="Body" value={body} onChangeText={setBody} style={[styles.input,{height:120}]} multiline/>
      {imageUri ? <Image source={{uri:imageUri}} style={{width:'100%',height:200,marginBottom:8}}/> : null}
      <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:12}}>
        <Button title="Pick Image" onPress={pickImage}/>
        <Button title="Camera" onPress={takePhoto}/>
      </View>
      <Button title="Save" onPress={onSave}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input:{borderWidth:1,borderColor:'#ccc',padding:10, borderRadius:6, marginBottom:12}
});
