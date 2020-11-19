import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Button } from 'react-native';
import logoImg from '../assets/logo.jpg';
import { AntDesign } from '@expo/vector-icons';
import { CLkey } from './keys'; //importing api key


const Currency = (props) => {
    //importing props
    const iso_code = props.currency.iso_code;
    const name = props.currency.name; //name of the currency
    const [amount, setAmount] = useState(null); //amount to be converted
    //local means convertion is USD to local currency
    const [local, setLocal] = useState(true);
    const [convertion, setConvertion] = useState(null); //value converted

    var quote; //rate collected

    //setting the buttons for the type of convertion
    var btn;
    if (local) {
        btn = 'USD to ' + iso_code;
    } else {
        btn = iso_code + ' to USD';
    }

    //setting the iso_code to be displayed beside the amount and convertion
    var inp1; //beside amount
    var inp2; //beside convertion
    if (local) {
        inp1 = 'USD';
        inp2 = iso_code;
    } else {
        inp1 = iso_code;
        inp2 = 'USD';
    }

    //fetching currencyLayer api
    let currencyLayer = async (iso_code) => {
        const response = await fetch('http://apilayer.net/api/live?access_key=' + CLkey +
            '&&currencies=' + iso_code + '&format=1');
        const results = response.json((json) => {
            json.quotes;
        });
        return results;
    }

    //converting the amount passed
    let convert = async () => {
        const data = await currencyLayer(iso_code);
        const arr = Object.keys(data.quotes);
        quote = (data.quotes[arr[0]]); //rate updated
        let conv;
        if (local) { //converting USD to local
            conv = parseFloat(quote) * parseFloat(amount);
            setConvertion(conv.toFixed(2));
        } else { //converting local to USD
            conv = (1 / parseFloat(quote)) * parseFloat(amount);
            setConvertion(conv.toFixed(2));
        }
    }

    return (
        <View style={styles.containerMaster} >
            <View style={styles.container}>
                <Image
                    source={logoImg}
                    style={styles.logo}
                />
                <Text>  </Text>
                <Text style={styles.title} >Currency Conversion</Text>
                <Text>  </Text>
                <Text style={styles.description} >The local currency is {name}</Text>
                <Text>  </Text>
                <View style={styles.containerButton}>
                    <View style={styles.input}>
                        <TextInput style={{
                            height: 40,
                            width: 100,
                            borderColor: 'gray',
                            borderWidth: 1,
                            textAlign: 'center',
                            textAlignVertical: 'bottom',
                        }}
                            //collecting the amount desired
                            onChangeText={setAmount}
                            placeholder='1.00' />

                        <TextInput style={{
                            height: 40,
                            width: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            textAlignVertical: 'bottom',
                            textAlign: 'center'
                        }}
                            placeholder={inp1}
                            editable={false} />
                    </View>
                    <Text>  </Text>
                    <AntDesign name="arrowright" size={24} color="black" />
                    <Text>  </Text>
                    <View style={styles.input}>
                        <Text style={{
                            width: 100,
                            height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            textAlign: 'center',
                            paddingTop: 10,
                        }}>
                            {convertion} </Text>
                        <TextInput style={{
                            height: 40,
                            width: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            textAlignVertical: 'bottom',
                            textAlign: 'center'
                        }}
                            placeholder={inp2}
                            editable={false} />
                    </View>
                </View>
                <Text>  </Text>
                <View style={styles.containerButton}>
                    <Button title='CONVERT CURRENCY!'
                        onPress={convert} />
                    <Button title={btn}
                        onPress={() => {
                            setConvertion(null);
                            if (local) {
                                setLocal(false)
                            } else { setLocal(true) }
                        }} />
                </View>
            </View>
        </View >
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
        width: 700,
    },
    containerButton: {
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
    },
    input: {
        justifyContent: 'space-around',
        flexDirection: 'row',
    }

})

export default Currency

