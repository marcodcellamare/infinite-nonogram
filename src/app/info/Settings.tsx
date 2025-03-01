import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';
import { useScale } from '!/contexts/scale';
import useFormatNumber from '!/hooks/useFormatNumber';

import DrawerToggle from '../layout/DrawerToggle';
import { Settings as SettingsIcon } from 'lucide-react';
import MegaButton from '../misc/MegaButton';

const Settings = () => {
	const { i18n } = useTranslation();
	const { rows, cols, difficulty } = useSettings();
	const { scale } = useScale();
	const { percentage } = useFormatNumber();

	return (
		<MegaButton
			container={<DrawerToggle />}
			containerProps={{
				className:
					'indicator-start btn-lg btn-outline btn-accent hover:btn-primary hover:text-accent',
			}}
			icon={<SettingsIcon />}>
			<>
				<div className='leading-[1.05em] font-bold'>{`${cols}x${rows}`}</div>
				<div className='block badge badge-xs bg-white text-accent border-accent'>
					{i18n.t('grid')}
				</div>
			</>
			<>
				<div className='leading-[1.05em] font-bold'>
					{i18n.t(`difficulties.${difficulty}`)}
				</div>
				<div className='block badge badge-xs bg-white text-accent border-accent'>
					{i18n.t('difficulty')}
				</div>
			</>
			<>
				<div className='leading-[1.05em] font-bold'>
					{percentage(scale)}
				</div>
				<div className='block badge badge-xs bg-white text-accent border-accent'>
					{i18n.t('scale')}
				</div>
			</>
		</MegaButton>
	);
};
export default Settings;
