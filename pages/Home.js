import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import logoImg from '../assets/logo.jpg';
import * as Location from 'expo-location';

const Home = () => {
    const [currency, setCurrency] = useState(null);
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

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
        })();
    }, []);


    let openCage = (lat, long) => {

        fetch('https://api.opencagedata.com/geocode/v1/json?key=13a13fceb9984102893f7ddb77598255&language=en&pretty=1&q='
            + lat + '+' + long)

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
                setCurrency(json.results[0].annotations.currency.iso_code);
                console.log(json);
            });
    }

    let text = '';
    if (!city || !country) {
        text = 'Loading...';
    } else {
        text = city + ', ' + country;

    }

    return (
        <View style={styles.containerMaster} >
            <View style={styles.container}>
                <Image
                    source={logoImg}
                    style={styles.logo}
                />
                <Text style={styles.title} >Welcome to GeoLocation App</Text>
                <Text style={styles.description} >Your current location is:</Text>
                <Text style={styles.location} >{text}</Text>
                <View>
                    <Text style={styles.author} >Author:</Text>
                    <Text style={styles.author} >Bruna Marjorie</Text>
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

export default Home

