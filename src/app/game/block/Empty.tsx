import { CSSProperties, useEffect, useMemo } from 'react';
import { useSettings } from '!/contexts/settings';
import useMountTransition from '!/hooks/useMountTransition';
import handleClassNames from 'classnames';

import { InteractionType } from '!/types/interaction';

import '!/styles/components/game/block/Empty.css';
import { useEngine } from '!/contexts/engine';

interface EmptyProps {
	hasInteracted: InteractionType | false;
	isError: boolean;
}

const Empty = ({ hasInteracted, isError }: EmptyProps) => {
	const { showEffects } = useSettings();
	const { isCompleted } = useEngine();
	const { isMounted, isTransitioning, handleTransitionEnd, setCondition } =
		useMountTransition();

	const hasGlitchEffect = useMemo(
		() => showEffects && hasInteracted !== false && Math.random() < 0.1,
		[showEffects, hasInteracted]
	);
	const glitchDelay = useMemo(
		() => (hasGlitchEffect ? Math.round(Math.random() * 5 * 100) / 100 : 0),
		[hasGlitchEffect]
	);

	useEffect(
		() =>
			setCondition(
				hasInteracted !== false ||
					(hasInteracted === false && isCompleted)
			),
		[setCondition, hasInteracted, isCompleted]
	);

	if (!isMounted) return null;

	return (
		<div
			className={handleClassNames([
				'game-grid-block-empty',
				'absolute top-0 bottom-0 left-0 right-0',
				'bg-base-200',
				{
					'game-grid-block-empty-glitch': hasGlitchEffect,
					'game-grid-block-empty-error': isError,
					'transition-[opacity,scale] duration-200': showEffects,
					'scale-10 opacity-0': !isTransitioning,
				},
			])}
			style={{ '--glitch-delay': `${glitchDelay}s` } as CSSProperties}
			onTransitionEnd={handleTransitionEnd}
		/>
	);
};
export default Empty;
