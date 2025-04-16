import Footer from './layout/Footer';
import Progress from './info/Progress';
import Meta from './layout/Meta';
import Router from './misc/Router';
import Drawer from './layout/drawer';

const App = () => (
	<>
		<Meta />
		<div className='flex flex-col h-screen min-w-xs select-none text-base-content'>
			<Router />
			<Progress />
			<Footer />
		</div>
		<Drawer />
	</>
);
export default App;
