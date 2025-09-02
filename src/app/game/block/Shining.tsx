import { CSSProperties, useRef } from 'react';

import '@/styles/components/game/block/FilledShining.css';

const Shining = () => {
	const delay = useRef(Math.round(Math.random() * 5 * 100) / 100);

	return (
		<div
			className='game-grid-block-filled-shining absolute inset-0 pointer-events-none scale-500 mix-blend-overlay opacity-70'
			style={{ '--shining-delay': `${delay.current}s` } as CSSProperties}
		/>
	);
};
export default Shining;
