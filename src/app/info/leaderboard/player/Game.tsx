import { useTranslation } from 'react-i18next';
import useFormatDate from '!/hooks/useFormatDate';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import DifficultyIcon from '!/app/misc/DifficultyIcon';
import { BeanIcon, CalendarIcon, GridIcon } from 'lucide-react';

import { DateType } from '!/types/leaderboard';
import { DifficultyTypes } from '!/types/settings';

interface GameProps {
	rank: number;
	cols: number;
	rows: number;
	difficulty: DifficultyTypes;
	seed: string;
	date?: DateType;
}

const Game = ({ rank, cols, rows, difficulty, seed, date }: GameProps) => {
	const { i18n } = useTranslation();
	const { setSeed, setCols, setRows, setDifficulty, setIsDrawerShown } =
		useSettings();
	const { date: formatDate } = useFormatDate();

	return (
		<button
			type='button'
			className={classNames([
				'btn btn-xs btn-link',
				'!block text-base-300 no-underline truncate',
				'hover:!no-underline hover:text-accent',
				rank < 10 ? 'text-xs' : 'text-xxs',
			])}
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
				setIsDrawerShown(false);
			}}>
			{date ? (
				<span className={rank < 10 ? 'me-2' : 'me-1'}>
					<CalendarIcon className='text-svg-inline me-0.5' />
					{formatDate(date.toString())}
				</span>
			) : null}
			<span className={rank < 10 ? 'me-2' : 'me-1'}>
				<GridIcon className='text-svg-inline me-0.5' />
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
				<BeanIcon className='text-svg-inline me-0.5' />
				{seed}
			</span>
		</button>
	);
};
export default Game;
