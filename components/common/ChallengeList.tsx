import { Text, View } from "@/components/Themed";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import challengesData from "../../assets/json/challenges.json";
import { ChallengeType } from "../../infraestructure/types/alarm";
import ChallengeIcon from "./ChallengeIcon";

type ChallengeData = {
  id: string;
  type: ChallengeType;
  status: "not_started" | "started" | "completed";
};

export default function ChallengeList() {
  const challenges = challengesData as ChallengeData[];

  const handleChallengePress = (type: ChallengeType) => {
    console.log("selected challenge:", type);

    // when click a challenge, send message to db to notify which challenge has been selected
  };

  return (
    <View style={styles.container}>
      <View className="mb-4">
        <Text style={styles.challengesTitle}>Wake-up challenges</Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        data={challenges}
        renderItem={({ item }) => (
          <ChallengeIcon
            key={item.id}
            challenge={{
              type: item.type,
              status: item.status,
            }}
            onPress={handleChallengePress}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  scrollView: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  challengesTitle: {
    fontFamily: "Manrope",
    fontWeight: "bold",
    fontSize: 18,
    color: "#64748B",
  },
});
