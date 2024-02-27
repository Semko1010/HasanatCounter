"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import ButtonRight from "../../../components/Buttons/buttonRight";
import ButtonLeft from "../../../components/Buttons/buttonLeft";
import ClaimDeedsRight from "../../../components/Buttons/ClaimDeeds/ClaimDeedsright";
import ClaimDeedsLeft from "../../../components/Buttons/ClaimDeeds/ClaimDeedsLeft";
import quranJs from "../../../api/quranJs.json";
import Sidebar from "../../../components/sidebar/Sidebar";
import Image from "next/image";

export default function QuranMain() {
	// const [page, setPage] = useState({ firstPage: 5, secondPage: 6 });
	const [currentPage, setCurrentPage] = useState(1);
	const [animation, setAnimation] = useState("animate-ping");
	const [hiddenFirst, sethiddenFirst] = useState("hidden");
	const [touchStart, setTouchStart] = useState(null);
	const [touchEnd, setTouchEnd] = useState(null);
	const minSwipeDistance = 50;
	const onTouchStart = (e: any) => {
		setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
		setTouchStart(e.targetTouches[0].clientX);
	};
	const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);
	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > minSwipeDistance;
		const isRightSwipe = distance < -minSwipeDistance;
		if (isLeftSwipe || isRightSwipe)
			isLeftSwipe
				? setCurrentPage(currentPage - 2 < 1 ? 1 : currentPage - 2)
				: setCurrentPage(currentPage + 2);
		// add your conditional logic here
	};
	return (
		<div className='flex flex-start '>
			<article>
				<Sidebar currentPage={{ currentPage, setCurrentPage }} />
			</article>
			<main className=' flex justify-center '>
				<div className='flex gap-4'>
					<div className='hidden lg:flex flex-col align-center justify-center'>
						<div className='flex justify-center items-center'>
							<ButtonLeft currentPage={{ currentPage, setCurrentPage }} />
						</div>
					</div>
					<div
						onTouchStart={onTouchStart}
						onTouchMove={onTouchMove}
						onTouchEnd={onTouchEnd}
						className='flex flex-col  align-center justify-center'>
						<div className='gap-2 xl:gap-0 flex-col-reverse xl:flex-row border-2 flex justify-center items-center'>
							{quranJs.map(page => {
								if (currentPage % 2 == 0) {
									setCurrentPage(currentPage - 1);
								}
								if (page.currentPage == currentPage) {
									return (
										<>
											<div className=' '>
												<Image
													src={page.image2}
													width={600}
													height={940}
													alt=''
													loading='lazy'
												/>

												<div className='flex p-4 bg-white align-center justify-center gap-4'>
													<ClaimDeedsLeft pageDeeds={page.hasanatPage2} />

													<p
														className={`${animation} ${hiddenFirst} absolute top-0 text-[green] text-3xl`}>{`+${page.hasanatPage2} Hasanat`}</p>
												</div>
											</div>
											<div className=''>
												<Image
													src={page.image1}
													width={600}
													height={940}
													alt=''
													loading='lazy'
												/>
												<div className='flex p-4 bg-white align-center justify-center gap-4'>
													<ClaimDeedsRight pageDeeds={page.hasanatPage1} />
												</div>
											</div>
										</>
									);
								}
							})}
						</div>
					</div>
					<div className='hidden lg:flex  flex-col align-center justify-center'>
						<div className='flex justify-center items-center'>
							<ButtonRight currentPage={{ currentPage, setCurrentPage }} />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
