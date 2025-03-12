import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';
import Config from '!config';

import { DicesIcon } from 'lucide-react';

import { DifficultyTypes } from '!/types/settings';

const Randomize = () => {
	const { i18n } = useTranslation();
	const { setSeed, setRows, setCols, setDifficulty } = useSettings();

	const [isClicked, setIsClicked] = useState(false);
	const difficultiesRef = useRef<DifficultyTypes[]>([
		'easy',
		'medium',
		'hard',
	]);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const randomSize = () =>
		Math.floor(
			Math.random() * (Config.game.grid.max - Config.game.grid.min + 1) +
				Config.game.grid.min
		);

	const handleClick = useCallback(() => {
		if (!isClicked) {
			if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

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
		return () => {
			if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
		};
	}, []);

	return (
		<button
			className='flex-1 btn btn-outline btn-primary disabled:!bg-secondary disabled:text-white'
			type='button'
			onClick={handleClick}
			disabled={isClicked}>
			<DicesIcon
				className={`lucide-text duration-500 ${
					!isClicked
						? 'transition-none rotate-0'
						: 'transition-[rotate] rotate-360'
				}`}
			/>
			{i18n.t('randomize')}
		</button>
	);
};
export default Randomize;
