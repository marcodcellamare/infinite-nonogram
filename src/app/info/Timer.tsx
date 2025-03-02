import { CSSProperties } from 'react';
import { Fragment } from 'react/jsx-runtime';

import { useTranslation } from 'react-i18next';
import { useTimer } from '!/contexts/timer/hook';
import { useEngine } from '!/contexts/engine';

import { TimeUnit } from '!/types/timer';

const Timer = () => {
	const { i18n } = useTranslation();
	const { counter, blink } = useTimer();
	const { isStarted, isCompleted } = useEngine();

	return (
		<div
			className={`btn btn-outline ${
				!isStarted && !isCompleted
					? 'btn-accent'
					: isCompleted
					? 'btn-primary'
					: 'btn-secondary'
			} pointer-events-none transition-[opacity,color] duration-500 ease-in-out${
				!blink ? ' opacity-80' : ''
			}`}>
			<div className='flex-nowrap'>
				{Object.keys(counter).map((type) => {
					const value = counter[type as TimeUnit] ?? 0;

					return (
						<Fragment key={type}>
							<div className='countdown font-mono'>
								<span
									style={
										{
											'--value': value,
										} as CSSProperties
									}>
									{value}
								</span>
							</div>
							{['hours', 'minutes'].includes(type) ? (
								<span className='font-mono'>
									{blink ? ':' : ' '}
								</span>
							) : (
								''
							)}
							{['years', 'months', 'days'].includes(type) ? (
								<span className='text-xs ms-0.5 me-1'>
									{i18n
										.t(`timeUnits.${type}`, {
											count: value,
										})
										.toLowerCase()}
								</span>
							) : null}
						</Fragment>
					);
				})}
			</div>
		</div>
	);
};
export default Timer;
