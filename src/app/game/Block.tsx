import { useEffect, useMemo, useState } from 'react';
import { useSettings } from '!/contexts/settings/hook';
import { useEngine } from '!/contexts/engine';
import { useInteraction } from '!/contexts/interaction';
import { useScale } from '!/contexts/scale';

import { X } from 'lucide-react';

import Config from '!config';

interface BlockProps {
	row: number;
	col: number;
}

const Block = ({ row, col }: BlockProps) => {
	const { grid, setInteraction, interactions, isCompleted, isReady } =
		useEngine();
	const { rows, cols } = useSettings();
	const { isClicked, isInteracting } = useInteraction();
	const { scale } = useScale();

	const [isPointerOver, setIsPointerOver] = useState(false);

	const gridBlock = useMemo(
		() => (isReady && grid[row][col] ? grid[row][col] : false),
		[isReady, grid, row, col]
	);

	const hasInteracted = useMemo(
		() => isReady && interactions[row][col],
		[isReady, interactions, row, col]
	);

	const isError = useMemo(
		() =>
			(hasInteracted === 'left' && !gridBlock) ||
			(hasInteracted === 'right' && gridBlock),
		[hasInteracted, gridBlock]
	);

	useEffect(() => {
		if (hasInteracted === false && isPointerOver && isClicked) {
			setInteraction({ row, col, hasInteracted: isInteracting });
		}
	}, [
		row,
		col,
		hasInteracted,
		setInteraction,
		isPointerOver,
		isClicked,
		isInteracting,
	]);

	return (
		<div
			className={`relative aspect-square ${
				row % 5 < 4 && row < rows - 1 ? 'border-b-1' : 'border-b-3'
			} ${
				col % 5 < 4 && col < cols - 1 ? 'border-r-1' : 'border-r-3'
			} border-base-300 text-base-content`}
			style={{
				minWidth: `${Config.game.grid.block.size * scale}rem`,
				minHeight: `${Config.game.grid.block.size * scale}rem`,
			}}>
			<button
				type='button'
				className={`relative block w-full h-full transition-[background-color,border-width,border-color] duration-250 ${
					hasInteracted !== false
						? gridBlock
							? 'bg-accent'
							: 'bg-base-300 inset-shadow-sm inset-shadow-black/15'
						: 'bg-base-100'
				}${
					!isCompleted && hasInteracted === false
						? ` cursor-pointer hover:bg-white hover:border-2 ${
								isInteracting === 'left'
									? 'hover:border-accent'
									: 'hover:border-base-content'
						  }`
						: ''
				} ${
					isError === true
						? 'border-2 border-error'
						: 'border-0 border-error/0'
				}`}
				disabled={isCompleted}
				onPointerEnter={() =>
					setIsPointerOver(!isCompleted ? true : false)
				}
				onPointerLeave={() => setIsPointerOver(false)}>
				<span
					className={`absolute top-1/2 left-1/2 -translate-1/2 w-full h-full transition-opacity duration-200 ${
						(hasInteracted !== false && !gridBlock) ||
						(!isCompleted &&
							isInteracting === 'right' &&
							hasInteracted === false)
							? hasInteracted !== false && !gridBlock
								? 'opacity-100'
								: 'opacity-10'
							: 'opacity-0'
					}`}>
					<X className='w-full h-full' />
				</span>
			</button>
		</div>
	);
};
export default Block;
