import { COLORS } from "@/constants/theme";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditProfileModal({ visible, onClose }) {
  const [name, setName] = useState("");
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
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            ></TextInput>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
            ></TextInput>
          </View>
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
  inputGroup: {
    borderWidth: 0.2,
    borderColor: COLORS.gray,
    borderRadius: 15,
    padding: 12,
  },
  inputLabel: {
    color: COLORS.gray,
  },
  input: {
    color: COLORS.text,
    paddingVertical: 3,
    paddingHorizontal: 0,
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
