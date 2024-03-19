import { useState, useEffect } from "react";
import { Button } from "react-native-paper"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getLessons } from '../utils'
import LessonsScreen from "../screens/LessonsScreen";
import LessonNotesScreen from "../screens/LessonNotesScreen.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Stack = createNativeStackNavigator();


export const LessonsStack = ( ) => {
    const [lessons, setLessons] = useState([]);
    const [newLesson, setNewLesson] = useState({});
    const [selectedLesson, selectLesson] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const { onLogout } = useAuth();

    useEffect(() => {
        const fetchLessons = async () => {
          try {
            const result = await getLessons();
            setLessons(result);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            setError(error);
          }
        };
      
        fetchLessons();
      }, [newLesson]);

    return (
        <Stack.Navigator screenOptions={{ headerShown: true, animation: 'slide_from_right'}}>
            <Stack.Screen
            name="Lessons"
            options={{
              headerRight: () => <Button mode={'contained-tonal'}onPress={onLogout} labelStyle={{ color: 'black' }}>Sign Out</Button>
            }}
            children={(props) => (
                <LessonsScreen
                    lessons={lessons}
                    loading={loading}
                    setNewLesson={setNewLesson}
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
                    setNewLesson={setNewLesson}
                    lessons={lessons}
                    {...props}
                />
            )}
            />
        </Stack.Navigator>
    )
}
 