import { useTranslation } from 'react-i18next';
import { useEngine } from '@contexts/engine';
import Avatar from '../info/Avatar';

const User = () => {
	const { i18n } = useTranslation();
	const { name, setName } = useEngine();

	return (
		<div className='flex md:flex-col lg:flex-row items-center md:items-start lg:items-center gap-3'>
			<Avatar
				variant='beam'
				className='max-w-[4rem]'
			/>
			<label className='input input-primary w-full'>
				<strong className='text-primary'>{i18n.t('name')}</strong>
				<input
					type='text'
					value={name}
					onChange={(e) => setName(e.target.value.trim())}
				/>
			</label>
		</div>
	);
};
export default User;
