import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Animated } from 'react-native';
import logoImg from '../assets/logo.jpg';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';


const Weather = () => {
    const [temp, setTemp] = useState(null);
    const [feels, setFeels] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [pressure, setPressure] = useState(null);
    const [logo, setLogo] = useState(null);
    const [weather, setWeather] = useState(null);
    const [desc, setDesc] = useState(null);


    useEffect(() => {
        (async () => {
            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest
            });

            openWeather(location.coords.latitude, location.coords.longitude);
        })();
    }, []);


    let openWeather = (lat, long) => {

        const API_KEY = 'd69ffc4ebd2aa53763e7c84e30f14fcf';

        fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&APPID=' + API_KEY + '&units=metric')

            .then((response) => {
                return response.json()
            })
            .then((json) => {
                setTemp(json.main.temp);
                setFeels(json.main.feels_like);
                setHumidity(json.main.humidity);
                setPressure(json.main.pressure);
                setWeather(json.weather[0].main);
                setLogo(json.weather[0].id);
                setDesc(json.weather[0].description);
                console.log(json);
            });
    }


    return (
        <View style={styles.containerMaster} >
            <View style={styles.container}>
                <Image
                    source={logoImg}
                    style={styles.logo}
                />
                <Text style={styles.title} >Weather</Text>
                <Text style={styles.description} >{weather}: {desc}</Text>
                <Text></Text>
                <View style={styles.containerOutput}>
                    <Text style={{
                        width: 100,
                        textAlign: 'center',
                    }}>
                        {'TEMPERATURE \n'}
                        {temp} </Text>
                    <Text style={{
                        width: 100,
                        textAlign: 'center',
                    }}>
                        {'FEELS LIKE \n'}
                        {feels} </Text>
                </View>
                <Text>________________________________________________________</Text>
                <Text></Text>
                <View style={styles.containerOutput}>
                    <Text style={{
                        width: 100,
                        textAlign: 'center',
                    }}>
                        {'HUMIDITY \n'}
                        {humidity}% </Text>
                    <Text style={{
                        width: 100,
                        textAlign: 'center',
                    }}>
                        {'PRESSURE \n'}
                        {pressure} hPa </Text>
                </View>
            </View>
        </View>
    )
}




// This variable contains all the css of this screen
const styles = StyleSheet.create({
    containerMaster: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: '#F3F4F4',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: "70%",
        width: 500,
    },
    containerOutput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 300,
    },
    logo: {
        width: 300,
        height: 79
    },
    title: {
        fontWeight: "bold",
        fontSize: 24
    },
    description: {
        fontSize: 18
    },
    location: {
        fontWeight: "bold",
        fontSize: 18,
    },
    author: {
        maxWidth: 250,
        textAlign: 'center'
    }
})

export default Weather

