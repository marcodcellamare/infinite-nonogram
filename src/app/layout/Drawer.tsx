import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';
import { useScale } from '!/contexts/scale';
import useFormatNumber from '!/hooks/useFormatNumber';

import User from '../settings/User';
import Seed from '../settings/Seed';
import Difficulty from '../settings/Difficulty';
import Range from '../settings/Range';
import Auto from '../settings/Auto';

import Title from '../info/Title';
import Share from '../info/Share';

import Config from '!config';

const Drawer = () => {
	const { i18n } = useTranslation();
	const { rows, cols, setRows, setCols } = useSettings();
	const { scale, setScale } = useScale();
	const { percentage } = useFormatNumber();

	const [show, setShow] = useState(false);

	return (
		<>
			<div
				className={`drawer fixed top-0 bottom-0 left-0 right-0 z-1${
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
						<div className='flex flex-col gap-3 md:gap-4'>
							<Title size='lg' />
							<User />
							<Seed />
							<Difficulty />
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
							<Auto />
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
							<Share />
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
