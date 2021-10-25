import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyC1jxCQh3ldKW4VIBP8YiUPn5JUMbeB9wQ",
    authDomain: "cs397-drawly.firebaseapp.com",
    databaseURL: "https://cs397-drawly-default-rtdb.firebaseio.com",
    projectId: "cs397-drawly",
    storageBucket: "cs397-drawly.appspot.com",
    messagingSenderId: "906442890039",
    appId: "1:906442890039:web:b7692d5d29f1c158fb58b2"
};

export const writeData = (data) => {
    set(ref(database), data);
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);