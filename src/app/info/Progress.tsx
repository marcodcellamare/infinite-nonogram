import { useMemo } from 'react';
import { useEngine } from '!/contexts/engine';

import useFormatNumber from '!/hooks/useFormatNumber';

const Progress = () => {
	const { totalAvailable, totalFound } = useEngine();
	const { percentage } = useFormatNumber();

	const totalFoundPercentage = useMemo(
		() => Math.round(((totalFound * 100) / totalAvailable) * 100) / 100,
		[totalAvailable, totalFound]
	);

	return (
		<div className='w-full relative h-[2px] bg-error'>
			<progress
				className='progress progress-accent block bg-base-200 w-full h-full border-none rounded-none'
				value={totalFound}
				max={totalAvailable}
			/>
			<div
				className={`absolute top-1/2 -translate-1/2 transition-[left,opacity] duration-150 badge badge-xs badge-accent font-bold${
					totalFoundPercentage === 0 || totalFoundPercentage === 100
						? ' opacity-0'
						: ''
				} `}
				style={{ left: `${totalFoundPercentage}%` }}>
				{percentage(totalFoundPercentage / 100)}
			</div>
		</div>
	);
};
export default Progress;
