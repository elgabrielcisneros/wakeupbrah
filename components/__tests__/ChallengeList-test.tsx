import { render, screen } from "@testing-library/react-native";
import ChallengeList from "../common/ChallengeList";

describe("ChallengeList", () => {
  it("renders correctly", () => {
    render(<ChallengeList />);
    expect(screen.getByText("Wake-up challenges")).toBeDefined();
  });
});
