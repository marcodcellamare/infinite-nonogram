import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';
import classNames from 'classnames';
import Config from '!config';

import { DicesIcon } from 'lucide-react';

import { DifficultyTypes } from '!/types/settings';
import { TimeoutType } from '!/types/timer';

const Randomize = () => {
	const { i18n } = useTranslation();
	const { setSeed, setRows, setCols, setDifficulty, showEffects } =
		useSettings();

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

	const handleClick = useCallback(() => {
		if (!isClicked) {
			cleanup();

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
		}
	}, [isClicked, setSeed, setRows, setCols, setDifficulty]);

	useEffect(() => {
		return () => cleanup();
	}, []);

	return (
		<button
			className='flex-1 btn btn-outline btn-primary disabled:!bg-secondary disabled:text-white'
			type='button'
			onClick={handleClick}
			disabled={isClicked}>
			<DicesIcon
				className={classNames([
					'text-svg-inline',
					{
						'duration-500': showEffects,
						'transition-[rotate] rotate-360':
							showEffects && isClicked,
						'transition-none rotate-0': !isClicked,
					},
				])}
			/>
			{i18n.t('randomize')}
		</button>
	);
};
export default Randomize;
