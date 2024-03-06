import { Dispatch, SetStateAction, useState } from "react";
import { db } from "../../api/firebase/firebase";
import { UserLoginController } from "../../api/usercontroll";
import { collection, query, onSnapshot } from "firebase/firestore";
interface UserData {
	hasanat: number;
	username: string;
	password: string;
	email: string;
}

interface Props {
	loggedUser: UserData | boolean;
	setLoggedUser: (user: any) => void;
}
export default function Login({ setLoggedUser }: Props) {
	const [userName, setUserName] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const userLogin = async () => {
		const userInfos = await UserLoginController(userName, password);
		if (userInfos == false) {
			alert("Falsche Daten");
		} else {
			setLoggedUser(userInfos);
			if (typeof localStorage !== "undefined") {
				localStorage.setItem("loggedUser", JSON.stringify(userInfos));
			}
		}
	};

	return (
		<>
			<div className=' flex justify-center items-center'>
				<div className='bg-white p-8 rounded-lg shadow-md w-96'>
					<h2 className='text-2xl font-bold mb-4'>Login</h2>
					<div>
						<div className='mb-4'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='username'>
								Benutzername
							</label>
							<input
								onChange={e => setUserName(e.target.value)}
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								id='username'
								type='text'
								placeholder='Benutzername'
							/>
						</div>
						<div className='mb-6'>
							<label
								className='block text-gray-700 text-sm font-bold mb-2'
								htmlFor='password'>
								Passwort
							</label>
							<input
								onChange={e => setPassword(e.target.value)}
								className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
								id='password'
								type='password'
								placeholder='Passwort'
							/>
						</div>
						<div className='flex items-center justify-between'>
							<button
								onClick={userLogin}
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
								type='button'>
								Einloggen
							</button>
							<a
								className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
								href='#'>
								Passwort vergessen?
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
