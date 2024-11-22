import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { sendAlert } from "./src/api/connection";

const HomeScreen = () => {
  const [clickCount, setClickCount] = useState(0); // 클릭 횟수
  const [timerActive, setTimerActive] = useState(false); // 타이머 활성 상태
  const timerRef = useRef<NodeJS.Timeout | null>(null); // 타이머 참조

  // 하트 클릭 핸들러
  const handleHeartClick = async () => {
    // 타이머가 활성화되지 않은 경우 시작
    if (!timerActive) {
      setTimerActive(true); // 타이머 활성화
      timerRef.current = setTimeout(() => {
        // 10초 후 초기화
        setClickCount(0);
        setTimerActive(false);
      }, 10000); // 10초 타이머
    }

    setClickCount((prev) => prev + 1); // 클릭 횟수 증가

    // 클릭 횟수가 10번 이상이면 알람 전송
    if (clickCount + 1 >= 10) {
      clearTimeout(timerRef.current!); // 타이머 정리
      setClickCount(0); // 클릭 횟수 초기화
      setTimerActive(false); // 타이머 상태 초기화
      try {
        await sendAlert("targetUserId"); // 상대방에게 알람 API 호출
        Alert.alert("알람 전송 완료", "상대방에게 알람을 전송했습니다!");
      } catch (error) {
        Alert.alert("알람 전송 실패", "알람을 전송할 수 없습니다.");
      }
    }
  };

  // 컴포넌트가 언마운트될 때 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>연결된 사용자에게 알람 보내기</Text>
      <TouchableOpacity style={styles.heartButton} onPress={handleHeartClick}>
        <Ionicons name="heart" size={64} color="tomato" />
      </TouchableOpacity>
      <Text style={styles.counterText}>
        클릭 횟수: {clickCount} (10초 내 10번 클릭 시 알람 전송)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  heartButton: {
    marginBottom: 20,
  },
  counterText: {
    fontSize: 16,
    color: "#333",
  },
});

export default HomeScreen;
