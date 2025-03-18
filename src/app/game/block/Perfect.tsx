import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings';
import handleClassNames from 'classnames';

import '!/styles/components/game/block/FilledPerfect.css';

const Perfect = () => {
	const { isCompleted } = useEngine();
	const { showEffects } = useSettings();

	return (
		<div
			className={handleClassNames([
				'game-grid-block-filled-perfect',
				'absolute top-0 bottom-0 left-0 right-0 scale-1000',
				{
					'transition-opacity duration-600': showEffects,
					'opacity-0': !isCompleted,
				},
			])}
		/>
	);
};
export default Perfect;
