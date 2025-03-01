import Title from '../info/Title';
import User from '../info/User';

const Header = () => {
	return (
		<header className='absolute top-0 left-0 p-5 md:p-10 pointer-events-none backdrop-blur-xs shadow-xl shadow-primary/5'>
			<div className='flex flex-col gap-3 md:gap-4'>
				<Title />
				<User />
			</div>
		</header>
	);
};
export default Header;
