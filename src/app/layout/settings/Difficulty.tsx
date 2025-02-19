import { useTranslation } from 'react-i18next';
import { useEngine } from '@contexts/engine';

import { DifficultyTypes } from '@_types/engine';
import { Baby, Brain, GraduationCap } from 'lucide-react';

const Difficulty = () => {
	const { i18n } = useTranslation();
	const { setDifficulty, difficulty } = useEngine();
	const difficulties: DifficultyTypes[] = ['easy', 'medium', 'hard'];
	const icons = {
		easy: <Baby className='h-full' />,
		medium: <GraduationCap className='h-full' />,
		hard: <Brain className='h-full' />,
	};

	return (
		<div className='flex flex-wrap gap-0.5'>
			{difficulties.map((d) => {
				return (
					<button
						key={d}
						className='flex-1 btn btn-sm btn-outline btn-primary border-2'
						type='button'
						disabled={d === difficulty}
						onClick={() => setDifficulty(d)}>
						{icons[d]} {i18n.t(`difficulties.${d}`)}
					</button>
				);
			})}
		</div>
	);
};
export default Difficulty;
