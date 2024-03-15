import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LessonsScreen from "../screens/LessonsScreen";
import AddLessonNoteScreen from "../screens/AddLessonNoteScreen.jsx";

const Stack = createNativeStackNavigator();

export const LessonsStack = ( ) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right'}}>
            <Stack.Screen name="Lessons" component={LessonsScreen} />
            <Stack.Screen name="AddLessonNote" component={AddLessonNoteScreen} />
        </Stack.Navigator>
    )
}
 