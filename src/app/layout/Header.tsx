import { renderToStaticMarkup } from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import { useEngine } from '@contexts/engine';
import colors from 'tailwindcss/colors';
import { Grid } from 'lucide-react';
import Seed from './settings/Seed';
import Size from './settings/Size';
import Difficulty from './settings/Difficulty';

import pkg from '@package';

const Header = () => {
	const { i18n } = useTranslation();
	const { setRows, setCols } = useEngine();

	return (
		<header className='flex-none md:w-[30%] lg:w-[25%] bg-gray-200 p-5 md:px-10'>
			<div className='prose'>
				<title>{`${i18n.t('title')} v${pkg.version}`}</title>
				<link
					rel='icon'
					href={`data:image/svg+xml,${renderToStaticMarkup(
						<Grid
							size={24}
							color={encodeURIComponent(colors.blue[500])}
						/>
					)}`}
				/>

				<meta
					name='description'
					content={i18n.t('title')}
				/>
				<h1>{i18n.t('title')}</h1>
			</div>
			<div className='flex flex-col gap-2'>
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
			</div>
		</header>
	);
};
export default Header;
