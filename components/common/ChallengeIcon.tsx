import { Text, View } from "@/components/Themed";
import { Image, Pressable, StyleSheet } from "react-native";
import {
  ChallengeIconProps,
  getIconForType,
} from "../../infraestructure/types/alarm";

export default function ChallengeIcon({
  challenge,
  onSelect,
  isSelected,
}: ChallengeIconProps) {
  return (
    <View style={styles.container}>
      <View
        style={[styles.iconContainer, isSelected ? styles.iconPressed : null]}
        className="flex items-center justify-center"
      >
        <Pressable onPress={() => onSelect?.(challenge.type)}>
          <Image source={getIconForType(challenge.type)} />
          <Text style={styles.label} className="capitalize">
            {challenge.type}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  iconContainer: {
    backgroundColor: "#1E293B",
    borderRadius: 20,
    padding: 10,
    width: 65,
    height: 65,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconPressed: {
    borderColor: "#94A3B8",
    borderWidth: 1,
  },
  label: {
    fontFamily: "Manrope",
    color: "#64748B",
    fontSize: 12,
    marginTop: 4,
  },
});
