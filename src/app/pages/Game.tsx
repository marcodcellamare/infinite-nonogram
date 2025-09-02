import Grid from '../game/Grid';
import Score from '../game/score';

const Game = () => (
	<>
		<div className='flex absolute inset-0 scrollbar overflow-auto'>
			<Grid />
		</div>
		<Score />
	</>
);
export default Game;
