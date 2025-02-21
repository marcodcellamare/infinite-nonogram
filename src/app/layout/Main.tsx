import { Outlet } from 'react-router-dom';
import MegaSeed from './info/MegaSeed';
import Size from './info/Size';

import '@styles/components/Main.css';

const Main = () => {
	return (
		<main className='flex flex-1 relative'>
			<MegaSeed />
			<div className='flex absolute top-0 bottom-0 left-0 right-0 p-5 md:px-10 overflow-auto'>
				<Outlet />
			</div>
			<Size />
		</main>
	);
};
export default Main;
