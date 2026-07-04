import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      alert("Please enter email & password");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Gradient Header */}
      <View style={styles.header} />

      {/* Card Box */}
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>

        {/* Email */}
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={18} color="#777" />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password */}
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={18} color="#777" />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          activeOpacity={0.7}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        {/* Go to Register */}
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.signupText}>
            Don’t have an account? <Text style={{ color: "#2874F0" }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3EB489",
  },

  header: {
    height: 280,
    width: "100%",
   backgroundColor:  "#D4AF37",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  card: {
    backgroundColor: "#fff",
    position: "absolute",
    top: 140,
    width: "85%",
    alignSelf: "center",
    padding: 25,
    borderRadius: 20,
    elevation: 8,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    marginTop: 4,
    marginBottom: 22,
  },

  inputBox: {
    flexDirection: "row",
    backgroundColor: "#F4F6FA",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 14,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: "#333",
  },

  button: {
   backgroundColor:  "#D4AF37",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  signupText: {
    textAlign: "center",
    marginTop: 18,
    fontSize: 14,
    color: "#444",
  },
});