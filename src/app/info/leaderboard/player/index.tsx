import { Timestamp } from 'firebase/firestore';
import classNames from 'classnames';

import Rank from './Rank';
import Name from './Name';
import Game from './Game';
import Score from './Score';
import Time from './Time';
import Date from './Date';
import Avatar from '!/app/info/Avatar';
import RatingStars from '!/app/misc/RatingStars';

import { LeaderboardPlayerProps } from '!/types/leaderboard';

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
		<Rank rank={rank} />
		{rank < 10 ? (
			<Avatar
				name={name}
				country={country}
				className={classNames([
					'justify-self-center',
					rank === 0
						? 'w-[2.8rem] md:w-[3.5rem]'
						: 'w-[2.1rem] md:w-[2.8rem]',
				])}
			/>
		) : null}
		<div
			className={classNames({
				'col-span-2 ps-2 md:ps-3': rank >= 10,
			})}>
			<Name
				rank={rank}
				name={name}
				country={country}
			/>
			<Game
				rank={rank}
				cols={cols}
				rows={rows}
				difficulty={difficulty}
				seed={seed}
			/>
		</div>
		<div className='flex flex-col items-end'>
			<Time time={time} />
			<Date
				date={
					date instanceof Timestamp
						? date.toDate().toString()
						: undefined
				}
			/>
		</div>
		<div className='flex flex-col items-center'>
			<Score score={score} />
			<RatingStars
				rating={rating}
				stroke='stroke-2 stroke-secondary'
				fill='fill-secondary'
				className='text-xxs'
			/>
		</div>
	</>
);
export default Player;
