import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Modal, StyleSheet, View } from "react-native";
import PulsateButton from "../ui/PulsateButton";

export default function SelectedImageModal({ visible, onClose, imageUrl }) {
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <PulsateButton onPress={onClose}>
            <Ionicons name="close" style={styles.closeIcon} />
          </PulsateButton>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            contentFit="cover"
            cachePolicy={"memory-disk"}
            transition={500}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.modalOverlay,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 5,
  },
  closeIcon: {
    margin: 5,
    textAlign: "right",
    fontSize: 27,
    color: "white",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
