import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


import Currency from './pages/Currency';
import Home from './pages/Home';
import Weather from './pages/Weather';


export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          tabBarOptions={{
            activeTintColor: '#e91e63',
            labelPosition: 'below-icon'
          }}

        >
          <Tab.Screen
            name="Currency"
            component={Currency}
            options={{
              tabBarLabel: 'Currency',
              tabBarIcon: () => (
                <MaterialCommunityIcons name="currency-usd" size={24} color="black" />
              ),
            }} />

          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: () => (
                <Ionicons name="ios-home" size={24} color="black" />
              ),
            }} />

          <Tab.Screen
            name="Weather"
            component={Weather}
            options={{
              tabBarLabel: 'Weather',
              tabBarIcon: () => (
                <MaterialCommunityIcons name="weather-partly-cloudy" size={24} color="black" />
              ),
            }} />

        </Tab.Navigator>

      </NavigationContainer>
    </>

  );
}


