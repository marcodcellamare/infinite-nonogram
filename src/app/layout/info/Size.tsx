import { useSettings } from '!/contexts/settings/hook';

import { Grid } from 'lucide-react';

const Size = () => {
	const { rows, cols } = useSettings();

	return (
		<div className='badge md:badge-xl badge-outline badge-accent font-mono bg-white/30 backdrop-blur-xs'>
			<Grid className='lucide-text' /> {`${cols}x${rows}`}
		</div>
	);
};
export default Size;
