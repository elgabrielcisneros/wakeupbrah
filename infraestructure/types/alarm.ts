import { ImageSourcePropType } from "react-native";

export type AlarmStore = {
  alarms: Alarm[];
  setAlarms: (alarms: Alarm[]) => void;
  addAlarm: (alarm: Alarm) => void;
  removeAlarm: (id: string) => void;
  updateAlarm: (alarm: Alarm) => void;
  clearAlarms: () => void;
};

export type Alarm = {
  id: string;
  title: string;
  time: Date;
  repeating: boolean;
  repeatingPattern: RepeatingPattern;
  challenge: Challenge;
  day: Day;
  status: AlarmStatus;
};

export type AlarmStatus = "enabled" | "disabled";

export type Day = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type RepeatingPattern = "daily" | "weekly";

export type ChallengeType = "math" | "qr" | "walk" | "map" | "type";

// export type Volume = {
//   value: number;
//   muted: boolean;
// };

export type Challenge = {
  type: ChallengeType;
  status: "not_started" | "started" | "completed";
  icon: ImageSourcePropType;
};

export interface ChallengeIconProps {
  challenge: Challenge;
  onSelect?: (type: ChallengeType) => void;
  isSelected?: boolean;
}

export const getIconForType = (type: ChallengeType) => {
  const icons: Record<ChallengeType, ImageSourcePropType> = {
    math: require("../../assets/images/icons/math.png"),
    qr: require("../../assets/images/icons/qr.png"),
    walk: require("../../assets/images/icons/walk.png"),
    map: require("../../assets/images/icons/map.png"),
    type: require("../../assets/images/icons/type.png"),
  };
  return icons[type];
};

export type ToastMessage = "error" | "success" | "info";

export interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastMessage;
  duration?: number;
  onHide: () => void;
}
