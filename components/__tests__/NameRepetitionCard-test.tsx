import { fireEvent, render, screen } from "@testing-library/react-native";
import NameRepetitionCard from "../common/NameRepetitionCard";

describe("<NameRepetitionCard />", () => {
  it("renders the Alarm Name label", () => {
    render(<NameRepetitionCard onTitleChange={() => {}} />);
    expect(screen.getByText("Alarm Name")).toBeTruthy();
  });

  it("renders the Repeat label", () => {
    render(<NameRepetitionCard onTitleChange={() => {}} />);
    expect(screen.getByText("Repeat")).toBeTruthy();
  });

  it("renders the text input with the correct placeholder", () => {
    const { getByPlaceholderText } = render(
      <NameRepetitionCard onTitleChange={() => {}} />,
    );
    expect(getByPlaceholderText("Wake up")).toBeTruthy();
  });

  it("calls onTitleChange when the user types in the input", () => {
    const onTitleChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <NameRepetitionCard onTitleChange={onTitleChangeMock} />,
    );

    fireEvent.changeText(getByPlaceholderText("Wake up"), "Morning Run");
    expect(onTitleChangeMock).toHaveBeenCalledWith("Morning Run");
  });

  it("calls onTitleChange with the updated value on every keystroke", () => {
    const onTitleChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <NameRepetitionCard onTitleChange={onTitleChangeMock} />,
    );

    const input = getByPlaceholderText("Wake up");
    fireEvent.changeText(input, "W");
    fireEvent.changeText(input, "Wa");
    fireEvent.changeText(input, "Wak");

    expect(onTitleChangeMock).toHaveBeenCalledTimes(3);
    expect(onTitleChangeMock).toHaveBeenLastCalledWith("Wak");
  });

  it("renders the Never repeat option", () => {
    render(<NameRepetitionCard onTitleChange={() => {}} />);
    expect(screen.getByText(/Never/)).toBeTruthy();
  });
});
