// screens/AboutScreen.js
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function AboutScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
        <View style={{ width: 26 }} /> 
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* App Info Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Shopzi</Text>
          <Text style={styles.subtitle}>Version 1.0.0</Text>

          <Text style={styles.description}>
            Shopzi is a modern e-commerce mobile app built for fast, simple, and secure shopping.
            Browse top products, add to cart instantly, and check out with ease.
          </Text>
        </View>

        {/* Mission Card */}
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <View style={styles.card}>
          <Text style={styles.description}>
            Our goal is to deliver a seamless online shopping experience with:
          </Text>

          <View style={styles.bulletRow}>
            <Ionicons name="checkmark-circle" size={18} color="#2874F0" />
            <Text style={styles.bulletText}>Fast and smooth checkout</Text>
          </View>

          <View style={styles.bulletRow}>
            <Ionicons name="checkmark-circle" size={18} color="#2874F0" />
            <Text style={styles.bulletText}>High-quality curated products</Text>
          </View>

          <View style={styles.bulletRow}>
            <Ionicons name="checkmark-circle" size={18} color="#2874F0" />
            <Text style={styles.bulletText}>Secure payments</Text>
          </View>

          <View style={styles.bulletRow}>
            <Ionicons name="checkmark-circle" size={18} color="#2874F0" />
            <Text style={styles.bulletText}>Easy returns & support</Text>
          </View>
        </View>

        {/* Developer Card */}
        <Text style={styles.sectionTitle}>Developer</Text>
        <View style={styles.card}>
          <Text style={styles.description}>
            This application was developed as part of a mobile development project using:
          </Text>

          <View style={styles.bulletRow}>
            <Ionicons name="logo-react" size={20} color="#2874F0" />
            <Text style={styles.bulletText}>React Native & Expo</Text>
          </View>

          <View style={styles.bulletRow}>
            <Ionicons name="cloud-outline" size={20} color="#2874F0" />
            <Text style={styles.bulletText}>Firebase Authentication & Firestore</Text>
          </View>

          <View style={styles.bulletRow}>
            <Ionicons name="phone-portrait-outline" size={20} color="#2874F0" />
            <Text style={styles.bulletText}>Modern Mobile UI Design</Text>
          </View>

          <Text style={[styles.description, { marginTop: 10 }]}>
            © {new Date().getFullYear()} Shopzi. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

// styles
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
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 15,
    marginTop: 12,
    elevation: 1,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2874F0",
  },

  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
    color: "#666",
  },

  description: {
    marginTop: 10,
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginLeft: 15,
    color: "#222",
  },

  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  bulletText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#444",
  },
});