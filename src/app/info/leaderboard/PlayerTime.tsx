import { dateMs, secondsToTimer } from '!/utils/timer';

interface PlayerTimeProps {
	rank: number;
	time: number;
}

const PlayerTime = ({ rank, time }: PlayerTimeProps) => (
	<div
		className={`font-mono justify-self-end ${
			rank < 10 ? 'text-xs' : 'text-xxs'
		}`}>
		{JSON.stringify(secondsToTimer(dateMs() - time * 1000))}
	</div>
);
export default PlayerTime;
