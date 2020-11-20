import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const Currency = (props) => {
    //importing props
    const iso_code = props.currency.iso_code;
    const name = props.currency.name; //name of the currency
    //local means convertion is USD to local currency
    const [local, setLocal] = useState(true);
    const [convertion, setConvertion] = useState(null); //value converted
    const quote = props.quote; //rate collected

    //setting the buttons for the type of convertion
    var btn;
    if (local) {
        btn = 'Change to ' + iso_code + ' TO USD?';
    } else {
        btn = 'Change to USD TO ' + iso_code + '?';
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

    //converting the amount passed
    let convert = async (amount) => {
        let conv;
        //if amount is deleted, convertion will be set as null again
        if (amount == 0 || amount == null) {
            setConvertion(null);
        } else {
            if (local) { //converting USD to local
                conv = parseFloat(quote) * parseFloat(amount);
                setConvertion(conv.toFixed(2));
            } else { //converting local to USD
                conv = (1 / parseFloat(quote)) * parseFloat(amount);
                setConvertion(conv.toFixed(2));
            }
        }
    }

    return (
        <View style={styles.containerMaster} >
            <View style={styles.container}>
                <Text style={styles.title} >Currency Conversion</Text>
                <Text style={styles.description} >The local currency is:</Text>
                <Text style={styles.description} >{name}</Text>
                <View style={styles.containerInput}>
                    <View style={styles.input}>
                        <TextInput style={{
                            height: 40,
                            width: 100,
                            borderColor: 'gray',
                            borderWidth: 1,
                            textAlign: 'center',
                            textAlignVertical: 'bottom',
                        }}
                            //collecting the amount desired, and converting
                            //it automatically
                            onChangeText={(amount) => {
                                convert(amount)
                            }}
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

                <Button title={btn}
                    onPress={() => {
                        setConvertion(null); 
                        if (local) { //on press the convertion will change
                            setLocal(false)
                        } else { setLocal(true) }
                    }} />

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
        height: "80%",
        width: 700,
    },
    containerInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 300,
        height:150,
    },
    title: {
        fontWeight: "bold",
        fontSize: 24
    },
    description: {
        fontSize: 18
    },
    input: {
        justifyContent: 'space-around',
        flexDirection: 'row',
    },

})

export default Currency

