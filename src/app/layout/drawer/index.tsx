import { useTranslation } from 'react-i18next';
import { useSettings } from '@/contexts/settings/hook';
import MountTransition from '@/app/misc/MountTransition';
import classNames from 'classnames';

import { ArrowRightIcon } from 'lucide-react';
import Container from './Container';
import User from '@/app/settings/User';
import Title from '@/app/info/Title';
import Leaderboard from '@/app/info/Leaderboard';
import Settings from './Settings';
import Copyright from './Copyright';

const Drawer = () => {
	const { t } = useTranslation();
	const { isDrawerShown, setIsDrawerShown, showEffects, isLeaderboardOn } =
		useSettings();

	return (
		<MountTransition
			mountIf={isDrawerShown}
			timeout={showEffects ? 500 : 0}>
			{({ isEntering, status }) => (
				<div className='drawer fixed inset-0 z-10'>
					<button
						type='button'
						className={classNames([
							'drawer-overlay overlay hover:bg-primary/80 group',
							'fixed inset-0 cursor-pointer',
							isEntering ? 'opacity-100' : 'opacity-0',
							{
								'transition-[background-color,opacity] duration-250':
									showEffects,
								'pointer-events-none': ![
									'entering',
									'done',
								].includes(status),
							},
						])}
						aria-label={t('close-settings')}
						onClick={() => setIsDrawerShown(false)}>
						<ArrowRightIcon className='text-svg text-4xl md:text-6xl absolute top-1/2 right-5 md:right-10 -translate-y-1/2 text-base-100 opacity-50 group-hover:opacity-100 transition-opacity duration-150 ease-in-out' />
					</button>
					<div className='absolute inset-0 overflow-y-auto pointer-events-none'>
						<div
							className={classNames([
								'drawer-side will-change-transform',
								'absolute top-0 left-0',
								'bg-base-200 text-base-content',
								'w-[85vw] md:w-[65vw] lg:w-[50vw] xl:w-[45vw]',
								'min-w-xs max-w-[900px] min-h-full',
								'p-5 md:p-10 pointer-events-auto',
								isEntering
									? 'translate-x-0'
									: '-translate-x-full',
								{
									'transition-transform duration-500':
										showEffects,
								},
							])}>
							<div className='flex flex-col gap-7 md:gap-10'>
								<Title size='lg' />
								<Container show={isEntering}>
									<User />
								</Container>
								<Settings />
								{isLeaderboardOn ? (
									<Container
										show={isEntering}
										label={t('leaderboard.title')}>
										<Leaderboard show={status === 'done'} />
									</Container>
								) : null}
								<Copyright />
							</div>
						</div>
					</div>
				</div>
			)}
		</MountTransition>
	);
};
export default Drawer;
