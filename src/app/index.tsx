import Header from './layout/Header';
import Footer from './layout/Footer';
import Progress from './layout/info/Progress';
import Meta from './layout/Meta';
import Router from './misc/Router';
import Copyright from './layout/Copyright';

const App = () => {
	return (
		<>
			<Meta />
			<div className='flex flex-col h-screen min-w-xs select-none text-base-content'>
				<div className='flex flex-col md:flex-row grow'>
					<Header />
					<Router />
				</div>
				<Progress />
				<Footer />
				<Copyright />
			</div>
		</>
	);
};
export default App;
