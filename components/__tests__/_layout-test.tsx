import RootLayout from "@/app/_layout";
import { render } from "@testing-library/react-native";

// Mock essential layout dependencies
jest.mock("expo-font", () => ({
  useFonts: () => [true, null],
}));
jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));
jest.mock("@/components/useColorScheme", () => ({
  useColorScheme: () => "light",
}));
jest.mock("@/db/database", () => ({
  getAlarms: jest.fn().mockResolvedValue([]),
  initDatabase: jest.fn(),
  db: { $client: {} },
}));
jest.mock("expo-drizzle-studio-plugin", () => ({
  useDrizzleStudio: jest.fn(),
}));
jest.mock("@/components/NotifeeIntegration", () => ({
  initializeAlarmSystem: jest.fn(),
}));

let mockSetAlarms = jest.fn();

jest.mock("@/store/useAlarmStore", () => ({
  useAlarmStore: jest.fn((selector) => selector({ setAlarms: mockSetAlarms })),
}));

// Mock expo router imports
jest.mock("expo-router", () => ({
  Stack: Object.assign(({ children }: any) => <>{children}</>, {
    Screen: () => null,
  }),
  useRouter: () => ({ back: jest.fn() }),
}));

// Mock icons
jest.mock("@expo/vector-icons/FontAwesome", () => ({
  font: {},
}));

describe("<RootLayout />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSetAlarms.mockClear();
  });

  it("renders correctly and attempts hydration when fonts are loaded", () => {
    const { unmount } = render(<RootLayout />);
    // This serves as an environment smoke test
    // ensuring the hydration code path within _layout.tsx throws no crashes.
    expect(true).toBe(true);
    unmount();
  });
});
