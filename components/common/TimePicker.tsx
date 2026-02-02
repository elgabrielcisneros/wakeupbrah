import { View } from "@/components/Themed";
import { useState } from "react";
import DatePicker from "react-native-date-picker";

export default function TimePicker() {
  const [time, setTime] = useState(new Date());

  return (
    <View>
      <DatePicker date={time} onDateChange={setTime} />
    </View>
  );
}
