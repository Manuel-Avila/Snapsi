import CustomTextInput from "@/components/ui/CustomTextInput";
import DropdownInput from "@/components/ui/DropdownInput";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <CustomTextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
        />
        <CustomTextInput label="Email" value={email} onChangeText={setEmail} />
        <DropdownInput
          label="Gender"
          value={gender}
          onSelect={setGender}
          options={["Male", "Female", "Other"]}
        />
        <CustomTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <CustomTextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Sign Up</Text>
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
        Already have an account?
        <Link href="/(auth)/login" style={styles.link}>
          {" "}
          Log In
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
