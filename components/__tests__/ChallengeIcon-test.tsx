import { ChallengeType } from "@/infraestructure/types/alarm";
import { fireEvent, render } from "@testing-library/react-native";
import ChallengeIcon from "../common/ChallengeIcon";

describe("<ChallengeIcon />", () => {
  test("Text renders correctly on ChallengeIcon", () => {
    const { getByText } = render(
      <ChallengeIcon challenge={{ type: "math", status: "not_started" }} />,
    );

    getByText("math");
  });

  test("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <ChallengeIcon
        challenge={{ type: "qr", status: "not_started" }}
        onPress={onPressMock}
      />,
    );
    fireEvent.press(getByText("qr"));
    expect(onPressMock).toHaveBeenCalledWith("qr");
  });
  test("renders different challenge types", () => {
    const types = ["math", "qr", "walk", "map", "type"];

    types.forEach((type) => {
      const { getByText } = render(
        <ChallengeIcon
          challenge={{ type: type as ChallengeType, status: "not_started" }}
        />,
      );
      expect(getByText(type)).toBeTruthy();
    });
  });
});
