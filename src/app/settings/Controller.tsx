import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInteraction } from '!/contexts/interaction';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import { MouseIcon, SquareIcon, XIcon } from 'lucide-react';

const Controller = () => {
	const { i18n } = useTranslation();
	const { isInteracting, setIsInteracting } = useInteraction();
	const { isAuto, showEffects } = useSettings();
	const [checked, setChecked] = useState(false);

	const handleChange = (force?: boolean) => {
		setChecked((prevChecked) => {
			if (typeof force === 'boolean') {
				return force;
			}
			return !prevChecked;
		});
	};

	useEffect(() => {
		handleChange(isInteracting === 'right');
	}, [isInteracting]);

	useEffect(() => {
		setIsInteracting(!checked ? 'left' : 'right');
	}, [checked, setIsInteracting]);

	return (
		<label
			className={classNames([
				'indicator indicator-middle indicator-center outline-2',
				'flex gap-4 items-center justify-center',
				checked ? 'bg-primary' : 'bg-accent',
				'rounded-full text-xl py-1 px-6',
				{
					'outline-secondary pointer-events-none': isAuto,
					'cursor-pointer': !isAuto,
					'outline-primary/0 hover:outline-primary':
						!isAuto && !checked,
					'outline-accent/0 hover:outline-accent': !isAuto && checked,
					'inset-shadow-sm inset-shadow-black/20': showEffects,
					'transition-[background-color,outline-color] duration-300':
						showEffects,
				},
			])}>
			<span
				className={classNames([
					checked
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
					'toggle toggle-xl toggle-white',
					'bg-white border-white text-accent',
					'checked:bg-white checked:border-white checked:text-primary',
					{
						'shadow-lg shadow-black/20': showEffects,
					},
				])}
				onChange={() => handleChange()}
				onPointerDown={(e) => e.stopPropagation()}
				checked={checked}
			/>
			<span
				className={classNames([
					!checked
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
					'indicator-item badge badge-secondary rounded-full gap-1',
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
