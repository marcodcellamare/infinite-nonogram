import { useSettings } from '!/contexts/settings/hook';

import Avatar from './Avatar';

const User = () => {
	const { user } = useSettings();

	return (
		<div className='flex flex-row gap-2.5 max-w-[200px] items-center border-2 border-base-100 rounded p-2'>
			<div>
				<Avatar
					variant='beam'
					className='w-[2.5rem]'
				/>
			</div>
			<div className='min-w-0 flex-1 text-xs text-primary font-bold overflow-hidden text-ellipsis whitespace-nowrap'>
				{user}
			</div>
		</div>
	);
};
export default User;
