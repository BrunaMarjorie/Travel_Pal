import { AsyncStorage } from '@react-native-community/async-storage';

export async function storeData (key, value) {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e);
    }
    return console.log('Data succesfully saved');
}

export async function getData(key) {
    try{
        const value = await AsyncStorage.getItem(key)
    }catch (e){
        console.log(e);
    }
}

export async function getAllData () {
    AsyncStorage.getAllKeys().then((keys) => {
        return AsyncStorage.multiGet(keys)
        .then((result) => {
            console.log(result);
        }).catch((e) => {
            console.log(e);
        });
    });
}