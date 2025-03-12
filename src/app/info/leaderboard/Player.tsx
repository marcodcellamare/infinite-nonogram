import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings';
import useFormatNumber from '!/hooks/useFormatNumber';
import useFormatDate from '!/hooks/useFormatDate';
import { dateMs, secondsToTimer } from '!/utils/timer';

import Avatar from '!/app/info/Avatar';
import DifficultyIcon from '!/app/info/DifficultyIcon';
import DrawerToggle from '!/app/misc/DrawerToggle';
import { BeanIcon, CalendarIcon, GridIcon } from 'lucide-react';

import { LeaderboardPlayerProps } from '!/types/leaderboard';

const Player = ({
	rank,
	date,
	name,
	country,
	score,
	rating,
	cols,
	rows,
	difficulty,
	seed,
	time,
}: { rank: number } & LeaderboardPlayerProps) => {
	const { i18n } = useTranslation();
	const { setSeed, setCols, setRows, setDifficulty } = useSettings();
	const { number } = useFormatNumber();
	const { date: formatDate } = useFormatDate();

	return (
		<>
			{rank > 0 ? (
				<div className='col-span-5 border-t border-dashed border-base-300' />
			) : null}
			<div className='font-mono text-xs justify-self-end'>
				{('0' + (rank + 1)).slice(-2)}.
			</div>
			<div className='justify-self-center'>
				<Avatar
					name={name}
					country={country}
					className={
						rank === 0
							? 'w-[2.8rem] md:w-[3.5rem]'
							: 'w-[2.1rem] md:w-[2.8rem]'
					}
				/>
			</div>
			<div className={`min-w-0 `}>
				<div
					className={`truncate text-primary  ${
						rank === 0
							? 'text-sm sm:text-base font-bold'
							: 'text-xs sm:text-sm'
					}`}>
					{name}
				</div>
				<DrawerToggle
					className='btn btn-xs btn-link !block text-base-300 no-underline hover:!no-underline hover:text-accent truncate'
					title={`${i18n.t('grid')}: ${cols}×${rows} - ${i18n.t(
						'difficulty'
					)}: ${i18n.t(`difficulties.${difficulty}`)} - ${i18n.t(
						'seed'
					)}: ${seed}`}
					onClick={() => {
						setSeed(seed);
						setCols(cols);
						setRows(rows);
						setDifficulty(difficulty);
					}}>
					{date ? (
						<span className='me-2'>
							<CalendarIcon className='lucide-text me-0.5' />
							{formatDate(date.toString())}
						</span>
					) : null}
					<span className='me-2'>
						<GridIcon className='lucide-text me-0.5' />
						{`${cols}×${rows}`}
					</span>
					<span className='me-2'>
						<DifficultyIcon
							difficulty={difficulty}
							className='me-0.5'
						/>
						{i18n.t(`difficulties.${difficulty}`)}
					</span>
					<span>
						<BeanIcon className='lucide-text me-0.5' />
						{seed}
					</span>
				</DrawerToggle>
			</div>
			<div className='font-mono text-xs justify-self-end'>
				{number(score)}
			</div>
			<div className='font-mono text-xs justify-self-end'>
				{JSON.stringify(secondsToTimer(dateMs() - time * 1000))}
			</div>
		</>
	);
};
export default Player;
