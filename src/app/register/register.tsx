import React, { useState } from "react";
import { collection, getDoc, doc, addDoc, setDoc } from "firebase/firestore";
import { db } from "../../api/firebase/firebase";

const RegisterForm = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		// Überprüfen, ob das Dokument bereits existiert
		const userDocRef = doc(db, "login", email);
		const docSnap = await getDoc(userDocRef);
		if (docSnap.exists()) {
			setError("Benutzer existiert bereits");
			return;
		}

		// Wenn das Dokument nicht vorhanden ist, registrieren Sie den Benutzer
		try {
			await setDoc(userDocRef, {
				username: username,
				email: email,
				password: password,
				hasanat: 0,
			});
			console.log("Document written with ID: ", email);
			alert("Benutzer erstellt");
			// Hier können Sie die Weiterleitung oder Benachrichtigung für den Benutzer hinzufügen
		} catch (error) {
			console.error("Error adding document: ", error);
		}
	};

	return (
		<div className='flex justify-center items-center '>
			<form
				onSubmit={handleSubmit}
				className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96'>
				{error && <div className='text-red-500 mb-4'>{error}</div>}
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='email'>
						Username
					</label>
					<input
						type='text'
						id='email'
						value={username}
						onChange={e => setUsername(e.target.value)}
						required
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='email'>
						E-Mail
					</label>
					<input
						type='email'
						id='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<div className='mb-6'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='password'>
						Passwort
					</label>
					<input
						type='password'
						id='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
					/>
				</div>
				<button
					type='submit'
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
					Registrieren
				</button>
			</form>
		</div>
	);
};

export default RegisterForm;
