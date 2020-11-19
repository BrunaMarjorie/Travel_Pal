import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import logoImg from '../assets/logo.jpg';


const Home = (props) => {
      
    //importing props
    const city = props.city; 
    const country = props.country;
    
    let text = '';
    if (!city || !country) {
        text = 'Loading...'; //text displayed while loading
    } else {
        text = city + ', ' + country; //text changes when loaded

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

