import { useMemo } from 'react';
import { useEngine } from '@/contexts/engine';
import useFormatNumber from '@/hooks/useFormatNumber';
import classNames from 'classnames';

const Progress = () => {
	const { totalAvailable, totalFound } = useEngine();
	const { percentage } = useFormatNumber();

	const totalFoundPercentage = useMemo(
		() => Math.round(((totalFound * 100) / totalAvailable) * 100) / 100,
		[totalAvailable, totalFound]
	);

	const isVisible = useMemo(
		() => totalFoundPercentage > 0 && totalFoundPercentage < 100,
		[totalFoundPercentage]
	);

	return (
		<div
			className={classNames([
				'progress-wrapper absolute top-0 left-0 right-0 overflow-hidden contain-layout z-10',
				'transition-[height]',
				isVisible ? 'h-[1rem]' : 'h-[0rem]',
			])}
			aria-hidden={true}>
			<progress
				className='progress progress-accent block bg-base-100 w-full h-full border-none rounded-none'
				value={totalFound}
				max={totalAvailable}
			/>
			<div
				className={classNames([
					'badge badge-xs badge-accent rounded-none font-black',
					'absolute bottom-0 -translate-x-full',
					'text-base-100',
					'transition-[left,opacity] duration-150 will-change-transform',
					{
						'opacity-0': !isVisible,
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
