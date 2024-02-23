import { Dispatch, SetStateAction, useEffect, useState } from "react";

import ButtonRight from "../../../components/Buttons/buttonRight";
import ButtonLeft from "../../../components/Buttons/buttonLeft";
import ClaimDeedsRight from "../../../components/Buttons/ClaimDeeds/ClaimDeedsright";
import ClaimDeedsLeft from "../../../components/Buttons/ClaimDeeds/ClaimDeedsLeft";
import quranJs from "../../../api/quranJs.json";
import Sidebar from "../../../components/sidebar/Sidebar";
import Image from "next/image";
interface Deeds {
	deeds: {
		deeds: number;
		setDeeds: Dispatch<SetStateAction<number>>;
	};
}

export default function Baqara(props: Deeds) {
	// const [page, setPage] = useState({ firstPage: 5, secondPage: 6 });
	const [currentPage, setCurrentPage] = useState(1);
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
			<main className=' flex justify-center '>
				<div className='flex gap-4'>
					<div className='flex flex-col align-center justify-center'>
						<div className='flex justify-center items-center'>
							<ButtonLeft currentPage={{ currentPage, setCurrentPage }} />
						</div>
					</div>
					<div className='flex flex-col align-center justify-center'>
						<div className='border-2 flex justify-center items-center'>
							{quranJs.map(page => {
								if (currentPage % 2 == 0) {
									setCurrentPage(currentPage - 1);
								}
								if (page.currentPage == currentPage) {
									return (
										<>
											<div
												// onClick={() => hiddenFuncFirst()}
												className=' '>
												<Image
													src={page.image2}
													width={600}
													height={940}
													alt=''
													loading='lazy'
												/>

												<div className='flex bg-white align-center justify-center gap-4'>
													<ClaimDeedsLeft
														deeds={props.deeds}
														pageDeeds={page.hasanatPage2}
													/>

													<p
														className={`${animation} ${hiddenFirst} absolute top-0 text-[green] text-3xl`}>{`+${page.hasanatPage2} Hasanat`}</p>
												</div>
											</div>
											<div
												// onClick={() => hiddenFuncSecond()}
												className=''>
												<Image
													src={page.image1}
													width={600}
													height={940}
													alt=''
													loading='lazy'
												/>
												<div className='flex b-y-2 bg-white align-center justify-center gap-4'>
													<ClaimDeedsRight
														deeds={props.deeds}
														pageDeeds={page.hasanatPage1}
													/>
												</div>
											</div>
										</>
									);
								}
							})}
						</div>
					</div>
					<div className='flex flex-col align-center justify-center'>
						<div className='flex justify-center items-center'>
							<ButtonRight currentPage={{ currentPage, setCurrentPage }} />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
