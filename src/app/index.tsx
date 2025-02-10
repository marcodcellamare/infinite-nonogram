import Grid from './game/Grid';
import Header from './layout/Header';

import '@styles/components/cell.css';

const App = () => {
	return (
		<div className='flex flex-col h-screen'>
			<Header />
			<main className='grow p-5 md:px-10 overflow-x-auto'>
				<Grid size={5} />
			</main>
			<footer className='bg-gray-200'>FOOTER</footer>
		</div>
	);
};
export default App;
