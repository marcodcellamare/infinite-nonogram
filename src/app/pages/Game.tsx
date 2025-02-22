import Grid from '!/app/game/Grid';
import Size from '!/app/layout/info/Size';
import Timer from '!/app/layout/info/Timer';

const Game = () => {
	return (
		<>
			<div className='flex absolute top-0 bottom-0 left-0 right-0 p-5 md:px-10 scrollbar overflow-auto'>
				<Grid />
			</div>
			<div className='absolute top-2.5 md:top-10 left-5 md:left-auto md:right-10 pointer-events-none'>
				<Size />
			</div>
			<div className='absolute bottom-2.5 md:bottom-10 left-5 md:left-auto md:right-10 pointer-events-none'>
				<Timer />
			</div>
		</>
	);
};
export default Game;
