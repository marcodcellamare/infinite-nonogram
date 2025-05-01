import { PointerEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings';
import { useAudio } from '!/contexts/audio';
import { serverTimestamp } from 'firebase/firestore';
import useFirestoreCollection from '!/hooks/useFirestoreCollection';
import { useTimer } from '!/contexts/timer';
import MountTransition from '!/app/misc/MountTransition';
import classNames from 'classnames';

import Time from './Time';
import Points from './Points';
import Rating from './Rating';

import { RefreshCwIcon } from 'lucide-react';

import { LeaderboardPlayerProps } from '!/types/leaderboard';

const Score = () => {
	const { i18n } = useTranslation();
	const { addDocument } = useFirestoreCollection<LeaderboardPlayerProps>(
		process.env.FIREBASE_LEADERBOARD_COLLECTION ?? ''
	);
	const { isReady, isCompleted, score, rating, hasWin } = useEngine();
	const {
		setSeed,
		user,
		country,
		seed,
		cols,
		rows,
		difficulty,
		showEffects,
		isLeaderboardOn,
	} = useSettings();
	const { ms: time } = useTimer();
	const { play: playSound } = useAudio();

	const [title, setTitle] = useState('');
	const [next, setNext] = useState('');

	const randomizer = useCallback(
		(path: string) => {
			const texts = i18n.t(path, {
				returnObjects: true,
			}) as string[];

			return texts.length > 0
				? texts[Math.floor(Math.random() * texts.length)]
				: '';
		},
		[i18n]
	);

	const handleMounted = useCallback(() => {
		setTitle(randomizer('score.titles'));
		setNext(randomizer('score.next'));
		playSound(hasWin ? 'ending-victory' : 'ending-loss');

		if (isLeaderboardOn && hasWin)
			addDocument({
				date: serverTimestamp(),
				name: user ?? '',
				country,
				score,
				rating,
				cols,
				rows,
				difficulty,
				seed,
				time,
			});
	}, [
		randomizer,
		playSound,
		isLeaderboardOn,
		addDocument,
		hasWin,
		user,
		country,
		score,
		rating,
		cols,
		rows,
		difficulty,
		seed,
		time,
	]);

	return (
		<MountTransition
			mountIf={isReady && isCompleted}
			timeout={
				showEffects
					? {
							delay: 1000,
							entering: 400,
							exiting: 400,
					  }
					: 0
			}
			onMounted={handleMounted}>
			{({ isEntering, isMounting, status }) => (
				<div
					className={classNames([
						'overlay overflow-hidden',
						'fixed top-0 bottom-0 left-0 right-0 z-10',
						'flex justify-center items-center',
						isEntering ? 'opacity-100' : 'opacity-0',
						{
							'transition-opacity duration-400': showEffects,
							'pointer-events-none': status !== 'done',
						},
					])}>
					<div className='flex flex-col gap-10 text-white text-center'>
						<div
							className={classNames([
								'text-[12vw] tracking-tight leading-[0.8em] font-black',
								status !== 'done'
									? isMounting
										? '-translate-x-full opacity-0'
										: 'translate-x-full opacity-0'
									: 'translate-x-0 opacity-100',
								{
									'transition-[translate,opacity] duration-1000 drop-shadow-xl':
										showEffects,
								},
							])}>
							{title}
						</div>
						<div className='flex justify-center my-5'>
							<Rating />
						</div>
						<div className='flex flex-row justify-center gap-0.5'>
							<Time />
							<Points />
						</div>
						<div>
							<button
								type='button'
								className='btn btn-xl btn-secondary rounded-full px-15'
								disabled={!isCompleted}
								onPointerDown={(e: PointerEvent) => {
									e.nativeEvent.stopImmediatePropagation();
									setSeed();
								}}>
								<RefreshCwIcon className='text-svg-inline' />{' '}
								{next}
							</button>
						</div>
					</div>
				</div>
			)}
		</MountTransition>
	);
};
export default Score;
