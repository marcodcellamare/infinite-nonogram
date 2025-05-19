import { useRef } from 'react';
import { useEngine } from '!/contexts/engine';
import useFormatNumber from '!/hooks/useFormatNumber';
import { colorToRgb } from '!/utils/colors';
import { cssVariable } from '!/utils/misc';
import classNames from 'classnames';

import RatingStars from '!/app/misc/RatingStars';
import { AwardIcon } from 'lucide-react';

const Rating = () => {
	const { rating, hasWin } = useEngine();
	const { percentage } = useFormatNumber();

	const ratingRef = useRef(rating);

	return (
		<div className='indicator indicator-bottom indicator-center relative'>
			<div
				className={classNames({ 'animate-bounce': hasWin })}
				style={{
					filter: `drop-shadow(0 0 1.5rem rgba(${colorToRgb(
						cssVariable('--color-white')
					)}, 0.8)`,
				}}>
				<RatingStars
					rating={rating}
					stroke='stroke-1 stroke-secondary'
					fill='fill-secondary'
					className='text-6xl'
				/>
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
