import { useEffect } from 'react';
import { orderBy, where, limit } from 'firebase/firestore';
import useFirestoreCollection from '!/hooks/useFirestoreCollection';
import { useSettings } from '!/contexts/settings';

import Player from './player';
import Info from './Info';
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
	const { difficulty, cols, rows } = useSettings();

	useEffect(() => {
		if (!show) return;

		getDocuments([
			where('prod', '==', import.meta.env.PROD),
			where('name', '>=', ''),
			where('name', '<=', '\uf8ff'),
			where('difficulty', '==', difficulty),
			where('cols', '==', cols),
			where('rows', '==', rows),
			where('time', '>', 0),
			where('score', '>', 0),
			where('rating', '>', 0),
			orderBy('score', 'desc'),
			orderBy('time', 'asc'),
			orderBy('name', 'asc'),
			limit(10),
		]);
	}, [getDocuments, show, difficulty, cols, rows]);

	return (
		<>
			<Info />
			{!isLoading ? (
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
			)}
		</>
	);
};
export default Leaderboard;
