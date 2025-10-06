import CustomTextInput from "@/components/ui/CustomTextInput";
import DropdownInput from "@/components/ui/DropdownInput";
import PulsateButton from "@/components/ui/PulsateButton";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { registerSchema } from "@/validators/authValidator";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import Toast from "react-native-toast-message";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const { submitForm, isSubmitting, errors } = useFormSubmit();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const genderOptions = ["Male", "Female", "Other"];

  const { mutate } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Registration Successful !",
        text2: "You can now log in with your credentials.",
      });

      router.push("/(auth)/login");
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during registration.";

      Toast.show({
        type: "error",
        text1: "Registration Error",
        text2: errorMessage,
      });
    },
  });

  const handleSubmit = async () => {
    Keyboard.dismiss();

    const formData = {
      username: username.trim(),
      email: email.trim(),
      password: password,
      confirmPassword: confirmPassword,
      age: age === "" ? null : Number(age),
      gender: gender.toLowerCase(),
    };

    await submitForm(formData, registerSchema, mutate);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <CustomTextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            error={errors.username}
          />
          <CustomTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />
          <View style={styles.ageAndGenderContainer}>
            <DropdownInput
              label="Gender"
              value={gender}
              onSelect={setGender}
              options={genderOptions}
              style={styles.flex}
              error={errors.gender}
            />
            <CustomTextInput
              label="Age"
              value={age}
              onChangeText={setAge}
              style={styles.flex}
              keyboardType="number-pad"
              maxLength={3}
              error={errors.age}
            />
          </View>
          <CustomTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            error={errors.password}
          />
          <CustomTextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            error={errors.confirmPassword}
          />
        </View>
        <PulsateButton
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={styles.button}
        >
          <Text style={styles.text}>Sign Up</Text>
        </PulsateButton>
        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={styles.text}>Or</Text>
          <View style={styles.separator} />
        </View>
        <PulsateButton style={styles.googleButton} disabled={isSubmitting}>
          <Ionicons name="logo-google" style={styles.googleIcon} />
          <Text style={styles.text}>Google</Text>
        </PulsateButton>
        <Text style={styles.text}>
          Already have an account?
          <Link href="/(auth)/login" style={styles.link}>
            {" "}
            Log In
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
    gap: 20,
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
  ageAndGenderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  flex: {
    flex: 1,
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
