import { useTranslation } from 'react-i18next';
import useFormatDate from '!/hooks/useFormatDate';
import { useSettings } from '!/contexts/settings';

import DrawerToggle from '!/app/misc/DrawerToggle';
import DifficultyIcon from '!/app/misc/DifficultyIcon';
import { BeanIcon, CalendarIcon, GridIcon } from 'lucide-react';

import { DateType } from '!/types/leaderboard';
import { DifficultyTypes } from '!/types/settings';

interface PlayerGameProps {
	rank: number;
	cols: number;
	rows: number;
	difficulty: DifficultyTypes;
	seed: string;
	date?: DateType;
}

const PlayerGame = ({
	rank,
	cols,
	rows,
	difficulty,
	seed,
	date,
}: PlayerGameProps) => {
	const { i18n } = useTranslation();
	const { setSeed, setCols, setRows, setDifficulty } = useSettings();
	const { date: formatDate } = useFormatDate();

	return (
		<DrawerToggle
			className={`btn btn-xs btn-link !block text-base-300 no-underline hover:!no-underline hover:text-accent truncate ${
				rank < 10 ? 'text-xs' : 'text-xxs'
			}`}
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
				<span className={rank < 10 ? 'me-2' : 'me-1'}>
					<CalendarIcon className='lucide-text me-0.5' />
					{formatDate(date.toString())}
				</span>
			) : null}
			<span className={rank < 10 ? 'me-2' : 'me-1'}>
				<GridIcon className='lucide-text me-0.5' />
				{`${cols}×${rows}`}
			</span>
			<span className={rank < 10 ? 'me-2' : 'me-1'}>
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
	);
};
export default PlayerGame;
