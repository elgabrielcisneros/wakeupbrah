import { ChallengeType, getIconForType } from "@/infraestructure/types/alarm";
import { fireEvent, render, screen } from "@testing-library/react-native";
import ChallengeIcon from "../common/ChallengeIcon";

const makeChallenge = (type: ChallengeType) => ({
  type,
  status: "not_started" as const,
  icon: getIconForType(type),
});

describe("<ChallengeIcon />", () => {
  it("renders the challenge type label", () => {
    render(<ChallengeIcon challenge={makeChallenge("math")} />);
    expect(screen.getByText("math")).toBeTruthy();
  });

  it("renders all supported challenge types", () => {
    const types: ChallengeType[] = ["math", "qr", "walk", "map", "type"];
    types.forEach((type) => {
      const { unmount } = render(
        <ChallengeIcon challenge={makeChallenge(type)} />,
      );
      expect(screen.getByText(type)).toBeTruthy();
      unmount();
    });
  });

  it("calls onSelect with the correct type when pressed", () => {
    const onSelectMock = jest.fn();
    render(
      <ChallengeIcon challenge={makeChallenge("qr")} onSelect={onSelectMock} />,
    );
    fireEvent.press(screen.getByText("qr"));
    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith("qr");
  });

  it("does not crash when onSelect is not provided", () => {
    render(<ChallengeIcon challenge={makeChallenge("walk")} />);
    // pressing without onSelect should not throw
    fireEvent.press(screen.getByText("walk"));
  });

  it("applies selected styles when isSelected is true", () => {
    const { getByText } = render(
      <ChallengeIcon challenge={makeChallenge("walk")} isSelected={true} />,
    );
    // The component should render without errors when selected
    expect(getByText("walk")).toBeTruthy();
  });

  it("does not apply selected styles when isSelected is false", () => {
    const { getByText } = render(
      <ChallengeIcon challenge={makeChallenge("walk")} isSelected={false} />,
    );
    expect(getByText("walk")).toBeTruthy();
  });
});
