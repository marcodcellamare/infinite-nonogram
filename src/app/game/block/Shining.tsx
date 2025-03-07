import { CSSProperties, useMemo } from 'react';

import '!/styles/components/GridBlockFilledShining.css';

const Shining = () => {
	const delay = useMemo(() => Math.round(Math.random() * 5 * 100) / 100, []);

	return (
		<div
			className='game-grid-block-filled-shining absolute top-0 bottom-0 left-0 right-0 scale-500 mix-blend-overlay opacity-70'
			style={{ '--delay': `${delay}s` } as CSSProperties}
		/>
	);
};
export default Shining;
