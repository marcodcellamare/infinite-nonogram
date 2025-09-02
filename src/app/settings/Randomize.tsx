import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '@/contexts/settings/hook';
import { useAudio } from '@/contexts/audio';
import classNames from 'classnames';
import Config from '@config';

import { DicesIcon } from 'lucide-react';

import { DifficultyTypes } from '@/types/settings';
import { TimeoutType } from '@/types/timer';

const Randomize = () => {
	const { t } = useTranslation();
	const { setSeed, setRows, setCols, setDifficulty, showEffects } =
		useSettings();
	const { play: playSound } = useAudio();

	const [isClicked, setIsClicked] = useState(false);
	const difficultiesRef = useRef<DifficultyTypes[]>([
		'easy',
		'medium',
		'hard',
	]);
	const timeoutRef = useRef<TimeoutType>(null);

	const randomSize = () =>
		Math.floor(
			Math.random() * (Config.game.grid.max - Config.game.grid.min + 1) +
				Config.game.grid.min
		);

	const cleanup = () => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	const onClick = useCallback(() => {
		if (isClicked) return;

		cleanup();

		playSound('grid-block-correct');
		setIsClicked(true);
		setSeed();
		setRows(randomSize());
		setCols(randomSize());
		setDifficulty(
			difficultiesRef.current[
				Math.floor(Math.random() * difficultiesRef.current.length)
			]
		);
		timeoutRef.current = setTimeout(() => setIsClicked(false), 500);

		return () => cleanup();
	}, [isClicked, setSeed, setRows, setCols, setDifficulty, playSound]);

	return (
		<button
			className='flex-1 btn btn-outline btn-primary disabled:!bg-secondary disabled:text-white'
			type='button'
			onPointerEnter={() => playSound('grid-block-over')}
			aria-label={t('randomize')}
			onClick={onClick}
			disabled={isClicked}>
			<DicesIcon
				className={classNames([
					'text-svg',
					{
						'duration-500': showEffects,
						'transition-[rotate] rotate-360':
							showEffects && isClicked,
						'transition-none rotate-0': !isClicked,
					},
				])}
			/>
			{t('randomize')}
		</button>
	);
};
export default Randomize;
