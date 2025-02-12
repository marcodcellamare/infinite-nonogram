import Grid from '@app/game/Grid';

const Main = ({ className }: { className: string }) => {
	return (
		<main className={className}>
			<Grid size={5} />
		</main>
	);
};
export default Main;
