import { CSSProperties, useMemo } from 'react';
import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings';
import MountTransition from '!/app/misc/MountTransition';
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

	const hasShiningEffect = useMemo(
		() => showEffects && hasInteracted === 'left' && Math.random() < 0.3,
		[showEffects, hasInteracted]
	);
	const hasRandomOpacityEffect = useMemo(
		() => showEffects && hasInteracted !== false && Math.random() < 0.4,
		[showEffects, hasInteracted]
	);
	const randomOpacity = useMemo(
		() =>
			hasRandomOpacityEffect
				? Math.round(Math.random() * 0.5 * 100) / 100
				: 0,
		[hasRandomOpacityEffect]
	);

	return (
		<MountTransition
			mountIf={hasInteracted !== false}
			timeout={showEffects ? 200 : 0}>
			{({ isEntering }) => (
				<div
					className={classNames(
						'game-grid-block-filled',
						'absolute top-0 bottom-0 left-0 right-0 text-sm pointer-events-none',
						isEntering
							? 'opacity-100 scale-100'
							: 'opacity-0 scale-10',
						{
							'transition-[opacity,scale] duration-200':
								showEffects,
							'bg-accent': !isError,
							'bg-error': isError,
							'game-grid-block-filled-random': randomOpacity > 0,
						}
					)}
					style={
						{
							'--filled-random-opacity': randomOpacity,
						} as CSSProperties
					}>
					{hasInteracted !== false &&
					totalErrors === 0 &&
					!isError ? (
						<Perfect />
					) : null}
					{hasShiningEffect ? <Shining /> : null}
				</div>
			)}
		</MountTransition>
	);
};
export default Filled;
