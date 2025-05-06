import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';
import MountTransition from '!/app/misc/MountTransition';
import classNames from 'classnames';

import Container from './Container';
import User from '!/app/settings/User';
import Title from '!/app/info/Title';
import Leaderboard from '!/app/info/leaderboard';
import Settings from './Settings';
import Copyright from './Copyright';

const Drawer = () => {
	const { i18n } = useTranslation();
	const { isDrawerShown, setIsDrawerShown, showEffects, isLeaderboardOn } =
		useSettings();

	return (
		<MountTransition
			mountIf={isDrawerShown}
			timeout={showEffects ? 500 : 0}>
			{({ isEntering, status }) => (
				<div className='drawer fixed top-0 bottom-0 left-0 right-0 z-10'>
					<button
						type='button'
						className={classNames([
							'drawer-overlay overlay',
							'fixed top-0 bottom-0 left-0 right-0 cursor-se-resize',
							isEntering ? 'opacity-100' : 'opacity-0',
							{
								'transition-opacity duration-250': showEffects,
								'pointer-events-none': ![
									'entering',
									'done',
								].includes(status),
							},
						])}
						onClick={() => setIsDrawerShown(false)}
					/>
					<div className='absolute top-0 bottom-0 left-0 right-0 overflow-y-auto pointer-events-none'>
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
										label={i18n.t('leaderboard.title')}>
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
