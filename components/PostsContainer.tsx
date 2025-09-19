import { Image } from "expo-image";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import SelectedImageModal from "./Modals/SelectedImageModal";
import NoItems from "./NoItems";

const numColumns = 3;
const imageMargin = 1;
const imageWidth =
  (Dimensions.get("window").width - imageMargin * (numColumns + 1)) /
  numColumns;

export default function PostsContainer({ data, noDataIcon, noDataMessage }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleCloseSelectedImageModal = () => setSelectedImage(null);

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <NoItems icon={noDataIcon} message={noDataMessage} />
      ) : (
        <FlatList
          data={data}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedImage(item.url)}
            >
              <Image
                style={styles.bookmarkImage}
                source={{
                  uri: item.url,
                }}
                cachePolicy="memory-disk"
                transition={500}
                contentFit="cover"
              />
            </TouchableOpacity>
          )}
          keyExtractor={(_, i) => i.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}

      <SelectedImageModal
        visible={!!selectedImage}
        onClose={handleCloseSelectedImageModal}
        imageUrl={selectedImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookmarkImage: {
    width: imageWidth,
    aspectRatio: 1,
    margin: imageMargin,
  },
});
