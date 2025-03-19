import { CSSProperties, useEffect, useMemo } from 'react';
import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings';
import useMountTransition from '!/hooks/useMountTransition';
import classNames from 'classnames';

import Perfect from './Perfect';
import Shining from './Shining';

import { InteractionType } from '!/types/interaction';

import '!/styles/components/game/block/Filled.css';

interface FilledProps {
	hasInteracted: InteractionType | false;
	isError: boolean;
}

const Filled = ({ hasInteracted, isError }: FilledProps) => {
	const { totalErrors } = useEngine();
	const { showEffects } = useSettings();
	const { isMounted, isTransitioning, handleTransitionEnd, setCondition } =
		useMountTransition();

	const hasShiningEffect = useMemo(
		() => showEffects && hasInteracted === 'left' && Math.random() < 0.4,
		[showEffects, hasInteracted]
	);
	const hasRandomOpacityEffect = useMemo(
		() => showEffects && hasInteracted !== false && Math.random() < 0.6,
		[showEffects, hasInteracted]
	);
	const randomOpacity = useMemo(
		() =>
			hasRandomOpacityEffect
				? Math.round(Math.random() * 0.5 * 100) / 100
				: 0,
		[hasRandomOpacityEffect]
	);

	useEffect(
		() => setCondition(hasInteracted !== false),
		[setCondition, hasInteracted]
	);

	if (!isMounted) return null;

	return (
		<div
			className={classNames(
				'game-grid-block-filled',
				'absolute top-0 bottom-0 left-0 right-0',
				{
					'bg-accent': !isError,
					'bg-error': isError,
					'game-grid-block-filled-random': randomOpacity > 0,
					'transition-[opacity,scale] duration-200': showEffects,
					'scale-50 opacity-0': !isTransitioning,
				}
			)}
			style={
				{ '--filled-random-opacity': randomOpacity } as CSSProperties
			}
			onTransitionEnd={handleTransitionEnd}>
			{hasInteracted !== false && totalErrors === 0 && !isError ? (
				<Perfect />
			) : null}
			{hasShiningEffect ? <Shining /> : null}
		</div>
	);
};
export default Filled;
