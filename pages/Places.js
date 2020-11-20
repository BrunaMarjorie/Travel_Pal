import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Places = (props) => {

    const [places, setPlaces] = useState([]);
    const description = props.weather.weather[0].description;
    const temp = parseInt(props.weather.main.temp);
    const {name, iso_code} = props.currency; //name and iso_code of the currency
    const quote = parseFloat(props.quote); //rate collected




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
            'date': '10/11/2020',
            'temp': temp,
            'descr': description,
            'currency': name,
            'iso_code': iso_code,
            'rate': quote.toFixed(2),
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
                <Text></Text>
                <Text style={styles.title} >My Places</Text>
                <Text></Text>
                <ScrollView style={styles.containerScrowView}>
                    <View style={styles.containerOutput}>
                        {places.map((place, key) => {
                            return <Button color={'black'} key={key} title={place.place} 
                            onPress={()=> Alert.alert(
                                place.place + ' on ' + place.date,
                                'Weather: '+place.descr+' ('+place.temp+'\u00b0) \n Local currency: '
                                +place.currency+ '\n Rate at the day: 1 USD = '+place.rate+ ' '+place.iso_code
                                
                                )}/>
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
        height: "80%",
        width: 500,
    },
    containerOutput: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        width: 300,
        height: 80,
    },
    containerScrowView: {
        width: 500
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        marginTop: 30,
    },
})

export default Places

