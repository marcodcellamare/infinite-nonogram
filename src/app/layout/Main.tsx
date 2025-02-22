import { Outlet } from 'react-router-dom';
import MegaSeed from './info/MegaSeed';

import useRouteCheck from '@hooks/useRouteCheck';

import '@styles/components/Main.css';

const Main = () => {
	useRouteCheck();

	return (
		<main className='flex flex-1 relative'>
			<MegaSeed />
			<Outlet />
		</main>
	);
};
export default Main;
