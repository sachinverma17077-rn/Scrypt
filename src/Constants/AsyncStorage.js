import AsyncStorage from '@react-native-async-storage/async-storage';
import localization from './localization';

//Setters

export const setLanguage = async (lang) => {
try {
await AsyncStorage.setItem('LANGUAGE', lang);
console.log(lang,"-==============+++++++")
await localization.setLanguage(lang);
} catch (e) {
console.error('Error saving language:', e);
throw e;
}
};

export const getLanguage = async () => {
try {
const language = await AsyncStorage.getItem('LANGUAGE');
return language;
} catch (e) {
console.error('Error retrieving language:', e);
return null;
}
};