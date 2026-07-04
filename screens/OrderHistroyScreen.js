// screens/OrderHistoryScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Dummy order history data
const orders = [
  {
    id: "1",
    name: "Gaming Laptop RTX 4070",
    description: "Powerful 15\" gaming laptop with RTX 4070 GPU.",
    price: 1899,
    status: "Delivered",
    date: "Nov 11, 2024",
    category: "electronics",
    image:
      "https://i5.walmartimages.com/asr/155703c7-3cac-4bc9-b11d-774f703a98e3.112a297709d0cae6a8af786246be6043.png?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
  },
  {
    id: "2",
    name: "Basketball Sneakers",
    description: "Lightweight running shoes for everyday training.",
    price: 129,
    status: "orderded",
    date: "Nov 11, 2024",
    category: "shoes",
    image:
      "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_1521,c_limit/0abdb42b-3702-484d-8c07-6fc876cd16dd/what-are-the-best-nike-basketball-shoes.jpg",
  },
  {
    id: "3",
     name: "Smartwatch Pro",
    description: "Fitness tracking, notifications, and music on your wrist.",
    price: 249,
     status: "Cancelled",
    date: "Nov 11, 2024",
    category: "accessories",
    image:
      "https://kidzwatches.com.au/cdn/shop/files/All-Green-SmartWatch-Pro-VZL54.jpg?v=1736963707&width=535",
  },
];

export default function OrderHistoryScreen() {
  const navigation = useNavigation();

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "#2ecc71";
      case "Out for delivery":
        return "#f1c40f";
      case "Cancelled":
        return "#e74c3c";
      default:
        return "#555";
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={{ uri: item.image }} style={styles.image} />

        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.price}>${item.price}</Text>

          <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
            {item.status}
          </Text>

          <Text style={styles.date}>Ordered on {item.date}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        {/* View Details */}
        <TouchableOpacity style={styles.detailsBtn}>
          <Text style={styles.detailsText}>View Details</Text>
        </TouchableOpacity>

        {/* Reorder */}
        <TouchableOpacity style={styles.reorderBtn}>
          <Ionicons name="refresh" size={18} color="white" />
          <Text style={styles.reorderText}>Reorder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Orders</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* ORDER LIST */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}

/// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    paddingTop: 55,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 3,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 15,
    borderRadius: 12,
    elevation: 2,
  },

  row: {
    flexDirection: "row",
  },

  image: {
    width: 75,
    height: 75,
    borderRadius: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },

  price: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "700",
    color: "#2874F0",
  },

  status: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
  },

  date: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  detailsBtn: {
    borderWidth: 1,
    borderColor: "#2874F0",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },

  detailsText: {
    color: "#2874F0",
    fontWeight: "700",
  },

  reorderBtn: {
   backgroundColor:  "#D4AF37",
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },

  reorderText: {
    color: "white",
    fontWeight: "700",
    marginLeft: 6,
  },
});