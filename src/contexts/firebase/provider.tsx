import { ReactNode, useEffect, useMemo, useState } from 'react';
import { FirebaseContext } from './context';

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Analytics } from 'firebase/analytics';
import { Auth, User } from 'firebase/auth';

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
	const [auth, setAuth] = useState<Auth | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [firestore, setFirestore] = useState<Firestore | null>(null);
	const [analytics, setAnalytics] = useState<Analytics | null>(null);

	const isAuthenticated = useMemo(() => user !== null, [user]);
	const firebaseApp = useMemo<FirebaseApp>(() => {
		return getApps().length === 0
			? initializeApp(firebaseConfig)
			: getApps()[0];
	}, []);

	useEffect(() => {
		let unsubscribe: (() => void) | null = null;

		(async () => {
			const { getAuth, onAuthStateChanged, signInAnonymously } =
				await import('firebase/auth');

			const authInstance = getAuth(firebaseApp);
			setAuth(authInstance);

			unsubscribe = onAuthStateChanged(authInstance, async (user) => {
				if (!user) {
					const credential = await signInAnonymously(authInstance);
					setUser(credential.user);
				} else {
					setUser(user);
				}
			});
		})();

		return () => {
			if (unsubscribe) unsubscribe();
		};
	}, [firebaseApp]);

	useEffect(() => {
		(async () => {
			const { getFirestore } = await import('firebase/firestore');
			setFirestore(getFirestore(firebaseApp));
		})();
	}, [firebaseApp]);

	useEffect(() => {
		(async () => {
			const { getAnalytics, isSupported } = await import(
				'firebase/analytics'
			);
			if (await isSupported()) {
				setAnalytics(getAnalytics(firebaseApp));
			}
		})();
	}, [firebaseApp]);

	return (
		<FirebaseContext.Provider
			value={{
				app: firebaseApp,
				firestore,
				analytics,
				auth,
				user,
				isAuthenticated,
			}}>
			{children}
		</FirebaseContext.Provider>
	);
};
