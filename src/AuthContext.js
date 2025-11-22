import React, { createContext, useEffect, useState } from 'react';
import { loadUsers, saveUsers } from './storage';
import * as Crypto from 'expo-crypto';

export const AuthContext = createContext();

async function hashString(s){
  return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, s);
}

export function AuthProvider({ children }){
  const [users, setUsers] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const loaded = await loadUsers();
      setUsers(loaded);
      setLoading(false);
    })();
  }, []);

  const signup = async (username, password) => {
    if (!username) throw new Error('Username required');
    if (users[username]) throw new Error('Username exists');
    const pwHash = await hashString(password || '');
    const newUsers = { ...users, [username]: { username, passwordHash: pwHash, createdAt: Date.now() } };
    setUsers(newUsers);
    await saveUsers(newUsers);
    setCurrentUser(newUsers[username]);
  };

  const login = async (username, password) => {
    const u = users[username];
    if (!u) throw new Error('User not found');
    const pwHash = await hashString(password || '');
    if (pwHash !== u.passwordHash) throw new Error('Incorrect password');
    setCurrentUser(u);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ users, currentUser, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
