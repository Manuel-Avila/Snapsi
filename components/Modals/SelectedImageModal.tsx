import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import { Modal } from "../ui/Modal";
import PulsateButton from "../ui/PulsateButton";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  imageUrl: string;
};

export default function SelectedImageModal({
  isVisible,
  onClose,
  imageUrl,
}: Props) {
  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      backdropOpacity={0.5}
      style={styles.modal}
      contentContainerStyle={styles.container}
    >
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
  },
  container: {
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
