import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        placeholderTextColor={COLORS.gray}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        placeholderTextColor={COLORS.gray}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Log In</Text>
      </TouchableOpacity>
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.text}>Or</Text>
        <View style={styles.separator} />
      </View>
      <TouchableOpacity style={styles.googleButton}>
        <Ionicons name="logo-google" style={styles.googleIcon} />
        <Text style={styles.text}>Google</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        Don&apos;t have an account?
        <Link href="/(auth)/signUp" style={styles.link}>
          {" "}
          Sign Up
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: COLORS.text,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: COLORS.gray,
    color: COLORS.text,
    width: "80%",
    maxWidth: 500,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    padding: 12,
    width: "75%",
    maxWidth: 500,
  },
  text: {
    color: COLORS.text,
    textAlign: "center",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    gap: 10,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.text,
    flex: 1,
  },
  googleButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.text,
    borderRadius: 15,
    padding: 12,
  },
  googleIcon: {
    fontSize: 20,
    color: COLORS.text,
  },
  link: {
    color: COLORS.primary,
  },
});
