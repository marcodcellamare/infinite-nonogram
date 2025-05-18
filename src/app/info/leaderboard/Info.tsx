import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings';

import DifficultyIcon from '!/app/misc/DifficultyIcon';
import { GridIcon } from 'lucide-react';

const Info = () => {
	const { i18n } = useTranslation();
	const { difficulty, cols, rows } = useSettings();

	return (
		<div className='flex gap-0.5 mb-5'>
			<span className='badge badge-sm badge-outline badge-primary rounded-sm gap-1 font-bold'>
				<GridIcon className='text-svg-inline' />
				{`${cols}×${rows}`}
			</span>
			<span className='badge badge-sm badge-outline badge-primary rounded-sm gap-1 font-bold'>
				<DifficultyIcon difficulty={difficulty} />
				{i18n.t(`difficulties.${difficulty}`)}
			</span>
		</div>
	);
};
export default Info;
