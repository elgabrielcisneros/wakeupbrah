import { Text, View } from "@/components/Themed";
import { updateAlarmStatus } from "@/db/database";
import { Image, StyleSheet } from "react-native";
import { Alarm } from "../../infraestructure/types/alarm";
import { useAlarmStore } from "../../store/useAlarmStore";
import "../../styles/global.css";
import { Toggle } from "./Toggle";

export default function AlarmItem({ alarm }: { alarm: Alarm }) {
  const updateAlarm = useAlarmStore((state) => state.updateAlarm);
  const isEnabled = alarm.status === "enabled";

  const handleToggle = async () => {
    const newStatus = isEnabled ? "disabled" : "enabled";
    // 1. Update in-memory store immediately (optimistic UI)
    updateAlarm({ ...alarm, status: newStatus });
    // 2. Persist to SQLite so the change survives a restart
    await updateAlarmStatus(alarm.id, newStatus === "enabled");
    console.info("Alarm status changed to:", newStatus);
  };

  return (
    <View style={styles.cardContainer}>
      <Text
        style={styles.title}
        className="text-3xl"
        lightColor="#000000ff"
        darkColor="rgba(255, 255, 255, 1)"
      >
        {alarm.title}
      </Text>
      <View className="flex flex-row">
        <Text
          className="text-xl mr-2"
          style={styles.time}
          lightColor="#000000ff"
          darkColor="rgba(255, 255, 255, 1)"
        >
          {new Date(alarm.time).toLocaleTimeString(["en-US"], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        <Image className="mt-1" source={alarm.challenge.icon} />
        <View style={styles.toggleContainer}>
          <Toggle
            value={isEnabled}
            onPress={handleToggle}
            trackWidth={60}
            trackHeight={28}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
    borderRadius: 24,
    borderColor: "#566E97",
    borderWidth: 1,
    marginBottom: 16,
  },
  title: {
    fontFamily: "inter",
  },
  time: {
    fontWeight: "bold",
    fontFamily: "inter",
  },
  toggleContainer: {
    justifyContent: "space-between",
    marginLeft: "auto",
    bottom: 5,
  },
});
