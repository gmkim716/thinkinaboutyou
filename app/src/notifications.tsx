import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([
    { id: "1", message: "User A님이 하트를 보냈습니다." },
    { id: "2", message: "User B님이 초대를 보냈습니다." },
  ]);

  const renderItem = ({ item }: any) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationMessage}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>알림 내역</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  notificationItem: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  notificationMessage: {
    fontSize: 16,
  },
});

export default NotificationScreen;
