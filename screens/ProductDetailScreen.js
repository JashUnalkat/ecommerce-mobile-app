import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useCart } from "../contexts/cartContext";

export default function ProductDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const { product } = route.params;
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useCart();

  const [qty, setQty] = useState(1);

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const increase = () => setQty(qty + 1);
  const decrease = () => qty > 1 && setQty(qty - 1);

  const handleAdd = () => {
    addToCart(product, qty);

   Alert.alert(
  "Added to Cart",
  `${product.name} has been added to your cart.`,
  [
    {
      text: "Continue Shopping",
      style: "cancel",
    },
    {
      text: "View Cart",
      onPress: () => navigation.navigate("Cart"),
    },
  ]
);

  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Product Image */}
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="cover"
        />

        <View style={{ paddingHorizontal: 20 }}>
          {/* Title */}
          <Text style={styles.name}>{product.name}</Text>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.oldPrice}>${product.originalPrice}</Text>
            <Text style={styles.discount}>8% OFF</Text>
          </View>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={20} color="#FFA41C" />
            <Text style={styles.ratingText}>
              {product.rating} ({product.reviewCount} reviews)
            </Text>
          </View>

          {/* Description */}
          <Text style={styles.desc}>{product.description}</Text>

          {/* Quantity */}
          <Text style={styles.sectionTitle}>Quantity:</Text>

          <View style={styles.qtyContainer}>
            <View style={styles.qtyRow}>
              <TouchableOpacity style={styles.qtyBtn} onPress={decrease}>
                <Ionicons name="remove" size={22} color="#000" />
              </TouchableOpacity>

              <Text style={styles.qtyNumber}>{qty}</Text>

              <TouchableOpacity style={styles.qtyBtn} onPress={increase}>
                <Ionicons name="add" size={22} color="#000" />
              </TouchableOpacity>
            </View>

            {/* HEART ❤️ BUTTON */}
            <TouchableOpacity
              style={styles.wishlistBtn}
              onPress={toggleWishlist}
            >
              <Ionicons
                name={isWishlisted ? "heart" : "heart-outline"}
                size={28}
                color={isWishlisted ? "red" : "#555"}
              />
            </TouchableOpacity>
          </View>

          {/* Features */}
          <Text style={styles.sectionTitle}>Features</Text>
          {product.features?.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <Ionicons name="checkmark-circle" size={20} color="#2ecc71" />
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}

          {/* Reviews */}
          <Text style={styles.sectionTitle}>Reviews</Text>
          <View style={styles.reviewCard}>
            <Text style={styles.reviewName}>Emma Davis</Text>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="star" size={18} color="#FFA41C" />
              <Ionicons name="star" size={18} color="#FFA41C" />
              <Ionicons name="star" size={18} color="#FFA41C" />
              <Ionicons name="star" size={18} color="#FFA41C" />
              <Ionicons name="star-outline" size={18} color="#ccc" />
            </View>
            <Text style={styles.reviewText}>
              Classic fit and great quality.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cartBtn} onPress={handleAdd}>
          <Ionicons name="cart-outline" size={22} color="#fff" />
          <Text style={styles.cartBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 55,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    elevation: 3,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },

  productImage: {
    width: "100%",
    height: 300,
    backgroundColor: "#f1f1f1",
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
    color: "#222",
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  price: {
    color: "#2874F0",
    fontSize: 22,
    fontWeight: "bold",
  },

  oldPrice: {
    marginLeft: 10,
    color: "#777",
    textDecorationLine: "line-through",
  },

  discount: {
    marginLeft: 8,
    backgroundColor: "#f44336",
    color: "#fff",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    fontSize: 11,
    fontWeight: "700",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  ratingText: {
    marginLeft: 6,
    fontSize: 15,
    color: "#444",
  },

  desc: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
    lineHeight: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    color: "#222",
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  qtyBtn: {
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 5,
  },

  qtyNumber: {
    marginHorizontal: 15,
    fontSize: 18,
    fontWeight: "bold",
  },

  wishlistBtn: {
    marginLeft: 20,
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 40,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  featureText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#444",
  },

  reviewCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },

  reviewName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  reviewText: {
    color: "#555",
    marginTop: 5,
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

  cartBtn: {
    flexDirection: "row",
    backgroundColor: "#D4AF37",
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  cartBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
