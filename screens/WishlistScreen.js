// screens/WishlistScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../contexts/cartContext";

export default function WishlistScreen() {
  const navigation = useNavigation();

  // Get wishlist + cart functions from context
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <Text style={styles.name}>{item.name}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.price}>₹{item.price}</Text>
        {item.originalPrice && (
          <Text style={styles.oldPrice}>₹{item.originalPrice}</Text>
        )}
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => addToCart(item)}
        >
          <Ionicons name="cart-outline" size={18} color="#000" />
          <Text style={styles.addText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => removeFromWishlist(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color="#e53935" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#D4AF37" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Wishlist</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* EMPTY MESSAGE */}
      {wishlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={70} color="#999" />
          <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
          <Text style={styles.emptySubtitle}>Save items to view later.</Text>

          <TouchableOpacity
            style={styles.browseBtn}
            onPress={() => navigation.navigate("Tabs")}
          >
            <Text style={styles.browseText}>Browse Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </View>
  );
}

// --------------------------------------------------------
// WHITE + GOLD THEME STYLES
// --------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    paddingTop: 55,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#E5E5E5",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000000",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#444",
    marginTop: 10,
  },

  emptySubtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },

  browseBtn: {
    marginTop: 15,
    backgroundColor: "#D4AF37",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  browseText: {
    color: "#000",
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#FFFFFF",
    width: "46%",
    margin: "2%",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    elevation: 2,
  },

  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    color: "#000000",
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  price: {
    fontSize: 15,
    fontWeight: "700",
    color: "#D4AF37",
  },

  oldPrice: {
    marginLeft: 6,
    fontSize: 12,
    color: "#999999",
    textDecorationLine: "line-through",
  },

  btnRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  addBtn: {
    flex: 1,
    backgroundColor: "#D4AF37",
    paddingVertical: 8,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  addText: {
    color: "#000",
    marginLeft: 5,
    fontWeight: "700",
  },

  removeBtn: {
    marginLeft: 10,
    backgroundColor: "#FFF",
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e53935",
  },
});


