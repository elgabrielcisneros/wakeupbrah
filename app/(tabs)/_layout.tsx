import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Tabs } from "expo-router";
import React from "react";

import AddButton from "@/components/common/AddButton";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { useAlarmStore } from "@/store/useAlarmStore";
import { StyleSheet } from "react-native";
import "../../styles/global.css";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>["name"];
//   color: string;
// }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const alarms = useAlarmStore((state) => state.alarms);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        headerShown: useClientOnlyValue(false, true),
        headerStyle: styles.header,
        headerTitleStyle: styles.headerFontStyle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Alarms",
          headerRight: () => {
            if (alarms.length === 0) {
              return null;
            }
            return <AddButton />;
          },
          tabBarIcon: ({ color }) => (
            <Ionicons name="alarm-outline" color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" color={color} size={28} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 0,
    shadowColor: "transparent",
    elevation: 0,
  },
  headerFontStyle: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#64a7ffff",
  },
});
