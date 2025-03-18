import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';
import useMountTransition from '!/hooks/useMountTransition';
import handleClassNames from 'classnames';

import Container from './Container';
import User from '!/app/settings/User';
import Randomize from '!/app/settings/Randomize';
import Title from '!/app/info/Title';
import Share from '!/app/info/Share';
import Leaderboard from '!/app/info/leaderboard';

import Config from '!config';
import Settings from './Settings';

const Wrapper = ({ show }: { show: boolean }) => {
	const { i18n } = useTranslation();
	const { showEffects, isLeaderboardOn } = useSettings();
	const { isMounted, isTransitioning, handleTransitionEnd, setCondition } =
		useMountTransition();

	useEffect(() => {
		setCondition(show);
	}, [setCondition, show]);

	if (!isMounted) return null;

	return (
		<div
			className={handleClassNames([
				'drawer',
				'fixed top-0 bottom-0 left-0 right-0 z-10',
				{ 'pointer-events-none': !show },
			])}>
			<label
				htmlFor={Config.drawer}
				className={handleClassNames([
					'drawer-overlay overlay',
					'fixed top-0 bottom-0 left-0 right-0',
					{
						'opacity-0': !isTransitioning || !show,
						'cursor-pointer': show,
						'transition-opacity duration-250': showEffects,
					},
				])}
			/>
			<div className='absolute top-0 bottom-0 left-0 right-0 overflow-y-auto pointer-events-none'>
				<div
					className={handleClassNames([
						'drawer-side',
						'absolute top-0 left-0',
						'bg-base-200 text-base-content',
						'w-[85vw] md:w-[65vw] lg:w-[50vw] xl:w-[45vw]',
						'min-w-xs min-h-full max-w-[900px]',
						'p-5 md:p-10 pointer-events-auto',
						{
							'transition-transform duration-500': showEffects,
							'-translate-x-full': !isTransitioning || !show,
						},
					])}
					onTransitionEnd={handleTransitionEnd}>
					<div className='flex flex-col gap-7 md:gap-10'>
						<Title size='lg' />
						<Container show={show}>
							<User />
						</Container>
						<Settings />
						<div className='flex flex-wrap gap-0.5'>
							<Randomize />
							<Share />
						</div>
						{isLeaderboardOn ? (
							<Container
								show={show}
								label={i18n.t('leaderboard.title')}>
								<Leaderboard show={show} />
							</Container>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Wrapper;
