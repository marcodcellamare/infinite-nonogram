import { useEffect, useState } from 'react';
import { useInteraction } from '!/contexts/interaction';
import { useTranslation } from 'react-i18next';

import { Square, X } from 'lucide-react';

const Controller = () => {
	const { i18n } = useTranslation();
	const { isInteracting, setIsInteracting, isAuto } = useInteraction();
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
			className={`indicator flex gap-4 items-center justify-center transition-[background-color] duration-300 ${
				checked ? 'bg-base-content' : 'bg-accent'
			} rounded-full inset-shadow-sm inset-shadow-black/20 text-xl py-1 px-6 ---overflow-hidden`}>
			<span
				className={`drop-shadow transition-transform duration-300 ${
					checked ? 'text-white/30 scale-100' : 'text-white scale-140'
				}`}>
				<Square className='lucide-text block' />
			</span>
			<input
				type='checkbox'
				className='toggle toggle-xl toggle-white bg-white border-white text-accent checked:bg-white checked:border-white checked:text-base-content shadow-lg shadow-black/20'
				onChange={() => handleChange()}
				onPointerDown={(e) => e.stopPropagation()}
				checked={checked}
			/>
			<span
				className={`drop-shadow transition-transform duration-300 ${
					!checked
						? 'text-white/50 scale-100'
						: 'text-white scale-140'
				}`}>
				<X className='lucide-text block' />
			</span>
			<div
				className={`indicator-item badge badge-xs badge-secondary rounded-full transition-opacity duration-400${
					!isAuto ? ' opacity-0' : ''
				}`}>
				{i18n.t('autoShort')}
			</div>
		</label>
	);
};
export default Controller;
