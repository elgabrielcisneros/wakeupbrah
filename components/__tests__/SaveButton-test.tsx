import { fireEvent, render, screen } from "@testing-library/react-native";
import SaveButton from "../common/SaveButton";

describe("SaveButton", () => {
  it("renders correctly", () => {
    render(<SaveButton />);
    expect(screen.getByText("Save")).toBeDefined();
  });

  it("handles press events", () => {
    render(<SaveButton />);
    const button = screen.getByText("Save").parent;
    expect(button).toBeDefined();
    fireEvent(button, "pressIn");
    fireEvent(button, "pressOut");
  });
});
