import { Fragment } from 'react/jsx-runtime';

import { useTranslation } from 'react-i18next';
import { useTimer } from '!/contexts/timer/hook';
import { useEngine } from '!/contexts/engine';

import { TimeUnit } from '!/types/timer';

const Timer = ({ className = '' }: { className?: string }) => {
	const { i18n } = useTranslation();
	const { counter, blink } = useTimer();
	const { isStarted, isCompleted } = useEngine();

	return (
		<div
			className={`btn ${
				!isStarted && !isCompleted
					? 'btn-primary'
					: !isCompleted
					? 'btn-accent'
					: 'btn-primary btn-outline'
			} flex flex-col gap-0 pointer-events-none h-auto py-0.5 transition-[scale,background-color,color,border-color,filter] duration-300 ease-linear${
				!blink ? ' scale-98 blur-[0.05rem]' : ''
			} ${className}`.trim()}>
			{Object.keys(counter).some((type) =>
				['years', 'months', 'days'].includes(type)
			) ? (
				<div className='flex flex-row flex-nowrap gap-1 text-xxs leading-[1.5em]'>
					{['years', 'months', 'days'].map((type) => {
						const unit = counter[type as TimeUnit];

						return unit !== undefined ? (
							<div
								key={type}
								className='flex gap-0.5'>
								<span>{unit}</span>
								<span>
									{i18n
										.t(`timeUnits.${type}`, {
											count: unit,
										})
										.toLowerCase()}
								</span>
							</div>
						) : null;
					})}
				</div>
			) : null}
			{Object.keys(counter).some((type) =>
				['hours', 'minutes', 'seconds'].includes(type)
			) ? (
				<div className='flex flex-row flex-nowrap text-lg font-mono leading-[1.1em]'>
					{['hours', 'minutes', 'seconds'].map((type) => {
						const unit = counter[type as TimeUnit];

						return unit !== undefined ? (
							<Fragment key={type}>
								{('0' + unit).slice(-2)}
								{type !== 'seconds' ? (
									<span
										className={`transition-opacity duration-100${
											!blink ? ' opacity-0' : ''
										}`}>
										:
									</span>
								) : null}
							</Fragment>
						) : null;
					})}
				</div>
			) : null}
		</div>
	);
};
export default Timer;
