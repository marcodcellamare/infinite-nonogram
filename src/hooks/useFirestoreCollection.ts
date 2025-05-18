import { useCallback, useMemo, useState } from 'react';
import { Firestore, QueryConstraint } from 'firebase/firestore';
import { useFirebase } from '!/contexts/firebase';

const useFirestoreCollection = <T>(collectionName: string) => {
	const { firestore, isAuthenticated } = useFirebase();

	const [docs, setDocs] = useState<T[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const myCollection = useMemo(() => {
		if (!firestore) return null;

		return { firestore: firestore as Firestore, collectionName };
	}, [firestore, collectionName]);

	const getDocuments = useCallback(
		async (queryConstraints: QueryConstraint[] = []) => {
			if (!isAuthenticated || !myCollection) return;

			setIsLoading(true);
			setError(null);

			try {
				const { collection, getDocs, query } = await import(
					'firebase/firestore'
				);

				const colRef = collection(
					myCollection.firestore,
					myCollection.collectionName
				);
				const q = query(colRef, ...queryConstraints);
				const snapshot = await getDocs(q);

				setDocs(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					})) as T[]
				);
			} catch (err) {
				console.error(err);
				setError(err instanceof Error ? err.message : String(err));
			} finally {
				setIsLoading(false);
			}
		},
		[isAuthenticated, myCollection]
	);

	const addDocument = useCallback(
		async (newDoc: Omit<T, 'id'>) => {
			if (!isAuthenticated || !myCollection) return;

			setIsLoading(true);
			setError(null);

			try {
				const { collection, addDoc } = await import(
					'firebase/firestore'
				);
				const colRef = collection(
					myCollection.firestore,
					myCollection.collectionName
				);
				await addDoc(colRef, newDoc);
				await getDocuments();
			} catch (err) {
				console.error(err);
				setError(err instanceof Error ? err.message : String(err));
			} finally {
				setIsLoading(false);
			}
		},
		[isAuthenticated, myCollection, getDocuments]
	);
	return { docs, isLoading, error, getDocuments, addDocument };
};
export default useFirestoreCollection;
