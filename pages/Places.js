import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Button, ScrollView } from 'react-native';
import logoImg from '../assets/logo.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Places = (props) => {

    var data = [];
    let [allLocals, setAllLocals] = useState([]);
    let [allDates, setAllDates] = useState([]);


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
            'date': date
        }
        try {
            const value = JSON.stringify(location);
            await AsyncStorage.setItem('location', value);
            allLocations.push(location);

            const allValues = JSON.stringify(allLocations);
            await AsyncStorage.setItem('allLocations', allValues);

            console.log('data saved');
        } catch (e) {
            console.log(e);
        }
    };

    let getAllData = async () => {
        try {
            const value = await AsyncStorage.getItem('allLocations');
            if (value !== null) {
                const places = JSON.parse(value);
                places.forEach(element => {
                    allLocals.push(element.place);
                    data.push(element.date);
                });
                console.log(allLocals);
                console.log(allDates);
                setAllDates(data);
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
                <ScrollView>
                    <View>
                        {allDates.map((eachDate, key) => {
                            return <Text key={key}>{eachDate}</Text>
                        }
                        )}
                    </View>
                </ScrollView>
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
})

export default Places

