import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { StarIcon } from 'lucide-react';

import { timeoutType } from '!/types/timer';

interface RatingProps {
	rating: number;
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
	stroke = 'stroke-primary',
	fill = 'fill-primary',
	className = '',
}: RatingProps) => {
	const [width, setWidth] = useState(0);
	const [transitionDuration, setTransitionDuration] = useState(0);

	const ratingRef = useRef(rating);
	const timeoutRef = useRef<timeoutType>(null);

	const cleanup = () => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	useEffect(() => {
		cleanup();
		setTransitionDuration((rating * 100) / 70);

		timeoutRef.current = setTimeout(
			() => setWidth(Math.round(ratingRef.current * 100)),
			1000
		);
		return () => cleanup();
	}, [rating]);

	return (
		<div className={classNames(['relative', className])}>
			<div className='flex flex-nowrap gap-0.2'>
				<Stars className={classNames([stroke])} />
			</div>
			<div
				className='flex flex-nowrap gap-0.2 absolute top-0 left-0 overflow-hidden transition-[width] ease-out'
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
