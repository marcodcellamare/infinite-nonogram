import { useInteraction } from '!/contexts/interaction';
import { useSettings } from '!/contexts/settings';
import MountTransition from '!/app/misc/MountTransition';
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
						'absolute top-0 bottom-0 left-0 right-0 pointer-events-none overflow-hidden',
						isEntering ? 'bg-base-200/50' : 'bg-base-200/0',
						{
							'transition-[background-color] duration-400':
								showEffects,
						},
					])}
					aria-hidden={true}>
					<p
						className={classNames([
							'absolute top-1/2 left-1/2 -translate-1/2 text-[250vw] leading-[0.8em] text-base-200',
							isEntering
								? 'opacity-100 scale-100'
								: 'opacity-0 scale-150',
							{
								'transition-[opacity,scale] duration-400':
									showEffects,
							},
						])}>
						<XIcon className='text-svg-inline' />
					</p>
				</div>
			)}
		</MountTransition>
	);
};
export default X;
