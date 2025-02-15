import { useCallback, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useEngine } from '@contexts/engine';
import { useMouse } from '@contexts/mouse';

interface Block {
	row: number;
	col: number;
}

const Block = ({ row, col }: Block) => {
	const { grid } = useEngine();
	const { isMouseDown, isMouseUp } = useMouse();

	const [hasStatus, setHasStatus] = useState<'active' | 'locked' | false>(
		false
	);
	const [isError, setIsError] = useState<boolean | null>(null);

	const onInteraction = useCallback(
		(e: React.MouseEvent) => {
			if (
				hasStatus === false &&
				((e.type === 'mousemove' && !isMouseUp) ||
					e.type === 'mousedown')
			) {
				switch (isMouseDown) {
					case 'left':
						setHasStatus('active');
						break;

					case 'right':
						setHasStatus('locked');
				}
			}
		},
		[isMouseDown, isMouseUp, hasStatus]
	);

	const color = useCallback((): string => {
		if (hasStatus !== false) {
			return grid[row][col] ? 'bg-primary' : 'bg-primary-content';
		}
		return 'bg-neutral-content';
	}, [hasStatus, grid, row, col]);

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
			} ${col % 5 < 4 ? 'border-r-1' : 'border-r-3'} border-gray-300`}>
			<button
				type='button'
				className={`relative block w-full h-full cursor-pointer ${color()}${
					isError === true ? ' border-5 border-error' : ''
				}`}
				onMouseMove={onInteraction}
				onMouseDown={onInteraction}>
				{hasStatus !== false && !grid[row][col] ? (
					<span className='absolute top-1/2 left-1/2 -translate-1/2 w-full h-full text-white'>
						<X className='w-full h-full' />
					</span>
				) : null}
			</button>
		</div>
	);
};
export default Block;
