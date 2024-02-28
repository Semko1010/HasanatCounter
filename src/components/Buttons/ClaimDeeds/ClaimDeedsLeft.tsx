import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { db } from "../../../api/firebase/firebase";
import {
	collection,
	query,
	onSnapshot,
	doc,
	updateDoc,
	getDoc,
} from "firebase/firestore";
interface Deeds {
	pageDeeds: number;
}

export default function ClaimDeeds(props: Deeds) {
	const [hidden, sethiddenFirst] = useState("hidden");
	const [checkbox, setCheckbox] = useState(false);
	const [input, setInput] = useState(false);

	const hiddenFuncFirst = async () => {
		const docRef = doc(db, "login", "semir01020@gmail.com");
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const hasanat = docSnap.data().hasanat || 0;
			updateDoc(docRef, {
				hasanat: hasanat + props.pageDeeds,
			}).then(() => {
				sethiddenFirst("");

				setTimeout(() => {
					sethiddenFirst("hidden");
				}, 500);
			});
		}
		setCheckbox(!checkbox);
		setInput(!input);
	};
	const changeState = () => {
		setCheckbox(!checkbox);
		setInput(!input);
	};
	return (
		<>
			<div className='flex flex-col'>
				<label className='' htmlFor='input'>
					{" "}
					I read this page
				</label>
				<input
					checked={input}
					className='input'
					onChange={changeState}
					type='checkbox'
				/>
			</div>

			{checkbox ? (
				<>
					<button
						onClick={hiddenFuncFirst}
						className='relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group'>
						<span className='absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56'></span>
						<span className='absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700'></span>
						<span className='relative'>Claim Deeds</span>
					</button>
				</>
			) : (
				<>
					<button
						disabled
						className='relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group'>
						<span className='absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56'></span>
						<span className='absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700'></span>
						<span className='relative'> Claim Deeds</span>
					</button>
				</>
			)}

			<p
				className={`animate-ping ${hidden} absolute bottom-24  text-[green] text-xl lg:text-3xl`}>{`+${props.pageDeeds} Hasanat`}</p>
		</>
	);
}
