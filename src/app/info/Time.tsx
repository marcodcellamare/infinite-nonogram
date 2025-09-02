import { useTimer } from '@/contexts/timer/hook';
import { useEngine } from '@/contexts/engine';
import { useSettings } from '@/contexts/settings';
import classNames from 'classnames';

import Timer from '../misc/Timer';

const Time = () => {
	const { showEffects } = useSettings();
	const { timeUnits, blink } = useTimer();
	const { isStarted, isCompleted } = useEngine();

	return (
		<div
			className={classNames([
				'btn',
				!isStarted && !isCompleted
					? 'btn-dash text-primary/30 border-primary/30'
					: 'btn-outline',
				!isCompleted ? 'btn-primary' : 'btn-accent',
				'flex flex-col gap-0 pointer-events-none h-auto px-2 py-1',
				{
					'transition-[scale,background-color,color,border-color,opacity] duration-500 ease-in-out':
						showEffects,
					'scale-95': !blink,
				},
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
