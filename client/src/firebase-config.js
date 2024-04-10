import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyC3gY3nyqrBfZda-YqFpGGQZBVO97c7-kA",
    authDomain: "dineswift-authentication.firebaseapp.com",
    projectId: "dineswift-authentication",
    storageBucket: "dineswift-authentication.appspot.com",
    messagingSenderId: "775899858512",
    appId: "1:775899858512:web:bea4f6f24b8fdb049cf355",
    measurementId: "G-G9Y9H1GQ55"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth };