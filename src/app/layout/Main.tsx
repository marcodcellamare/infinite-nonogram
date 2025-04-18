import { Outlet } from 'react-router-dom';
import useRouteCheck from '!/hooks/useRouteCheck';
import { useSettings } from '!/contexts/settings';

import Seed from '../info/Seed';
import Header from './Header';

import '!/styles/components/Main.css';
import X from '../info/X';

const Main = () => {
	useRouteCheck();
	const { showEffects } = useSettings();

	return (
		<main className='flex flex-1 relative'>
			{showEffects ? <Seed /> : null}
			<X />
			<Outlet />
			<Header />
		</main>
	);
};
export default Main;
