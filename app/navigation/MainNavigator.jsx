import React, { useContext, useState } from 'react';
import PracticeScreen from '../screens/PracticeScreen.jsx';
import StatsScreen from '../screens/StatsScreen.jsx';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LessonsStack } from './LessonsStack.jsx';
import AddLessonModal from '../screens/AddLesson.jsx';
import { LessonModalContext } from '../context/LessonModalContext.jsx';
import { Alert, View } from 'react-native';
import { deleteLesson } from '../../utils/api.js';



const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
    const { lessonModalIsVisible, setLessonModalIsVisible } = useContext(LessonModalContext);

    const handleClose = async(lesson_id) => {
        try {
            await deleteLesson(lesson_id)
            setLessonModalIsVisible(false) 
        } catch (error) {
            console.error('Error deleting lesson:', error);
            Alert.alert(
                'Error',
                'An error occurred while deleting the lesson. Please try again later.',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                ],
                { cancelable: false }
            );
        }

    }

    return (
        <View style={{flex: 1}}>
            <Tab.Navigator screenOptions={{
                headerShown: false,
                tabBarLabelStyle:{
                    fontSize: 14
                }
                }} 
                >
                <Tab.Screen name="Home" component={LessonsStack}   
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                }}/>
                <Tab.Screen name="Practice Sessions" component={PracticeScreen}
                        options={{
                    tabBarLabel: 'Practice',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="piano" color={color} size={26} />
                    ),
                }} />
                <Tab.Screen name="Stats" component={StatsScreen}
                        options={{
                    tabBarLabel: 'Stats',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="chart-bar" color={color} size={26} />
                    ),
                    }} />
            </Tab.Navigator>
            <AddLessonModal visible={lessonModalIsVisible} onClose={(lesson_id) => handleClose(lesson_id)} />
        </View>
    );
}
