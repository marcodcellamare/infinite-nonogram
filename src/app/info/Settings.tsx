import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';
import { useScale } from '!/contexts/scale';
import useFormatNumber from '!/hooks/useFormatNumber';

import Sousage from '!/app/misc/sousage';
import SousageItem from '!/app/misc/sousage/Item';
import DifficultyIcon from '!/app/misc/DifficultyIcon';
import { GridIcon, SearchIcon } from 'lucide-react';

const Settings = () => {
	const { i18n } = useTranslation();
	const { rows, cols, difficulty } = useSettings();
	const { scale } = useScale();
	const { percentage } = useFormatNumber();

	return (
		<Sousage className='btn-outline btn-primary'>
			<SousageItem
				title={`${cols}×${rows}`}
				description={i18n.t('grid')}
				icon={<GridIcon />}
			/>
			<SousageItem
				title={i18n.t(`difficulties.${difficulty}`)}
				description={i18n.t('difficulty')}
				icon={<DifficultyIcon difficulty={difficulty} />}
			/>
			<SousageItem
				title={percentage(scale)}
				description={i18n.t('scale')}
				icon={<SearchIcon />}
			/>
		</Sousage>
	);
};
export default Settings;
