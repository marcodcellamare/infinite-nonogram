import Grid from '@app/game/Grid';
import MegaSeed from './info/MegaSeed';
import Size from './info/Size';

import '@styles/components/Main.css';

const Main = () => {
	return (
		<main className='flex flex-auto relative'>
			<MegaSeed />
			<div className='flex absolute top-0 bottom-0 left-0 right-0 p-5 md:px-10 overflow-auto'>
				<Grid />
			</div>
			<Size />
		</main>
	);
};
export default Main;
