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
	const [transform, setTransform] = useState(0);
	const [leftHidden, setLeftHidden] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [preloadedImages, setPreloadedImages] = useState<HTMLImageElement[]>(
		[],
	);
	const [searchInput, setSearchInput] = useState(0);
	const minSwipeDistance = 50;

	const onTouchStart = (e: any) => {
		setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
		setTouchStart(e.targetTouches[0].clientX);
	};

	const Left = () => {
		console.log(
			"preloadedImages[currentIndex]?.src",
			preloadedImages[currentIndex]?.src,
		);
		setTransform(-750);
		setLeftHidden("opacity-0");
		setTimeout(() => {
			setTransform(750);
			setCurrentIndex(
				currentIndex - 2 < 0 ? preloadedImages.length - 2 : currentIndex - 2,
			);
		}, 250);
		if (preloadedImages[currentIndex]?.src) {
			setTimeout(() => {
				setLeftHidden("");
				setTransform(0);
			}, 600);
		}
	};

	const Right = () => {
		console.log(
			"preloadedImages[currentIndex]dd?.src",
			preloadedImages[currentIndex]?.src,
		);
		setTransform(750);
		setLeftHidden("opacity-0");
		setTimeout(() => {
			setTransform(-750);
			setCurrentIndex(
				currentIndex + 2 >= preloadedImages.length ? 0 : currentIndex + 2,
			);
		}, 250);
		if (preloadedImages[currentIndex]?.src) {
			setTimeout(() => {
				setLeftHidden("");

				setTransform(0);
			}, 400);
		}
	};
	const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);
	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > minSwipeDistance;
		const isRightSwipe = distance < -minSwipeDistance;
		if (isLeftSwipe || isRightSwipe) isLeftSwipe ? Left() : Right();
	};

	// const func = (url: any) => {
	// 	const images: any | ((prevState: never[]) => never[]) = [];
	// 	if (typeof window !== "undefined") {
	// 		url.forEach((url: any) => {
	// 			const img1 = new (window as any).Image();
	// 			const img2 = new (window as any).Image();
	// 			img1.src = url[0].image1;
	// 			img1.alt = url[0].hasanatPage1;
	// 			img2.src = url[0].image2;
	// 			img2.alt = url[0].hasanatPage2;
	// 			images.push(img1);
	// 			images.push(img2);
	// 		});
	// 		setPreloadedImages(images);
	// 	}
	// };

	// useEffect(() => {
	// 	const url = quranJs.map(url => {
	// 		return [url];
	// 	});
	// 	func(url);
	// }, []);

	useEffect(() => {
		const handleKeyPress = (event: { key: string }) => {
			if (typeof window !== "undefined" && preloadedImages.length > 0) {
				if (event.key === "ArrowLeft") {
					Right();
				} else if (event.key === "ArrowRight") {
					Left();
				}
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("keydown", handleKeyPress);

			// Aufräumen, wenn die Komponente unmountet wird
			return () => {
				window.removeEventListener("keydown", handleKeyPress);
			};
		}

		// Aufräumen, wenn die Komponente unmountet wird
	}, [currentIndex, preloadedImages]);

	const handleSearchInputChange = (event: any) => {
		setSearchInput(parseInt(event.target.value) - 1);
	};

	const goToSearchedImage = () => {
		if (Number.isNaN(searchInput)) {
			console.log("Bitte eine Zahl eingeben");
		} else {
			if (searchInput < 0) {
				console.log("Bitte ab 1 Enngeben");
			} else {
				if (searchInput % 2 == 0) {
					setCurrentIndex(searchInput);
				} else {
					setCurrentIndex(searchInput - 1);
				}
			}
		}
	};
	const [visibleIndex, setVisibleIndex] = useState(0);
	const [allImages, setAllImages] = useState([]);

	const preloadAllImages = async () => {
		const images: any = [];
		for (const url of quranJs) {
			const img1 = new (window as any).Image();
			const img2 = new (window as any).Image();
			img1.src = url.image1;
			img1.alt = url.hasanatPage1;
			img2.src = url.image2;
			img2.alt = url.hasanatPage2;
			await Promise.all([
				new Promise((resolve, reject) => {
					img1.onload = img1.onerror = resolve;
					img1.onabort = reject;
				}),
				new Promise((resolve, reject) => {
					img2.onload = img2.onerror = resolve;
					img2.onabort = reject;
				}),
			]);
			images.push({ img1, img2 });
		}
		setAllImages(images);
	};
	useEffect(() => {
		preloadAllImages();
	}, []);
	const goForward = () => {
		setVisibleIndex((visibleIndex + 1) % preloadedImages.length);
	};

	// Funktion zum Rückwärtsbewegen
	const goBackward = () => {
		setVisibleIndex(
			(visibleIndex - 1 + preloadedImages.length) % preloadedImages.length,
		);
	};
	const hiddenStyle = {
		display: "none",
	};
	return (
		<div className='flex flex-start '>
			<article>
				<Sidebar
					handleSearchInputChange={handleSearchInputChange}
					goToSearchedImage={goToSearchedImage}
				/>
			</article>
			<main className=' flex justify-center '>
				<div className='flex gap-4'>
					<div className='hidden lg:flex flex-col align-center justify-center'>
						<div onClick={Right} className='flex justify-center items-center'>
							<ButtonLeft currentPage={{ currentPage, setCurrentPage }} />
							{/* <button >Vor</button> */}
						</div>
					</div>
					<div
						onTouchStart={onTouchStart}
						onTouchMove={onTouchMove}
						onTouchEnd={onTouchEnd}
						className='flex flex-col  align-center justify-center'>
						<div
							style={{ transform: `translateX(${transform}px)`, left: "0" }}
							className={`${leftHidden} duration-300 mt-20 gap-2 xl:gap-0 flex-col-reverse xl:flex-row border-2 flex justify-center items-center`}>
							{/* Hier werden immer nur zwei Bilder angezeigt */}

							<div>
								<div>
									<button onClick={goBackward}>Zurück</button>
									<button onClick={goForward}>Vorwärts</button>
								</div>
								<div>
									{allImages.map((images, index) => (
										<div
											key={index}
											style={
												index === visibleIndex ||
												index === (visibleIndex + 1) % allImages.length
													? {}
													: hiddenStyle
											}>
											<img src={images.img1.src} alt={images.img1.alt} />
											<img src={images.img2.src} alt={images.img2.alt} />
										</div>
									))}
								</div>
							</div>
							{/* <div className='flex flex-col items-center'>
								<Image
									src={preloadedImages[currentIndex + 1]?.src}
									width={700}
									height={940}
									alt={preloadedImages[currentIndex + 1]?.alt}
									loading='lazy'
								/>
								<ClaimDeedsLeft
									pageDeeds={preloadedImages[currentIndex + 1]?.alt}
								/>
							</div>

							<div className='flex flex-col items-center'>
								<Image
									src={preloadedImages[currentIndex]?.src}
									width={700}
									height={940}
									alt={preloadedImages[currentIndex]?.alt}
									loading='lazy'
								/>
								<ClaimDeedsRight
									pageDeeds={preloadedImages[currentIndex]?.alt}
								/>
							</div> */}

							{/* Buttons zum Wechseln der angezeigten Bilder */}

							{/* {quranJs.map(page => {
								if (currentPage % 2 == 0) {
									setCurrentPage(currentPage - 1);
								}
								if (page.currentPage == currentPage) {
									return (
										<>
											<div className=' '>
												<Image
													src={page.image2}
													width={650}
													height={940}
													alt=''
													loading='lazy'
												/>

												<div className='relative flex p-4 bg-white align-center justify-center gap-4'>
													<ClaimDeedsLeft pageDeeds={page.hasanatPage2} />

													<p
														className={`${animation} ${hiddenFirst} absolute top-0 text-[green] text-3xl`}>{`+${page.hasanatPage2} Hasanat`}</p>
												</div>
											</div>
											<div className=''>
												<Image
													src={page.image1}
													width={650}
													height={940}
													alt=''
													loading='lazy'
												/>
												<div className='relative flex p-4 bg-white align-center justify-center gap-4'>
													<ClaimDeedsRight pageDeeds={page.hasanatPage1} />
												</div>
											</div>
										</>
									);
								}
							})} */}
						</div>
					</div>
					<div className='hidden lg:flex  flex-col align-center justify-center'>
						<div onClick={Right} className='flex justify-center items-center'>
							<ButtonRight currentPage={{ currentPage, setCurrentPage }} />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
