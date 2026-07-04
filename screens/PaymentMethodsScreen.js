// screens/PaymentMethodsScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function PaymentMethodsScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Optional callback from CheckoutScreen
  const setPayment = route.params?.setPayment;

  const paymentOptions = [
    { id: "Card", label: "Credit / Debit Card", icon: "card-outline" },
    { id: "UPI", label: "UPI / Google Pay", icon: "logo-google" },
    { id: "Cash", label: "Cash on Delivery", icon: "cash-outline" },
    { id: "PayPal", label: "PayPal", icon: "logo-paypal" },
  ];

  const [selected, setSelected] = useState("Card");

  const selectPayment = (method) => {
    setSelected(method);

    if (setPayment) {
      setPayment(method);
    }

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#3EB489", }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {paymentOptions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.option,
              selected === item.id && styles.optionSelected,
            ]}
            activeOpacity={0.7}
            onPress={() => selectPayment(item.id)}
          >
            {/* LEFT ICON */}
            <Ionicons
              name={item.icon}
              size={24}
              color={selected === item.id ? "#2874F0" : "#444"}
            />

            {/* LABEL */}
            <Text
              style={[
                styles.optionText,
                selected === item.id && styles.optionTextSelected,
              ]}
            >
              {item.label}
            </Text>

            {/* CHECKMARK */}
            {selected === item.id && (
              <Ionicons
                name="checkmark-circle"
                size={26}
                color="#2874F0"
                style={{ marginLeft: "auto" }}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

//// styles
const styles = StyleSheet.create({
  header: {
    paddingTop: 55,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginTop: 12,
    marginHorizontal: 15,
    elevation: 2,
  },

  optionSelected: {
    borderWidth: 2,
    borderColor: "#2874F0",
    backgroundColor: "#E8F0FE",
  },

  optionText: {
    marginLeft: 15,
    fontSize: 15,
    color: "#555",
    fontWeight: "500",
  },

  optionTextSelected: {
    color: "#2874F0",
    fontWeight: "700",
  },
});