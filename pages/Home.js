import React from 'react';
import { StyleSheet, View, Text, Image, Button, Linking } from 'react-native';
import logoImg from '../assets/logo.jpg';
//import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';


const Home = (props) => {

    //importing props
    const city = props.city;
    const country = props.country;

    let lat = 0;
    let long = 0;

    let text = '';
    if (!city || !country) {
        text = 'Loading...'; //text displayed while loading
    } else {
        text = city + ', ' + country; //text changes when loaded
        lat = props.lat;
        long = props.long;
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
                {/*<MapView
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                    minZoomLevel={17}
                    style={styles.mapStyle}
                >
                    Marker component that renders a component on map
                    <Marker coordinate={{ latitude: lat, longitude: long }} />
                </MapView>*/}
                <Button
                    title='Open in Map'
                    onPress={() => {
                        Linking.openURL(`https://www.google.com/maps/place/${lat},${long}`);
                    }}
                />
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
    },
    // mapStyle: {
    //     width: '90%',
    //     height: '40%',
    //     marginTop: 20
    // },
})

export default Home

