import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Animated } from 'react-native';
import logoImg from '../assets/logo.jpg';



const Weather = (props) => {
    //importing props
    const temp = parseInt(props.weather.main.temp);
    const feels = parseInt(props.weather.main.feels_like);
    const humidity = props.weather.main.humidity;
    const pressure = props.weather.main.pressure;
    const weather = props.weather.weather[0].main;
    const description = props.weather.weather[0].description;
    const weatherLogo = props.weatherLogo;               

    return (
        <View style={styles.containerMaster} >
            <View style={styles.container}>
                <Image
                    source={logoImg}
                    style={styles.logo}
                />
                <Text style={styles.title} >Weather</Text>
                <Image
                    source={{uri: weatherLogo}}
                    style={styles.icon}
                />
                <Text style={styles.description} >{weather}: {description}</Text>
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
        alignItems: 'center',
        backgroundColor: '#1E90FF',
    },
    container: {
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
    icon: {
        width: 100,
        height: 50
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

