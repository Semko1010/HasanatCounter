import {
	collection,
	addDoc,
	getDoc,
	querySnapshot,
	query,
	onSnapshot,
	deleteDoc,
	doc,
} from "firebase/firestore";
import { db } from "../api/firebase/firebase";

export const UserLoginController = async (userName, password) => {
	// Passwort entschlüsseln
	console.log("userName", userName);

	const Login = doc(db, "login", userName);
	const docSnap = await getDoc(Login);
	if (docSnap.exists()) {
		console.log("true");

		if (
			docSnap.data().username == userName &&
			docSnap.data().password == password
		) {
			return true;
		} else {
			return false;
		}
	} else {
		console.log("false");
	}
};
