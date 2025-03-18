import { useEffect } from 'react';
import { useSettings } from '!/contexts/settings';
import useMountTransition from '!/hooks/useMountTransition';
import handleClassNames from 'classnames';

import { InteractionType } from '!/types/interaction';

import '!/styles/components/game/block/Void.css';

interface VoidProps {
	hasInteracted: InteractionType | false;
	isOver: boolean;
}

const Void = ({ hasInteracted, isOver }: VoidProps) => {
	const { isGlobalError, showEffects } = useSettings();
	const { isMounted, isTransitioning, handleTransitionEnd, setCondition } =
		useMountTransition();

	useEffect(
		() => setCondition(isOver && hasInteracted === false && !isGlobalError),
		[setCondition, isOver, hasInteracted, isGlobalError]
	);

	if (!isMounted) return null;

	return (
		<div
			className={handleClassNames(
				'game-grid-block-void',
				'absolute top-0 bottom-0 left-0 right-0',
				'bg-primary',
				{
					'transition-[opacity,scale]': showEffects,
					'duration-200': isTransitioning,
					'duration-500 scale-50 opacity-0': !isTransitioning,
				}
			)}
			onTransitionEnd={handleTransitionEnd}
		/>
	);
};
export default Void;
