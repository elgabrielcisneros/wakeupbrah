import AlarmItem from "@/components/common/AlarmItem";
import { View } from "@/components/Themed";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import "../styles/global.css";

export default function TabOneScreen() {
  return (
    <View className="flex-1 p-5">
      {/* When we have content, show the list */}
      <FlatList
        data={[
          {
            key: "1",
            title: "Alarm",
            time: "05:00 AM",
          },
        ]}
        renderItem={({ item }) => <AlarmItem alarm={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
