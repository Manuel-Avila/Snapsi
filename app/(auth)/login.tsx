import CustomTextInput from "@/components/ui/CustomTextInput";
import PulsateButton from "@/components/ui/PulsateButton";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
        <View style={styles.inputContainer}>
          <CustomTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
          />
          <CustomTextInput
            value={password}
            onChangeText={setPassword}
            label="Password"
            secureTextEntry={true}
          />
        </View>
        <PulsateButton style={styles.button}>
          <Text style={styles.text}>Log In</Text>
        </PulsateButton>
        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={styles.text}>Or</Text>
          <View style={styles.separator} />
        </View>
        <PulsateButton style={styles.googleButton}>
          <Ionicons name="logo-google" style={styles.googleIcon} />
          <Text style={styles.text}>Google</Text>
        </PulsateButton>
        <Text style={styles.text}>
          Don&apos;t have an account?
          <Link href="/(auth)/signUp" style={styles.link}>
            {" "}
            Sign Up
          </Link>
        </Text>
        <Link href="/(tabs)/home" style={styles.link}>
          {" "}
          home
        </Link>
      </View>
    </TouchableWithoutFeedback>
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
  inputContainer: {
    width: "80%",
    gap: 15,
  },
  button: {
    marginTop: 10,
    padding: 12,
    width: "75%",
    maxWidth: 500,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
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
