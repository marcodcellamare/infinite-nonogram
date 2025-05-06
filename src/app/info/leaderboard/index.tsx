import { useEffect } from 'react';
import { limit, orderBy, where } from 'firebase/firestore';
import useFirestoreCollection from '!/hooks/useFirestoreCollection';

import Player from './player';
import { CloudOffIcon, FrownIcon } from 'lucide-react';

import { LeaderboardPlayerProps } from '!/types/leaderboard';

interface LeaderboardProps {
	show: boolean;
}

const Leaderboard = ({ show }: LeaderboardProps) => {
	const { getDocuments, docs, isLoading, error } =
		useFirestoreCollection<LeaderboardPlayerProps>(
			process.env.FIREBASE_LEADERBOARD_COLLECTION ?? ''
		);

	useEffect(() => {
		if (!show) return;

		getDocuments([
			where('name', '>=', ''),
			where('name', '<=', '\uf8ff'),
			where('time', '>', 0),
			where('score', '>', 0),
			where('rating', '>', 0),
			orderBy('score', 'desc'),
			orderBy('time', 'asc'),
			orderBy('name', 'asc'),
			limit(10),
		]);

		/*
		import { getCountFromServer, collection, query, where } from 'firebase/firestore';

const q = query(
	collection(db, 'yourCollection'),
	where('name', '>=', ''),
	where('name', '<=', '\uf8ff'),
	where('time', '>', 0),
	where('score', '>', 0),
	where('rating', '>', 0),
);

const snapshot = await getCountFromServer(q);
const totalDocs = snapshot.data().count;

const pageSize = 10;
const totalPages = Math.ceil(totalDocs / pageSize);
*/
	}, [getDocuments, show]);

	return !isLoading ? (
		!error ? (
			docs.length > 0 ? (
				<div className='grid grid-cols-[min-content_min-content_minmax(100px,1fr)_min-content_min-content] gap-x-2 sm:gap-x-5 gap-y-1 md:gap-y-2 justify-items-stretch items-center'>
					{docs.map((doc, k) =>
						doc ? (
							<Player
								key={k}
								rank={k}
								{...doc}
							/>
						) : null
					)}
				</div>
			) : (
				<FrownIcon className='text-svg-inline text-3xl text-secondary' />
			)
		) : (
			<div className='text-error'>
				<CloudOffIcon className='text-svg-inline text-3xl mb-1' />
				<div className='text-xs font-bold text-wrap break-words'>
					{error}
				</div>
			</div>
		)
	) : (
		<div className='loading loading-infinity loading-xl' />
	);
};
export default Leaderboard;
