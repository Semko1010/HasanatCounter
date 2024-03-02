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
}
export default function Home() {
	const loggedUserJSON: any = localStorage.getItem("loggedUser");

	const [loggedUser, setLoggedUser] = useState<UserData | null>(null);
	useEffect(() => {
		if (loggedUserJSON !== null) {
			const loggedUser = JSON.parse(loggedUserJSON);
			setLoggedUser(loggedUser);
			// Verwende die Benutzerdaten
			console.log("Benutzerdaten aus dem localStorage:", loggedUser);
		} else {
			console.log("Keine Benutzerdaten im localStorage gefunden.");
		}
	}, []);
	return (
		<main className='bg-[#F8F8FF] flex flex-col justify-center items-center'>
			{loggedUserJSON == null ? (
				<>
					<Login loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
					<Register />
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
