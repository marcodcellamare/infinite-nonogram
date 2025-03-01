import { useEngine } from '!/contexts/engine';

import '!/styles/components/Progress.css';

const Progress = () => {
	const { totalAvailable, totalFound } = useEngine();

	return (
		<progress
			className='progress progress-accent w-full h-[1px] border-none rounded-none'
			value={totalFound}
			max={totalAvailable}
		/>
	);
};
export default Progress;
