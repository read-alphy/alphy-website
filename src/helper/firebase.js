import { initializeApp } from 'firebase/app';
const firebaseConfig = {
	apiKey: 'AIzaSyCQlDrSG7cOYqqOaj79hFbipJIFqzlRhwg',
	//authDomain: 'alphy-74583.firebaseapp.com',
	authDomain: 'auth.alphy.app',
	projectId: 'alphy-74583',
	storageBucket: 'alphy-74583.appspot.com',
	messagingSenderId: '606454102589',
	appId: '1:606454102589:web:1b94cc9a6d7b00a28c4854',
};
const firebaseApp = initializeApp(firebaseConfig, "alphy");

export { firebaseApp };
