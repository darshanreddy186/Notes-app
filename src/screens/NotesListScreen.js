import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { AuthContext } from '../AuthContext';
import { loadNotes, saveNotes, deleteImageAsync } from '../storage';
import NoteItem from '../components/NoteItem';
import { applySearchSort } from '../utils/helpers';

export default function NotesListScreen({ navigation }){
  const { currentUser, logout } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('updated_desc');

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      loadAll();
    });
    loadAll();
    return unsub;
  }, [navigation]);

  async function loadAll(){
    const data = await loadNotes(currentUser.username);
    setNotes(data || []);
  }

  function onAdd(){
    navigation.navigate('NoteEditor', { mode: 'create' });
  }

  function onEdit(note){
    navigation.navigate('NoteEditor', { mode: 'edit', note });
  }

  async function onDelete(note){
    Alert.alert('Delete', 'Delete this note?', [
      { text:'Cancel' },
      { text:'Delete', style:'destructive', onPress: async () => {
        const all = notes.filter(n => n.id !== note.id);
        setNotes(all);
        await saveNotes(currentUser.username, all);
        if (note.imageUri) await deleteImageAsync(note.imageUri);
      }}
    ]);
  }

  const filtered = applySearchSort(notes, search, sort);

  return (
    <View style={{flex:1,padding:12}}>
      <View style={{flexDirection:'row', alignItems:'center', marginBottom:8}}>
        <TextInput placeholder="Search title or body" value={search} onChangeText={setSearch} style={styles.search}/>
        <Button title="Sort" onPress={()=>{
          // cycle sort options
          const order = ['updated_desc','updated_asc','title_asc','title_desc'];
          const idx = order.indexOf(sort);
          setSort(order[(idx+1)%order.length]);
        }} />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <NoteItem note={item} onPress={() => navigation.navigate('NoteDetail', { note: item })} onEdit={() => onEdit(item)} onDelete={() => onDelete(item)} />
        )}
        ListEmptyComponent={() => <Text style={{textAlign:'center',marginTop:40}}>No notes yet</Text>}
      />

      <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:12}}>
        <Button title="Add Note" onPress={onAdd} />
        <Button title="Logout" color="#c00" onPress={() => { logout(); }} />
      </View>

      <Text style={{fontSize:12, color:'#666', marginTop:8}}>Sort: {sort}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  search:{flex:1, borderWidth:1,borderColor:'#ccc', padding:8, borderRadius:6, marginRight:8}
});
