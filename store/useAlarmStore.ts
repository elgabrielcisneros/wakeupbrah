import { create } from "zustand";
import { Alarm, AlarmStore } from "../infraestructure/types/alarm";

export const useAlarmStore = create<AlarmStore>()((set) => ({
  alarms: [],

  addAlarm: (alarm: Alarm) =>
    set((state) => ({
      alarms: [...state.alarms, alarm],
    })),

  removeAlarm: (id: string) =>
    set((state) => ({
      alarms: state.alarms.filter((alarm) => alarm.id !== id),
    })),

  updateAlarm: (alarm: Alarm) =>
    set((state) => ({
      alarms: state.alarms.map((a) => (a.id === alarm.id ? alarm : a)),
    })),

  clearAlarms: () => set(() => ({ alarms: [] })),
}));
