import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';


const Weather = (props) => {
    //importing props
    const { temp, feels_like, humidity, pressure } = props.weather.main
    const { main, description } = props.weather.weather[0];
    const weatherLogo = props.weatherLogo;

    return (
        <View style={styles.containerMaster} >
            <View style={styles.container}>
                <Text style={styles.title} >Weather</Text>
                <Image //displaying image for the weather
                    source={{ uri: weatherLogo }}
                    style={styles.icon}
                />
                {/* displaying description of the weather*/}
                <Text style={styles.description} >{main}: {description}</Text>
                <Text></Text>
                <View style={styles.containerOutput}>
                    <Text style={{
                        width: 100,
                        textAlign: 'center',
                    }}>
                        {/* displaying temperature without decimals */}
                        {'TEMPERATURE \n'}
                        {parseInt(temp)}{'\u00b0'} </Text>
                    <Text style={{
                        width: 100,
                        textAlign: 'center',
                    }}>
                        {/* displaying feels like without decimals */}
                        {'FEELS LIKE \n'}
                        {parseInt(feels_like)}{'\u00b0'} </Text>
                </View>
                <Text>________________________________________________________</Text>
                <Text></Text>
                <View style={styles.containerOutput}>
                    <Text style={{
                        width: 100,
                        textAlign: 'center',
                    }}>
                        {/* displaying humidity with % */}
                        {'HUMIDITY \n'}
                        {humidity}% </Text>
                    <Text style={{
                        width: 100,
                        textAlign: 'center',
                    }}>
                        {/* displaying pressure with hPa */}
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
        height: "80%",
        width: 500,
    },
    containerOutput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 300,
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
})

export default Weather

