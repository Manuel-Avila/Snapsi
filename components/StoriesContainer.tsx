import { FlatList } from "react-native";
import Story from "./Story";

export default function StoriesContainer() {
  const stories = [1, 2, 3, 4, 5];
  return (
    <FlatList
      data={stories}
      renderItem={({ item }) => <Story />}
      keyExtractor={(_, i) => i.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15, gap: 10 }}
      style={{ flexGrow: 0 }}
    />
  );
}
