import { useTranslation } from 'react-i18next';
import { useSettings } from '!/contexts/settings/hook';

import Avatar from '../info/Avatar';

const User = () => {
	const { i18n } = useTranslation();
	const { user, setUser } = useSettings();

	return (
		<div className='flex items-center gap-3'>
			<Avatar
				variant='beam'
				className='max-w-[4rem]'
			/>
			<label className='input input-primary w-full'>
				<strong className='text-primary'>{i18n.t('user')}</strong>
				<input
					type='text'
					value={user}
					onChange={(e) => setUser(e.target.value.trim())}
				/>
			</label>
		</div>
	);
};
export default User;
