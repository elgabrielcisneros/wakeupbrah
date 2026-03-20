import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export type ToggleProps = {
  /** Whether the toggle is on */
  value: boolean;
  /** Called when the toggle is pressed */
  onPress: () => void;
  /** Width of the track (default: 52) */
  trackWidth?: number;
  /** Height of the track (default: 30) */
  trackHeight?: number;
  /** Diameter of the thumb circle (default: trackHeight - padding*2) */
  thumbSize?: number;
  /** Internal padding between track edge and thumb (default: 3) */
  padding?: number;
  /** Track color when on (default: "#334155") */
  trackColorOn?: string;
  /** Track color when off (default: "#767577") */
  trackColorOff?: string;
  /** Thumb color (default: "#f4f3f4") */
  thumbColor?: string;
  /** Animation duration in ms (default: 200) */
  duration?: number;
  /** Additional style for the outer container */
  style?: StyleProp<ViewStyle>;
};

export function Toggle({
  value,
  onPress,
  trackWidth = 60,
  trackHeight = 30,
  thumbSize,
  padding = 3,
  trackColorOn = "#334155",
  trackColorOff = "#767577",
  thumbColor = "#f4f3f4",
  duration = 200,
  style,
}: ToggleProps) {
  const resolvedThumbSize = thumbSize ?? trackHeight - padding * 2;

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      Number(value),
      [0, 1],
      [trackColorOff, trackColorOn],
    );

    return {
      backgroundColor: withTiming(color, { duration }),
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      Number(value),
      [0, 1],
      [0, trackWidth - resolvedThumbSize - padding * 2],
    );

    return {
      transform: [{ translateX: withTiming(translateX, { duration }) }],
    };
  });

  return (
    <Pressable onPress={onPress} style={style} testID="toggle-pressable">
      <Animated.View
        style={[
          {
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight / 2,
            padding,
            justifyContent: "center",
          },
          trackAnimatedStyle,
        ]}
      >
        <Animated.View
          style={[
            {
              width: resolvedThumbSize,
              height: resolvedThumbSize,
              borderRadius: resolvedThumbSize / 2,
              backgroundColor: thumbColor,
            },
            thumbAnimatedStyle,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}
