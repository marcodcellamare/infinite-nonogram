import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';
import MountTransition from '!/app/misc/MountTransition';
import classNames from 'classnames';

import Container from './Container';
import User from '!/app/settings/User';
import Randomize from '!/app/settings/Randomize';
import Title from '!/app/info/Title';
import Share from '!/app/info/Share';
import Leaderboard from '!/app/info/leaderboard';
import Settings from './Settings';

import Config from '!config';
import Copyright from './Copyright';

const Wrapper = ({ show }: { show: boolean }) => {
	const { i18n } = useTranslation();
	const { showEffects, isLeaderboardOn } = useSettings();

	return (
		<MountTransition
			mountIf={show}
			timeout={showEffects ? 500 : 0}>
			{({ isEntering, status }) => (
				<div className='drawer fixed top-0 bottom-0 left-0 right-0 z-10'>
					<label
						htmlFor={Config.drawer}
						className={classNames([
							'drawer-overlay overlay',
							'fixed top-0 bottom-0 left-0 right-0',
							isEntering ? 'opacity-100' : 'opacity-0',
							{
								'transition-opacity duration-250': showEffects,
								'pointer-events-none': status !== 'done',
								'cursor-pointer': show,
							},
						])}
					/>
					<div className='absolute top-0 bottom-0 left-0 right-0 overflow-y-auto pointer-events-none'>
						<div
							className={classNames([
								'drawer-side',
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
								<div className='flex flex-wrap gap-0.5'>
									<Randomize />
									<Share />
								</div>
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
export default Wrapper;
