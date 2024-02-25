import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { db } from "../../api/firebase/firebase";
import { UserLoginController } from "../../api/usercontroll";
import { collection, query, onSnapshot } from "firebase/firestore";
interface User {
	hasanat: number;
	password: string;
	username: string;
}

interface LoggedUser {
	loggedUser: {
		loggedUser: User[] | undefined;
		setLoggedUser: Dispatch<SetStateAction<never[]>>;
	};
}
interface userInfos {
	userInfos: {
		loggedUser: User[];
		// setLoggedUser: Dispatch<SetStateAction<never[]>>;
	};
}

export default function Login(loggedUser: any) {
	const [userName, setUserName] = useState<string>("semir01020@gmail.com");
	const [password, setPassword] = useState<string>("111111");

	const UserLogin = async () => {
		const userInfos = await UserLoginController(userName, password);
		loggedUser.loggedUser.setLoggedUser(userInfos);
		console.log("userInfos", userInfos);

		// const q = query(collection(db, "login"));
		// const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
		// 	querySnapshot.forEach((doc: any) => {
		// 		loggedUser.loggedUser.setLoggedUser(doc.data());
		// 	});

		// 	return () => unsubscribe();
		// });
		// if (status) {
		// 	console.log("Vorhanden");
		// } else {
		// 	console.log("Nicht Vorhanden");
		// }
	};
	useEffect(() => {
		console.log("test", loggedUser.loggedUser);
	}, [loggedUser.loggedUser.loggedUser]);
	// const hmac = createHmac("sha256", password);
	// const cryptedPass = hmac.digest("hex");

	// const Login = doc(db, "login", userName);
	// const docSnap = getDoc(Login);
	// getDoc(doc(db, "users", userName)).then(docSnap => {
	// 	if (docSnap.exists()) {
	// 		console.log("Document data:", docSnap.data());
	// 	} else {
	// 		console.log("No such document!");
	// 	}
	// });

	return (
		<div>
			<input className='border-2' type='text' />
			<input className='border-2 ml-2' type='text' />
			<button onClick={UserLogin}>Login</button>
		</div>
	);
}
