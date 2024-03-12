"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import QuranMain from "./quranMain/quranMainId/page";
import Deeds from "../components/Deeds/deeds";
import Login from "./login/login";
import Register from "./register/register";
import HasanatList from "./hasanatList/page";
import Link from "next/link";

interface UserData {
	hasanat: number;
	username: string;
	password: string;
	email: string;
}
export default function Home() {
	const [loggedUser, setLoggedUser] = useState<UserData | boolean>(false);
	const [logged, setLogged] = useState<UserData | boolean>(true);
	useEffect(() => {
		if (typeof localStorage !== "undefined") {
			const loggedUserJSON: any = localStorage.getItem("loggedUser");
			if (loggedUserJSON !== null) {
				const loggedUser = JSON.parse(loggedUserJSON);
				setLoggedUser(loggedUser);
				// Verwende die Benutzerdaten
			} else {
				console.log("Keine Benutzerdaten im localStorage gefunden.");
			}
		}
	}, []);

	return (
		<main className='bg-[#F8F8FF] flex flex-col justify-center items-center'>
			{loggedUser === undefined || loggedUser === false ? (
				<>
					{logged ? (
						<div className=' bg-hero-pattern bg-cover bg-no-repeat h-screen flex flex-col xl:items-end items-center xl:pr-24 justify-center w-full h-full'>
							<button
								className='bg-green-400 px-6 py-2'
								onClick={() => setLogged(!logged)}>
								Register
							</button>
							<Login loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
						</div>
					) : (
						<div className='flex flex-col items-center justify-center w-full h-full'>
							<button
								className='bg-green-400 px-6 py-2'
								onClick={() => setLogged(!logged)}>
								Login
							</button>
							<Register />
						</div>
					)}
				</>
			) : (
				<>
					<Deeds loggedUser={loggedUser} />

					<QuranMain />
				</>
			)}
		</main>
	);
}
