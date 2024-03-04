"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../api/firebase/firebase";

interface UserData {
	password: string;
	username: string;
	hasanat: number;
	// Weitere Felder entsprechend der Struktur deiner Benutzerdaten
}

export default function HasanatList() {
	const [hasanatListAll, setHasanatListAll] = useState<UserData[]>([]);

	useEffect(() => {
		const getUserData = async () => {
			try {
				const userCollectionRef = collection(db, "login");
				const querySnapshot = await getDocs(userCollectionRef);

				const userDataArray: UserData[] = [];
				querySnapshot.forEach(doc => {
					if (doc.exists()) {
						const userData = doc.data() as UserData;
						userDataArray.push(userData);
					}
				});

				setHasanatListAll(userDataArray);
			} catch (error) {
				console.error("Fehler beim Abrufen der Benutzerdaten:", error);
			}
		};

		getUserData();
	}, []);

	return (
		<div>
			<h2 className='text-3xl text-center mb-6'>Rangliste</h2>
			{hasanatListAll.length > 0 ? (
				hasanatListAll.map((item, index) => (
					<div key={index} className='container mx-auto p-4'>
						<p className=' bg-white shadow-md p-4 rounded-md'>
							Name: {item.username}
						</p>
						<p className='w-[50%] bg-white shadow-md p-4 rounded-md'>
							Hasanat: {item.hasanat}
						</p>
					</div>
				))
			) : (
				<p>Es wurden keine Daten gefunden.</p>
			)}
		</div>
	);
}
