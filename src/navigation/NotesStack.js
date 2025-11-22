import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotesListScreen from '../screens/NotesListScreen';
import NoteEditorScreen from '../screens/NoteEditorScreen';
import NoteDetailScreen from '../screens/NoteDetailScreen';

const Stack = createNativeStackNavigator();

export default function NotesStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="NotesList" component={NotesListScreen} options={{ title: 'Notes' }}/>
      <Stack.Screen name="NoteEditor" component={NoteEditorScreen} options={{ title: 'Edit Note' }}/>
      <Stack.Screen name="NoteDetail" component={NoteDetailScreen} options={{ title: 'Note' }}/>
    </Stack.Navigator>
  );
}
