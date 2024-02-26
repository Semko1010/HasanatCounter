"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
	collection,
	query,
	onSnapshot,
	doc,
	getDoc,
	DocumentData,
} from "firebase/firestore";
import { db } from "../../api/firebase/firebase";
interface UserData {
	hasanat: number;
	username: string;
	password: string;
}

interface Props {
	loggedUser: UserData | null;
}

export default function Deeds({ loggedUser }: Props) {
	const [deeds, setDeeds] = useState();

	const [myHasanat, setHasanat] = useState(0);
	const fetchHasanat = async () => {
		console.log("loggedUser", loggedUser);

		if (loggedUser) {
			const userDocRef = doc(db, "login", loggedUser.username);
			const docSnap = await getDoc(userDocRef);

			if (docSnap.exists()) {
				const userData = docSnap.data();
				setHasanat(userData.hasanat);
			} else {
				console.log("Benutzerdokument nicht gefunden.");
			}
		}
	};
	// const Test = async () => {
	// 	const getDeeds = doc(
	// 		db,
	// 		"login",
	// 		"loggedUser.username,"
	// 	);
	// 	const docSnap: any = await getDoc(getDeeds);

	// 	setHasanat(docSnap.data().hasanat);
	// };

	return (
		<div className='text-[32px] flex  gap-4 border-2 py-6 px-12 m-4'>
			<p onClick={fetchHasanat}>My Hasanat:</p>
			<p className='text-green-500 text-[32px]'>{myHasanat}</p>
			<img className='w-12' src='/images/level/bronze.png' alt='' />
		</div>
	);
}
