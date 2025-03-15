import { useEngine } from '!/contexts/engine';
import { useInteraction } from '!/contexts/interaction';
import { useSettings } from '!/contexts/settings';

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

	return (
		<div
			className={`grid-block-icon absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center${
				showEffects
					? ' transition-[opacity,scale,filter] duration-200 ease-out'
					: ''
			} ${
				(!isFilled && hasInteracted !== false) ||
				(isCompleted && hasInteracted === false) ||
				(!isCompleted &&
					isInteracting === 'right' &&
					hasInteracted === false)
					? (!isFilled && hasInteracted !== false) ||
					  (isCompleted && hasInteracted === false)
						? 'opacity-100'
						: 'opacity-15 scale-80'
					: `opacity-0 scale-10${showEffects ? ' blur-xs' : ''}`
			} ${
				isError
					? 'text-error'
					: !isCompleted && isOver && hasInteracted === false
					? 'text-base-content'
					: 'text-primary'
			}`}>
			<div className='align-middle leading-1 relative -top-[0.07em] font-black'>
				×
			</div>
		</div>
	);
};
export default Icon;
