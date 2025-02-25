import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';
import { useScale } from '!/contexts/scale';

import User from '../settings/User';
import Seed from '../settings/Seed';
import Difficulty from '../settings/Difficulty';
import Range from '../settings/Range';
import Auto from '../settings/Auto';

import Title from '../info/Title';
import Share from '../info/Share';

import Config from '!config';

const Header = () => {
	const { i18n } = useTranslation();
	const { rows, cols, setRows, setCols } = useSettings();
	const { scale, setScale } = useScale();

	return (
		<header className='flex-none md:basis-1/3 xl:basis-1/4 2xl:basis-1/5 bg-base-100 p-5 md:px-10'>
			<div className='flex flex-col gap-3 md:gap-4'>
				<Title />
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
					showValue={`${Math.round(scale * 100)}%`}
					min={Config.game.scale.min}
					max={Config.game.scale.max}
					step={Config.game.scale.step}
					help={
						<>
							<kbd className='kbd kbd-xs'>shift</kbd> +{' '}
							{i18n.t('scrollwheel')}
						</>
					}
					onChange={setScale}
				/>
				<Share />
			</div>
		</header>
	);
};
export default Header;
