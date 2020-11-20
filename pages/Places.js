import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Places = (props) => {

    const [places, setPlaces] = useState([]); //list of visited places and their details
    //importing props
    const description = props.weather.weather[0].description;
    const temp = parseInt(props.weather.main.temp);
    const { name, iso_code } = props.currency; //name and iso_code of the currency
    const quote = parseFloat(props.quote); //rate collected

    //collecting current day information
    let date = new Date();
    date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getUTCFullYear();

    useEffect(() => {
        (async () => {

            getAllData(); //calling all the data 

        })();
    }, []);


    //saving data 
    let saveData = async () => {
        var allLocations = await getAllData(); //collecting the data previously saved
        if (allLocations == null) {
            allLocations = []; //if no data found, set an empty array
        }

        //data to be saved
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
            //conveting JSON to string
            const value = JSON.stringify(location);
            //saving variable
            await AsyncStorage.setItem('location', value);
            //adding new data to the main array
            allLocations.push(location);
            //converting the main array to string
            const allValues = JSON.stringify(allLocations);
            //saving the array with all the places visited
            await AsyncStorage.setItem('allLocations', allValues);

            getAllData(); //updating the list displayed

            console.log('data saved');
        } catch (e) {
            console.log(e);
        }
    };

    //getting all the data saved
    let getAllData = async () => {
        try {
            //collecting the data previously saved
            const value = await AsyncStorage.getItem('allLocations');
            //if data found, set the list of places visited
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
                <Text style={styles.description} >Click on the city for details:</Text>
                <Text></Text>
                <ScrollView style={styles.containerScrowView}>
                    <View style={styles.containerOutput}>
                        {/* using map to go through the array create buttons */}
                        {places.map((place, key) => {
                            return <Button color={'darkblue'} key={key} title={place.place}
                                //when pressed the button, an alert will be send 
                                //with the collected information
                                onPress={() => Alert.alert(
                                    place.place + ' on ' + place.date,
                                    '\n Weather: ' + place.descr + ' (' + place.temp + '\u00b0) \n \n Local currency: '
                                    + place.currency + '\n \n Day rate: 1 USD = ' + place.rate + ' ' + place.iso_code

                                )} />
                        }
                        )}
                    </View>
                </ScrollView>
                <Text></Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <Button title='SAVE DATA' //saving the data
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
        width: 300
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        marginTop: 30,
    },
    description: {
        fontSize: 18
    },
})

export default Places

