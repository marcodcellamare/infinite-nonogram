import Status from './info/Status';
import Controls from './settings/Controls';

const Footer = () => {
	return (
		<footer className='flex flex-col md:flex-row gap-5 bg-white p-5 md:px-10'>
			<div className='flex-1'>x</div>
			<div className='flex-1'>
				<Status />
			</div>
			<div className='flex-1'>
				<Controls />
			</div>
		</footer>
	);
};
export default Footer;
