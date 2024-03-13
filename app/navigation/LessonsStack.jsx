import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LessonsScreen from "../screens/LessonsScreen";
import AddLesson from "../screens/AddLesson";

const Stack = createNativeStackNavigator();

export const LessonsStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="Lessons" component={LessonsScreen}/>
        <Stack.Screen name="AddLesson" component={AddLesson} options={{headerShown: true}}/>
    </Stack.Navigator>
)