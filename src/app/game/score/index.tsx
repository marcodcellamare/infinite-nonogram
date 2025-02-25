import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings';

import Time from './Time';
import Points from './Points';
import Rating from './Rating';

import { RefreshCw } from 'lucide-react';
import { ScoreTransitionStatus } from '!/types/engine';

const Score = () => {
	const { i18n } = useTranslation();
	const { isCompleted } = useEngine();
	const { setSeed } = useSettings();

	const [hasStatus, setHasStatus] = useState<ScoreTransitionStatus>(false);
	const [title, setTitle] = useState('');
	const [next, setNext] = useState('');

	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
		if (e.propertyName === 'opacity') {
			const computedStyle = window.getComputedStyle(e.currentTarget);

			if (computedStyle.opacity === '0') {
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

			timeoutRef.current = setTimeout(() => setHasStatus('show'), 200);
		}
	}, [isCompleted, i18n]);

	useEffect(() => {
		show();
	}, [show]);

	useEffect(() => {
		return () => reset();
	}, []);

	return (
		<div
			className={`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center backdrop-blur-sm bg-primary/50 overflow-hidden z-10 transition-opacity duration-400${
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
						className='btn btn-xl btn-secondary rounded-full px-15'
						onClick={() => {
							setSeed();
							setHasStatus('hide');
						}}>
						<RefreshCw className='lucide-text' /> {next}
					</button>
				</div>
			</div>
		</div>
	);
};
export default Score;
