import { useEngine } from '@contexts/engine';
import { Grid } from 'lucide-react';

const Size = () => {
	const { rows, cols } = useEngine();

	return (
		<div className='absolute top-2.5 md:top-10 left-5 md:left-auto md:right-10 badge md:badge-xl badge-outline badge-primary border-2 font-bold bg-white/30 backdrop-blur-xs shadow shadow-error pointer-events-none'>
			<Grid className='inline-block w-[1em] h-[1em]' />{' '}
			{`${cols}x${rows}`}
		</div>
	);
};
export default Size;
