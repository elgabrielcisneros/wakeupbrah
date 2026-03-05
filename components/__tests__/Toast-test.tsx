import { act, render, screen } from "@testing-library/react-native";
import Toast from "../common/Toast";

describe("<Toast />", () => {
  it("renders nothing when visible is false", () => {
    const { queryByText } = render(
      <Toast visible={false} message="Test message" onHide={() => {}} />,
    );
    expect(queryByText("Test message")).toBeNull();
  });

  it("renders the message when visible is true", () => {
    render(
      <Toast
        visible={true}
        message="Alarm name is required"
        onHide={() => {}}
      />,
    );
    expect(screen.getByText("Alarm name is required")).toBeTruthy();
  });

  it("renders with default error type", () => {
    const { getByText } = render(
      <Toast visible={true} message="Error toast" onHide={() => {}} />,
    );
    expect(getByText("Error toast")).toBeTruthy();
  });

  it("renders with success type", () => {
    const { getByText } = render(
      <Toast
        visible={true}
        message="Saved!"
        type="success"
        onHide={() => {}}
      />,
    );
    expect(getByText("Saved!")).toBeTruthy();
  });

  it("renders with info type", () => {
    const { getByText } = render(
      <Toast
        visible={true}
        message="Info message"
        type="info"
        onHide={() => {}}
      />,
    );
    expect(getByText("Info message")).toBeTruthy();
  });

  it("calls onHide after the duration timer fires", () => {
    jest.useFakeTimers();
    const onHideMock = jest.fn();

    render(
      <Toast
        visible={true}
        message="Auto-hide test"
        duration={3000}
        onHide={onHideMock}
      />,
    );

    // Advance timers past the duration + animation (3000ms + 250ms)
    act(() => {
      jest.advanceTimersByTime(3500);
    });

    expect(onHideMock).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });
});
