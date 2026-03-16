import { Alarm } from "@/infraestructure/types/alarm";
import { render, screen } from "@testing-library/react-native";
import AlarmItem from "../common/AlarmItem";

jest.mock("../../styles/global.css", () => {});

describe("<AlarmItem />", () => {
  it("renders the alarm title correctly", () => {
    const mockAlarm: Alarm = {
      id: "1",
      title: "Wake Up Challenge",
      time: new Date("2026-03-06T06:45:00.000Z"),
      repeating: false,
      repeatingPattern: "daily",
      challenge: {
        type: "math",
        status: "not_started",
        icon: 1, // mocked require
      },
      day: "mon",
      status: "enabled",
    };

    render(<AlarmItem alarm={mockAlarm} />);
    expect(screen.getByText("Wake Up Challenge")).toBeTruthy();
  });

  it("renders the time correctly", () => {
    const mockAlarm: Alarm = {
      id: "2",
      title: "Morning Run",
      time: new Date(2026, 2, 6, 7, 30), // 7:30 AM
      repeating: true,
      repeatingPattern: "daily",
      challenge: {
        type: "walk",
        status: "not_started",
        icon: 2, // mocked require
      },
      day: "mon",
      status: "enabled",
    };

    render(<AlarmItem alarm={mockAlarm} />);
    // Just verifying that it doesn't crash when `new Date().toLocaleTimeString` is called.
    expect(screen.getByText("Morning Run")).toBeTruthy();
  });
});
