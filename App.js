import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './app/context/AuthContext';
import Login from './app/screens/Login';
import { MainNavigator } from './app/navigation/MainNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
      <StatusBar style="auto" /> 
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout} = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { authState.authenticated ? (
          <Stack.Screen 
            name="Main" 
            component={MainNavigator}
            options={{
              headerRight: () => <Button onPress={onLogout} title="Sign Out" />,
            }}></Stack.Screen>
        ) : (
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
        )
        }
      </Stack.Navigator>
    </NavigationContainer>
    )
}