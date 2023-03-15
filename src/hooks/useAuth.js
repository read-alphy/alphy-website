import { useState, useEffect } from 'react';
import {
	getAuth,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	TwitterAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseApp } from '../helper/firebase'; // assuming you have initialized Firebase in a separate file

const auth = getAuth(firebaseApp);

const useAuth = () => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	const loginWithEmail = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const registerWithEmail = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const loginWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider);
	};

	const loginWithTwitter = () => {
		const provider = new TwitterAuthProvider();
		return signInWithPopup(auth, provider);
	};

	const logout = () => {
		return signOut(auth);
	};

	return {
		currentUser,
		loginWithEmail,
		loginWithGoogle,
		loginWithTwitter,
		logout,
		registerWithEmail,
	};
};

export { useAuth };
