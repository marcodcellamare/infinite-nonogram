import { useSettings } from '!/contexts/settings/hook';
import DrawerToggle from '../layout/DrawerToggle';

import Avatar from './Avatar';

const User = () => {
	const { user } = useSettings();

	return (
		<DrawerToggle className='btn btn-lg btn-outline btn-accent max-w-[200px] py-5'>
			<div className='min-w-0 flex-1 text-xs overflow-hidden text-ellipsis whitespace-nowrap pointer-events-none'>
				{user}
			</div>
			<Avatar
				variant='beam'
				className='w-[2rem] pointer-events-none'
			/>
		</DrawerToggle>
	);
};
export default User;
