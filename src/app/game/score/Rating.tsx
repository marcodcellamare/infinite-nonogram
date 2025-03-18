import { useEffect, useRef, useState } from 'react';
import { useEngine } from '!/contexts/engine';
import useCSSVariable from '!/hooks/useCSSVariable';
import useFormatNumber from '!/hooks/useFormatNumber';
import { colorToRgb } from '!/utils/colors';

import { AwardIcon, StarIcon } from 'lucide-react';
import { ScoreTransitionStatus } from '!/types/engine';
import { timeoutType } from '!/types/timer';

const Rating = ({ hasStatus }: { hasStatus: ScoreTransitionStatus }) => {
	const { rating } = useEngine();
	const { percentage } = useFormatNumber();

	const [width, setWidth] = useState(0);
	const [transitionDuration, setTransitionDuration] = useState(0);

	const ratingRef = useRef(rating);
	const timeoutRef = useRef<timeoutType>(null);

	useEffect(() => {
		if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

		timeoutRef.current = setTimeout(() => {
			setWidth(Math.round(rating * 100));
			setTransitionDuration((rating * 100) / 70);
		}, 100);

		return () => {
			if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
		};
	}, [rating]);

	return (
		<div className='indicator indicator-bottom indicator-center relative'>
			<div
				className='animate-bounce'
				style={{
					filter: `drop-shadow(0 0 1.5rem rgba(${colorToRgb(
						useCSSVariable('--color-white')
					)}, 0.8)`,
				}}>
				<div className='flex flex-nowrap gap-0.2 text-6xl'>
					{new Array(3).fill(0).map((_, k) => (
						<StarIcon
							key={k}
							className='text-svg-inline stroke-1 stroke-secondary'
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
						<StarIcon
							key={k}
							className='text-svg-inline stroke-1 stroke-secondary fill-secondary flex-shrink-0'
						/>
					))}
				</div>
			</div>
			<div className='indicator-item badge badge-xl bg-white text-secondary border-none rounded-full shadow'>
				<AwardIcon className='text-svg-inline' />
				<span className='font-black'>
					{percentage(ratingRef.current, 1)}
				</span>
			</div>
		</div>
	);
};
export default Rating;
