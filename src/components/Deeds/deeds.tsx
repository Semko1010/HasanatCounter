"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
	collection,
	addDoc,
	getDoc,
	querySnapshot,
	query,
	onSnapshot,
	deleteDoc,
	doc,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { db } from "../../api/firebase/firebase";
interface User {
	hasanat: number;
	password: string;
	username: string;
}

interface Deeds {
	deeds: {
		deeds: number;
		setDeeds: Dispatch<SetStateAction<number>>;
	};
	loggedUser: {
		loggedUser: User[];
	};
}

export default function Deeds(props: Deeds) {
	const [myHasanat, setHasanat] = useState(0);
	useEffect(() => {
		const q = query(collection(db, "login"));
		const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
			querySnapshot.forEach((doc: any) => {
				setHasanat(doc.data().hasanat);
				console.log("Deeds", doc.data().hasanat);
			});
		});
	}, [db]);

	return (
		<div className='text-[32px] flex  gap-4 border-2 py-6 px-12 m-4'>
			<p>My Hasanat:</p>
			<p className='text-green-500 text-[32px]'>{myHasanat}</p>
			<img className='w-12' src='/images/level/bronze.png' alt='' />
		</div>
	);
}
