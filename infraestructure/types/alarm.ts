export type AlarmStore = {
  alarms: Alarm[];
  addAlarm: (alarm: Alarm) => void;
  removeAlarm: (id: string) => void;
  updateAlarm: (alarm: Alarm) => void;
};

export type Alarm = {
  id: string;
  title: string;
  time: string;
  isRepeating: boolean;
  challenge: ChallengeType;
  days: string[];
  volume: number;
  isMuted: boolean;
};

export type ChallengeType = "math" | "qr" | "walk";
