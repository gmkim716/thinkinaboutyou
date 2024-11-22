import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <Stack />
      <View style={styles.content}>{children}</View>
      <Text style={styles.footer}>Made with 💖 by You</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    textAlign: "center",
    padding: 10,
    backgroundColor: "#eee",
  },
});
