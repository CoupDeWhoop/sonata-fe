import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './app/context/AuthContext';
import Login from './app/screens/Login';
import { MainNavigator } from './app/navigation/MainNavigator';
import { LessonModalProvider } from './app/context/LessonModalContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#FAF9FA' }}>
      <AuthProvider>
        <LessonModalProvider>
          <Layout></Layout>
          <StatusBar style="auto" /> 
        </LessonModalProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout} = useAuth();

  return (
    <View style={{flex: 1}}>
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
    </View>
  )
}