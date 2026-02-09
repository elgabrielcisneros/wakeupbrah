import { Text, View } from "@/components/Themed";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
} from "react-native";
import { Challenge, ChallengeType } from "../../infraestructure/types/alarm";

interface ChallengeIconProps {
  challenge: Challenge;
  onPress?: (type: ChallengeType) => void;
}

export default function ChallengeIcon({
  challenge,
  onPress,
}: ChallengeIconProps) {
  const getIconForType = (type: ChallengeType) => {
    const icons: Record<ChallengeType, ImageSourcePropType> = {
      math: require("../../assets/images/icons/math.png"),
      qr: require("../../assets/images/icons/qr.png"),
      walk: require("../../assets/images/icons/walk.png"),
      map: require("../../assets/images/icons/map.png"),
      type: require("../../assets/images/icons/type.png"),
    };
    return icons[type];
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.iconContainer}
        className="flex items-center justify-center"
      >
        <Pressable onPress={() => onPress?.(challenge.type)}>
          <Image
            source={getIconForType(challenge.type)}
            style={{ width: 20, height: 20 }}
          />
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
    width: 62,
    height: 62,
  },
  label: {
    fontFamily: "Manrope",
    fontWeight: "bold",
    color: "#64748B",
    fontSize: 12,
    marginTop: 4,
  },
});
