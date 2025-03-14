import {
	TransitionEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings';
import { serverTimestamp } from 'firebase/firestore';
import { useTimer } from '!/contexts/timer';

import Time from './Time';
import Points from './Points';
import Rating from './Rating';

import { RefreshCwIcon } from 'lucide-react';

import { ScoreTransitionStatus } from '!/types/engine';
import useFirestoreCollection from '!/hooks/useFirestoreCollection';
import { LeaderboardPlayerProps } from '!/types/leaderboard';

const Score = () => {
	const { i18n } = useTranslation();
	const { addDocument } =
		useFirestoreCollection<LeaderboardPlayerProps>('leaderboard');
	const { isCompleted, score, rating } = useEngine();
	const { setSeed, user, country, seed, cols, rows, difficulty } =
		useSettings();
	const { ms } = useTimer();

	const [hasStatus, setHasStatus] = useState<ScoreTransitionStatus>(false);
	const [title, setTitle] = useState('');
	const [next, setNext] = useState('');

	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
		if (e.target !== e.currentTarget) return;

		if (e.propertyName === 'opacity') {
			const computedStyle = window.getComputedStyle(e.currentTarget);

			if (parseInt(computedStyle.opacity) === 0) {
				reset();
			}
		}
	};

	const reset = () => {
		if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

		setHasStatus(false);
	};

	const show = useCallback(() => {
		if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

		if (isCompleted) {
			const titles = i18n.t('score.titles', {
				returnObjects: true,
			}) as string[];

			const next = i18n.t('score.next', {
				returnObjects: true,
			}) as string[];

			setTitle(titles[Math.floor(Math.random() * titles.length)]);
			setNext(next[Math.floor(Math.random() * next.length)]);

			timeoutRef.current = setTimeout(() => setHasStatus('show'), 1000);
		}
	}, [isCompleted, i18n]);

	useEffect(() => {
		if (!isCompleted || hasStatus !== 'show') return;

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

	useEffect(() => {
		show();
	}, [show]);

	useEffect(() => {
		return () => reset();
	}, []);

	return (
		<div
			className={`overlay fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center overflow-hidden z-10 transition-opacity duration-400${
				!isCompleted || hasStatus !== 'show'
					? ' opacity-0 pointer-events-none'
					: ''
			}`}
			onTransitionEnd={handleTransitionEnd}>
			<div className='flex flex-col gap-10 text-white text-center'>
				<div
					className={`text-[12vw] tracking-tight leading-[0.8em] font-black drop-shadow-xl transition-[translate,opacity] duration-1000 ${
						hasStatus === false
							? '-translate-x-full'
							: hasStatus === 'show'
							? 'translate-x-0'
							: 'translate-x-full'
					}${hasStatus !== 'show' ? ' opacity-0' : ''}`}>
					{title}
				</div>
				<div className='flex justify-center my-5'>
					{hasStatus !== false ? (
						<Rating hasStatus={hasStatus} />
					) : null}
				</div>
				<div className='flex justify-center items-center gap-2'>
					{hasStatus !== false ? <Time /> : null}
					{hasStatus !== false ? <Points /> : null}
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
						<RefreshCwIcon className='lucide-text' /> {next}
					</button>
				</div>
			</div>
		</div>
	);
};
export default Score;
