import HomeScreen from '../screens/HomeScreen.jsx';
import PracticeScreen from '../screens/PracticeScreen.jsx';
import StatsScreen from '../screens/StatsScreen.jsx';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const Tab = createBottomTabNavigator();

export const MainNavigator = () => (
    <Tab.Navigator screenOptions={{
        headerShown: false
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Practice Sessions" component={PracticeScreen} />
        <Tab.Screen name="Stats" component={StatsScreen}/>
    </Tab.Navigator>
);