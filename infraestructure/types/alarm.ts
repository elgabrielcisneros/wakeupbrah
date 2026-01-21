export type AlarmStore = {
  alarms: Alarm[];
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
  volume: Volume;
  status: AlarmStatus;
};

export type AlarmStatus = "enabled" | "disabled";

export type Day = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type RepeatingPattern = "daily" | "weekly";

export type ChallengeType = "math" | "qr" | "walk";

export type Volume = {
  value: number;
  muted: boolean;
};

export type Challenge = {
  type: ChallengeType;
  status: "not_started" | "started" | "completed";
};
