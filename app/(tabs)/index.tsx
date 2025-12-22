import AlarmItem from "@/components/common/AlarmItem";
import { View } from "@/components/Themed";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import "../styles/global.css";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
     <FlatList data = {[
        {
          key: "1",
          title: "Alarm 1",
          time: "08:00 AM",
        },
     ]}
     renderItem = {({item}) => (
      <AlarmItem alarm={item}/>
    )}
     />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
