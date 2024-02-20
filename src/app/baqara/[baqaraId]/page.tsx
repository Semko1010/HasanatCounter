import { Dispatch, SetStateAction, useEffect, useState } from "react";

import ButtonRight from "../../../components/Buttons/buttonRight";
import ButtonLeft from "../../../components/Buttons/buttonLeft";
import ClaimDeeds from "../../../components/Buttons/ClaimDeeds/ClaimDeeds";
import quranJs from "../../../api/quranJs.json";
import Sidebar from "../../../components/sidebar/Sidebar";
interface Deeds {
	deeds: {
		deeds: number;
		setDeeds: Dispatch<SetStateAction<number>>;
	};
}

export default function Baqara(props: Deeds) {
	// const [page, setPage] = useState({ firstPage: 5, secondPage: 6 });
	const [currentPage, setCurrentPage] = useState(5);
	const [animation, setAnimation] = useState("animate-ping");
	const [hiddenFirst, sethiddenFirst] = useState("hidden");
	const [hiddenSecond, sethiddenSecond] = useState("hidden");
	const hiddenFuncFirst = () => {
		sethiddenFirst("");
		// setAnimation("animate-ping");
		setTimeout(() => {
			sethiddenFirst("hidden");
		}, 500);
	};
	const hiddenFuncSecond = () => {
		sethiddenSecond("");
		// setAnimation("animate-ping");
		setTimeout(() => {
			sethiddenSecond("hidden");
		}, 500);
	};

	return (
		<div className='flex  flex-start '>
			<article>
				<Sidebar currentPage={{ currentPage, setCurrentPage }} />
			</article>
			<main className='flex justify-center '>
				<div className='flex gap-4'>
					<div className='flex flex-col align-center justify-center'>
						<div className='flex justify-center items-center'>
							<ButtonLeft currentPage={{ currentPage, setCurrentPage }} />
						</div>
					</div>
					<div className='flex flex-col align-center justify-center'>
						<div className='gap-4 flex justify-center items-center'>
							{quranJs.map(page => {
								if (page.currentPage == currentPage) {
									return (
										<>
											<div
												onClick={() => hiddenFuncFirst()}
												className='outline outline-offset-2 outline-2 max-w-[600px]'>
												<img src={page.image2} alt='' />
												<div className='flex  align-center justify-center gap-4'>
													<ClaimDeeds
														deeds={props.deeds}
														pageDeeds={page.hasanatPage2}
													/>

													<p
														className={`${animation} ${hiddenFirst} absolute top-0 text-[green] text-3xl`}>{`+${page.hasanatPage2} Hasanat`}</p>
												</div>
											</div>
											<div
												disabled
												onClick={() => hiddenFuncSecond()}
												className='outline outline-offset-2 outline-2 max-w-[600px]'>
												<img src={page.image1} alt='' />
												<div className='flex  align-center justify-center gap-4'>
													<ClaimDeeds
														deeds={props.deeds}
														pageDeeds={page.hasanatPage1}
													/>

													<p
														className={`${animation} ${hiddenSecond} absolute top-0 text-[green] text-3xl`}>{`+${page.hasanatPage1} Hasanat`}</p>
												</div>
											</div>
										</>
									);
								}
							})}
							<ButtonRight currentPage={{ currentPage, setCurrentPage }} />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
