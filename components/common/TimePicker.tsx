import { View } from "@/components/Themed";
import { useState } from "react";
import { StyleSheet } from "react-native";
import DatePicker from "react-native-date-picker";
import "../../styles/global.css";

export default function TimePicker() {
  const [time, setTime] = useState(new Date());

  return (
    <View>
      <View className="flex items-center justify-center mt-10">
        <DatePicker
          date={time}
          onDateChange={setTime}
          mode="time"
          style={styles.datePicker}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  datePicker: {
    width: 400,
    height: 200,
    color: "#64a7ffff",
  },
});
