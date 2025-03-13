import { useCallback, useMemo, useState } from 'react';
import {
	addDoc,
	collection,
	Firestore,
	getDocs,
	query,
	QueryConstraint,
} from 'firebase/firestore';
import { useFirebase } from '!/contexts/firebase';

const useFirestoreCollection = <T>(collectionName: string) => {
	const { firestore, isAuthenticated } = useFirebase();

	const [docs, setDocs] = useState<T[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const myCollection = useMemo(
		() => collection(firestore as Firestore, collectionName),
		[firestore, collectionName]
	);

	const getDocuments = useCallback(
		(queryConstraints: QueryConstraint[] = []) => {
			if (!isAuthenticated) return;

			setIsLoading(true);
			setError(null);

			getDocs(query(myCollection, ...queryConstraints))
				.then((snapshot) =>
					setDocs(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
						})) as T[]
					)
				)
				.catch((error) => {
					console.error(error);
					setError(error.toString());
				})
				.finally(() => setIsLoading(false));
		},
		[isAuthenticated, myCollection]
	);

	const addDocument = useCallback(
		(newDoc: Omit<T, 'id'>) => {
			if (!isAuthenticated) return;

			setIsLoading(true);
			setError(null);

			addDoc(myCollection, newDoc)
				.catch((error) => {
					console.error(error);
					setError(error.toString());
				})
				.finally(() => {
					setIsLoading(false);
					getDocuments();
				});
		},
		[isAuthenticated, myCollection, getDocuments]
	);

	return { docs, isLoading, error, getDocuments, addDocument };
};
export default useFirestoreCollection;
