import { CSSProperties, useMemo, useRef } from 'react';
import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings';

import { InteractionType } from '!/types/interaction';

import '!/styles/components/game/block/Empty.css';

interface EmptyProps {
	hasInteracted: InteractionType | false;
	isError: boolean;
}

const Empty = ({ hasInteracted, isError }: EmptyProps) => {
	const { isCompleted } = useEngine();
	const { showEffects } = useSettings();

	const hasGlitchEffect = useMemo(
		() => showEffects && Math.random() < 0.2,
		[showEffects]
	);
	const glitchDelay = useMemo(
		() => (hasGlitchEffect ? Math.round(Math.random() * 5 * 100) / 100 : 0),
		[hasGlitchEffect]
	);

	return (
		<div
			className={`game-grid-block-empty${
				hasGlitchEffect && hasInteracted !== false
					? ' game-grid-block-empty-glitch'
					: ''
			}${
				isError ? ' game-grid-block-empty-error' : ''
			} absolute top-0 bottom-0 left-0 right-0 bg-base-200${
				showEffects ? ' transition-[opacity,scale] duration-500' : ''
			}${
				!isCompleted && hasInteracted === false
					? ' scale-10 opacity-0'
					: ''
			}`}
			style={
				hasGlitchEffect
					? ({ '--glitch-delay': `${glitchDelay}s` } as CSSProperties)
					: undefined
			}
		/>
	);
};
export default Empty;
