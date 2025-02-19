import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useEngine } from '@contexts/engine';
import { useInteraction } from '@contexts/interaction';

interface Block {
	row: number;
	col: number;
}

const Block = ({ row, col }: Block) => {
	const { grid, interacted } = useEngine();
	const { isClicked, isInteracting } = useInteraction();

	const [isPointerOver, setIsPointerOver] = useState(false);
	const [hasStatus, setHasStatus] = useState<'active' | 'locked' | false>(
		false
	);
	const [isError, setIsError] = useState<boolean | null>(null);

	useEffect(() => {
		if (hasStatus === false && isPointerOver && isClicked) {
			interacted({ row, col, hasClicked: isInteracting });

			switch (isInteracting) {
				case 'left':
					setHasStatus('active');
					break;

				case 'right':
					setHasStatus('locked');
			}
		}
	}, [
		hasStatus,
		isPointerOver,
		isClicked,
		isInteracting,
		row,
		col,
		interacted,
	]);

	useEffect(() => {
		setIsError(
			(hasStatus === 'active' && !grid[row][col]) ||
				((hasStatus === 'locked' && grid[row][col]) as boolean)
		);
	}, [hasStatus, grid, row, col]);

	useEffect(() => {
		return () => {
			setHasStatus(false);
			setIsError(false);
		};
	}, []);

	return (
		<div
			className={`relative aspect-square min-w-[1rem] min-h-[1rem] ${
				row % 5 < 4 ? 'border-b-1' : 'border-b-3'
			} ${
				col % 5 < 4 ? 'border-r-1' : 'border-r-3'
			} border-gray-300 text-gray-400`}>
			<button
				type='button'
				className={`relative block w-full h-full ${
					hasStatus !== false
						? grid[row][col]
							? 'bg-accent'
							: 'bg-gray-300 inset-shadow-sm inset-shadow-black/15'
						: ''
				}${
					hasStatus === false
						? `cursor-pointer bg-gray-100 hover:bg-white hover:border-2 ${
								isInteracting === 'left'
									? 'hover:border-accent'
									: 'hover:border-gray-500'
						  }`
						: ''
				}${
					isError === true
						? ' border-2 border-error shadow-lg shadow-error z-10'
						: ''
				}`}
				onPointerEnter={() => setIsPointerOver(true)}
				onPointerLeave={() => setIsPointerOver(false)}>
				{(hasStatus === false && isInteracting === 'right') ||
				(hasStatus !== false && !grid[row][col]) ? (
					<span
						className={`absolute top-1/2 left-1/2 -translate-1/2 w-full h-full${
							hasStatus === false ? ' opacity-10' : ''
						}`}>
						<X className='w-full h-full' />
					</span>
				) : null}
			</button>
		</div>
	);
};
export default Block;
