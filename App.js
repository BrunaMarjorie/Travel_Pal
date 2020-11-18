import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { OCkey, OWkey, CLkey } from './pages/keys'; //importing api keys


import Currency from './pages/Currency';
import Home from './pages/Home';
import Weather from './pages/Weather';
import Places from './pages/Places';


export default function App() {

  const Tab = createBottomTabNavigator();

  const [currency, setCurrency] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [weather, setWeather] = useState(null);



  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg('Permision to location was denied');
        return errorMsg;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest
      });

      openCage(location.coords.latitude, location.coords.longitude);
      openWeather(location.coords.latitude, location.coords.longitude);

    })();
  }, []);

  let openCage = (lat, long) => {

    fetch('https://api.opencagedata.com/geocode/v1/json?key=' + OCkey +
      '&language=en&pretty=1&q=' + lat + '+' + long)

      .then((response) => {
        return response.json()
      })
      .then((json) => {
        if ("district" in json.results[0].components) {
          setCity(json.results[0].components.district);
        } else if ("town" in json.results[0].components) {
          setCity(json.results[0].components.town);
        } else if ("city" in json.results[0].components) {
          setCity(json.results[0].components.city);
        } else if ("city_district" in json.results[0].components) {
          setCity(json.results[0].components.city_district);
        } else if ("village" in json.results[0].components) {
          setCity(json.results[0].components.village);
        }
        setCountry(json.results[0].components.country);
        setCurrency(json.results[0].annotations.currency);
        console.log(json);
      });
  }


  let openWeather = (lat, long) => {

    fetch('http://api.openweathermap.org/data/2.5/weather?lat='
      + lat + '&lon=' + long + '&APPID=' + OWkey + '&units=metric')

      .then((response) => {
        return response.json()
      })
      .then((json) => {
        setWeather(json);
        console.log(json);
      });
  }


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
            children={() => <Currency currency={currency} />}
            options={{
              tabBarLabel: 'Currency',
              tabBarIcon: () => (
                <MaterialCommunityIcons name="currency-usd" size={24} color="black" />
              ),
            }} />

          <Tab.Screen
            name="Home"
            children={() => <Home city={city} country={country} />}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: () => (
                <Ionicons name="ios-home" size={24} color="black" />
              ),
            }} />

          <Tab.Screen
            name="Weather"
            children={() => <Weather weather={weather} />}
            options={{
              tabBarLabel: 'Weather',
              tabBarIcon: () => (
                <MaterialCommunityIcons name="weather-partly-cloudy" size={24} color="black" />
              ),
            }} />

          <Tab.Screen
            name="My Places"
            children={() => <Places city={city} country={country} />}
            options={{
              tabBarLabel: 'My Places',
              tabBarIcon: () => (
                <MaterialIcons name="place" size={24} color="black" />
              ),
            }} />

        </Tab.Navigator>
      </NavigationContainer>
    </>

  );
}


