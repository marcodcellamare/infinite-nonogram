import PlayerRank from './PlayerRank';
import PlayerAvatar from './PlayerAvatar';
import PlayerName from './PlayerName';
import PlayerGame from './PlayerGame';
import PlayerScore from './PlayerScore';
import PlayerTime from './PlayerTime';

import { LeaderboardPlayerProps } from '!/types/leaderboard';
import { Timestamp } from 'firebase/firestore';

const Player = ({
	rank,
	date,
	name,
	country = null,
	score,
	rating,
	cols,
	rows,
	difficulty,
	seed,
	time,
}: { rank: number } & LeaderboardPlayerProps) => (
	<>
		{rank > 0 ? (
			<div className='col-span-5 border-t border-dashed border-base-300' />
		) : null}
		<PlayerRank rank={rank} />
		<PlayerAvatar
			rank={rank}
			name={name}
			country={country}
		/>
		<div className={rank >= 10 ? 'col-span-2 ps-2 md:ps-3' : ''}>
			<PlayerName
				rank={rank}
				name={name}
				country={country}
			/>
			<PlayerGame
				rank={rank}
				cols={cols}
				rows={rows}
				difficulty={difficulty}
				seed={seed}
				date={
					date instanceof Timestamp
						? date.toDate().toString()
						: undefined
				}
			/>
			{rating}
		</div>
		<PlayerScore
			rank={rank}
			score={score}
		/>
		<PlayerTime
			rank={rank}
			time={time}
		/>
	</>
);
export default Player;
