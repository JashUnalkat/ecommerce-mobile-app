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
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
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
      {/* Blue Header */}
      <View style={styles.header} />

      {/* Card Box */}
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

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

        {/* Sign Up Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          activeOpacity={0.7}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        {/* Already have account */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text style={{ color: "#2874F0" }}>Sign In</Text>
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
    height: 260,
    width: "100%",
   backgroundColor:  "#D4AF37",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  card: {
    backgroundColor: "#fff",
    position: "absolute",
    top: 130,
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
    marginBottom: 20,
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

  loginText: {
    textAlign: "center",
    marginTop: 18,
    fontSize: 14,
    color: "#444",
  },
});