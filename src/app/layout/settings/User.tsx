import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useCSSVariable from '@hooks/useCSSVariable';
import Avatar from 'boring-avatars';

const User = () => {
	const { i18n } = useTranslation();
	const cssVariable = useCSSVariable();
	const [value, setValue] = useState('');

	return (
		<div className='flex items-center gap-3'>
			<Avatar
				name={value}
				variant='beam' // Options: "marble", "beam", "sunset", "pixel", "ring"
				colors={[
					cssVariable('--color-primary'),
					cssVariable('--color-accent'),
					cssVariable('--color-gray-500'),
					cssVariable('--color-secondary'),
					cssVariable('--color-info'),
				]}
				className='max-w-[4rem]'
			/>

			<label className='input input-primary border-2 flex-1'>
				<strong className='text-primary'>{i18n.t('name')}</strong>
				<input
					type='text'
					className='grow'
					value={value}
					onChange={(e) => setValue(e.target.value.trim())}
				/>
			</label>
		</div>
	);
};
export default User;
