import Title from '../info/Title';
import Settings from '../info/Settings';
import Timer from '../info/Timer';
import User from '../info/User';
import Status from '../info/status';
import Refresh from '../info/Refresh';

const Header = () => {
	return (
		<header className='flex absolute top-0 bottom-0 left-0 right-0 pointer-events-none'>
			<div className='flex flex-1 flex-col gap-1 justify-between'>
				<div className='p-5 md:p-10 flex flex-row gap-1 justify-between relative'>
					<Title />
					<div className='flex gap-1 items-center self-center'>
						<Refresh />
						<User />
					</div>
				</div>
				<div className='p-5 md:p-10 flex flex-col md:flex-row gap-1 md:justify-between items-stretch md:items-end'>
					<Settings />
					<div className='flex flex-col sm:flex-row flex-wrap gap-1 items-start sm:items-end'>
						<Timer className='self-stretch md:order-last' />
						<Status />
					</div>
				</div>
			</div>
		</header>
	);
};
export default Header;
