import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { db } from "../../api/firebase/firebase";
import { UserLoginController } from "../../api/usercontroll";
import { collection, query, onSnapshot } from "firebase/firestore";
interface UserData {
	hasanat: number;
	username: string;
	password: string;
}

interface Props {
	loggedUser: UserData | null;
	setLoggedUser: (user: any) => void;
}
export default function Login({ setLoggedUser }: Props) {
	const [userName, setUserName] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const userLogin = async () => {
		const userInfos = await UserLoginController(userName, password);
		setLoggedUser(userInfos); // Setzen Sie die Benutzerinformationen über die übergebene Funktion
	};

	return (
		<div>
			<input
				onChange={e => setUserName(e.target.value)}
				className='border-2'
				type='text'
			/>
			<input
				onChange={e => setPassword(e.target.value)}
				className='border-2 ml-2'
				type='text'
			/>
			<button onClick={userLogin}>Login</button>
		</div>
	);
}
