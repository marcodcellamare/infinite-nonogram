import { useEffect, useState } from 'react';
import { useFirebase } from '!/contexts/firebase';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import Config from '!config';

import Player from './Player';
import { ClockIcon, CloudOffIcon, ListOrderedIcon } from 'lucide-react';

import { LeaderboardPlayerProps } from '!/types/leaderboard';

interface LeaderboardProps {
	show: boolean;
}

const Leaderboard = ({ show }: LeaderboardProps) => {
	const { firestore } = useFirebase();

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState<string | false>(false);
	const [leaderboard, setLeaderboard] = useState<
		Partial<LeaderboardPlayerProps[]>
	>([]);

	useEffect(() => {
		if (!show) return;

		setIsLoading(true);
		setIsError(false);
		getDocs(
			query(
				collection(firestore, 'leaderboard'),
				orderBy('score', 'desc'),
				orderBy('time', 'asc'),
				orderBy('name', 'asc'),
				limit(50)
			)
		)
			.then((querySnapshot) => {
				const docs: LeaderboardPlayerProps[] = querySnapshot.docs.map(
					(doc) => ({
						date: doc.data().date ? doc.data().date.toDate() : '',
						name: doc.data().name ?? '',
						country: doc.data().country ?? '',
						score: doc.data().score ?? 0,
						rating: doc.data().rating ?? 0,
						cols: doc.data().cols ?? Config.game.grid.min,
						rows: doc.data().rows ?? Config.game.grid.min,
						difficulty:
							doc.data().difficulty ??
							Config.game.difficulty.default,
						seed: doc.data().seed ?? '',
						time: doc.data().time ?? 0,
					})
				);
				setLeaderboard(docs);
			})
			.catch((error) => {
				setIsError(error.toString());
				console.error(error);
			})
			.finally(() => setIsLoading(false));
	}, [firestore, show]);

	return (
		<>
			{!isLoading ? (
				!isError ? (
					<div className='grid grid-cols-[auto_auto_1fr_auto_auto] auto-rows-min gap-x-2 sm:gap-x-5 gap-y-2 justify-items-stretch items-center'>
						<div className='col-span-4 justify-self-end'>
							<ListOrderedIcon className='lucide-text' />
						</div>
						<div className='justify-self-end'>
							<ClockIcon className='lucide-text' />
						</div>

						{leaderboard.map((player, k) =>
							player ? (
								<Player
									key={k}
									rank={k}
									{...player}
								/>
							) : null
						)}
					</div>
				) : (
					<div className='text-error'>
						<CloudOffIcon className='lucide-text text-3xl mb-1' />
						<div className='text-xs font-bold'>{isError}</div>
					</div>
				)
			) : (
				<div className='loading loading-infinity loading-xl' />
			)}
		</>
	);
};
export default Leaderboard;
