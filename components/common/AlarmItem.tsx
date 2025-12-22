import { StyleSheet, Text, View } from 'react-native';
import "../../app/styles/global.css";

export default function AlarmItem({alarm}: any) {
    return (
      <View>
        <Text>{alarm.title}</Text>
        <Text>{alarm.time}</Text>
      </View>
    )
  }

const styles = StyleSheet.create({
    
})