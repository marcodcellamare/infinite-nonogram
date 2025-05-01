import { memo } from 'react';
import Grid from '../game/Grid';
import Score from '../game/score';

const Game = memo(() => {
	return (
		<>
			<div className='flex absolute top-0 bottom-0 left-0 right-0 scrollbar overflow-auto'>
				<Grid />
			</div>
			<Score />
		</>
	);
});
export default Game;
