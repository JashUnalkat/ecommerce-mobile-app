// screens/HelpSupportScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function HelpSupportScreen() {
  const navigation = useNavigation();
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "Where is my order?",
      answer:
        "You can check your order status by navigating to the Orders section. Delivery updates will appear there.",
    },
    {
      id: 2,
      question: "How do I return a product?",
      answer:
        "Go to Your Orders → Select the product → Tap ‘Return’. Follow the steps shown.",
    },
    {
      id: 3,
      question: "I received a damaged item. What should I do?",
      answer:
        "You can request a replacement or refund by selecting the damaged product in Your Orders.",
    },
    {
      id: 4,
      question: "How do I update my delivery address?",
      answer:
        "Go to Profile → Manage Addresses → Edit or add a new address.",
    },
    {
      id: 5,
      question: "How do I contact support?",
      answer:
        "You can reach us via email, phone, or live chat. Details available below.",
    },
  ];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

        {/* FAQ List */}
        {faqs.map((faq) => (
          <View key={faq.id} style={styles.faqCard}>
            <TouchableOpacity
              style={styles.faqHeader}
              onPress={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
            >
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Ionicons
                name={openFAQ === faq.id ? "chevron-up" : "chevron-down"}
                size={22}
                color="#555"
              />
            </TouchableOpacity>

            {openFAQ === faq.id && (
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            )}
          </View>
        ))}

        <Text style={styles.sectionTitle}>Contact Us</Text>

        {/* Contact Options */}
        <TouchableOpacity style={styles.contactCard}>
          <Ionicons name="call-outline" size={24} color="#2874F0" />
          <Text style={styles.contactText}>Call Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard}>
          <Ionicons name="mail-outline" size={24} color="#2874F0" />
          <Text style={styles.contactText}>Email Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#2874F0" />
          <Text style={styles.contactText}>Live Chat</Text>
        </TouchableOpacity>
      </ScrollView>
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

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 15,
    color: "#222",
  },

  faqCard: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
    padding: 15,
    elevation: 1,
  },

  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  faqQuestion: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
    flex: 1,
  },

  faqAnswer: {
    marginTop: 8,
    color: "#666",
    fontSize: 14,
    lineHeight: 20,
  },

  contactCard: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 1,
  },

  contactText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "600",
    color: "#2874F0",
  },
});