// screens/AddressScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AddressScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  
  const setAddress = route.params?.setAddress;

  const [addresses, setAddresses] = useState([]); 

  // 
  const [fullName, setFullName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postal, setPostal] = useState("");
  const [phone, setPhone] = useState("");

  const handleAdd = () => {
    if (!fullName || !street || !city || !province || !postal || !phone) {
      alert("Please fill all fields");
      return;
    }

    const newAddress = {
      id: Date.now(),
      name: fullName,
      address: `${street}, ${city}, ${province}, ${postal}`,
      phone: phone,
    };

    setAddresses([...addresses, newAddress]);

    // Clear inputs
    setFullName("");
    setStreet("");
    setCity("");
    setProvince("");
    setPostal("");
    setPhone("");
  };

  const selectAddress = (item) => {
    if (setAddress) setAddress(`${item.name}, ${item.address}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}></Text>
        <View style={{ width: 26 }} />
      </View>

      {/* NEW ADDRESS FORM */}
      <Text style={styles.sectionTitle}>Add New Address</Text>

      <View style={styles.inputBox}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter full name"
        />
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.label}>Street Address</Text>
        <TextInput
          style={styles.input}
          value={street}
          onChangeText={setStreet}
          placeholder="123 College St"
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.inputBox, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="City"
          />
        </View>

        <View style={[styles.inputBox, { flex: 1 }]}>
          <Text style={styles.label}>Province</Text>
          <TextInput
            style={styles.input}
            value={province}
            onChangeText={setProvince}
            placeholder="ON"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.inputBox, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.label}>Postal Code</Text>
          <TextInput
            style={styles.input}
            value={postal}
            onChangeText={setPostal}
            placeholder="N6A 1B1"
          />
        </View>

        <View style={[styles.inputBox, { flex: 1 }]}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="+1 647-000-0000"
          />
        </View>
      </View>

      {/* BUTTON */}
      <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
        <Text style={styles.addBtnText}>Save Address</Text>
      </TouchableOpacity>

      {/* ADDRESS LIST */}
      <Text style={styles.sectionTitle}>Select Address</Text>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.addressCard}
            onPress={() => selectAddress(item)}
          >
            <Ionicons name="location-outline" size={22} color="#000" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.addressName}>{item.name}</Text>
              <Text style={styles.addressText}>{item.address}</Text>
              <Text style={styles.addressPhone}>{item.phone}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

//style
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFF" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 10,
  },

  inputBox: {
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    backgroundColor: "#3EB489",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  addBtn: {
    backgroundColor: "#D4AF37",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  addBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  addressCard: {
    flexDirection: "row",
    padding: 15,
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#FFF",
  },

  addressName: {
    fontSize: 16,
    fontWeight: "700",
  },

  addressText: {
    color: "#555",
    marginTop: 3,
  },

  addressPhone: {
    color: "#777",
    marginTop: 3,
  },
});
