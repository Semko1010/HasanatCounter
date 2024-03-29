import { getDoc, doc } from "firebase/firestore";
import { db } from "../api/firebase/firebase";

export const UserLoginController = async (
	userName: string,
	password: string,
) => {
	const Login = doc(db, "login", userName);
	const docSnap = await getDoc(Login);
	if (docSnap.exists()) {
		if (
			docSnap.data().email == userName &&
			docSnap.data().password == password
		) {
			return docSnap.data();
		} else {
			return false;
		}
	} else {
		console.log("User not Exist");
	}
};
