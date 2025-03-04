import { useEngine } from '!/contexts/engine';

const Progress = () => {
	const { totalAvailable, totalFound } = useEngine();

	return (
		<progress
			className='progress progress-accent bg-base-200 w-full h-[2px] border-none rounded-none'
			value={totalFound}
			max={totalAvailable}
		/>
	);
};
export default Progress;
