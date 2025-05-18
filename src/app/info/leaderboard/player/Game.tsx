import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import { ArrowRightIcon } from 'lucide-react';

import { DifficultyTypes } from '!/types/settings';

interface GameProps {
	rank: number;
	cols: number;
	rows: number;
	difficulty: DifficultyTypes;
	seed: string;
}

const Game = ({ rank, cols, rows, difficulty, seed }: GameProps) => {
	const { i18n } = useTranslation();
	const { setSeed, setCols, setRows, setDifficulty, setIsDrawerShown } =
		useSettings();

	return (
		<>
			<button
				type='button'
				className={classNames([
					'btn btn-xs btn-link',
					'!block text-base-300 max-w-full no-underline truncate',
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
				<span>
					<ArrowRightIcon className='text-svg-inline me-0.5' />
					{seed}
				</span>
			</button>
		</>
	);
};
export default Game;
