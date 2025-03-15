import { CSSProperties, useMemo } from 'react';
import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings';

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

	const hasShiningEffect = useMemo(() => Math.random() < 0.4, []);
	const hasColorEffect = useMemo(() => Math.random() < 0.6, []);
	const randomOpacity = useMemo(
		() =>
			hasColorEffect ? Math.round(Math.random() * 0.5 * 100) / 100 : 0,
		[hasColorEffect]
	);

	return (
		<div
			className={`game-grid-block-filled${
				showEffects && hasInteracted !== false && randomOpacity > 0
					? ' game-grid-block-filled-random'
					: ''
			} absolute top-0 bottom-0 left-0 right-0 ${
				!isError ? 'bg-accent' : 'bg-error'
			} ${showEffects ? ' transition-[opacity,scale] duration-200' : ''}${
				hasInteracted === false ? ' scale-50 opacity-0' : ''
			}`}
			style={{ '--random-opacity': randomOpacity } as CSSProperties}>
			{hasInteracted !== false && totalErrors === 0 && !isError ? (
				<Perfect />
			) : null}

			{showEffects && hasShiningEffect && hasInteracted === 'left' ? (
				<Shining />
			) : null}
		</div>
	);
};
export default Filled;
