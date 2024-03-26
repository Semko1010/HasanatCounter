"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../api/firebase/firebase";

interface UserData {
	username: string;
	password: string;
	email: string;
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
				userDataArray.sort((a, b) => b.hasanat - a.hasanat);
				setHasanatListAll(userDataArray);
			} catch (error) {
				console.error("Fehler beim Abrufen der Benutzerdaten:", error);
			}
		};

		getUserData();
	}, []);

	return (
		<div className='bg-gradient-to-r from-green-400 to-blue-300 py-12'>
			<div className='max-w-4xl mx-auto px-4'>
				<div className='flex items-center gap-4 justify-center mb-10'>
					<img
						className='w-[70px] h-auto'
						src='images/icons/quran4.png
					'
						alt=''
					/>
					<h2 className='text-3xl text-center text-white font-bold'>
						Rangliste
					</h2>
					<img
						className='w-[70px] h-auto'
						src='images/icons/quran1.png
					'
						alt=''
					/>
				</div>

				{hasanatListAll.length > 0 ? (
					hasanatListAll.map((item, index) => (
						<div key={index} className='bg-white rounded-lg shadow-md mb-4'>
							<div className='px-6 py-4'>
								<p className='text-lg text-gray-800 font-semibold'>
									Name: {item.username}
								</p>
								<p className='text-lg text-gray-800 font-semibold mt-2'>
									Hasanat: {item.hasanat}
								</p>
							</div>
						</div>
					))
				) : (
					<p className='text-white text-center'>
						Es wurden keine Daten gefunden.
					</p>
				)}
			</div>
			<svg
				className='absolute bottom-0 left-0'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 1440 320'>
				<path
					fill='#ffffff'
					fill-opacity='1'
					d='M0,160L1440,288L1440,320L0,320Z'></path>
			</svg>
		</div>
	);
}
