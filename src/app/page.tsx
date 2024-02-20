"use client";
import { useEffect, useState } from "react";
import Baqara from "./baqara/[baqaraId]/page";
import Deeds from "../components/Deeds/deeds";
export default function Home() {
	const [deeds, setDeeds] = useState(1500);
	return (
		<main className='flex flex-col justify-center items-center'>
			<Deeds deeds={{ deeds, setDeeds }} />
			<Baqara deeds={{ deeds, setDeeds }} />
		</main>
	);
}
