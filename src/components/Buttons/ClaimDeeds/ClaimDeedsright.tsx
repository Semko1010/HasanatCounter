import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { db } from "../../../api/firebase/firebase";
import {
	collection,
	query,
	onSnapshot,
	doc,
	updateDoc,
} from "firebase/firestore";
interface Deeds {
	deeds: {
		deeds: any;
		setDeeds: Dispatch<SetStateAction<number>>;
	};
	pageDeeds: number;
}

export default function ClaimDeeds(props: Deeds) {
	const [hidden, sethiddenFirst] = useState("hidden");
	const [middleDeeds, setMiddleDeeds] = useState(0);
	useEffect(() => {
		const q = query(collection(db, "login"));
		const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
			querySnapshot.forEach((doc: any) => {
				setMiddleDeeds(doc.data().hasanat);
			});

			return () => unsubscribe();
		});
	}, [db]);

	const hiddenFuncFirst = async () => {
		const docRef = doc(db, "login", "semir01020@gmail.com");

		const updatedeeds = await updateDoc(docRef, {
			hasanat: middleDeeds + props.pageDeeds,
		});
		props.deeds.setDeeds(props.pageDeeds);
		sethiddenFirst("");
		// setAnimation("animate-ping");
		setTimeout(() => {
			sethiddenFirst("hidden");
		}, 500);
	};
	return (
		<>
			<input type='checkbox' />
			<a
				onClick={hiddenFuncFirst}
				href='#_'
				className='relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group'>
				<span className='absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56'></span>
				<span className='absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700'></span>
				<span className='relative'>Claim Deeds</span>
			</a>
			<p
				className={`animate-ping ${hidden} absolute top-0 text-[green] text-3xl`}>{`+${props.pageDeeds} Hasanat`}</p>
		</>
	);
}
