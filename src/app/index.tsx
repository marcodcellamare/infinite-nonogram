import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import { useEngine } from '@contexts/engine';

const App = () => {
	const { test } = useEngine();

	return (
		<div className='flex flex-col h-screen'>
			<Header className='bg-gray-200 p-5 md:px-10' />
			<Main className='grow p-5 md:px-10 overflow-x-auto' />
			<Footer className='bg-gray-200 p-5 md:px-10' />
		</div>
	);
};
export default App;
