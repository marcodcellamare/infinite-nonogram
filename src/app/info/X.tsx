import { useInteraction } from '@/contexts/interaction';
import { useSettings } from '@/contexts/settings';
import MountTransition from '@/app/misc/MountTransition';
import classNames from 'classnames';

import { XIcon } from 'lucide-react';

const X = () => {
	const { showEffects } = useSettings();
	const { isInteracting } = useInteraction();

	return (
		<MountTransition
			mountIf={isInteracting === 'right'}
			timeout={showEffects ? 400 : 0}>
			{({ isEntering }) => (
				<div
					className={classNames([
						'absolute inset-0 pointer-events-none overflow-hidden contain-layout',
						isEntering ? 'bg-base-200/50' : 'bg-base-200/0',
						{
							'transition-[background-color] duration-400':
								showEffects,
						},
					])}
					aria-hidden={true}>
					<XIcon
						className={classNames([
							'absolute top-1/2 left-1/2 -translate-1/2 size-[200vh] lg:size-[240vh] stroke-3 lg:stroke-4 text-base-300',
							isEntering
								? 'opacity-100 scale-100'
								: 'opacity-0 scale-150',
							{
								'transition-[opacity,scale] duration-400':
									showEffects,
							},
						])}
					/>
				</div>
			)}
		</MountTransition>
	);
};
export default X;
