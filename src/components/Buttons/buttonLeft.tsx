import { Dispatch, SetStateAction } from "react";

interface Page {
	currentPage: {
		currentPage: number;
		setCurrentPage: Dispatch<SetStateAction<number>>;
	};
}

export default function ButtonLeft(props: Page) {
	console.log("props",props.currentPage.currentPage += 2);
	
	return (
		<a
			onClick={() =>
				props.currentPage.setCurrentPage((props.currentPage.currentPage += 2))
			}
			href='#_'
			className='rotate-180 relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-green-500 rounded-full shadow-md group'>
			<span className='absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-500 group-hover:translate-x-0 ease'>
				<svg
					className=' w-6 h-6'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						stroke-linecap='round'
						stroke-linejoin='round'
						stroke-width='2'
						d='M14 5l7 7m0 0l-7 7m7-7H3'></path>
				</svg>
			</span>
			<span className='rotate-180 absolute flex items-center justify-center w-full h-full text-green-500 transition-all duration-300 transform group-hover:translate-x-full ease'>
				Next Page
			</span>
			<span className='relative invisible'>Button Text</span>
		</a>
	);
}
