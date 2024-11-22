import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import {
  getConnectionRequests,
  updateConnectionRequest,
} from "./src/api/connection";

const RequestListScreen = () => {
  const [requests, setRequests] = useState([]);

  // 받은 요청 목록 가져오기
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getConnectionRequests(); // API 호출
        setRequests(data);
      } catch (error) {
        Alert.alert("오류 발생", "요청 목록을 가져올 수 없습니다.");
      }
    };
    fetchRequests();
  }, []);

  // 요청 상태 업데이트 함수
  const handleRequest = async (
    requestId: string,
    action: "accept" | "reject"
  ) => {
    try {
      await updateConnectionRequest(requestId, action); // API 호출
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === requestId
            ? { ...req, status: action === "accept" ? "accepted" : "rejected" }
            : req
        )
      );
      Alert.alert(
        "요청 처리 완료",
        `요청이 ${action === "accept" ? "수락" : "거절"}되었습니다.`
      );
    } catch (error) {
      Alert.alert("오류 발생", "요청을 처리할 수 없습니다.");
    }
  };

  // 요청 목록 렌더링
  const renderItem = ({
    item,
  }: {
    item: { id: string; fromUser: string; status: string };
  }) => (
    <View style={styles.requestContainer}>
      <Text style={styles.requestText}>{item.fromUser}님의 요청</Text>
      {item.status === "pending" ? (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.acceptButton]}
            onPress={() => handleRequest(item.id, "accept")}
          >
            <Text style={styles.buttonText}>수락</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            onPress={() => handleRequest(item.id, "reject")}
          >
            <Text style={styles.buttonText}>거절</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.statusText}>
          {item.status === "accepted" ? "수락됨" : "거절됨"}
        </Text>
      )}
    </View>
  );

  return (
    <FlatList
      data={requests}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  requestContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  requestText: {
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: "row",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 8,
  },
  acceptButton: {
    backgroundColor: "green",
  },
  rejectButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
  },
  statusText: {
    fontSize: 14,
    color: "gray",
  },
});

export default RequestListScreen;
