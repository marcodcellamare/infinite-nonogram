import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings';
import { serverTimestamp } from 'firebase/firestore';
import useFirestoreCollection from '!/hooks/useFirestoreCollection';
import { useTimer } from '!/contexts/timer';
import useMountTransition from '!/hooks/useMountTransition';
import classNames from 'classnames';

import Time from './Time';
import Points from './Points';
import Rating from './Rating';

import { RefreshCwIcon } from 'lucide-react';

import { ScoreTransitionStatus } from '!/types/engine';
import { LeaderboardPlayerProps } from '!/types/leaderboard';

const Score = () => {
	const { i18n } = useTranslation();
	const { addDocument } = useFirestoreCollection<LeaderboardPlayerProps>(
		process.env.FIREBASE_LEADERBOARD_COLLECTION ?? ''
	);
	const { isReady, isCompleted, score, rating } = useEngine();
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
	const {
		isMounted,
		handleTransitionEnd,
		setCondition,
		setTransitioningDelay,
		setIsMountedCallback,
		setIsTransitioningCallback,
		setIsUnmountingCallback,
		setIsUnmountedCallback,
	} = useMountTransition();
	const { ms } = useTimer();

	const [hasStatus, setHasStatus] = useState<ScoreTransitionStatus>(false);
	const [title, setTitle] = useState('');
	const [next, setNext] = useState('');

	const randomText = useCallback(
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

	useEffect(() => {
		setTransitioningDelay(1000);
		setCondition(isReady && isCompleted);

		if (isReady && isCompleted) {
			setTitle(randomText('score.titles'));
			setNext(randomText('score.next'));
		}
	}, [setCondition, setTransitioningDelay, isReady, isCompleted, randomText]);

	useEffect(() => {
		setIsMountedCallback(() => setHasStatus(false));
		setIsTransitioningCallback(() => setHasStatus('show'));
		setIsUnmountingCallback(() => setHasStatus('hide'));
		setIsUnmountedCallback(() => setHasStatus(false));

		return () => setHasStatus(false);
	}, [
		setIsMountedCallback,
		setIsTransitioningCallback,
		setIsUnmountingCallback,
		setIsUnmountedCallback,
	]);

	useEffect(() => {
		if (isLeaderboardOn && (!isCompleted || hasStatus !== 'show')) return;

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
			time: ms,
		});
	}, [
		isLeaderboardOn,
		isCompleted,
		hasStatus,
		addDocument,
		user,
		country,
		score,
		rating,
		cols,
		rows,
		difficulty,
		seed,
		ms,
	]);

	if (!isMounted) return null;

	return (
		<div
			className={classNames([
				'overlay overflow-hidden',
				'fixed top-0 bottom-0 left-0 right-0 z-10',
				'flex justify-center items-center',
				{
					'transition-opacity duration-400': showEffects,
					'opacity-0 pointer-events-none': hasStatus !== 'show',
				},
			])}
			onTransitionEnd={handleTransitionEnd}>
			<div className='flex flex-col gap-10 text-white text-center'>
				<div
					className={classNames([
						'text-[12vw] tracking-tight leading-[0.8em] font-black',
						{
							'transition-[translate,opacity] duration-1000 drop-shadow-xl':
								showEffects,
							'-translate-x-full': hasStatus === false,
							'translate-x-full': hasStatus === 'hide',
							'opacity-0': hasStatus !== 'show',
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
						onClick={() => {
							if (isCompleted) {
								setSeed();
								setHasStatus('hide');
							}
						}}>
						<RefreshCwIcon className='text-svg-inline' /> {next}
					</button>
				</div>
			</div>
		</div>
	);
};
export default Score;
