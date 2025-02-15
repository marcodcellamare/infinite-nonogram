import { useEngine } from '@contexts/engine';
import { useTranslation } from 'react-i18next';

const Header = () => {
	const { i18n } = useTranslation();
	const { seed, generateGrid } = useEngine();

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
						generateGrid({ w: 5, h: 5, difficulty: 'easy' });
					}}>
					generate EASY
				</button>
				<button
					className='btn btn-primary'
					onClick={() => {
						generateGrid({ w: 5, h: 5, difficulty: 'medium' });
					}}>
					generate MEDIUM
				</button>
				<button
					className='btn btn-primary'
					onClick={() => {
						generateGrid({ w: 5, h: 5, difficulty: 'hard' });
					}}>
					generate HARD
				</button>
			</div>
		</header>
	);
};
export default Header;
