import Status from './info/Status';
import Timer from './info/Timer';
import Controller from './settings/Controller';

const Footer = () => {
	return (
		<footer className='flex flex-col md:flex-row gap-1 md:gap-5 bg-white px-5 md:px-10 py-2'>
			<div className='flex-1'>
				<div className='self-center justify-self-center'>
					<Controller />
				</div>
			</div>
			<div className='justify-self-center min-w-xs md:order-first'>
				<Status />
			</div>
			<div className='flex-1 md:grow-0 items-center justify-center'>
				<Timer />
			</div>
		</footer>
	);
};
export default Footer;
