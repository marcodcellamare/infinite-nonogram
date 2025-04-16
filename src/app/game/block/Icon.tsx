import { useRef } from 'react';
import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings';
import MountTransition from '!/app/misc/MountTransition';
import classNames from 'classnames';

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

	const nodeRef = useRef(null);

	return (
		<MountTransition
			mountIf={
				(!isFilled && hasInteracted !== false) ||
				(isCompleted && hasInteracted === false)
			}
			timeout={showEffects ? 400 : 0}>
			{({ isEntering }) => (
				<div
					ref={nodeRef}
					className={classNames([
						'grid-block-icon',
						'absolute top-0 bottom-0 left-0 right-0',
						'flex items-center justify-center',
						isEntering
							? 'opacity-100 scale-100'
							: 'opacity-0 scale-1',
						!isError
							? !isCompleted && isOver && hasInteracted === false
								? 'text-base-content'
								: 'text-primary'
							: 'text-error',
						{
							'transition-[opacity,scale] duration-400':
								showEffects,
						},
					])}>
					<div className='align-middle leading-1 relative -top-[0.07em] font-black'>
						×
					</div>
				</div>
			)}
		</MountTransition>
	);
};
export default Icon;
