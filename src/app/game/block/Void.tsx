import { useSettings } from '!/contexts/settings';

import { InteractionType } from '!/types/interaction';

import '!/styles/components/game/block/Void.css';

interface VoidProps {
	hasInteracted: InteractionType | false;
	isOver: boolean;
}

const Void = ({ hasInteracted, isOver }: VoidProps) => {
	const { isGlobalError, showEffects } = useSettings();

	return !isGlobalError ? (
		<div
			className={`game-grid-block-void absolute top-0 bottom-0 left-0 right-0 bg-primary${
				showEffects ? ' transition-[opacity,scale] duration-200' : ''
			}${
				!isOver && hasInteracted === false ? ' scale-50 opacity-0' : ''
			}`}
		/>
	) : null;
};
export default Void;
