import AsyncStorage from "@react-native-async-storage/async-storage";

export function getItem(key:string) {
    return AsyncStorage.getItem(key);
}

export function setItem(key:string, val:string) {
    return AsyncStorage.setItem(key, val);
}

export function deleteItem(key:string) {
    return AsyncStorage.removeItem(key);
}