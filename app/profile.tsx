import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = () => {
  // 프로필 사진 상태
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // 내가 보낸 알람 목록
  const [sentAlarms, setSentAlarms] = useState([
    {
      id: "1",
      message: "하트를 10번 눌러 알람을 보냈습니다!",
      time: "2024-11-22 10:00",
    },
    {
      id: "2",
      message: "하트를 10번 눌러 알람을 보냈습니다!",
      time: "2024-11-21 15:30",
    },
    {
      id: "3",
      message: "하트를 10번 눌러 알람을 보냈습니다!",
      time: "2024-11-20 09:00",
    },
  ]);

  // 프로필 사진 변경 핸들러
  const handleChangeProfileImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "권한 필요",
        "프로필 사진을 변경하려면 갤러리 접근 권한이 필요합니다."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); // 선택한 이미지의 URI 저장
    }
  };

  // 알람 항목 렌더링
  const renderAlarmItem = ({
    item,
  }: {
    item: { id: string; message: string; time: string };
  }) => (
    <View style={styles.alarmItem}>
      <Text style={styles.alarmMessage}>{item.message}</Text>
      <Text style={styles.alarmTime}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 프로필 섹션 */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={handleChangeProfileImage}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("./assets/default-profile.png") // 기본 프로필 이미지
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.profileText}>프로필 사진 변경</Text>
      </View>

      {/* 내가 보낸 알람 목록 */}
      <View style={styles.alarmsSection}>
        <Text style={styles.sectionTitle}>내가 보낸 알람</Text>
        <FlatList
          data={sentAlarms}
          keyExtractor={(item) => item.id}
          renderItem={renderAlarmItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>보낸 알람이 없습니다.</Text>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileText: {
    fontSize: 16,
    color: "tomato",
  },
  alarmsSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  alarmItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  alarmMessage: {
    fontSize: 16,
    marginBottom: 5,
  },
  alarmTime: {
    fontSize: 14,
    color: "#666",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});

export default ProfileScreen;
