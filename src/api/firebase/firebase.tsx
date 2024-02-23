// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAjEdqSbPITXkRiFMyJh6d2romEqqw6aTo",
	authDomain: "deeds-bf234.firebaseapp.com",
	projectId: "deeds-bf234",
	storageBucket: "deeds-bf234.appspot.com",
	messagingSenderId: "319323528644",
	appId: "1:319323528644:web:cd142b7e5050d69bb61891",
	measurementId: "G-QFS8FN4X55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
