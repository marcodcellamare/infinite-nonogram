import { useEffect } from 'react';
import { useAudio } from '!/contexts/audio';

import Progress from './info/Progress';
import Meta from './layout/Meta';
import Router from './misc/Router';
import Drawer from './layout/drawer';

import '!/styles/components/App.css';

const App = () => {
	const { add: addSound } = useAudio();

	useEffect(() => {
		addSound('grid-refresh', './sounds/grid-refresh.mp3', 0.3);
		addSound('grid-block-over', './sounds/grid-block-over.mp3', 0.05);
		addSound('grid-block-correct', './sounds/grid-block-correct.mp3', 0.3);
		addSound('grid-block-wrong', './sounds/grid-block-wrong.mp3', 0.5);
		addSound('ending-loss', './sounds/ending-loss.mp3');
		addSound('ending-victory', './sounds/ending-victory.mp3');
	}, [addSound]);

	return (
		<>
			<Meta />
			<div className='app flex flex-col min-w-xs select-none text-base-content'>
				<Progress />
				<Router />
			</div>
			<Drawer />
		</>
	);
};
export default App;
