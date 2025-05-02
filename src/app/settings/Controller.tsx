import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInteraction } from '!/contexts/interaction';
import { useSettings } from '!/contexts/settings';
import { useScale } from '!/contexts/scale';
import { useAudio } from '!/contexts/audio';
import classNames from 'classnames';

import { MouseIcon, SquareIcon, XIcon } from 'lucide-react';

const Controller = () => {
	const { i18n } = useTranslation();
	const { isInteracting, setIsInteracting } = useInteraction();
	const { isScaling } = useScale();
	const { isAuto, showEffects, isDrawerShown, setIsAuto } = useSettings();
	const { play: playSound } = useAudio();

	const [isChecked, setIsChecked] = useState(false);

	const spacePressed = useRef(false);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.code === 'Space') {
				if (!spacePressed.current) {
					spacePressed.current = true;

					setIsAuto(false);
					setIsChecked((prev) => !prev);
				}
				e.preventDefault();
			}
		},
		[setIsAuto]
	);

	const handleKeyUp = (e: KeyboardEvent) => {
		if (e.code === 'Space') {
			spacePressed.current = false;
		}
	};

	useEffect(() => {
		if (!isAuto) setIsInteracting(!isChecked ? 'left' : 'right');
	}, [isAuto, isChecked, setIsInteracting]);

	useEffect(() => {
		if (isAuto) setIsChecked(isInteracting === 'right');
	}, [isAuto, isChecked, isInteracting]);

	useEffect(() => playSound('grid-block-correct'), [isChecked, playSound]);

	useEffect(() => {
		if (!isDrawerShown) {
			window.addEventListener('keydown', handleKeyDown);
			window.addEventListener('keyup', handleKeyUp);
		}
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	});

	return (
		<label
			className={classNames([
				'indicator indicator-middle indicator-center outline-2 pointer-events-auto',
				'flex gap-4 items-center justify-center contain-layout',
				isChecked ? 'bg-primary' : 'bg-accent',
				'rounded-full text-xl py-1 px-6',
				{
					'outline-secondary pointer-events-none': isAuto,
					'cursor-pointer': !isAuto,
					'outline-primary/0 hover:outline-primary':
						!isAuto && !isChecked,
					'outline-accent/0 hover:outline-accent':
						!isAuto && isChecked,
					'inset-shadow-sm inset-shadow-black/20': showEffects,
					'transition-[background-color,outline-color,opacity] duration-300':
						showEffects,
					'opacity-30': isScaling,
				},
			])}
			onPointerEnter={() => playSound('grid-block-over')}>
			<span
				className={classNames([
					'pointer-events-none will-change-transform',
					isChecked
						? 'text-white/30 scale-100'
						: 'text-white scale-140',
					{
						'drop-shadow': showEffects,
						'transition-transform duration-300': showEffects,
					},
				])}>
				<SquareIcon className='text-svg-inline block' />
			</span>
			<input
				type='checkbox'
				className={classNames([
					'pointer-events-none toggle toggle-xl toggle-white',
					'bg-white border-white text-accent',
					'checked:bg-white checked:border-white checked:text-primary',
					{
						'shadow-lg shadow-black/20': showEffects,
					},
				])}
				checked={isChecked}
				onChange={() => setIsChecked((prev) => !prev)}
			/>
			<span
				className={classNames([
					'pointer-events-none will-change-transform',
					!isChecked
						? 'text-white/50 scale-100'
						: 'text-white scale-140',
					{
						'drop-shadow': showEffects,
						'transition-transform duration-300': showEffects,
					},
				])}>
				<XIcon className='text-svg-inline block' />
			</span>
			<div
				className={classNames([
					'pointer-events-none indicator-item badge badge-secondary rounded-full gap-1',
					'font-bold uppercase',
					isAuto ? 'bg-secondary/80 backdrop-blur-sm' : 'opacity-0',
				])}>
				<MouseIcon className='text-svg-inline' />
				{i18n.t('autoShort')}
			</div>
		</label>
	);
};
export default Controller;
