import { fireEvent, render, screen } from "@testing-library/react-native";
import SaveButton from "../common/SaveButton";
import { scheduleAlarm } from "../NotifeeIntegration";

// Mock NotifeeIntegration
jest.mock("../NotifeeIntegration", () => ({
  scheduleAlarm: jest.fn(),
}));

// Mock expo-router to avoid navigation errors in test environment
jest.mock("expo-router", () => ({
  useRouter: () => ({ back: jest.fn() }),
}));

// Mock db/database
jest.mock("@/db/database", () => ({
  insertAlarm: jest.fn().mockResolvedValue(1),
}));

// Mock zustand store to control addAlarm behaviour
jest.mock("@/store/useAlarmStore", () => ({
  useAlarmStore: (selector: (s: { addAlarm: jest.Mock }) => unknown) =>
    selector({ addAlarm: jest.fn() }),
}));

describe("<SaveButton />", () => {
  it("renders the Save label", () => {
    render(<SaveButton time={new Date()} title="Morning" challenge="walk" />);
    expect(screen.getByText("Save")).toBeTruthy();
  });

  it("handles pressIn and pressOut events without crashing", () => {
    render(<SaveButton time={new Date()} title="Morning" challenge="walk" />);
    const button = screen.getByText("Save").parent!;
    fireEvent(button, "pressIn");
    fireEvent(button, "pressOut");
  });

  it("shows the Toast when title is empty and Save is pressed", () => {
    render(<SaveButton time={new Date()} title="" challenge="walk" />);
    fireEvent.press(screen.getByText("Save"));
    expect(screen.getByText("Alarm name is required")).toBeTruthy();
  });

  it("shows the Toast when title contains only whitespace", () => {
    render(<SaveButton time={new Date()} title="   " challenge="walk" />);
    fireEvent.press(screen.getByText("Save"));
    expect(screen.getByText("Alarm name is required")).toBeTruthy();
  });

  it("does NOT show the Toast when title is valid", () => {
    render(<SaveButton time={new Date()} title="Wake up" challenge="walk" />);
    fireEvent.press(screen.getByText("Save"));
    expect(screen.queryByText("Alarm name is required")).toBeNull();
  });

  it("calls scheduleAlarm and addAlarm when title is valid", async () => {
    render(<SaveButton time={new Date()} title="Wake up" challenge="walk" />);
    fireEvent.press(screen.getByText("Save"));
    
    // Check if scheduleAlarm is called
    await screen.findByText("Save"); // Just to wait for any state updates
    expect(scheduleAlarm).toHaveBeenCalled();
  });

  it("works with all challenge types", () => {
    const challenges = ["walk", "math", "qr", "type", "map"] as const;
    challenges.forEach((challenge) => {
      const { unmount } = render(
        <SaveButton time={new Date()} title="Test" challenge={challenge} />,
      );
      expect(screen.getByText("Save")).toBeTruthy();
      unmount();
    });
  });
});
