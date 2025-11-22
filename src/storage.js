import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { v4 as uuidv4 } from 'uuid';

export const USERS_KEY = '@myapp_users';
export const NOTES_KEY_PREFIX = '@myapp_notes_';

export async function loadUsers(){
  const raw = await AsyncStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : {};
}
export async function saveUsers(users){
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function notesKey(username){ return `${NOTES_KEY_PREFIX}${username}`; }
export async function loadNotes(username){
  const raw = await AsyncStorage.getItem(notesKey(username));
  return raw ? JSON.parse(raw) : [];
}
export async function saveNotes(username, notes){
  await AsyncStorage.setItem(notesKey(username), JSON.stringify(notes));
}

export async function persistImageAsync(originalUri){
  if (!originalUri) return null;
  try {
    const filename = `${uuidv4()}.jpg`;
    const dest = FileSystem.documentDirectory + filename;
    await FileSystem.copyAsync({ from: originalUri, to: dest });
    return dest;
  } catch (err) {
    console.warn('persistImageAsync error', err);
    return originalUri;
  }
}

export async function deleteImageAsync(uri){
  if (!uri) return;
  try {
    await FileSystem.deleteAsync(uri, { idempotent: true });
  } catch (e) { console.warn('deleteImageAsync', e); }
}
