import { useTranslation } from 'react-i18next';
import { useEngine } from '@contexts/engine';

import Title from './info/Title';
import Seed from './settings/Seed';
import Range from './settings/Range';
import Difficulty from './settings/Difficulty';
import Auto from './settings/Auto';
import User from './settings/User';

const Header = () => {
	const { i18n } = useTranslation();
	const { rows, cols, setRows, setCols } = useEngine();

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
					onChange={setCols}
				/>
				<Range
					label={i18n.t('size.height')}
					value={rows}
					onChange={setRows}
				/>
				<Auto />
				<div>ZOOM</div>
				<div>COPY LINK</div>

				<Range
					label={i18n.t('zoom')}
					value={rows}
					onChange={setRows}
				/>
			</div>
		</header>
	);
};
export default Header;
