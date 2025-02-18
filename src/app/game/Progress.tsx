import { useEngine } from '@contexts/engine';

import '@styles/components/Progress.css';

const Progress = () => {
	const { total } = useEngine();

	return total._ > 0 && total.found > 0 ? (
		<progress
			className='progress progress-accent w-full h-1 rounded-none'
			value={total.found}
			max={total._}
		/>
	) : null;
};
export default Progress;
