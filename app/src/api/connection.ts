import axios from "axios";

const API = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
});

export const sendConnectionRequest = async (toUserId: string) => {
  const response = await API.post("/connections", { toUser: toUserId });
  return response.data;
};

// 요청 목록 가져오기
export const getConnectionRequests = async () => {
  try {
    const response = await API.get("/connections/requests");
    return response.data; // 요청 목록 반환
  } catch (error) {
    console.error("요청 목록 가져오기 실패:", error);
    throw new Error("요청 목록을 가져올 수 없습니다.");
  }
};

// 요청 상태 업데이트
export const updateConnectionRequest = async (
  requestId: string,
  action: "accept" | "reject"
) => {
  try {
    const response = await API.patch(`/connections/${requestId}`, { action });
    return response.data; // 성공 메시지 반환
  } catch (error) {
    console.error("요청 상태 업데이트 실패:", error);
    throw new Error("요청 상태를 업데이트할 수 없습니다.");
  }
};

/**
 * POST /alerts
 * request body: { toUser: string, message: string }
 * example: { toUser: "targetUserId", message: "하트를 10번 눌러 당신에게 알람을 보냈습니다!" }
 */
export const sendAlert = async (toUserId: string) => {
  try {
    const response = await API.post("/alerts", {
      toUser: toUserId, // 알림을 받을 사용자 ID
      message: "하트를 10번 눌러 당신에게 알람을 보냈습니다!", // 알림 메시지
    });
    return response.data; // 성공 시 응답 데이터 반환
  } catch (error) {
    console.error("알림 전송 실패:", error);
    throw new Error("알림을 전송할 수 없습니다.");
  }
};
