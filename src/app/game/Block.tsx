import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useEngine } from '@contexts/engine';
import { useMouse } from '@contexts/mouse';

interface Block {
	row: number;
	col: number;
}

const Block = ({ row, col }: Block) => {
	const { grid } = useEngine();
	const { isMouseDown } = useMouse();

	const [isMouseOver, setIsMouseOver] = useState(false);
	const [hasStatus, setHasStatus] = useState<'active' | 'locked' | false>(
		false
	);
	const [isError, setIsError] = useState<boolean | null>(null);

	useEffect(() => {
		if (hasStatus === false && isMouseOver && isMouseDown) {
			switch (isMouseDown) {
				case 'left':
					setHasStatus('active');
					break;

				case 'right':
					setHasStatus('locked');
			}
		}
	}, [hasStatus, isMouseOver, isMouseDown]);

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
			className={`relative aspect-square ${
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
							: 'bg-gray-300'
						: 'bg-gray-100 hover:bg-gray-50 cursor-pointer'
				}${
					isError === true
						? ' border-2 border-error shadow-lg shadow-error z-10'
						: ''
				}`}
				onMouseEnter={() => setIsMouseOver(true)}
				onMouseLeave={() => setIsMouseOver(false)}>
				{hasStatus !== false && !grid[row][col] ? (
					<span className='absolute top-1/2 left-1/2 -translate-1/2 w-full h-full'>
						<X className='w-full h-full' />
					</span>
				) : null}
			</button>
		</div>
	);
};
export default Block;
