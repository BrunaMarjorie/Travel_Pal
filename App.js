import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons,  } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { OCkey, OWkey } from './pages/keys'; //importing api keys


import Currency from './pages/Currency'; //importing Currency Screen
import Home from './pages/Home'; //importing Home Screen
import Weather from './pages/Weather'; //importing Weather Screen
import Places from './pages/Places'; //importing Places Screen


export default function App() {

  const Tab = createBottomTabNavigator(); //creating the navigation 

  const [currency, setCurrency] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [weather, setWeather] = useState(null);


  useEffect(() => {
    (async () => {
      //requesting permission to access loction
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") { //error if not permited
        setErrorMsg('Permision to location was denied');
        return errorMsg;
      }

      //collecting location
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest 
      });

      //colleting information about the place with coordinates given
      openCage(location.coords.latitude, location.coords.longitude);
      //colleting information about the weather with coordinates given
      openWeather(location.coords.latitude, location.coords.longitude);

    })();
  }, []);

  //fetching data from api openCage
  let openCage = (lat, long) => {

    //passing key and coordinates
    fetch('https://api.opencagedata.com/geocode/v1/json?key=' + OCkey +
      '&language=en&pretty=1&q=' + lat + '+' + long)

      .then((response) => {
        return response.json()
      })
      .then((json) => { //checking the results and collecting information
        if ("district" in json.results[0].components) {
          setCity(json.results[0].components.district);
        } else if ("town" in json.results[0].components) {
          setCity(json.results[0].components.town);
        } else if ("city" in json.results[0].components) {
          setCity(json.results[0].components.city);
        } else if ("city_district" in json.results[0].components) {
          setCity(json.results[0].components.city_district);
        } else if ("village" in json.results[0].components) {
          setCity(json.results[0].components.village); //collecting the city
        }
        setCountry(json.results[0].components.country); //collecting the country
        setCurrency(json.results[0].annotations.currency); //collecting the local currency
        console.log(json);
      });
  }

  //fetching the api openWeather
  let openWeather = (lat, long) => {

    //passing key and coordinates
    fetch('http://api.openweathermap.org/data/2.5/weather?lat='
      + lat + '&lon=' + long + '&APPID=' + OWkey + '&units=metric')

      .then((response) => {
        return response.json()
      })
      .then((json) => {
        setWeather(json); //collecting the weather information
        console.log(json);
      });
  }


  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home" //setting Home as the main screen
          tabBarOptions={{
            activeTintColor: '#e91e63',
            labelPosition: 'below-icon'
          }}

        >
          <Tab.Screen
            name="Currency"
            //passing the props
            children={() => <Currency currency={currency} />} 
            options={{
              tabBarLabel: 'Currency',
              tabBarIcon: () => (
                //inserting icon
                <MaterialCommunityIcons name="currency-usd" size={24} color="black" />
              ),
            }} />

          <Tab.Screen
            name="Home"
            //passing the props
            children={() => <Home city={city} country={country} />}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: () => (
                //inserting icon
                <Ionicons name="ios-home" size={24} color="black" />
              ),
            }} />

          <Tab.Screen
            name="Weather"
            //passing the props
            children={() => <Weather weather={weather} />}
            options={{
              tabBarLabel: 'Weather',
              tabBarIcon: () => (
                //inserting icon
                <MaterialCommunityIcons name="weather-partly-cloudy" size={24} color="black" />
              ),
            }} />

          <Tab.Screen
            name="My Places"
            //passing the props
            children={() => <Places city={city} country={country} />}
            options={{
              tabBarLabel: 'My Places',
              tabBarIcon: () => (
                //inserting icon
                <MaterialIcons name="place" size={24} color="black" />
              ),
            }} />

        </Tab.Navigator>
      </NavigationContainer>
    </>

  );
}


