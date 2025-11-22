import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../AuthContext';

export default function SignupScreen(){
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSignup = async () => {
    try {
      await signup(username.trim(), password);
    } catch (e) {
      Alert.alert('Signup failed', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} autoCapitalize="none"/>
      <TextInput placeholder="Password or PIN" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Sign up & Login" onPress={onSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, padding:20, justifyContent:'center'},
  title:{fontSize:22, marginBottom:20, textAlign:'center'},
  input:{borderWidth:1,borderColor:'#ccc',padding:10, marginBottom:12, borderRadius:6}
});
