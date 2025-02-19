import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import Progress from './layout/info/Progress';
import Meta from './layout/Meta';

const App = () => {
	return (
		<>
			<Meta />
			<div className='flex flex-col h-screen min-w-xs select-none'>
				<div className='flex flex-col md:flex-row grow'>
					<Header />
					<Main />
				</div>
				<Progress />
				<Footer />
			</div>
		</>
	);
};
export default App;
