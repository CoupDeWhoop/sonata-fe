import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import Login from "./app/screens/Login";
import { MainNavigator } from "./app/navigation/MainNavigator";
import { PracticeModalProvider } from "./app/context/PracticeModalContext";
import { AppProvider } from "./app/context/AppProvider";
import { RegisterScreen } from "./app/screens/RegisterScreen";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    // primary: "#3498db",
    primary: "#FFF",
    // accent: "#f1c40f",
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <AuthProvider>
          <PracticeModalProvider>
            <AppProvider>
              <PaperProvider theme={theme}>
                <React.Fragment>
                  {Platform.OS === "web" ? (
                    <style type="text/css">{`
                  @font-face {
                    font-family: 'MaterialCommunityIcons';
                    src: url(${require("react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf")}) format('truetype');
                  }
                  `}</style>
                  ) : null}
                  <StatusBar style="auto" backgroundColor="#F3E38B" />
                  <Layout />
                </React.Fragment>
              </PaperProvider>
            </AppProvider>
          </PracticeModalProvider>
        </AuthProvider>
      </View>
    </SafeAreaProvider>
  );
}

const Layout = () => {
  const { authState } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
            }}
          >
            {authState.authenticated ? (
              <Stack.Screen name="Main" component={MainNavigator} />
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={RegisterScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
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
    maxHeight: 900,
  },
});
