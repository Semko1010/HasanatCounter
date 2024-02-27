"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import QuranMain from "./quranMain/quranMainId/page";
import Deeds from "../components/Deeds/deeds";
import Login from "./login/login";

interface UserData {
	hasanat: number;
	username: string;
	password: string;
}
export default function Home() {
	const [loggedUser, setLoggedUser] = useState<UserData | null>(null);

	return (
		<main className='bg-[#F8F8FF] flex flex-col justify-center items-center'>
			{loggedUser == null ? (
				<Login loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
			) : (
				<>
					<Deeds loggedUser={loggedUser} />

					<QuranMain />
				</>
			)}
		</main>
	);
}
