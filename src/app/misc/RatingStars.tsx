import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { StarIcon } from 'lucide-react';

import { TimeoutType } from '!/types/timer';

interface RatingProps {
	rating: number;
	hasTransition?: boolean;
	stroke?: string;
	fill?: string;
	className?: string;
}

const Stars = ({ className = '' }: { className?: string }) =>
	new Array(3).fill(0).map((_, k) => (
		<StarIcon
			key={k}
			className={classNames(['text-svg-inline', className])}
		/>
	));

const RatingStars = ({
	rating,
	hasTransition = true,
	stroke = 'stroke-primary',
	fill = 'fill-primary',
	className = '',
}: RatingProps) => {
	const [width, setWidth] = useState(0);
	const [transitionDuration, setTransitionDuration] = useState(0);

	const ratingRef = useRef(rating);
	const timeoutRef = useRef<TimeoutType>(null);

	const cleanup = () => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	useEffect(() => {
		cleanup();

		if (hasTransition) {
			setTransitionDuration((rating * 100) / 70);

			timeoutRef.current = setTimeout(
				() => setWidth(Math.round(ratingRef.current * 100)),
				1000
			);
		} else {
			setWidth(Math.round(ratingRef.current * 100));
		}
		return () => cleanup();
	}, [rating, hasTransition]);

	return (
		<div className={classNames(['relative', className])}>
			<div className='flex flex-nowrap gap-0.2'>
				<Stars className={classNames([stroke])} />
			</div>
			<div
				className={classNames([
					'flex flex-nowrap gap-0.2',
					'absolute top-0 left-0 overflow-hidden',
					{ 'transition-[width] ease-out': hasTransition },
				])}
				style={{
					width: `${width}%`,
					transitionDuration: `${transitionDuration}s`,
				}}>
				<Stars
					className={classNames(['flex-shrink-0', stroke, fill])}
				/>
			</div>
		</div>
	);
};
export default RatingStars;
