import { createContext } from 'react';
import { FirebaseContextProps } from '!/types/firebase';

export const FirebaseContext = createContext<FirebaseContextProps | undefined>(
	undefined
);
