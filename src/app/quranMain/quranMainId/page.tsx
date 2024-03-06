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
	const [currentPage, setCurrentPage] = useState(1);
	const [screenValue, setScreenValue] = useState(1);

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
		setCurrentIndex(
			currentIndex - screenValue < 0
				? preloadedImages.length - screenValue
				: currentIndex - screenValue,
		);
		setTransform(-750);
		setLeftHidden("opacity-0");

		setTimeout(() => {
			setTransform(750);
		}, 250);

		setTimeout(() => {
			setLeftHidden("");
			setTransform(0);
		}, 1000);
	};

	const Right = () => {
		setCurrentIndex(
			currentIndex + screenValue >= preloadedImages.length
				? 0
				: currentIndex + screenValue,
		);
		setTransform(750);
		setLeftHidden("opacity-0");

		setTimeout(() => {
			setTransform(-750);
		}, 250);

		setTimeout(() => {
			setLeftHidden("");

			setTransform(0);
		}, 1000);
	};
	const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);
	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > minSwipeDistance;
		const isRightSwipe = distance < -minSwipeDistance;
		if (isLeftSwipe || isRightSwipe) isLeftSwipe ? Left() : Right();
	};

	const preloadImages = async (urls: any) => {
		const images = [];
		for (const url of urls) {
			const img1 = new (window as any).Image();
			const img2 = new (window as any).Image();

			img1.src = url[0].image1;
			img1.alt = url[0].hasanatPage1;
			img2.src = url[0].image2;
			img2.alt = url[0].hasanatPage2;
			await new Promise((resolve, reject) => {
				img1.onload = img1.onerror = img2.onload = img2.onerror = resolve;
				img1.onabort = img2.onabort = reject;
			});
			images.push(img1, img2);
		}
		return images;
	};
	useEffect(() => {
		const url = quranJs.map(url => {
			return [url];
		});

		if (typeof window !== "undefined") {
			const screenWidth = window.screen.width;
			if (screenWidth < 1280) {
				setScreenValue(1);
			} else {
				setScreenValue(2);
			}
		}

		preloadImages(url)
			.then(images => setPreloadedImages(images))
			.catch(error => console.error("Fehler beim Vorladen der Bilder:", error));
	}, []);
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
				if (typeof window !== "undefined") {
					const screenWidth = window.screen.width;
					if (screenWidth < 1280) {
						setCurrentIndex(searchInput);
					} else {
						if (searchInput % 2 == 0) {
							setCurrentIndex(searchInput);
						} else {
							setCurrentIndex(searchInput - 1);
						}
					}
				}
			}
		}
	};

	return (
		<div className='flex flex-start '>
			<article>
				<Sidebar
					setCurrentIndex={setCurrentIndex}
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
						className='flex flex-col align-center justify-center'>
						{/* desktop */}
						<div
							style={{ transform: `translateX(${transform}px)`, left: "0" }}
							className={`${leftHidden} hidden xl:flex duration-300 mt-28 gap-2 xl:gap-0 flex-col-reverse xl:flex-row border-2 flex justify-center items-center`}>
							<div className=' flex flex-col xl:flex-row-reverse'>
								{preloadedImages.map((image, index) => (
									<div
										key={index}
										className={` ${
											index === currentIndex || index === currentIndex + 1
												? "visible flex justify-center relative"
												: "hidden"
										}`}>
										<>
											<Image
												src={image.src}
												width={700}
												height={940}
												alt={image.alt}
												loading='lazy'
											/>
											<ClaimDeedsLeft index={index} pageDeeds={image.alt} />
										</>
									</div>
								))}
							</div>
						</div>

						{/* desktop */}

						{/* Mobile */}
						<div
							style={{ transform: `translateX(${transform}px)`, left: "0" }}
							className={`${leftHidden} xl:hidden duration-300 mt-28 gap-2 xl:gap-0 flex-col-reverse xl:flex-row border-2 flex justify-center items-center`}>
							<div className='justify-center flex flex-col xl:flex-row-reverse'>
								{preloadedImages.map((image, index) => (
									<div
										key={index}
										className={` ${
											index === currentIndex
												? "visible flex justify-center"
												: "hidden"
										}`}>
										<Image
											src={image.src}
											width={370}
											height={640}
											alt={image.alt}
											loading='lazy'
										/>
										<ClaimDeedsLeft index={index} pageDeeds={image.alt} />
									</div>
								))}
							</div>
						</div>

						{/* Mobile */}
					</div>
					<div className='hidden lg:flex  flex-col align-center justify-center'>
						<div onClick={Left} className='flex justify-center items-center'>
							<ButtonRight currentPage={{ currentPage, setCurrentPage }} />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
