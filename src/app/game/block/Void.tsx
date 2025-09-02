import { useSettings } from '@/contexts/settings';
import MountTransition from '@/app/misc/MountTransition';
import classNames from 'classnames';

import '@/styles/components/game/block/Void.css';

interface VoidProps {
	isOver: boolean;
}

const Void = ({ isOver }: VoidProps) => {
	const { showEffects } = useSettings();

	return (
		<MountTransition
			mountIf={isOver}
			timeout={
				showEffects
					? {
							entering: 150,
							exiting: 600,
					  }
					: 0
			}>
			{({ isEntering, isMounting }) => (
				<div
					className={classNames([
						'game-grid-block-void',
						'absolute inset-0 pointer-events-none',
						'bg-primary',
						isEntering
							? 'opacity-100 scale-100'
							: 'opacity-0 scale-80',
						{
							'transition-[opacity,scale]': showEffects,
							'duration-150': showEffects && isMounting,
							'duration-600': showEffects && !isMounting,
						},
					])}
				/>
			)}
		</MountTransition>
	);
};
export default Void;
