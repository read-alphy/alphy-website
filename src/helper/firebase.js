import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
const firebaseConfig = {
	apiKey: 'AIzaSyCQlDrSG7cOYqqOaj79hFbipJIFqzlRhwg',
	authDomain: 'alphy-74583.firebaseapp.com',
	projectId: 'alphy-74583',
	storageBucket: 'alphy-74583.appspot.com',
	messagingSenderId: '606454102589',
	appId: '1:606454102589:web:1b94cc9a6d7b00a28c4854',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
	signInWithPopup(auth, provider)
		.then((result) => {
			// console log id token
			result.user.getIdToken().then((idToken) => {
				console.log(idToken);
			});
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
};
