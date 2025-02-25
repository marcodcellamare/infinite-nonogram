import { useEngine } from '!/contexts/engine';

import '!/styles/components/Progress.css';

const Progress = () => {
	const { totalAvailable, totalFound } = useEngine();

	return (
		<progress
			className='progress progress-accent w-full h-1 rounded-none'
			value={totalFound}
			max={totalAvailable}
		/>
	);
};
export default Progress;
