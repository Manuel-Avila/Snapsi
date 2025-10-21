import { COLORS } from "@/constants/theme";
import { Image } from "expo-image";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import NoItems from "./NoItems";
import { IPost } from "@/types/IPost";
import PostModal from "./Modals/PostModal";

type Props = {
  data: IPost[];
  refetch: () => void;
  isFetching: boolean;
  noDataIcon: string;
  noDataMessage: string;
};

const numColumns = 3;
const imageMargin = 1;
const imageWidth =
  (Dimensions.get("window").width - imageMargin * (numColumns + 1)) /
  numColumns;

export default function PostsContainer({
  data,
  refetch,
  isFetching,
  noDataIcon,
  noDataMessage,
}: Props) {
  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <NoItems icon={noDataIcon} message={noDataMessage} />
      ) : (
        <FlatList
          data={data}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.8}>
              <Image
                style={styles.bookmarkImage}
                source={{
                  uri: item.image_url,
                }}
                cachePolicy="memory-disk"
                transition={500}
                contentFit="cover"
              />
            </TouchableOpacity>
          )}
          keyExtractor={(_, i) => i.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={refetch}
              colors={[COLORS.primary]}
              progressBackgroundColor={COLORS.background}
              tintColor={COLORS.primary}
            />
          }
        />
      )}
      <PostModal />
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
