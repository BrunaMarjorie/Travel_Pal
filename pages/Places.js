import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Button, ScrollView } from 'react-native';
import logoImg from '../assets/logo.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Places = (props) => {

    let [allLocals, setAllLocals] = useState([]);
    const [places, setPlaces] = useState([]);
    const description = props.weather.weather[0].description;
    const temp = parseInt(props.weather.main.temp);
    const name = props.currency.name; //name of the currency
    const quote = props.quote; //rate collected



    let date = new Date();
    date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getUTCFullYear();

    useEffect(() => {
        (async () => {

            getAllData();

        })();
    }, []);


    let saveData = async () => {
        var allLocations = await getAllData();
        if (allLocations == null) {
            allLocations = [];
        }
        console.log(allLocations);
        const location = {
            'place': props.city + ', ' + props.country,
            'date': date,
            'temp': temp,
            'descr': description,
            'currency': name,
            'rate': quote,
        }
        try {
            const value = JSON.stringify(location);
            await AsyncStorage.setItem('location', value);
            allLocations.push(location);

            const allValues = JSON.stringify(allLocations);
            await AsyncStorage.setItem('allLocations', allValues);

            getAllData();

            console.log('data saved');
        } catch (e) {
            console.log(e);
        }
    };

    let getAllData = async () => {
        try {
            const value = await AsyncStorage.getItem('allLocations');
            if (value !== null) {
                setPlaces(JSON.parse(value));
                console.log(places);
                return places;
            } else {
                return null;
            }
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <View style={styles.containerMaster} >
            <View style={styles.container}>
                <Image
                    source={logoImg}
                    style={styles.logo}
                />
                <Text></Text>
                <Text style={styles.title} >My Places</Text>
                <Text></Text>
                <ScrollView style={styles.containerScrowView}>
                    <View style={styles.containerOutput}>
                        {places.map((place, key) => {
                            return <Button key={key} title={place.place} 
                            onPress={()=> alert(place.place)
                            }/>
                        }
                        )}
                    </View>
                </ScrollView>
                <Text></Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <Button title='SAVE DATA'
                    onPress={saveData} />
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        width: 300,
        height: 300,
    },
    containerScrowView: {
        minHeight: 200,
    },
    logo: {
        width: 300,
        height: 79
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        marginTop: 30,
    },
    description: {
        fontSize: 18
    },
    location: {
        fontWeight: "bold",
        fontSize: 18,
    },
})

export default Places

