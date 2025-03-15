import Timer from '!/app/misc/Timer';
import { msToTimeUnits } from '!/utils/timer';

interface PlayerTimeProps {
	rank: number;
	time: number;
}

const PlayerTime = ({ rank, time }: PlayerTimeProps) => (
	<div className={`justify-self-end ${rank < 10 ? 'text-xs' : 'text-xxs'}`}>
		<Timer
			timeUnits={msToTimeUnits(time)}
			units='abbr'
			separator={false}
			className='flex gap-1'
		/>
	</div>
);
export default PlayerTime;
