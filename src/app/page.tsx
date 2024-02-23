"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import QuranMain from "./quranMain/[quranMainId]/page";
import Deeds from "../components/Deeds/deeds";
import Login from "./login/login";

export default function Home() {
	const [deeds, setDeeds] = useState(1500);
	const [loggedUser, setLoggedUser] = useState([]);
	console.log("home", loggedUser);

	return (
		<main className='bg-[#F8F8FF] flex flex-col justify-center items-center'>
			{/* <Login loggedUser={{ loggedUser, setLoggedUser }} /> */}
			<Deeds loggedUser={{ loggedUser }} deeds={{ deeds, setDeeds }} />

			<QuranMain deeds={{ deeds, setDeeds }} />
		</main>
	);
}
