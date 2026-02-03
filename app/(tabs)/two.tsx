import { Text, View } from "@/components/Themed";
import { StyleSheet } from "react-native";
import "../../styles/global.css";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text className="text-center" style={styles.title}>
        Made with ❤️ by elgabrielcisneros
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: "Manrope",
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
