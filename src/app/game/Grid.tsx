import Cell from './Cell';

interface Grid {
	size?: 5 | 10 | 15 | 20;
}

const Grid = ({ size = 10 }: Grid) => {
	const sizeClass: Record<number, string> = {
		5: 'grid-cols-5',
		10: 'grid-cols-10',
		15: 'grid-cols-15',
		20: 'grid-cols-20',
	};

	return (
		<div
			className={`grid ${sizeClass[size]} gap-1 w-full max-w-screen-md mx-auto`}>
			{Array.from({ length: size * size }).map((_, k) => {
				return <Cell key={k} />;
			})}
		</div>
	);
};
export default Grid;
