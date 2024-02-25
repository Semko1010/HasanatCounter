"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import QuranMain from "./quranMain/quranMainId/page";
import Deeds from "../components/Deeds/deeds";
import Login from "./login/login";

export default function Home() {
	const [loggedUser, setLoggedUser] = useState([]);
	console.log("home", loggedUser);

	return (
		<main className='bg-[#F8F8FF] flex flex-col justify-center items-center'>
			{/* <Login loggedUser={{ loggedUser, setLoggedUser }} /> */}
			<Deeds />

			<QuranMain />
		</main>
	);
}
