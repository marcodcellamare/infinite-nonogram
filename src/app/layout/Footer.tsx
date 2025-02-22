import Status from './info/Status';
import Controller from './settings/Controller';

const Footer = () => {
	return (
		<footer className='flex flex-col md:flex-row gap-1 md:gap-5 bg-white px-5 md:px-0 py-2'>
			<div className='flex-1 md:pr-10 my-2 md:my-0'>
				<div className='self-center justify-self-center'>
					<Controller />
				</div>
			</div>
			<div className='md:order-first md:basis-1/3 xl:basis-1/4 2xl:basis-1/5 min-w-xs md:pl-10'>
				<Status />
			</div>
		</footer>
	);
};
export default Footer;
