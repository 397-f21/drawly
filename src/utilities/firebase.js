import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect } from 'react';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC1jxCQh3ldKW4VIBP8YiUPn5JUMbeB9wQ",
  authDomain: "cs397-drawly.firebaseapp.com",
  databaseURL: "https://cs397-drawly-default-rtdb.firebaseio.com",
  projectId: "cs397-drawly",
  storageBucket: "cs397-drawly.appspot.com",
  messagingSenderId: "906442890039",
  appId: "1:906442890039:web:b7692d5d29f1c158fb58b2"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    if (devMode) { console.log(`loading ${path}`); }
    return onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      if (devMode) { console.log(val); }
      setData(transform ? transform(val) : val);
      setLoading(false);
      setError(null);
    }, (error) => {
      setData(null);
      setLoading(false);
      setError(error);
    });
  }, [path, transform]);

  return [data, loading, error];
};

export const writeData = (data, path) => {
  set(ref(database, path), data);
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useUserState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    onIdTokenChanged(getAuth(firebase), setUser);
  }, []);

  return [user];
};