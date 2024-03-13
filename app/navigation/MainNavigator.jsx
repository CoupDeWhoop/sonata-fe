import HomeScreen from '../screens/HomeScreen.jsx';
import PracticeScreen from '../screens/PracticeScreen.jsx';
import StatsScreen from '../screens/StatsScreen.jsx';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LessonsStack } from './LessonsStack.jsx';



const Tab = createBottomTabNavigator();

export const MainNavigator = () => (
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
);