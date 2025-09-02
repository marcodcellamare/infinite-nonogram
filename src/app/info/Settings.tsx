import { useTranslation } from 'react-i18next';
import { useSettings } from '@/contexts/settings/hook';
import { useScale } from '@/contexts/scale';
import useFormatNumber from '@/hooks/useFormatNumber';

import Sousage from '@/app/misc/Sousage';
import SousageItem from '@/app/misc/Sousage/Item';
import DifficultyIcon from '@/app/misc/DifficultyIcon';
import { GridIcon, SearchIcon } from 'lucide-react';

const Settings = () => {
	const { t } = useTranslation();
	const { rows, cols, difficulty } = useSettings();
	const { scale } = useScale();
	const { percentage } = useFormatNumber();

	return (
		<Sousage className='btn-outline btn-primary'>
			<SousageItem
				title={`${cols}×${rows}`}
				description={t('grid')}
				icon={<GridIcon />}
			/>
			<SousageItem
				title={t(`difficulties.${difficulty}`)}
				description={t('difficulty')}
				icon={<DifficultyIcon difficulty={difficulty} />}
			/>
			<SousageItem
				title={percentage(scale)}
				description={t('scale')}
				icon={<SearchIcon />}
			/>
		</Sousage>
	);
};
export default Settings;
