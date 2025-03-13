import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Analytics } from 'firebase/analytics';
import { User } from 'firebase/auth';

export interface FirebaseContextProps {
	app: FirebaseApp;
	firestore: Firestore;
	analytics: Analytics | null;
	user: User | null;
	isAuthenticated: boolean;
}
