import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import store from '../store';

const firebaseInit = () => {
console.log('firebase init')
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
};

initializeApp(firebaseConfig);

getAuth().onAuthStateChanged(async(user) => {
  if (user) {
    const authToken = await user.getIdToken();
    store.dispatch("setAuthToken", authToken);
  } else {
    store.dispatch("setAuthToken", null);
  }
})

};

export default firebaseInit;