import { useMemo } from 'react';
import { useEngine } from '!/contexts/engine';
import useFormatNumber from '!/hooks/useFormatNumber';
import classNames from 'classnames';

const Progress = () => {
	const { totalAvailable, totalFound } = useEngine();
	const { percentage } = useFormatNumber();

	const totalFoundPercentage = useMemo(
		() => Math.round(((totalFound * 100) / totalAvailable) * 100) / 100,
		[totalAvailable, totalFound]
	);

	return (
		<div
			className='relative w-full h-[1rem] overflow-hidden contain-layout'
			aria-hidden={true}>
			<progress
				className='progress progress-accent block bg-white w-full h-full border-none rounded-none'
				value={totalFound}
				max={totalAvailable}
			/>
			<div
				className={classNames([
					'badge badge-xs badge-accent rounded-none font-black',
					'absolute bottom-0 -translate-x-full',
					'transition-[left,opacity] duration-150 will-change-transform',
					{
						'opacity-0':
							totalFoundPercentage === 0 ||
							totalFoundPercentage === 100,
					},
				])}
				style={{
					left: `${totalFoundPercentage}%`,
					contentVisibility: 'auto',
				}}>
				{percentage(totalFoundPercentage / 100)}
			</div>
		</div>
	);
};
export default Progress;
