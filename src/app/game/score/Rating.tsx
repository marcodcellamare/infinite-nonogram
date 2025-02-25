import { useEffect, useRef } from 'react';

import { useEngine } from '!/contexts/engine';
import { Star } from 'lucide-react';

const Rating = () => {
	const { score } = useEngine();

	const scoreRef = useRef(score);

	useEffect(() => {
		console.log('score', score);
	}, [score]);

	return (
		<div>
			{scoreRef.current}
			<div>
				<Star
					fill='#f00'
					stroke='#f00'
				/>
				<Star />
				<Star />
			</div>
		</div>
	);
};
export default Rating;
