import Status from './info/Status';
import Timer from './info/Timer';
import Controller from './settings/Controller';

const Footer = () => {
	return (
		<footer className='flex flex-col md:flex-row gap-1 md:gap-5 bg-white px-5 md:px-10 py-2'>
			<div className='flex flex-col md:flex-row gap-1 md:gap-5 grow'>
				<div className='flex-1'>
					<Controller />
				</div>
				<div className='-flex self-center justtify-self-center min-w-xs'>
					<Status />
				</div>
			</div>
			<div className='md:w-[30%] lg:w-[25%] md:order-first border'>
				<Timer />
			</div>
		</footer>
	);
};
export default Footer;
