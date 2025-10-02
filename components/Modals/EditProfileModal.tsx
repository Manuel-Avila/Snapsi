import { COLORS } from "@/constants/theme";
import { Image } from "expo-image";

import { useImagePicker } from "@/hooks/useImagePicker";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomTextInput from "../ui/CustomTextInput";
import { Modal } from "../ui/Modal";
import PulsateButton from "../ui/PulsateButton";

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

export default function EditProfileModal({ isVisible, onClose }: Props) {
  const [name, setName] = useState("Cirilais");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { pickImage } = useImagePicker();

  const handleSaveChanges = () => {
    onClose();
  };

  const handleSelectImage = async () => {
    const result = await pickImage();

    if (result.status === "success") {
      setImageUri(result.uri);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      backdropOpacity={0.5}
      style={styles.modal}
      contentContainerStyle={styles.container}
    >
      <View style={styles.center}>
        <View style={styles.topBar} />
        <Text style={styles.modalTitle}>Edit Profile</Text>
      </View>
      <PulsateButton onPress={handleSelectImage}>
        <Image
          style={styles.profileImage}
          source={
            imageUri
              ? { uri: imageUri }
              : require("@/assets/images/profile-image-placeholder.webp")
          }
          contentFit="cover"
          cachePolicy={"memory-disk"}
          transition={500}
        />
      </PulsateButton>
      <CustomTextInput value={name} onChangeText={setName} label="Username" />

      <CustomTextInput
        value={description}
        onChangeText={setDescription}
        label="Description"
      />

      <PulsateButton style={styles.saveButton}>
        <Text style={styles.text} onPress={handleSaveChanges}>
          Save Changes
        </Text>
      </PulsateButton>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: COLORS.commentsBackground,
    padding: 25,
    gap: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
  saveButton: {
    marginTop: 10,
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: COLORS.text,
  },
});
