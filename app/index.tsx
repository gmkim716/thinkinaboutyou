// 홈 화면(root 화면)

import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weclome to 홈 화면</Text>
      <Button title="프로파일 이동" onPress={() => router.push("/profile")} />
      <Button title="설정" onPress={() => router.push("/settings")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
