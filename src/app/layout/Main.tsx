import { Outlet } from 'react-router-dom';
import useRouteCheck from '!/hooks/useRouteCheck';
import { useSettings } from '!/contexts/settings';

import MegaSeed from '../info/MegaSeed';
import Header from './Header';

import '!/styles/components/Main.css';

const Main = () => {
	useRouteCheck();
	const { showEffects } = useSettings();

	return (
		<>
			<main className='flex flex-1 relative'>
				{showEffects ? <MegaSeed /> : null}
				<Outlet />
				<Header />
			</main>
		</>
	);
};
export default Main;
