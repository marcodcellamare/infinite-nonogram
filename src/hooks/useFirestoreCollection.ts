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

	/*
	const getPagination = useCallback(
		async (queryConstraints: QueryConstraint[] = [], limit = 0) => {
			if (!isAuthenticated || !myCollection || !limit) return;

			setIsLoading(true);
			setError(null);

			try {
				const { collection, getCountFromServer, query } = await import(
					'firebase/firestore'
				);

				const colRef = collection(
					myCollection.firestore,
					myCollection.collectionName
				);
				const q = query(colRef, ...queryConstraints);
				const snapshot = await getCountFromServer(q);

				console.log(snapshot.data().count);

				setTotalPages(Math.ceil(snapshot.data().count / limit));
			} catch (err) {
				console.error(err);
				setError(err instanceof Error ? err.message : String(err));
			} finally {
				setIsLoading(false);
			}
		},
		[isAuthenticated, myCollection]
	);

	/*
	const [docs, setDocs] = useState<DocumentData[]>([]);
const [count, setCount] = useState<number | null>(null);

useEffect(() => {
  if (!docs.length) {
    // only fetch if not already fetched
    const run = async () => {
      const snap = await getDocs(paginatedQuery);
      setDocs(snap.docs.map(d => d.data()));
    };
    run();
  }

  if (count === null) {
    const runCount = async () => {
      const snap = await getCountFromServer(countQuery);
      setCount(snap.data().count);
    };
    runCount();
  }
}, []);
*/

	const getDocuments = useCallback(
		async (
			queryConstraints: QueryConstraint[] = [],
			pagination = {
				limit: 0,
				page: 0,
			}
		) => {
			if (!isAuthenticated || !myCollection) return;

			setIsLoading(true);
			setError(null);

			try {
				const { collection, getDocs, query, limit, startAfter } =
					await import('firebase/firestore');

				if (pagination.limit > 0) {
					//getPagination(queryConstraints, pagination.limit);

					queryConstraints = [
						...queryConstraints,
						limit(pagination.limit),
						startAfter(pagination.page),
					];
				}

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
