import { create } from "zustand";
import { Alarm, AlarmStore } from "../infraestructure/types/alarm";

export const useAlarmStore = create<AlarmStore>()((set) => ({
  // Now, here i create the alarms array
  alarms: [],
  // Now, the methods i'll use to modify the alarms array
  // Add an alarm
  addAlarm: (alarm: Alarm) =>
    set((state) => ({
      alarms: [...state.alarms, alarm],
    })),
  // Remove an alarm
  removeAlarm: (id: string) =>
    set((state) => ({
      alarms: state.alarms.filter((alarm) => alarm.id !== id),
    })),
  // Update an alarm
  updateAlarm: (alarm: Alarm) =>
    set((state) => ({
      alarms: state.alarms.map((a) => (a.id === alarm.id ? alarm : a)),
    })),
  // Clear all alarms
  clearAlarms: () => set(() => ({ alarms: [] })),
}));
