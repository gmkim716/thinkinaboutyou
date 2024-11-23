import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import HomeScreen from "../app/index"; // 홈 화면
import ProfileScreen from "../app/profile"; // 프로필 화면
import SettingsScreen from "../app/settings/index"; // 설정 화면
import NotificationScreen from "../app/src/notifications"; // 알림 화면

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const [notificationCount, setNotificationCount] = useState(2); // 알림 개수 상태

  // 알림 버튼 컴포넌트
  const NotificationButton = ({ navigation }: any) => (
    <TouchableOpacity
      style={styles.notificationButton}
      onPress={() => navigation.navigate("Notifications")} // 알림 화면으로 이동
    >
      <Text style={styles.notificationText}>
        🔔 {notificationCount > 0 ? notificationCount : ""}
      </Text>
    </TouchableOpacity>
  );

  // Home Stack Navigator
  const HomeStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => <NotificationButton navigation={navigation} />,
          title: "Home",
        })}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ title: "알림 내역" }}
      />
    </Stack.Navigator>
  );

  // Profile Stack Navigator
  const ProfileStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerRight: () => <NotificationButton navigation={navigation} />,
          title: "Profile",
        })}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ title: "알림 내역" }}
      />
    </Stack.Navigator>
  );

  // Settings Stack Navigator
  const SettingsStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation }) => ({
          headerRight: () => <NotificationButton navigation={navigation} />,
          title: "Settings",
        })}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ title: "알림 내역" }}
      />
    </Stack.Navigator>
  );

  return (
    <Tab.Navigator
      initialRouteName="Home" // 첫 화면으로 Home 설정
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 60, // 탭바 높이 조정
        },
      })}
    >
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarItemStyle: { flex: 1 }, // 좌측으로 정렬
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarItemStyle: {
            flex: 2, // 중앙 배치
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarLabel: "Settings",
          headerShown: false,
          tabBarItemStyle: { flex: 1 }, // 우측으로 정렬
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  notificationButton: {
    marginRight: 15,
  },
  notificationText: {
    fontSize: 18,
    color: "tomato",
  },
});
