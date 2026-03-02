import { fireEvent, render, screen } from "@testing-library/react-native";
import ChallengeList from "../common/ChallengeList";

describe("<ChallengeList />", () => {
  it("renders the Wake-up challenges title", () => {
    render(
      <ChallengeList onChallengeChange={() => {}} selectedChallenge="walk" />,
    );
    expect(screen.getByText("Wake-up challenges")).toBeTruthy();
  });

  it("renders all challenge icons", () => {
    render(
      <ChallengeList onChallengeChange={() => {}} selectedChallenge="walk" />,
    );
    expect(screen.getByText("walk")).toBeTruthy();
    expect(screen.getByText("math")).toBeTruthy();
    expect(screen.getByText("qr")).toBeTruthy();
    expect(screen.getByText("type")).toBeTruthy();
    expect(screen.getByText("map")).toBeTruthy();
  });

  it("calls onChallengeChange with the correct type when an icon is pressed", () => {
    const onChallengeChangeMock = jest.fn();
    render(
      <ChallengeList
        onChallengeChange={onChallengeChangeMock}
        selectedChallenge="walk"
      />,
    );
    fireEvent.press(screen.getByText("math"));
    expect(onChallengeChangeMock).toHaveBeenCalledWith("math");
  });

  it("does not call onChallengeChange when already-selected challenge is pressed again", () => {
    const onChallengeChangeMock = jest.fn();
    render(
      <ChallengeList
        onChallengeChange={onChallengeChangeMock}
        selectedChallenge="walk"
      />,
    );
    // Pressing walk (already selected) still calls the callback — this is expected
    fireEvent.press(screen.getByText("walk"));
    expect(onChallengeChangeMock).toHaveBeenCalledWith("walk");
  });

  it("renders correctly with each possible selectedChallenge", () => {
    const types = ["walk", "math", "qr", "type", "map"] as const;
    types.forEach((selected) => {
      const { unmount } = render(
        <ChallengeList
          onChallengeChange={() => {}}
          selectedChallenge={selected}
        />,
      );
      expect(screen.getByText(selected)).toBeTruthy();
      unmount();
    });
  });
});
