import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../contexts/cartContext";

export default function CartScreen() {
  const navigation = useNavigation();
  const {
    items,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    getTotalPrice,
  } = useCart();

  // Remove one product
  const confirmRemove = (productId, name) => {
   Alert.alert(
  "Remove Item",
  `Are you sure you want to remove ${name}?`,
  [
    { text: "Cancel", style: "cancel" },
    { text: "Remove", onPress: () => removeFromCart(productId) },
  ]
);

  };

  // Clear all items
  const confirmClear = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear All", onPress: clearCart },
      ]
    );
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={80} color="#ccc" />
        <Text style={styles.emptyText}>Your cart is empty</Text>

        <TouchableOpacity
          style={styles.shopNowBtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.shopNowText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Cart</Text>

        <TouchableOpacity onPress={confirmClear}>
          <Text style={styles.clearAll}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {items.map(({ product, qty }) => (
          <View key={product.id} style={styles.card}>
            <Image source={{ uri: product.image }} style={styles.image} />

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.name}>{product.name}</Text>

              <Text style={styles.price}>${product.price}</Text>

              {/* Quantity Selector */}
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => decreaseQty(product.id)}
                >
                  <Ionicons name="remove" size={20} />
                </TouchableOpacity>

                <Text style={styles.qty}>{qty}</Text>

                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => increaseQty(product.id)}
                >
                  <Ionicons name="add" size={20} />
                </TouchableOpacity>
              </View>

              {/* Remove Option */}
              <TouchableOpacity
                onPress={() => confirmRemove(product.id, product.name)}
              >
                <Text style={styles.remove}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Total Summary */}
      <View style={styles.footer}>
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Sub Total</Text>
          <Text style={styles.totalAmount}>${getTotalPrice()}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate("Checkout")}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
// styles
const styles = StyleSheet.create({
  header: {
    paddingTop: 55,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  clearAll: {
    color: "#d32f2f",
    fontSize: 15,
    fontWeight: "600",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 10,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  image: {
    width: 95,
    height: 95,
    borderRadius: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
  },
  price: {
    fontSize: 16,
    color: "#2874F0",
    fontWeight: "bold",
    marginTop: 4,
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  qtyBtn: {
    backgroundColor: "#e0e0e0",
    padding: 5,
    borderRadius: 5,
  },
  qty: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  remove: {
    marginTop: 8,
    color: "#d32f2f",
    fontWeight: "600",
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: "#fff",
    elevation: 10,
  },

  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 18,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2874F0",
  },

  checkoutBtn: {
   backgroundColor:  "#D4AF37",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 15,
    fontSize: 18,
    color: "#444",
  },
  shopNowBtn: {
    marginTop: 20,
   backgroundColor:  "#D4AF37",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
  },
  shopNowText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});