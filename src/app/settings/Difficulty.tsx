import { PointerEvent, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';
import { useAudio } from '!/contexts/audio';

import DifficultyIcon from '../misc/DifficultyIcon';

import { DifficultyTypes } from '!/types/settings';

const Difficulty = () => {
	const { i18n } = useTranslation();
	const { setDifficulty, difficulty } = useSettings();
	const { play: playSound } = useAudio();

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
						onPointerEnter={() => playSound('grid-block-over')}
						onPointerDown={(e: PointerEvent) => {
							e.nativeEvent.stopImmediatePropagation();
							playSound('grid-block-correct');
							setDifficulty(d);
						}}>
						<DifficultyIcon
							difficulty={d}
							className='text-xl hidden md:block'
						/>
						{i18n.t(`difficulties.${d}`)}
					</button>
				);
			})}
		</div>
	);
};
export default Difficulty;
