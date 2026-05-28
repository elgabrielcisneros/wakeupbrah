import AlarmItem from "@/components/common/AlarmItem";
import EmptyContent from "@/components/common/EmptyContent";
import { View } from "@/components/Themed";
import { useAlarmStore } from "@/store/useAlarmStore";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet } from "react-native";
import "../../styles/global.css";

export default function TabOneScreen() {
  const alarms = useAlarmStore((state) => state.alarms);

  return (
    <View className="flex-1 p-5">
      {alarms.length > 0 ? (
        <FlashList
          data={alarms}
          renderItem={({ item }) => <AlarmItem alarm={item} />}
          ListEmptyComponent={<EmptyContent />}
          contentContainerStyle={alarms.length === 0 ? styles.container : {}}
        />
      ) : (
        <EmptyContent />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
