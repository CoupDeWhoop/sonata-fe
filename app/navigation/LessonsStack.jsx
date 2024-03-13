import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LessonsScreen from "../screens/LessonsScreen";

const Stack = createNativeStackNavigator();

export const LessonsStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Lessons" component={LessonsScreen}/>
    </Stack.Navigator>
)