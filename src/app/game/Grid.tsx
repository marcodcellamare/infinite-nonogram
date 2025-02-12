import { useEffect, useState } from 'react';
import Block from './Block';

import { MouseClick } from '@interfaces/mouse';

interface Grid {
	size?: 5 | 10 | 15 | 20;
}

const Grid = ({ size = 10 }: Grid) => {
	const [isMouseDown, setIsMouseDown] = useState<MouseClick>(false);
	const sizeClass: Record<number, string> = {
		5: 'grid-cols-6',
		10: 'grid-cols-11',
		15: 'grid-cols-16',
		20: 'grid-cols-21',
	};

	const onMouseDown = (e: React.MouseEvent) => {
		switch (e.button) {
			case 0:
				setIsMouseDown('left');
				break;

			case 1:
				setIsMouseDown('center');
				break;

			case 2:
				setIsMouseDown('right');
				break;

			default:
				setIsMouseDown(false);
		}
		e.preventDefault();
	};
	const onMouseUp = () => {
		setIsMouseDown(false);
	};

	useEffect(() => {
		console.log('isMouseDown', isMouseDown);
	}, [isMouseDown]);

	return (
		<div
			className={`grid ${sizeClass[size]} gap-1 p-1 aspect-square border-5 border-neutral min-w-xs min-h-xs max-w-full max-h-full mx-auto overflow-hidden`}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onMouseEnter={onMouseUp}
			onMouseLeave={onMouseUp}>
			{Array.from({ length: size + 1 }).map((_, row) =>
				Array.from({ length: size + 1 }).map((_, col) => {
					return (
						<Block
							key={`${row}.${col}`}
							row={row}
							col={col}
							//isValid={Math.random() < 0.5}
							isMouseDown={isMouseDown}
						/>
					);
				})
			)}
		</div>
	);
};
export default Grid;
