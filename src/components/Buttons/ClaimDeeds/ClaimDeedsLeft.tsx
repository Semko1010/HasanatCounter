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
	const [suraOne, setSuraOne] = useState(0);
	const [suraTwo, setSuraTwo] = useState(0);
	const [suraThree, setSuraThree] = useState(0);
	const [checkbox, setCheckbox] = useState(false);
	const [input, setInput] = useState(false);
	const [readed, setrReaded] = useState(false);
	const [showMoreSuras, setShowMoreSuras] = useState<boolean>(false);

	const hiddenFuncSecond = () => {
		console.log("suraOne", suraOne);
		console.log("suraTwo", suraTwo);
		console.log("suraThree", suraThree);

		if (suraOne > 0) {
		}
		if (props.pageDeeds.hasanatPage2 > 0 && props.pageDeeds.hasanatPage3 > 0) {
			// if (docSnap.exists()) {
			// 	const hasanat = docSnap.data().hasanat || 0;
			// 	updateDoc(docRef, {
			// 		hasanat:
			// 			hasanat +
			// 			props.pageDeeds.hasanatPage1 +
			// 			props.pageDeeds.hasanatPage2 +
			// 			props.pageDeeds.hasanatPage3,
			// 	}).then(() => {
			// 		sethiddenFirst("");
			// 		setTimeout(() => {
			// 			sethiddenFirst("hidden");
			// 			setrReaded(true);
			// 		}, 500);
			// 	});
			// }
			console.log("3 Suras");
			setShowMoreSuras(false);
		} else {
			// if (docSnap.exists()) {
			// 	const hasanat = docSnap.data().hasanat || 0;
			// 	updateDoc(docRef, {
			// 		hasanat:
			// 			hasanat +
			// 			props.pageDeeds.hasanatPage1 +
			// 			props.pageDeeds.hasanatPage2 +
			// 			props.pageDeeds.hasanatPage3,
			// 	}).then(() => {
			// 		sethiddenFirst("");
			// 		setTimeout(() => {
			// 			sethiddenFirst("hidden");
			// 			setrReaded(true);
			// 		}, 500);
			// 	});
			// }
			console.log("2 Suras");
			setShowMoreSuras(false);
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
							}, 500);
						});
					}
				} else {
					setShowMoreSuras(true);
				}

				sethiddenFirst("");

				setTimeout(() => {
					sethiddenFirst("hidden");
					setrReaded(true);
				}, 600);
				console.log("Benutzerdaten aus dem localStorage:", loggedUser);
			} else {
				console.log("Keine Benutzerdaten im localStorage gefunden.");
			}
		}

		setCheckbox(!checkbox);
		setInput(!input);
	};
	const changeState = () => {
		setCheckbox(!checkbox);
		setInput(!input);
	};
	const setSuraOneFunction = (target: number) => {
		console.log("target", target);

		if (suraOne == 0) {
			setSuraOne(target);
		} else {
			setSuraOne(0);
		}
	};
	useEffect(() => {
		console.log("suraOne", suraOne);
	}, [suraOne]);
	return (
		<div className='w-full h-full absolute flex justify-center'>
			<img
				className={`absolute top-4 ${
					props.index % 2 === 0 ? "right-6" : "left-6"
				} right-4 w-8 xl:right-6 xl:top-6 xl:w-12`}
				alt={"nein"}
				src={`/images/icons/${readed ? "ja" : "nein"}.png`}
			/>
			<div className='absolute bottom-0'>
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
				className={`animate-ping ${hidden} absolute top-4  text-[green] text-xl lg:text-3xl`}>{`+${
				props.pageDeeds.hasanatPage1 +
				props.pageDeeds.hasanatPage2 +
				props.pageDeeds.hasanatPage3
			} Hasanat`}</p>
			{showMoreSuras ? (
				<>
					<div className={`bg-[white] border p-8 h-[300px] w-[200px]`}>
						<p>Wich Sura you Read ?</p>
						<div>
							<label htmlFor=''>Ikhlas</label>
							<input
								value={suraOne}
								onChange={() =>
									setSuraOneFunction(props.pageDeeds.hasanatPage1)
								}
								type='checkbox'
							/>
						</div>
						<div>
							<label htmlFor=''>Falaq</label>
							<input
								onChange={() => setSuraTwo(props.pageDeeds.hasanatPage2)}
								type='checkbox'
							/>
						</div>
						<div>
							<label htmlFor=''>Nas</label>
							<input
								onChange={() => setSuraThree(props.pageDeeds.hasanatPage3)}
								type='checkbox'
							/>
						</div>
						<div>
							<button
								onClick={hiddenFuncSecond}
								className='relative inline-flex items-center justify-center px-6 py-2 xl:px-10 xl:py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group'>
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
	);
}
