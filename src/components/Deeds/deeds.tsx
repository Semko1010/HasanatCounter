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

	const [myHasanat, setHasanat] = useState("");

	useEffect(() => {
		const getUserData = async () => {
			if (loggedUser) {
				const userDocRef = doc(db, "login", loggedUser.username);
				const unsubscribe = onSnapshot(userDocRef, docSnap => {
					if (docSnap.exists()) {
						const userData = docSnap.data();
						if (docSnap.data().hasanat >= 1000) {
							const formattedNumber =
								(docSnap.data().hasanat / 1000).toFixed(1) + "K";
							setHasanat(formattedNumber);
							return formattedNumber;
						} else {
						}
					} else {
						console.log("Benutzerdokument nicht gefunden.");
					}
				});

				// Rückgabefunktion für das Aufräumen beim Komponentenabbau
				return () => {
					unsubscribe();
				};
			}
		};

		getUserData();
	}, [db, loggedUser]);

	return (
		<div className='bg-white z-10 fixed top-0 h-[30px] rounded-lg text-[18px] flex items-center gap-4 border-2 py-6 px-2 m-4'>
			<p>My Hasanat:</p>
			<p className='text-green-500 text-[28px]'>{myHasanat}</p>
			{/* <img className='w-12' src='/images/level/bronze.png' alt='' /> */}
		</div>
	);
}
