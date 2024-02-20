import * as SecureStore from 'expo-secure-store';

export function getItem(key:string) {
  return SecureStore.getItemAsync(key);
}

export function setItem(key:string, val:string) {
   return SecureStore.setItemAsync(key, val);
}

export function deleteItem(key:string) {
  return SecureStore.deleteItemAsync(key);
}