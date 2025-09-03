import Post from "@/components/Post";
import StoriesContainer from "@/components/StoriesContainer";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>App Name</Text>
        <TouchableOpacity>
          <Ionicons name="log-out-outline" style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>
      <StoriesContainer />
      <Post />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    gap: 20,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  logoutIcon: {
    color: COLORS.text,
    fontSize: 24,
  },
});
