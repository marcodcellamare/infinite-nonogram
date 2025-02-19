import { useEffect, useState } from 'react';
import { Square, X } from 'lucide-react';

import { useInteraction } from '@contexts/interaction';

const Controls = () => {
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
		<>
			<label className='flex'>
				<span className={`text-accent${checked ? ' opacity-30' : ''}`}>
					<Square />
				</span>
				<input
					type='checkbox'
					className='toggle bg-accent border-accent toggle-accent checked:bg-gray-500 checked:border-gray-500 checked:text-white mx-1'
					onChange={() => onChange()}
					onPointerDown={(e) => e.stopPropagation()}
					checked={checked}
				/>
				<span
					className={`text-gray-500${!checked ? ' opacity-30' : ''}`}>
					<X />
				</span>
			</label>
			<div>AUTOMATIC ON / OFF</div>
		</>
	);
};
export default Controls;
