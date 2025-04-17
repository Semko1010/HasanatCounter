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
				<a
					href='/  '
					className='rotate-180 relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-black transition duration-300 ease-out border-2 border-black rounded-full shadow-md group bg-white'>
					<span className='absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-black group-hover:translate-x-0 ease'>
						<svg
							className='w-6 h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M14 5l7 7m0 0l-7 7m7-7H3'></path>
						</svg>
					</span>
					<span className='rotate-180 absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease'>
						back
					</span>
					<span className='relative invisible'>Button Text</span>
				</a>

				<div className='flex items-center gap-4 justify-center mb-10'>
					<img
						className='w-[70px] h-auto'
						src='images/icons/quran4.png
				   '
						alt=''
					/>
					<h2 className='text-3xl text-center text-white font-bold'>
						Highscore
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
						<div className='flex justify-evenly gap-6' key={index}>
							<p className='text-xl text-center text-white font-bold'>
								{index + 1}.
							</p>
							<div className='bg-white rounded-lg shadow-md mb-4 w-full'>
								<div className='px-6 py-4'>
									<p className='text-lg text-gray-800 font-semibold'>
										Name: {item.username}
									</p>
									<p className='text-lg text-gray-800 font-semibold mt-2'>
										Hasanat:{" "}
										{item.hasanat >= 1000000
											? (item.hasanat / 1000000).toFixed(3) + " M"
											: item.hasanat >= 1000
											? (item.hasanat / 1000).toFixed(1) + "K"
											: item.hasanat}
									</p>
								</div>
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
