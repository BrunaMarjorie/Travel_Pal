import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Button } from 'react-native';
import logoImg from '../assets/logo.jpg';
import { AntDesign } from '@expo/vector-icons';


const Currency = () => {
    const [amount, setAmount] = useState(null);
    const [local, setLocal] = useState(true);
    const [quote, setQuote] = useState(null);
    const [convertion, setConvertion] = useState(null);
    const currency = 'EUR';


    var btn;
    if (local) {
        btn = 'USD to ' + currency;
    } else {
        btn = currency + ' to USD';
    }

    var inp1;
    var inp2;
    if (local) {
        inp1 = 'USD';
        inp2 = currency;
    } else {
        inp1 = currency;
        inp2 = 'USD';
    }


    let currencyLayer = (currency) => {
        fetch('http://apilayer.net/api/live?access_key=39369fa26703b0fc03c4b4348e3aa1d3&&currencies=' + currency + '&format=1')

            .then((response) => {
                return response.json()
            }).then((json) => {
                setQuote(json.quotes.USDEUR);
                console.log(json);
            });
    }

    currencyLayer(currency);

    let convert = () => {
        let conv;
        if (local) {
            conv = parseFloat(quote) * parseFloat(amount);
            setConvertion(conv.toFixed(2));
            inp2 = convertion + '  USD';
            console.log(inp2);
        } else {
            conv = (1 / parseFloat(quote)) * parseFloat(amount);
            setConvertion(conv.toFixed(2));
            inp2 = convertion + '  ' + currency;
            console.log(inp2);
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
                <Text style={styles.description} >The local currency is {currency}</Text>
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
                        }}>
                            {'\n'}
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

