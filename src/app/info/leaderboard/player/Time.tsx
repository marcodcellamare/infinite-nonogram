import Timer from '@/app/misc/Timer';
import { msToTimeUnits } from '@/utils/timer';

interface TimeProps {
	time: number;
}

const Time = ({ time }: TimeProps) => (
	<Timer
		timeUnits={msToTimeUnits(time)}
		units='abbr'
		separator={false}
		className='flex flex-nowrap gap-1 justify-self-end font-mono text-xs text-secondary'
	/>
);
export default Time;
