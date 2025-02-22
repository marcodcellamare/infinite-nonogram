import { useEffect, useState } from 'react';
import { Square, X } from 'lucide-react';

import { useInteraction } from '!/contexts/interaction';

const Controller = () => {
	const { isInteracting, interaction } = useInteraction();
	const [checked, setChecked] = useState(false);

	const onChange = (force?: boolean) => {
		setChecked((prevChecked) => {
			if (typeof force === 'boolean') {
				return force;
			}
			return !prevChecked;
		});
	};

	useEffect(() => {
		onChange(isInteracting === 'right');
	}, [isInteracting]);

	useEffect(() => {
		interaction(!checked ? 'left' : 'right');
	}, [checked, interaction]);

	return (
		<label
			className={`flex gap-4 items-center justify-center transition-[background-color] duration-300 ${
				checked ? 'bg-base-content' : 'bg-accent'
			} rounded-full inset-shadow-sm inset-shadow-black/20 text-xl py-1 px-6 overflow-hidden`}>
			<span
				className={`drop-shadow transition-transform duration-300 ${
					checked ? 'text-white/30 scale-100' : 'text-white scale-140'
				}`}>
				<Square className='lucide-text block' />
			</span>
			<input
				type='checkbox'
				className='toggle toggle-xl toggle-white bg-white border-white text-accent checked:bg-white checked:border-white checked:text-base-content shadow-lg shadow-black/20'
				onChange={() => onChange()}
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
		</label>
	);
};
export default Controller;
