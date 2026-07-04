// screens/CheckoutScreen.js
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../contexts/cartContext";

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const { items, getTotalPrice, clearCart } = useCart();

  // Default values
  const [address, setAddress] = useState(
    "John Doe, 123 College St, London, ON, N6A 1B1"
  );
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  // Shipping Information (NEW)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const subtotal = useMemo(() => getTotalPrice(), [items]);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    if (!items.length) {
      Alert.alert("Cart Empty", "Please add items to cart first");
      return;
    }

    Alert.alert(
      "Confirm Order",
      "Are you sure you want to place this order?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Place Order",
          onPress: () => {
            clearCart();
            Alert.alert(
              "Order Placed",
              "Your order has been placed successfully!",
              [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("OrderHistory"),
                },
              ]
            );
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Checkout</Text>

        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        {/* DELIVERY ADDRESS */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Address", {
                  setAddress: (addr) => setAddress(addr),
                })
              }
            >
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.addressBox}>
            <Ionicons name="location-outline" size={22} color="#2874F0" />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.addressText}>{address}</Text>
            </View>
          </View>
        </View>

        {/* PAYMENT METHOD */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PaymentMethods", {
                  setPayment: (method) => setPaymentMethod(method),
                })
              }
            >
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.paymentBox}>
            <Ionicons name="card-outline" size={22} color="#2874F0" />
            <Text style={styles.paymentText}>{paymentMethod}</Text>
          </View>
        </View>

        {/* ORDER SUMMARY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items ({items.length})</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* SHIPPING INFORMATION (NEW SECTION) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Information</Text>

          {/* First / Last Name Row */}
          <View style={styles.row}>
            <View style={styles.inputContainerHalf}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            <View style={styles.inputContainerHalf}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          {/* Phone */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </ScrollView>

      {/* PLACE ORDER BUTTON */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Payable Amount</Text>
          <Text style={styles.footerTotal}>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

///style
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
    fontWeight: "bold",
  },

  section: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 12,
    padding: 15,
    elevation: 2,
  },

  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
  },
  changeText: {
    color: "#2874F0",
    fontWeight: "600",
  },

  addressBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  addressText: {
    fontSize: 14,
    color: "#444",
  },

  paymentBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "600",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  summaryLabel: {
    fontSize: 15,
    color: "#555",
  },
  summaryValue: {
    fontSize: 15,
    color: "#222",
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    marginVertical: 10,
  },

  totalLabel: {
    fontSize: 17,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2874F0",
  },

  
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  inputContainerHalf: {
    width: "48%",
    marginTop: 10,
  },

  inputContainer: {
    marginTop: 10,
  },

  inputLabel: {
    fontSize: 13,
    color: "#555",
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#DDD",
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 10,
  },

  footerLabel: {
    fontSize: 13,
    color: "#777",
  },

  footerTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2874F0",
  },

  placeOrderBtn: {
    backgroundColor: "#D4AF37",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 8,
  },

  placeOrderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
