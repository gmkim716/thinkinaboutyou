import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { sendAlert } from "./src/api/connection";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [clickCount, setClickCount] = useState(0); // 클릭 횟수
  const [timerActive, setTimerActive] = useState(false); // 타이머 활성 상태
  const [countdown, setCountdown] = useState(10); // 남은 카운트다운 시간
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // 알림 메시지

  const scaleValue = useRef(new Animated.Value(1)).current; // 애니메이션 크기
  const countdownRef = useRef<NodeJS.Timeout | null>(null); // 카운트다운 타이머 참조

  console.log("countdown", countdown);

  // 알림 전송 처리 함수
  const handleSendAlert = async () => {
    if (timerActive) return; // 타이머 활성 상태에서는 실행 방지

    try {
      setTimerActive(true); // 버튼 비활성화
      await sendAlert("targetUserId"); // 상대방에게 알람 API 호출
      setAlertMessage("알람 전송 완료!"); // 알람 전송 성공 메시지
      startCountdown(10); // 10초 카운트다운 시작
    } catch (error) {
      setAlertMessage("알람 전송 실패!"); // 알람 전송 실패 메시지
      setTimerActive(false); // 실패 시 버튼 다시 활성화
    } finally {
      setTimeout(() => setAlertMessage(null), 2000); // 2초 후 메시지 초기화
    }
  };

  // 10초 제한 카운트다운 시작
  const startCountdown = (duration: number) => {
    setCountdown(duration); // 초기 카운트다운 값 설정

    // 기존 interval이 존재하면 정리
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }

    // 타이머 시작
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current!); // 타이머 종료
          countdownRef.current = null; // 타이머 참조 초기화
          setTimerActive(false); // 버튼 활성화
          return 0; // 카운트다운 종료
        }
        return prev - 1; // 카운트다운 감소
      });
    }, 1000); // 1초마다 감소
  };

  // 하트 클릭 핸들러
  const handleHeartClick = async () => {
    if (timerActive) return; // 타이머가 활성된 상태에서는 클릭 방지

    setClickCount((prev) => prev + 1); // 클릭 횟수 증가

    if (clickCount + 1 >= 10) {
      setClickCount(0); // 클릭 횟수 초기화
      handleSendAlert(); // 알람 전송
    }
  };

  // 버튼 누르기 시작 시 애니메이션
  const handlePressIn = () => {
    if (timerActive) return; // 타이머 활성 상태면 동작 방지

    // 애니메이션 시작 (크기를 1.5배로 키우기)
    Animated.spring(scaleValue, {
      toValue: 1.5, // 최종 크기
      useNativeDriver: true, // 네이티브 드라이버 사용
    }).start();
  };

  // 버튼 누르기 끝날 때
  const handlePressOut = () => {
    if (timerActive) return; // 타이머가 활성된 상태에서는 동작 방지

    // 애니메이션 초기화 (크기를 원래대로 복구)
    Animated.spring(scaleValue, {
      toValue: 1, // 원래 크기
      useNativeDriver: true, // 네이티브 드라이버 사용
    }).start();
  };

  // 컴포넌트가 언마운트될 때 타이머 정리
  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* 초대 버튼 */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("Invite")} // 초대 화면으로 이동
      >
        <Ionicons name="person-add" size={28} color="white" />
      </TouchableOpacity>

      {/* UI 추가 메시지 */}
      {alertMessage && <Text style={styles.alertMessage}>{alertMessage}</Text>}

      {/* 클릭 횟수 또는 제한 시간 표시 */}
      {!timerActive ? (
        <Text style={styles.counterText}>
          클릭 횟수: {clickCount} (10초 내 10번 클릭 시 알람 전송)
        </Text>
      ) : (
        <Text style={styles.counterText}>
          알람이 전송되었습니다. {countdown}초 후 다시 보낼 수 있습니다.
        </Text>
      )}

      {/* 하트 버튼 */}
      <Animated.View
        style={[
          styles.heartButton,
          { transform: [{ scale: scaleValue }] }, // 크기 애니메이션 적용
        ]}
      >
        <TouchableOpacity
          onPress={handleHeartClick} // 클릭 이벤트 처리
          onPressIn={handlePressIn} // 버튼 누르기 시작
          onPressOut={handlePressOut} // 버튼 누르기 끝
          disabled={timerActive} // 타이머 활성 상태에서는 버튼 비활성화
        >
          <Ionicons
            name="heart"
            size={64}
            color={timerActive ? "gray" : "tomato"} // 타이머 활성화 시 색상 변경
          />
        </TouchableOpacity>
      </Animated.View>
      <Text style={styles.title}>knock knock!</Text>
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
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "tomato",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  heartButton: {
    marginBottom: 20,
  },
  alertMessage: {
    fontSize: 18,
    color: "green",
    marginBottom: 10,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.5, // 버튼 비활성화 시 투명도 조절
  },
  counterText: {
    fontSize: 16,
    color: "#333",
  },
  countDownText: {
    fontSize: 16,
    color: "tomato",
    fontWeight: "bold",
  },
});

export default HomeScreen;
