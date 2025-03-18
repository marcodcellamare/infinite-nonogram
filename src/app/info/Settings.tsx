import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';
import { useScale } from '!/contexts/scale';
import useFormatNumber from '!/hooks/useFormatNumber';

import Toggle from '../layout/drawer/Toggle';
import MegaButton from '../misc/MegaButton';
import DifficultyIcon from '../misc/DifficultyIcon';
import { GridIcon, SearchIcon } from 'lucide-react';

const Settings = () => {
	const { i18n } = useTranslation();
	const { rows, cols, difficulty } = useSettings();
	const { scale } = useScale();
	const { percentage } = useFormatNumber();

	return (
		<MegaButton
			container={<Toggle />}
			containerProps={{
				className: 'btn-outline btn-primary hover:text-accent',
			}}>
			<>
				<div className='flex flex-row gap-1 items-center'>
					<GridIcon className='text-svg-inline text-2xl' />
					<div className='flex flex-col items-start'>
						<div className='text-xs font-bold leading-[1.2em]'>{`${cols}×${rows}`}</div>
						<div className='text-xxs leading-[1.2em]'>
							{i18n.t('grid')}
						</div>
					</div>
				</div>
			</>
			<>
				<div className='flex flex-row gap-1 items-center'>
					<DifficultyIcon
						difficulty={difficulty}
						className='text-2xl'
					/>
					<div className='flex flex-col items-start'>
						<div className='text-xs font-bold leading-[1.2em]'>
							{i18n.t(`difficulties.${difficulty}`)}
						</div>
						<div className='text-xxs leading-[1.2em]'>
							{i18n.t('difficulty')}
						</div>
					</div>
				</div>
			</>
			<>
				<div className='flex flex-row gap-1 items-center'>
					<SearchIcon className='text-svg-inline text-2xl' />
					<div className='flex flex-col items-start'>
						<div className='text-xs font-bold leading-[1.2em]'>
							{percentage(scale)}
						</div>
						<div className='text-xxs leading-[1.2em]'>
							{i18n.t('scale')}
						</div>
					</div>
				</div>
			</>
		</MegaButton>
	);
};
export default Settings;
