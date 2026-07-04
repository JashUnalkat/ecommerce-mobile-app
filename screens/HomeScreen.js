import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "../contexts/cartContext";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  // Categories (based on your screenshot)
  const categories = [
    { id: "All", icon: "grid-outline" },
    { id: "electronics", icon: "phone-portrait-outline" },
    { id: "clothing", icon: "shirt-outline" },
    { id: "shoes", icon: "walk-outline" },
    { id: "accessories", icon: "watch-outline" },
    { id: "home", icon: "home-outline" },
  ];

  // Load Data from Firestore
  useEffect(() => {
    async function fetchProducts() {
      const snapshot = await getDocs(collection(db, "products"));
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(list);
    }
    fetchProducts();
  }, []);

  // Filter Logic
  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // PRODUCT ITEM UI
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />

      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>

      <Text style={styles.desc} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.priceRow}>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.oldPrice}>${item.originalPrice}</Text>
      </View>

      <View style={styles.ratingRow}>
        <Ionicons name="star" size={16} color="#FFA41C" />
        <Text style={styles.rating}>
          {item.rating} ({item.reviewCount})
        </Text>
      </View>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => addToCart(item)}
        activeOpacity={0.7}
      >
        <Ionicons name="cart-outline" size={18} color="#fff" />
        <Text style={styles.addText}>Add to cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Gradient */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopzi</Text>
        <Text style={styles.headerSubtitle}>Shop the Finest Collections</Text>

        {/* Search Box */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={22} color="#777" />
          <TextInput
            placeholder="Search products..."
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Category Buttons */}
        <View style={styles.categoryRow}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryBtn,
                selectedCategory === cat.id && styles.categorySelected,
              ]}
              onPress={() => setSelectedCategory(cat.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={cat.icon}
                size={16}
                color={selectedCategory === cat.id ? "#fff" : "#555"}
              />
              <Text
                style={[
                  styles.catText,
                  selectedCategory === cat.id && styles.catTextSelected,
                ]}
              >
                {cat.id}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Product Grid */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#3EB489" },

  header: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 25,
    backgroundColor: "#3EB489",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerTitle: { color: "white", fontSize: 24, fontWeight: "bold" },

  headerSubtitle: { color: "#ecf0f1", marginBottom: 15 },

  searchBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#444",
  },

  categoryRow: {
    flexDirection: "row",
    marginTop: 15,
  },

  categoryBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },

  categorySelected: {
    backgroundColor: "#1A73E8",
  },

  catText: {
    marginLeft: 5,
    color: "#555",
    fontSize: 13,
  },

  catTextSelected: {
    color: "#fff",
  },

  card: {
    width: "46%",
    backgroundColor: "#fff",
    margin: "2%",
    borderRadius: 12,
    padding: 10,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },

  name: { fontSize: 15, fontWeight: "600", color: "#222" },

  desc: { fontSize: 12, color: "#666", marginBottom: 5 },

  priceRow: { flexDirection: "row", alignItems: "center" },

  price: { fontSize: 15, fontWeight: "700", color: "#2874F0" },

  oldPrice: {
    marginLeft: 6,
    color: "#999",
    textDecorationLine: "line-through",
    fontSize: 12,
  },

  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 5 },

  rating: { marginLeft: 4, color: "#444", fontSize: 12 },

  addBtn: {
   backgroundColor:  "#D4AF37",
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  addText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "700",
  },
});