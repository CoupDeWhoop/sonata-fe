import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import Login from "./app/screens/Login";
import { MainNavigator } from "./app/navigation/MainNavigator";
import { PracticeModalProvider } from "./app/context/PracticeModalContext";
import { AppProvider } from "./app/context/AppProvider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <AuthProvider>
        <PracticeModalProvider>
          <AppProvider>
            <Layout />
            <StatusBar style="auto" />
          </AppProvider>
        </PracticeModalProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const Layout = () => {
  const { authState } = useAuth();

  return (
    <View style={styles.wrapper}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {authState.authenticated ? (
            <Stack.Screen name="Main" component={MainNavigator} />
          ) : (
            <Stack.Screen name="Login" component={Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF9FA",
  },
  wrapper: {
    flex: 1,
    width: "100%",
    maxWidth: 425,
  },
});
