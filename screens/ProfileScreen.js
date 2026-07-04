// screens/ProfileScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function ProfileScreen({ navigation }) {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log('Logout error:', e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.card}>
        <Ionicons name="person-circle-outline" size={90} color="#555" />
        <Text style={styles.name}>{auth.currentUser?.email || "User"}</Text>
      </View>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('OrderHistory')}
      >
        <Ionicons name="receipt-outline" size={24} color="#444" />
        <Text style={styles.menuText}>Order History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Wishlist')}
      >
        <Ionicons name="heart-outline" size={24} color="#444" />
        <Text style={styles.menuText}>Wishlist</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('HelpSupport')}
      >
        <Ionicons name="help-circle-outline" size={24} color="#444" />
        <Text style={styles.menuText}>Help & Support</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('About')}
      >
        <Ionicons name="information-circle-outline" size={24} color="#444" />
        <Text style={styles.menuText}>About App</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Ionicons name="log-out-outline" size={22} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20,  paddingTop: 55,},
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  card: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 3,
    
  },
  name: { marginTop: 10, fontSize: 18, fontWeight: '600' },
  menuItem: {
    padding: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    elevation: 2,
  },
  menuText: { marginLeft: 12, fontSize: 16, fontWeight: '500' },
  logoutBtn: {
    marginTop: 40,
    backgroundColor: '#E63946',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutText: { color: 'white', fontSize: 17, marginLeft: 8 },
});
