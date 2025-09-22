import { COLORS } from "@/constants/theme";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomTextInput from "../ui/CustomTextInput";

export default function EditProfileModal({ visible, onClose }) {
  const [name, setName] = useState("Cirilais");
  const [description, setDescription] = useState("");

  const handleSaveChanges = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalContainer}>
          <View style={styles.center}>
            <View style={styles.topBar} />
            <Text style={styles.modalTitle}>Edit Profile</Text>
          </View>

          <CustomTextInput
            value={name}
            onChangeText={setName}
            label="Username"
          />

          <CustomTextInput
            value={description}
            onChangeText={setDescription}
            label="Description"
          />

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.text} onPress={handleSaveChanges}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.modalOverlay,
  },
  modalContainer: {
    padding: 15,
    gap: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: COLORS.commentsBackground,
  },
  center: {
    alignItems: "center",
    gap: 10,
  },
  modalTitle: {
    color: COLORS.text,
    fontWeight: "bold",
  },
  topBar: {
    height: 4,
    backgroundColor: COLORS.gray,
    width: 40,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 15,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: COLORS.text,
  },
});
