import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { FirebaseContext } from './context';
import { useTranslation } from 'react-i18next';

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Analytics } from 'firebase/analytics';
import { Auth, User } from 'firebase/auth';

import pkg from '!package';

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
	const { i18n } = useTranslation();

	const [auth, setAuth] = useState<Auth | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [firestore, setFirestore] = useState<Firestore | null>(null);
	const [analytics, setAnalytics] = useState<Analytics | null>(null);

	const isAuthenticated = useMemo(
		() => auth !== null && user !== null && firestore !== null,
		[auth, user, firestore]
	);

	const firebaseApp = useMemo<FirebaseApp>(() => {
		return getApps().length === 0
			? initializeApp(firebaseConfig)
			: getApps()[0];
	}, []);

	const logEvent = useCallback(
		async (eventName: string, params?: Record<string, any>) => {
			if (!analytics) return;

			const { logEvent } = await import('firebase/analytics');

			try {
				logEvent(analytics, eventName, params);
			} catch (err) {
				console.warn(
					`Analytics: Failed to log event "${eventName}"`,
					err
				);
			}
		},
		[analytics]
	);

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
			const { getAnalytics, isSupported, setUserProperties } =
				await import('firebase/analytics');

			if (await isSupported()) {
				const analytics = getAnalytics(firebaseApp);

				setUserProperties(analytics, {
					app_version: `${pkg.version}${
						import.meta.env.DEV ? '.dev' : ''
					}`,
					locale: i18n.language,
					user_role: import.meta.env.DEV ? 'developer' : 'player',
				});
				setAnalytics(analytics);
			}
		})();
	}, [firebaseApp, i18n.language]);

	return (
		<FirebaseContext.Provider
			value={{
				app: firebaseApp,
				firestore,
				analytics,
				auth,
				user,
				isAuthenticated,
				logEvent,
			}}>
			{children}
		</FirebaseContext.Provider>
	);
};
