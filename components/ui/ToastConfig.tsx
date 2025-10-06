import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

export const toastConfig = {
  success: (props: BaseToastProps) => <SuccessToast {...props} />,
  error: (props: BaseToastProps) => <ErrorToast {...props} />,
};

function SuccessToast({ text1, text2 }: BaseToastProps) {
  return (
    <View style={styles.base}>
      <View style={styles.indicatorSuccess} />
      <Ionicons
        name="checkmark-circle"
        size={24}
        color={COLORS.toastSuccessColor}
        style={styles.icon}
      />
      <View style={styles.content}>
        <Text style={styles.text1}>{text1}</Text>
        <Text style={styles.text2}>{text2}</Text>
      </View>
    </View>
  );
}

function ErrorToast({ text1, text2 }: BaseToastProps) {
  return (
    <View style={styles.base}>
      <View style={styles.indicatorError} />
      <Ionicons
        name="alert-circle"
        size={24}
        color={COLORS.toastErrorColor}
        style={styles.icon}
      />
      <View style={styles.content}>
        <Text style={styles.text1}>{text1}</Text>
        <Text style={styles.text2}>{text2}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "90%",
    backgroundColor: COLORS.toastBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.toastBorderColor,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  indicatorSuccess: {
    width: 4,
    height: "100%",
    backgroundColor: COLORS.toastSuccessColor,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    position: "absolute",
    left: 0,
  },
  indicatorError: {
    width: 4,
    height: "100%",
    backgroundColor: COLORS.toastErrorColor,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    position: "absolute",
    left: 0,
  },
  icon: {
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
  text1: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
  },
  text2: {
    fontSize: 14,
    color: COLORS.gray,
  },
});
