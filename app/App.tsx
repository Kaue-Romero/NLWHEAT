import React from "react";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./src/screens/Home";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import { AuthProvider } from "./src/hooks/auth";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }



  return (
    <AuthProvider>
      <HomeScreen />
      <StatusBar style="light" translucent backgroundColor="transparent"/>
    </AuthProvider>
  );
}
