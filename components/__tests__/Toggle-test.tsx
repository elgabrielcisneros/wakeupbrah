import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { Toggle } from "../common/Toggle";

// Mock react-native-reanimated
jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: {
      View,
    },
    useAnimatedStyle: (fn: () => object) => fn(),
    interpolate: (value: number, input: number[], output: number[]) => {
      // Linear interpolation
      const ratio = (value - input[0]) / (input[1] - input[0]);
      return output[0] + ratio * (output[1] - output[0]);
    },
    interpolateColor: (
      value: number,
      input: number[],
      output: string[],
    ): string => {
      return value <= input[0] ? output[0] : output[1];
    },
    withTiming: (value: unknown) => value,
  };
});

describe("<Toggle />", () => {
  const defaultProps = {
    value: false,
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<Toggle {...defaultProps} />);
    // The component should render a Pressable with nested Views
    expect(screen.toJSON()).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    render(<Toggle {...defaultProps} onPress={onPressMock} />);

    fireEvent.press(screen.getByTestId("toggle-pressable"));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("renders with value=true", () => {
    const tree = render(<Toggle {...defaultProps} value={true} />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it("renders with value=false", () => {
    const tree = render(<Toggle {...defaultProps} value={false} />);
    expect(tree.toJSON()).toBeTruthy();
  });

  it("applies custom trackWidth and trackHeight", () => {
    const { toJSON } = render(
      <Toggle {...defaultProps} trackWidth={80} trackHeight={40} />,
    );

    const tree = toJSON() as any;
    // The track is the first child of the Pressable
    const track = tree.children[0];
    const trackStyle = Array.isArray(track.props.style)
      ? Object.assign({}, ...track.props.style)
      : track.props.style;

    expect(trackStyle.width).toBe(80);
    expect(trackStyle.height).toBe(40);
    expect(trackStyle.borderRadius).toBe(20); // trackHeight / 2
  });

  it("applies custom thumbSize", () => {
    const { toJSON } = render(
      <Toggle {...defaultProps} thumbSize={20} trackHeight={30} />,
    );

    const tree = toJSON() as any;
    const thumb = tree.children[0].children[0];
    const thumbStyle = Array.isArray(thumb.props.style)
      ? Object.assign({}, ...thumb.props.style)
      : thumb.props.style;

    expect(thumbStyle.width).toBe(20);
    expect(thumbStyle.height).toBe(20);
    expect(thumbStyle.borderRadius).toBe(10);
  });

  it("calculates default thumbSize from trackHeight and padding", () => {
    // Default padding=3, trackHeight=30 → thumbSize = 30 - 3*2 = 24
    const { toJSON } = render(
      <Toggle {...defaultProps} trackHeight={30} padding={3} />,
    );

    const tree = toJSON() as any;
    const thumb = tree.children[0].children[0];
    const thumbStyle = Array.isArray(thumb.props.style)
      ? Object.assign({}, ...thumb.props.style)
      : thumb.props.style;

    expect(thumbStyle.width).toBe(24);
    expect(thumbStyle.height).toBe(24);
  });

  it("applies custom thumbColor", () => {
    const { toJSON } = render(
      <Toggle {...defaultProps} thumbColor="#ff0000" />,
    );

    const tree = toJSON() as any;
    const thumb = tree.children[0].children[0];
    const thumbStyle = Array.isArray(thumb.props.style)
      ? Object.assign({}, ...thumb.props.style)
      : thumb.props.style;

    expect(thumbStyle.backgroundColor).toBe("#ff0000");
  });

  it("applies custom style to the outer Pressable", () => {
    const { toJSON } = render(
      <Toggle {...defaultProps} style={{ marginTop: 10 }} />,
    );

    const tree = toJSON() as any;
    const pressableStyle = tree.props.style;

    expect(pressableStyle).toEqual({ marginTop: 10 });
  });

  it("does not call onPress when not pressed", () => {
    const onPressMock = jest.fn();
    render(<Toggle {...defaultProps} onPress={onPressMock} />);

    expect(onPressMock).not.toHaveBeenCalled();
  });
});
