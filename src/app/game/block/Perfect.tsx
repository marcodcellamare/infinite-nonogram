import { useEngine } from '@/contexts/engine';
import { useSettings } from '@/contexts/settings';
import classNames from 'classnames';

import '@/styles/components/game/block/FilledPerfect.css';

const Perfect = () => {
	const { isCompleted } = useEngine();
	const { showEffects } = useSettings();

	return (
		<div
			className={classNames([
				'game-grid-block-filled-perfect',
				'absolute inset-0 pointer-events-none scale-500',
				{
					'transition-opacity duration-500': showEffects,
					'opacity-0': !isCompleted,
				},
			])}
		/>
	);
};
export default Perfect;
