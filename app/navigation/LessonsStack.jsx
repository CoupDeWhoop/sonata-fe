import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LessonsScreen from "../screens/LessonsScreen";
import LessonNotesScreen from "../screens/LessonNotesScreen.jsx";

const Stack = createNativeStackNavigator();

export const LessonsStack = ( ) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true, animation: 'slide_from_right'}}>
            <Stack.Screen name="Lessons" component={LessonsScreen} />
            <Stack.Screen name="Lesson Details" component={LessonNotesScreen} />
        </Stack.Navigator>
    )
}
 