"use client";
import { Dispatch, SetStateAction, useState } from "react";
interface Deeds {
	deeds: {
		deeds: number;
		setDeeds: Dispatch<SetStateAction<number>>;
	};
}

export default function Deeds(props: Deeds) {
	return (
		<div className='flex gap-4 border-2 py-6 px-12 m-4'>
			<p>My Hasanat:</p>
			<p>{props.deeds.deeds}</p>
		</div>
	);
}
