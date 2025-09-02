import { memo } from 'react';

import Title from '../info/Title';
import Settings from '../info/Settings';
import Time from '../info/Time';
import User from '../info/User';
import Status from '../info/Status';
import Refresh from '../info/Refresh';
import Controller from '../settings/Controller';
import Preferences from '../info/Preferences';

const Header = memo(() => (
	<header className='flex absolute inset-0 pointer-events-none contain-layout'>
		<div className='p-5 md:p-10 flex flex-1 flex-col gap-1 justify-between'>
			<div className='flex flex-row gap-1 justify-between flex-wrap sm:flex-nowrap relative'>
				<div className='sm:min-w-1/3'>
					<Title />
				</div>
				<div className='order-last sm:order-none w-full flex justify-center self-center'>
					<Time />
				</div>
				<div className='flex gap-1 sm:min-w-1/3 sm:justify-end items-center self-center'>
					<Refresh />
					<User />
				</div>
			</div>
			<div className='flex flex-row gap-1 justify-between'>
				<Preferences />
			</div>
			<div className='min-h-[1rem] flex flex-col md:flex-row gap-1 md:justify-between items-center md:items-end flex-wrap lg:flex-nowrap'>
				<div className='lg:min-w-1/3'>
					<Status />
				</div>
				<div className='order-first mb-5 lg:mb-0 lg:order-none w-full flex justify-center'>
					<Controller />
				</div>
				<div className='lg:min-w-1/3 md:flex md:justify-end'>
					<Settings />
				</div>
			</div>
		</div>
	</header>
));
export default Header;
