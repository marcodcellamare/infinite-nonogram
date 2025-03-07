import { CSSProperties, useMemo } from 'react';
import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings';

import { InteractionType } from '!/types/interaction';

import '!/styles/components/GridBlockEmpty.css';

interface EmptyProps {
	hasInteracted: InteractionType | false;
}

const Empty = ({ hasInteracted }: EmptyProps) => {
	const { isCompleted } = useEngine();
	const { showEffects } = useSettings();

	const delay = useMemo(() => Math.round(Math.random() * 5 * 100) / 100, []);
	const hasGlitchingEffect = useMemo(() => Math.random() < 0.2, []);

	return (
		<div
			className={`game-grid-block-empty${
				showEffects && hasGlitchingEffect && hasInteracted !== false
					? ' game-grid-block-empty-glitching'
					: ''
			} absolute top-0 bottom-0 left-0 right-0 bg-base-200 transition-[opacity,scale] duration-500${
				!isCompleted && hasInteracted === false
					? ' scale-10 opacity-0'
					: ''
			}`}
			style={{ '--delay': `${delay}s` } as CSSProperties}
		/>
	);
};
export default Empty;
