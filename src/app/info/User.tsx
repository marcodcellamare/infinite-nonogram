import { useState } from 'react';
import { useSettings } from '@/contexts/settings/hook';
import { useTranslation } from 'react-i18next';
import { useAudio } from '@/contexts/audio';
import classNames from 'classnames';

import Avatar from './Avatar';

import { SettingsIcon } from 'lucide-react';

const User = () => {
	const { i18n } = useTranslation();
	const { user, country, showEffects, setIsDrawerShown } = useSettings();
	const { play: playSound } = useAudio();

	const [isOver, setIsOver] = useState(false);

	return (
		<button
			type='button'
			className='btn btn-lg btn-outline btn-accent hover:btn-primary text-primary hover:text-accent rounded-full p-1 sm:pe-5 h-auto font-normal max-w-[150px]'
			onPointerEnter={() => {
				playSound('grid-block-over');
				setIsOver(true);
			}}
			onPointerLeave={() => setIsOver(false)}
			onClick={() => setIsDrawerShown(true)}>
			<div className='bg-accent w-[3rem] sm:w-[2.5rem] aspect-square rounded-full overflow-hidden relative'>
				<Avatar
					name={user}
					country={country}
					className={classNames({
						'transition-opacity duration-300': showEffects,
						'opacity-0': isOver,
					})}
				/>
				<SettingsIcon
					className={classNames([
						'text-svg absolute top-1/2 left-1/2 -translate-1/2',
						'text-3xl sm:text-2xl text-primary',
						{
							'transition-[opacity,scale] duration-300':
								showEffects,
							'opacity-0 scale-150': !isOver,
						},
					])}
				/>
			</div>
			<div className='hidden sm:flex flex-col flex-1 min-w-0 text-xs text-start leading-[1em]'>
				<div className='font-bold'>{i18n.t('user')}</div>
				<div className='overflow-hidden text-ellipsis whitespace-nowrap'>
					{user}
				</div>
			</div>
		</button>
	);
};
export default User;
