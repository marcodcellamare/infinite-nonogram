import { useEngine } from '!/contexts/engine';

import '!/styles/components/GridBlockFilledPerfect.css';

const Perfect = () => {
	const { isCompleted } = useEngine();

	return (
		<div
			className={`game-grid-block-filled-perfect absolute top-0 bottom-0 left-0 right-0 scale-1000 transition-opacity duration-600${
				!isCompleted ? ' opacity-0' : ''
			}`}
		/>
	);
};
export default Perfect;
