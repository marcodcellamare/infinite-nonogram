import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Analytics } from 'firebase/analytics';
import { User, Auth } from 'firebase/auth';

export interface FirebaseContextProps {
	app: FirebaseApp;
	firestore: Firestore | null;
	analytics: Analytics | null;
	auth: Auth | null;
	user: User | null;
	isAuthenticated: boolean;
}
