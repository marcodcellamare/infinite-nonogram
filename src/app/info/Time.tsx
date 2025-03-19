import { useTimer } from '!/contexts/timer/hook';
import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import Timer from '../misc/Timer';

const Time = ({ className = '' }: { className?: string }) => {
	const { showEffects } = useSettings();
	const { timeUnits, blink } = useTimer();
	const { isStarted, isCompleted } = useEngine();

	return (
		<div
			className={classNames([
				'btn',
				!isStarted && !isCompleted
					? 'btn-primary'
					: !isCompleted
					? 'btn-accent'
					: 'btn-primary btn-outline',
				'flex flex-col gap-0 pointer-events-none h-auto py-0.5',
				{
					'transition-[scale,background-color,color,border-color] duration-500 ease-in-out':
						showEffects,
					'scale-95': !blink,
				},
				className,
			])}>
			<Timer
				timeUnits={timeUnits}
				onlyTimeUnits={['days', 'months', 'years']}
				separator={false}
				className='flex gap-x-1 text-xxs leading-[1.5em]'
			/>
			<Timer
				timeUnits={timeUnits}
				onlyTimeUnits={['seconds', 'minutes', 'hours']}
				forceTimeUnits={true}
				leadingZero={true}
				units={false}
				separator=':'
				blink={blink}
				className='flex text-xl font-mono leading-[1.1em]'
			/>
		</div>
	);
};
export default Time;
