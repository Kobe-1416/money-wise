import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import Login from './login'; 
import HomePage from './Screens/homepage';
import Lessons from './Screens/lessons';
import Budget from './Screens/budget';
import Settings from './Screens/Settings';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Lessons') iconName = focused ? 'book' : 'book-outline';
          else if (route.name === 'Budget') iconName = focused ? 'wallet' : 'wallet-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
        tabBarStyle: {
          backgroundColor: '#4a6cf7',
          borderTopColor: '#667eea',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Lessons" component={Lessons} />
      <Tab.Screen name="Budget" component={Budget} />
    </Tab.Navigator>
  );
}

// Root Stack
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Login Screen first */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        {/* Main Tabs after login */}
        <Stack.Screen
          name="Tabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />

        {/* Settings page */}
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            title: 'Settings',
            headerStyle: { backgroundColor: '#4a6cf7' },
            headerTintColor: 'white',
            headerTitleStyle: { fontWeight: '600', fontSize: 20 },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
