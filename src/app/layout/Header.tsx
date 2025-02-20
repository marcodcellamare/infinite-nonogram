import { useTranslation } from 'react-i18next';
import { useEngine } from '@contexts/engine';

import Title from './info/Title';
import Seed from './settings/Seed';
import Size from './settings/Size';
import Difficulty from './settings/Difficulty';
import Auto from './settings/Auto';
import User from './settings/User';

const Header = () => {
	const { i18n } = useTranslation();
	const { setRows, setCols } = useEngine();

	return (
		<header className='flex-none md:w-[30%] lg:w-[25%] bg-gray-100 p-5 md:px-10'>
			<div className='flex flex-col gap-3 md:gap-4'>
				<Title />
				<User />
				<Seed />
				<Difficulty />
				<Size
					label={i18n.t('size.width')}
					onChange={setCols}
				/>
				<Size
					label={i18n.t('size.height')}
					onChange={setRows}
				/>
				<Auto />
			</div>
		</header>
	);
};
export default Header;
