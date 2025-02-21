import { useTranslation } from 'react-i18next';
import { useEngine } from '@contexts/engine';

import { DifficultyTypes } from '@_types/engine';
import { Baby, Brain, GraduationCap } from 'lucide-react';

const Difficulty = () => {
	const { i18n } = useTranslation();
	const { setDifficulty, difficulty } = useEngine();
	const difficulties: DifficultyTypes[] = ['easy', 'medium', 'hard'];
	const icons = {
		easy: <Baby className='w-[1em] h-[1em]' />,
		medium: <GraduationCap className='w-[1em] h-[1em]' />,
		hard: <Brain className='w-[1em] h-[1em]' />,
	};

	return (
		<div className='flex flex-wrap gap-0.5'>
			{difficulties.map((d) => {
				return (
					<button
						key={d}
						className='flex-1 btn btn-sm btn-primary border-2 disabled:!bg-accent disabled:!text-white shadow-none'
						type='button'
						disabled={d === difficulty}
						onClick={() => setDifficulty(d)}>
						<span className='text-xl'>{icons[d]}</span>{' '}
						{i18n.t(`difficulties.${d}`)}
					</button>
				);
			})}
		</div>
	);
};
export default Difficulty;
