import { ReactNode, useEffect, useMemo, useState } from 'react';
import { FirebaseContext } from './context';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';
import {
	getAuth,
	signInAnonymously,
	onAuthStateChanged,
	User,
} from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	const firebaseApp = useMemo(() => {
		return getApps().length === 0
			? initializeApp(firebaseConfig)
			: getApps()[0];
	}, []);

	const firestore = useMemo(() => getFirestore(firebaseApp), [firebaseApp]);
	const [analytics, setAnalytics] = useState<Analytics | null>(null);
	const auth = useMemo(() => getAuth(firebaseApp), [firebaseApp]);
	const isAuthenticated = useMemo(() => user !== null, [user]);

	useEffect(() => {
		isSupported().then((supported) => {
			if (supported) {
				setAnalytics(getAnalytics(firebaseApp));
			}
		});
	}, [firebaseApp]);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (!user) {
				const credential = await signInAnonymously(auth);

				setUser(credential.user);
			} else {
				setUser(user);
			}
		});
		return () => unsubscribe();
	}, [auth]);

	return (
		<FirebaseContext.Provider
			value={{
				app: firebaseApp,
				firestore,
				analytics,
				user,
				isAuthenticated,
			}}>
			{children}
		</FirebaseContext.Provider>
	);
};
