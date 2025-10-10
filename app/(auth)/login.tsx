import CustomTextInput from "@/components/ui/CustomTextInput";
import PulsateButton from "@/components/ui/PulsateButton";
import { COLORS } from "@/constants/theme";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { useMutation } from "react-query";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { loginSchema } from "@/validators/authValidator";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const { submitForm, isSubmitting, errors } = useFormSubmit();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Login Successful!",
        text2: "Welcome back.",
      });
      router.replace("/(tabs)/home");
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        error.response?.data?.message || "An error occurred during login.";

      Toast.show({
        type: "error",
        text1: "Login Error",
        text2: errorMessage,
      });
    },
  });

  const handleSubmit = async () => {
    Keyboard.dismiss();

    const formData = {
      email: email.trim(),
      password: password,
    };

    await submitForm(formData, loginSchema, mutate);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
        <View style={styles.inputContainer}>
          <CustomTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />
          <CustomTextInput
            value={password}
            onChangeText={setPassword}
            label="Password"
            secureTextEntry={true}
            error={errors.password}
          />
        </View>
        <PulsateButton
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={styles.button}
        >
          <Text style={styles.text}>Log In</Text>
        </PulsateButton>
        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={styles.text}>Or</Text>
          <View style={styles.separator} />
        </View>
        <Text style={styles.text}>
          Don&apos;t have an account?
          <Link href="/(auth)/register" style={styles.link}>
            {" "}
            Sign Up
          </Link>
        </Text>
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
    marginTop: 20,
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
  link: {
    color: COLORS.primary,
  },
});
