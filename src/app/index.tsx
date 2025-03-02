import Footer from './layout/Footer';
import Progress from './info/Progress';
import Meta from './layout/Meta';
import Router from './misc/Router';
import Copyright from './layout/Copyright';
import Drawer from './layout/Drawer';

const App = () => {
	return (
		<>
			<Meta />
			<div className='flex flex-col h-screen min-w-xs select-none text-base-content'>
				<Router />
				<Progress />
				<Footer />
				<Copyright />
			</div>
			<Drawer />
		</>
	);
};
export default App;
