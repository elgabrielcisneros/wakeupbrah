import { Text, View } from "@/components/Themed";
import { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
} from "react-native";
import { Challenge, ChallengeType } from "../../infraestructure/types/alarm";

interface ChallengeIconProps {
  challenge: Challenge;
  onSelect?: (type: ChallengeType) => void;
}

export default function ChallengeIcon({
  challenge,
  onSelect,
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

  const [isSelected, setSelected] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={[styles.iconContainer, isSelected ? styles.iconPressed : null]}
        className="flex items-center justify-center"
      >
        <Pressable
          onPress={() => [setSelected(!isSelected), onSelect?.(challenge.type)]}
        >
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
