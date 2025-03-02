import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';

import { Baby, Brain, GraduationCap } from 'lucide-react';

import { DifficultyTypes } from '!/types/settings';

const Difficulty = () => {
	const { i18n } = useTranslation();
	const { setDifficulty, difficulty } = useSettings();
	const difficultiesRef = useRef<DifficultyTypes[]>([
		'easy',
		'medium',
		'hard',
	]);
	const icons = {
		easy: <Baby className='lucide-text text-xl' />,
		medium: <GraduationCap className='lucide-text text-xl' />,
		hard: <Brain className='lucide-text text-xl' />,
	};

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
						{icons[d]}
						{i18n.t(`difficulties.${d}`)}
					</button>
				);
			})}
		</div>
	);
};
export default Difficulty;
