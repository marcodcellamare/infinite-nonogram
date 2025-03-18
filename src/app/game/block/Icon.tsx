import { useEffect, useMemo } from 'react';
import { useEngine } from '!/contexts/engine';
import { useInteraction } from '!/contexts/interaction';
import { useSettings } from '!/contexts/settings';
import useMountTransition from '!/hooks/useMountTransition';
import handleClassNames from 'classnames';

import { InteractionType } from '!/types/interaction';

import '!/styles/components/game/block/Icon.css';

interface IconProps {
	hasInteracted: InteractionType | false;
	isFilled: boolean;
	isError: boolean;
	isOver: boolean;
}

const Icon = ({ hasInteracted, isFilled, isError, isOver }: IconProps) => {
	const { showEffects } = useSettings();
	const { isCompleted } = useEngine();
	const { isInteracting } = useInteraction();
	const { isMounted, isTransitioning, handleTransitionEnd, setCondition } =
		useMountTransition();

	const show = useMemo(
		() =>
			(!isFilled && hasInteracted !== false) ||
			(isCompleted && hasInteracted === false) ||
			(!isCompleted &&
				isInteracting === 'right' &&
				hasInteracted === false),
		[isCompleted, isFilled, hasInteracted, isInteracting]
	);

	useEffect(() => setCondition(show), [setCondition, show]);

	if (!isMounted) return null;

	return (
		<div
			className={handleClassNames([
				'grid-block-icon',
				'absolute top-0 bottom-0 left-0 right-0',
				'flex items-center justify-center',
				{
					'transition-[opacity,scale,filter] duration-500 ease-out':
						showEffects,
					'blur-xs':
						showEffects &&
						hasInteracted === false &&
						isInteracting === 'right',
				},
				isTransitioning
					? (!isFilled && hasInteracted !== false) ||
					  (isCompleted && hasInteracted === false)
						? 'opacity-100'
						: 'opacity-15 scale-80'
					: 'opacity-0 scale-10',
				isError
					? 'text-error'
					: !isCompleted && isOver && hasInteracted === false
					? 'text-base-content'
					: 'text-primary',
			])}
			onTransitionEnd={handleTransitionEnd}>
			<div className='align-middle leading-1 relative -top-[0.07em] font-black'>
				×
			</div>
		</div>
	);
};
export default Icon;
