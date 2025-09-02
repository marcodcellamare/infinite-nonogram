import { useTranslation } from 'react-i18next';
import { useSettings } from '@/contexts/settings/hook';
import { useAudio } from '@/contexts/audio';
import { isOnlyAsterisks } from '@/utils/misc';

import Avatar from '../info/Avatar';
import CountryBadge from '../misc/CountryBadge';

const User = () => {
	const { t } = useTranslation();
	const { user, country, setUser } = useSettings();
	const { play: playSound } = useAudio();

	return (
		<div className='flex items-center gap-3'>
			<Avatar
				name={user}
				country={country}
				className='max-w-[4rem]'
			/>
			<label className='input input-primary w-full'>
				<strong className='text-accent'>{t('user')}</strong>
				<input
					type='text'
					value={user || ''}
					onChange={(e) => {
						playSound('grid-block-over');
						setUser(
							e.target.value.trim().length > 0
								? e.target.value
								: ''
						);
					}}
					onBlur={(e) =>
						setUser(
							e.target.value.trim().length > 0 &&
								!isOnlyAsterisks(e.target.value.trim())
								? e.target.value.trim()
								: null
						)
					}
				/>
				<CountryBadge
					country={country}
					className='badge badge-xs badge-primary'
				/>
			</label>
		</div>
	);
};
export default User;
