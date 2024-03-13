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
interface UserData {
	hasanat: number;
	username: string;
	password: string;
	email: string;
}
interface Deeds {
	pageDeeds: {
		hasanatPage1: number;
		hasanatPage2: number;
		hasanatPage3: number;
		sura1: string;
		sura2: string;
		sura3: string;
	};

	index: number;
}

export default function ClaimDeeds(props: Deeds) {
	const [hidden, sethiddenFirst] = useState("hidden");
	const [hiddenBackgroundBlur, setHiddenBackgroundBlur] = useState("hidden");
	const [suraOne, setSuraOne] = useState(0);
	const [suraTwo, setSuraTwo] = useState(0);
	const [suraThree, setSuraThree] = useState(0);
	const [checkbox, setCheckbox] = useState(false);
	const [input, setInput] = useState(false);
	const [readed, setrReaded] = useState(false);
	const [showMoreSuras, setShowMoreSuras] = useState<boolean>(true);

	const hiddenFuncSecond = async () => {
		if (typeof localStorage !== "undefined") {
			const loggedUserJSON: any = localStorage.getItem("loggedUser");
			const loggedUser = JSON.parse(loggedUserJSON);
			const docRef = doc(db, "login", loggedUser.email);
			const docSnap = await getDoc(docRef);
			console.log("suraOne", suraOne);
			console.log("suraTwo", suraTwo);
			console.log("suraThree", suraThree);
			if (suraOne > 0 || suraTwo > 0 || suraThree > 0) {
				if (docSnap.exists()) {
					const hasanat = docSnap.data().hasanat || 0;
					updateDoc(docRef, {
						hasanat: hasanat + suraOne + suraTwo + suraThree,
					}).then(() => {
						sethiddenFirst("");
						setTimeout(() => {
							sethiddenFirst("hidden");
							setrReaded(true);
						}, 700);
					});
				}
				setHiddenBackgroundBlur("hidden");
				setShowMoreSuras(true);
			}
		}
	};
	const hiddenFuncFirst = async () => {
		if (typeof localStorage !== "undefined") {
			const loggedUserJSON: any = localStorage.getItem("loggedUser");
			if (loggedUserJSON !== null) {
				const loggedUser = JSON.parse(loggedUserJSON);

				const docRef = doc(db, "login", loggedUser.email);
				const docSnap = await getDoc(docRef);

				if (
					props.pageDeeds.hasanatPage2 <= 0 &&
					props.pageDeeds.hasanatPage3 <= 0
				) {
					if (docSnap.exists()) {
						const hasanat = docSnap.data().hasanat || 0;
						updateDoc(docRef, {
							hasanat: hasanat + props.pageDeeds.hasanatPage1,
						}).then(() => {
							sethiddenFirst("");
							setTimeout(() => {
								sethiddenFirst("hidden");
								setrReaded(true);
							}, 700);
						});
					}
				} else {
					setHiddenBackgroundBlur("");
					setShowMoreSuras(false);
				}

				console.log("Benutzerdaten aus dem localStorage:", loggedUser);
			} else {
				console.log("Keine Benutzerdaten im localStorage gefunden.");
			}
		}
		setSuraOne(0);
		setSuraTwo(0);
		setSuraThree(0);
		setCheckbox(!checkbox);
		setInput(!input);
	};
	const changeState = () => {
		setCheckbox(!checkbox);
		setInput(!input);
	};
	const setSuraOneFunction = (target: number) => {
		console.log("setSuraOneFunction", suraOne);

		if (suraOne == 0) {
			setSuraOne(target);
		} else {
			setSuraOne(0);
		}
	};
	const setSuraTwoFunction = (target: number) => {
		console.log("target", target);

		if (suraTwo == 0) {
			setSuraTwo(target);
		} else {
			setSuraTwo(0);
		}
	};
	const setSuraThreeFunction = (target: number) => {
		console.log("target", target);

		if (suraThree == 0) {
			setSuraThree(target);
		} else {
			setSuraThree(0);
		}
	};
	useEffect(() => {
		console.log("suraOne", suraOne);
		console.log("suraTwo", suraTwo);
		console.log("suraThree", suraThree);
	}, [suraOne, suraTwo, suraThree]);
	return (
		<>
			<div
				className={`z-[900] ${hiddenBackgroundBlur} absolute top-0 bg-[rgb(0,0,0,0.5)] left-0 right-0 bottom-0 blur-md`}>
				{" "}
			</div>
			<div className='w-full h-full absolute flex justify-center'>
				<img
					className={`absolute top-4 ${
						props.index % 2 === 0 ? "right-6" : "left-4"
					} right-4 w-8 xl:right-4 xl:top-4 xl:w-12`}
					alt={"nein"}
					src={`/images/icons/${readed ? "ja" : "nein"}.png`}
				/>
				<div className='absolute bottom-2 '>
					<div className='flex justify-center items-center gap-6'>
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
								className='relative inline-flex items-center justify-center px-6 py-2 xl:px-10 xl:py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group'>
								<span className='absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56'></span>
								<span className='absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700'></span>
								<span className='relative'>Claim Deeds</span>
							</button>
						</>
					) : (
						<>
							<button
								disabled
								className='relative inline-flex items-center justify-center px-6 py-2 xl:px-10 xl:py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group'>
								<span className='absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56'></span>
								<span className='absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700'></span>
								<span className='relative'> Claim Deeds</span>
							</button>
						</>
					)}
				</div>

				<p
					className={`animate-ping ${hidden} absolute top-4 text-[green] text-xl lg:text-3xl`}>
					{`+${
						suraOne === 0 && suraTwo === 0 && suraThree === 0
							? props.pageDeeds.hasanatPage1 +
							  props.pageDeeds.hasanatPage2 +
							  props.pageDeeds.hasanatPage3
							: suraOne + suraTwo + suraThree
					} Hasanat`}
				</p>
				{!showMoreSuras ? (
					<>
						<div
							className={`z-[990] flex justify-center items-center gap-2 flex-col bg-[white] border p-8 h-[300px] w-[200px]`}>
							<p>Wich Sura you Read ?</p>
							<div className='flex gap-2'>
								<label htmlFor=''>{props.pageDeeds.sura1}</label>
								<input
									onChange={() =>
										setSuraOneFunction(props.pageDeeds.hasanatPage1)
									}
									type='checkbox'
								/>
							</div>
							<div className='flex gap-2'>
								<label htmlFor=''>{props.pageDeeds.sura2}</label>
								<input
									onChange={() =>
										setSuraTwoFunction(props.pageDeeds.hasanatPage2)
									}
									type='checkbox'
								/>
							</div>
							<div className='flex gap-2'>
								{props.pageDeeds.sura3.length > 0 ? (
									<>
										<label htmlFor=''>{props.pageDeeds.sura3}</label>

										<input
											onChange={() =>
												setSuraThreeFunction(props.pageDeeds.hasanatPage3)
											}
											type='checkbox'
										/>
									</>
								) : (
									<>{null}</>
								)}
							</div>
							<div>
								<button
									onClick={hiddenFuncSecond}
									className='relative inline-flex items-center justify-center px-6 py-2 xl:px-4 xl:py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group'>
									<span className='absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56'></span>
									<span className='absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700'></span>
									<span className='relative'> Claim Deeds</span>
								</button>
							</div>
						</div>
					</>
				) : (
					<>{null}</>
				)}
			</div>
		</>
	);
}
