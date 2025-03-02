import Title from '../info/Title';
import Settings from '../info/Settings';
import Timer from '../info/Timer';
import User from '../info/User';
import Status from '../info/Status';

const Header = () => {
	return (
		<header className='flex absolute top-0 bottom-0 left-0 right-0 m-5 md:m-10 pointer-events-none'>
			<div className='flex flex-1 flex-col gap-1 justify-between'>
				<div className='flex flex-row gap-1 justify-between'>
					<Title />
					<div className='hidden sm:block'>
						<User />
						<Status />
					</div>
				</div>
				<div className='flex flex-col sm:flex-row gap-1 sm:justify-between items-center sm:items-end'>
					<Settings />
					<Timer />
				</div>
			</div>
		</header>
	);
};
export default Header;
