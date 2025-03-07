import { useEngine } from '!/contexts/engine';
import { useInteraction } from '!/contexts/interaction';

import { InteractionType } from '!/types/interaction';

interface IconProps {
	hasInteracted: InteractionType | false;
	isFilled: boolean;
	isError: boolean;
	isOver: boolean;
}

const Icon = ({ hasInteracted, isFilled, isError, isOver }: IconProps) => {
	const { isCompleted } = useEngine();
	const { isInteracting } = useInteraction();

	return (
		<div
			className={`absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center transition-[opacity,scale,filter] duration-200 ease-out ${
				(!isFilled && hasInteracted !== false) ||
				(isCompleted && hasInteracted === false) ||
				isError ||
				(!isCompleted &&
					isInteracting === 'right' &&
					hasInteracted === false)
					? (!isFilled && hasInteracted !== false) ||
					  (isCompleted && hasInteracted === false) ||
					  isError
						? 'opacity-100'
						: 'opacity-15 scale-80 blur-[0.1rem]'
					: 'opacity-0 scale-10 blur-xs'
			} ${
				isError
					? 'text-error'
					: !isCompleted && isOver && hasInteracted === false
					? 'text-base-content'
					: 'text-primary'
			}`}>
			<div className='align-middle leading-1 relative -top-[0.07em]'>
				&times;
			</div>
		</div>
	);
};
export default Icon;
