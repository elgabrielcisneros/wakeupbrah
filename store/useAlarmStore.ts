import { create } from "zustand";
import { Alarm, AlarmStore } from "../infraestructure/types/alarm";

export const useAlarmStore = create<AlarmStore>()((set) => ({
  alarms: [],

  setAlarms: (alarms: Alarm[]) => set({ alarms }),

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

  triggerAlarm: (id: string) =>
    set((state) => ({
      alarms: state.alarms.map((a) =>
        a.id === id
          ? {
              ...a,
              lastTriggeredAt: new Date().toISOString(),
              triggerCount: (a.triggerCount || 0) + 1,
            }
          : a
      ),
    })),

  dismissAlarm: (id: string) =>
    set((state) => ({
      alarms: state.alarms.map((a) =>
        a.id === id ? { ...a, dismissedAt: new Date().toISOString() } : a
      ),
    })),

  completeAlarm: (id: string) =>
    set((state) => ({
      alarms: state.alarms.map((a) =>
        a.id === id ? { ...a, completedAt: new Date().toISOString() } : a
      ),
    })),
}));
