import Title from '../info/Title';
import Settings from '../info/Settings';
import Time from '../info/Time';
import User from '../info/User';
import Status from '../info/Status';
import Refresh from '../info/Refresh';

const Header = () => (
	<header className='flex absolute top-0 bottom-0 left-0 right-0 pointer-events-none'>
		<div className='flex flex-1 flex-col gap-1 justify-between'>
			<div className='p-5 md:p-10 flex flex-row gap-1 justify-between relative'>
				<Title />
				<div className='flex gap-1 items-center self-center'>
					<Refresh />
					<User />
				</div>
			</div>
			<div className='p-5 md:p-10 flex flex-col md:flex-row gap-1 md:justify-between items-start md:items-end'>
				<Status />
				<div className='order-first md:order-none'>
					<Time />
				</div>
				<Settings />
			</div>
		</div>
	</header>
);
export default Header;
