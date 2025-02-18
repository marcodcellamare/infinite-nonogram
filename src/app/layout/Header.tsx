import Status from '@app/game/Status';
import { useEngine } from '@contexts/engine';
import { useTranslation } from 'react-i18next';

const Header = () => {
	const { i18n } = useTranslation();
	const { seed, setSeed, setSize } = useEngine();

	return (
		<header className='flex-none md:w-[30%] lg:w-[25%] bg-gray-200 p-5 md:px-10'>
			<div className='prose'>
				<title>{i18n.t('title')}</title>
				<meta
					name='description'
					content={i18n.t('title')}
				/>
				<h1>{i18n.t('title')}</h1>
				<p className='break-all'>{seed}</p>
				<button
					className='btn btn-primary'
					onClick={() => {
						setSeed();
					}}>
					new
				</button>
				<button
					className='btn btn-primary'
					onClick={() => {
						setSize(5, 5);
					}}>
					5x5
				</button>
				<button
					className='btn btn-primary'
					onClick={() => {
						setSize(10, 10);
					}}>
					10,10
				</button>
			</div>
			<Status />
		</header>
	);
};
export default Header;
