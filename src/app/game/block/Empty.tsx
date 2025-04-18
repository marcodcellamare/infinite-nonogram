import { CSSProperties, useMemo } from 'react';
import { useSettings } from '!/contexts/settings';
import { useEngine } from '!/contexts/engine';
import MountTransition from '!/app/misc/MountTransition';
import classNames from 'classnames';

import { InteractionType } from '!/types/interaction';

import '!/styles/components/game/block/Empty.css';

interface EmptyProps {
	hasInteracted: InteractionType | false;
	isError: boolean;
}

const Empty = ({ hasInteracted, isError }: EmptyProps) => {
	const { showEffects } = useSettings();
	const { isCompleted } = useEngine();

	const hasGlitchEffect = useMemo(
		() => showEffects && hasInteracted !== false && Math.random() < 0.1,
		[showEffects, hasInteracted]
	);
	const glitchDelay = useMemo(
		() => (hasGlitchEffect ? Math.round(Math.random() * 5 * 100) / 100 : 0),
		[hasGlitchEffect]
	);

	return (
		<MountTransition
			mountIf={
				hasInteracted !== false ||
				(hasInteracted === false && isCompleted)
			}
			timeout={showEffects ? 200 : 0}>
			{({ isEntering }) => (
				<div
					className={classNames([
						'game-grid-block-empty',
						'absolute top-0 bottom-0 left-0 right-0 pointer-events-none',
						'bg-base-200 text-sm',
						isEntering
							? 'opacity-100 scale-100'
							: 'opacity-0 scale-10',
						{
							'game-grid-block-empty-glitch': hasGlitchEffect,
							'game-grid-block-empty-error': isError,
							'transition-[opacity,scale] duration-200':
								showEffects,
						},
					])}
					style={
						{ '--glitch-delay': `${glitchDelay}s` } as CSSProperties
					}
				/>
			)}
		</MountTransition>
	);
};
export default Empty;
