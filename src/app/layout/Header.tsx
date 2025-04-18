import Title from '../info/Title';
import Settings from '../info/Settings';
import Time from '../info/Time';
import User from '../info/User';
import Status from '../info/Status';
import Refresh from '../info/Refresh';
import Controller from '../settings/Controller';

const Header = () => (
	<header className='flex absolute top-0 bottom-0 left-0 right-0 pointer-events-none'>
		<div className='flex flex-1 flex-col gap-1 justify-between'>
			<div className='p-5 md:p-10 flex flex-row gap-1 justify-between relative'>
				<Title />
				<div className='flex gap-1 items-center self-center'>
					<Time />
					<Refresh />
					<User />
				</div>
			</div>
			<div className='p-5 md:p-10 flex flex-col md:flex-row gap-1 md:justify-between items-center md:items-end flex-wrap lg:flex-nowrap'>
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
);
export default Header;
