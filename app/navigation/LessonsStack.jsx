import { useState } from "react";
import { Button } from "react-native-paper"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LessonsScreen from "../screens/LessonsScreen";
import LessonNotesScreen from "../screens/LessonNotesScreen.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Stack = createNativeStackNavigator();

export const LessonsStack = ( ) => {
    const [selectedLesson, selectLesson] = useState({});
    const { onLogout } = useAuth();

    return (
        <Stack.Navigator screenOptions={{ headerShown: true, animation: 'slide_from_right'}}>
            <Stack.Screen
            name="Lessons"
            options={{
              headerRight: () => <Button mode={'contained-tonal'}onPress={onLogout} labelStyle={{ color: 'black' }}>Sign Out</Button>
            }}
            children={(props) => (
                <LessonsScreen
                    selectLesson={selectLesson}
                    {...props}
                />
            )}
            />
            <Stack.Screen
            name="Lesson Details"
            children={(props) => (
                <LessonNotesScreen
                    lesson={selectedLesson}
                    {...props}
                />
            )}
            />
        </Stack.Navigator>
    )
}
 