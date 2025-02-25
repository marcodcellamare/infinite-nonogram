import { useEffect, useRef, useState } from 'react';
import { useEngine } from '!/contexts/engine';
import useFormatNumber from '!/hooks/useFormatNumber';

import { Award, Star } from 'lucide-react';
import { ScoreTransitionStatus } from '!/types/engine';

const Rating = ({ hasStatus }: { hasStatus: ScoreTransitionStatus }) => {
	const { score } = useEngine();
	const { percentage } = useFormatNumber();

	const [width, setWidth] = useState(0);
	const [transitionDuration, setTransitionDuration] = useState(0);

	const scoreRef = useRef(score);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			setWidth(Math.round(score));
			setTransitionDuration(score / 70);
		}, 100);

		return () => {
			if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
		};
	}, [score]);

	return (
		<div className='indicator indicator-bottom indicator-center relative'>
			<div className='flex flex-nowrap gap-0.2 text-6xl'>
				{new Array(3).fill(0).map((_, k) => (
					<Star
						key={k}
						className='lucide-text stroke-1 stroke-secondary'
					/>
				))}
			</div>
			<div
				className='absolute top-0 left-0 flex flex-nowrap gap-0.2 overflow-hidden text-6xl transition-[width] ease-out'
				style={{
					width: `${hasStatus === 'show' ? width : 0}%`,
					transitionDuration: `${transitionDuration}s`,
				}}>
				{new Array(3).fill(0).map((_, k) => (
					<Star
						key={k}
						className='lucide-text stroke-1 stroke-secondary fill-secondary flex-shrink-0'
					/>
				))}
			</div>
			<div className='indicator-item badge badge-xl bg-white text-secondary border-none rounded-full shadow'>
				<Award className='lucide-text' />
				<strong>{percentage(scoreRef.current, 1)}</strong>
			</div>
		</div>
	);
};
export default Rating;
