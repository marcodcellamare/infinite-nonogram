import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';
import { useScale } from '!/contexts/scale';
import useFormatNumber from '!/hooks/useFormatNumber';
import useBreakpoints from '!/hooks/useBreakpoints';

import User from '../settings/User';
import Seed from '../settings/Seed';
import Difficulty from '../settings/Difficulty';
import Range from '../settings/Range';
import Toggle from '../settings/Toggle';
import Randomize from '../settings/Randomize';
import Title from '../info/Title';
import Share from '../info/Share';

import Config from '!config';

const Drawer = () => {
	const { i18n } = useTranslation();
	const {
		rows,
		cols,
		isAuto,
		showIntersections,
		showEffects,
		setRows,
		setCols,
		setIsAuto,
		setShowIntersections,
		setShowEffects,
	} = useSettings();
	const { scale, setScale } = useScale();
	const { percentage } = useFormatNumber();
	const { currentBreakpoint } = useBreakpoints();

	const [show, setShow] = useState(false);

	return (
		<>
			<div
				className={`drawer fixed top-0 bottom-0 left-0 right-0 z-10${
					!show ? ' pointer-events-none' : ''
				}`}>
				<label
					htmlFor={Config.drawer}
					className={`drawer-overlay overlay fixed top-0 bottom-0 left-0 right-0 transition-opacity duration-300 cursor-pointer${
						!show ? ' opacity-0' : ''
					}`}
				/>
				<div className='absolute top-0 bottom-0 left-0 right-0 overflow-y-auto pointer-events-none'>
					<div
						className={`drawer-side absolute top-0 left-0 w-[85vw] md:w-[65vw] lg:w-[40vw] min-w-xs min-h-full max-w-[500px] bg-base-200 text-base-content p-5 md:p-10 pointer-events-auto transition-transform duration-500${
							!show ? ' -translate-x-full' : ''
						}`}>
						<div className='flex flex-col gap-7 md:gap-10'>
							<Title size='lg' />
							<User />
							<Seed />
							<Difficulty />
							<div className='flex flex-col gap-1'>
								<Range
									label={i18n.t('size.width')}
									value={cols}
									min={Config.game.grid.min}
									max={Config.game.grid.max}
									onChange={setCols}
								/>
								<Range
									label={i18n.t('size.height')}
									value={rows}
									min={Config.game.grid.min}
									max={Config.game.grid.max}
									onChange={setRows}
								/>
							</div>
							<Range
								label={i18n.t('scale')}
								value={scale}
								showValue={percentage(scale)}
								min={Config.game.scale.min}
								max={Config.game.scale.max}
								step={Config.game.scale.step}
								help={
									<>
										<kbd className='kbd kbd-xs'>shift</kbd>{' '}
										+ {i18n.t('scrollwheel')}
									</>
								}
								onChange={setScale}
							/>
							<div className='flex flex-col flex-wrap gap-2'>
								<Toggle
									label={i18n.t('auto')}
									checked={isAuto}
									disabled={['xs', 'sm'].includes(
										currentBreakpoint
									)}
									onChange={setIsAuto}
								/>
								<Toggle
									label={i18n.t('intersections')}
									checked={showIntersections}
									disabled={['xs', 'sm'].includes(
										currentBreakpoint
									)}
									onChange={setShowIntersections}
								/>
								<Toggle
									label={i18n.t('effects')}
									checked={showEffects}
									onChange={setShowEffects}
								/>
							</div>
							<div className='flex flex-wrap gap-0.5'>
								<Randomize />
								<Share />
							</div>
							<div>HI SCORE</div>
						</div>
					</div>
				</div>
			</div>
			<input
				id={Config.drawer}
				type='checkbox'
				className='drawer-toggle'
				hidden
				onChange={(e) => setShow(e.target.checked)}
			/>
		</>
	);
};
export default Drawer;
