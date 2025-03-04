import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';

import { DifficultyTypes } from '!/types/settings';
import DifficultyIcon from '../info/DifficultyIcon';

const Difficulty = () => {
	const { i18n } = useTranslation();
	const { setDifficulty, difficulty } = useSettings();
	const difficultiesRef = useRef<DifficultyTypes[]>([
		'easy',
		'medium',
		'hard',
	]);

	return (
		<div className='flex flex-wrap gap-0.5 justify-stretch'>
			{difficultiesRef.current.map((d) => {
				return (
					<button
						key={d}
						className='flex-1 btn btn-sm btn-outline btn-primary disabled:!bg-accent disabled:!text-white'
						type='button'
						disabled={d === difficulty}
						onClick={() => setDifficulty(d)}>
						<DifficultyIcon
							difficulty={d}
							className='text-xl'
						/>
						{i18n.t(`difficulties.${d}`)}
					</button>
				);
			})}
		</div>
	);
};
export default Difficulty;
