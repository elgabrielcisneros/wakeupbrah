import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { db, getAlarms, initDatabase } from "@/db/database";
import { getIconForType } from "@/infraestructure/types/alarm";
import { useAlarmStore } from "@/store/useAlarmStore";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Manrope: require("../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-SemiBold": require("../assets/fonts/Manrope-SemiBold.ttf"),
    "Manrope-Medium": require("../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Light": require("../assets/fonts/Manrope-Light.ttf"),
    "Manrope-ExtraLight": require("../assets/fonts/Manrope-ExtraLight.ttf"),
    Inter: require("../assets/fonts/Inter_18pt-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
    "Inter-Italic": require("../assets/fonts/Inter_18pt-Italic.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter_18pt-Medium.ttf"),
    "Inter-Light": require("../assets/fonts/Inter_18pt-Light.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) {
      console.error("Font loading error:", error);
      throw error;
    }
  }, [error]);
  useEffect(() => {
    console.log("Fonts loaded state:", loaded);
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  if (!loaded) {
    return null;
  }
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  useDrizzleStudio(db.$client);
  const setAlarms = useAlarmStore((state) => state.setAlarms);

  useEffect(() => {
    const load = async () => {
      try {
        const dbAlarms = await getAlarms();

        const hydratedAlarms = dbAlarms.map((alarm) => {
          let challengeType = "walk"; // default value

          if (typeof alarm.challenge === "string") {
            try {
              const parsed = JSON.parse(alarm.challenge);
              if (
                typeof parsed === "object" &&
                parsed !== null &&
                parsed.type
              ) {
                challengeType = parsed.type;
              } else if (typeof parsed === "string") {
                challengeType = parsed;
              }
            } catch (e) {
              challengeType = alarm.challenge;
            }
          } else if (
            typeof alarm.challenge === "object" &&
            alarm.challenge !== null
          ) {
            challengeType = (alarm.challenge as any).type || "walk";
          }

          return {
            ...alarm,
            // render and format the alarm time
            time: new Date(alarm.time),

            challenge: {
              type: challengeType as any,
              status: "not_started",
              // render the challenge icon by its type
              icon: getIconForType(challengeType as any),
            },
          };
        });

        setAlarms(hydratedAlarms as any);
      } catch (error) {
        console.error("Failed to load alarms from db:", error);
      }
    };
    load();
  }, []);

  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="pages/add-alarm" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
