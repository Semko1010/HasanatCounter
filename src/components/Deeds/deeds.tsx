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
	email: string;
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
				const userDocRef = doc(db, "login", loggedUser.email);
				const unsubscribe = onSnapshot(userDocRef, docSnap => {
					if (docSnap.exists()) {
						const userData = docSnap.data();
						if (docSnap.data().hasanat >= 1000000) {
							const formattedNumber =
								(docSnap.data().hasanat / 1000000).toFixed(3) + " M";
							setHasanat(formattedNumber);
							return formattedNumber;
						} else if (docSnap.data().hasanat >= 1000) {
							const formattedNumber =
								(docSnap.data().hasanat / 1000).toFixed(1) + "K";
							setHasanat(formattedNumber);
							return formattedNumber;
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
		<div className='bg-gradient-to-r from-green-400 to-blue-300 text-white fixed top-4  z-10 rounded-xl py-3 px-6 flex items-center gap-4 shadow-lg'>
			<img className='w-[50px]' src='images/icons/deeds.png' alt='' />
			<div className='flex flex-col'>
				<p className='text-base xl:text-lg font-bold'>My Hasanat</p>
				<p className='text-lg xl:text-3xl font-bold'>{myHasanat}</p>
			</div>
		</div>
	);
}
