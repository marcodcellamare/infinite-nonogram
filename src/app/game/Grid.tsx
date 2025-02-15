import React, { useEffect, useState } from 'react';
import { useEngine } from '@contexts/engine';
import Block from './Block';
import Hint from './hints';

import { MouseClick } from '@interfaces/mouse';

const Grid = () => {
	const { size, seed } = useEngine();
	const [isMouseDown, setIsMouseDown] = useState<MouseClick>(false);
	const sizeClass: Record<number, string> = {
		5: 'grid-cols-[minmax(min-content,auto)_repeat(5,1fr)]',
		10: 'grid-cols-[minmax(min-content,auto)_repeat(10,1fr)]',
		15: 'grid-cols-[minmax(min-content,auto)_repeat(15,1fr)]',
		20: 'grid-cols-[minmax(min-content,auto)_repeat(20,1fr)]',
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
		<div className='flex flex-col grow justify-center items-center my-auto'>
			<div
				className={`grid grid-rows-[minmax(min-content,auto)_repeat(10, auto)] ${
					sizeClass[size.w]
				} p-0.5 bg-white min-w-fit min-h-fit h-full max-w-full max-h-full border-5 border-secondary shadow-[0_0.3rem_1.5rem] text-secondary/40`}
				//onMouseDown={onMouseDown}
				//onMouseUp={onMouseUp}
				//onMouseEnter={onMouseUp}
				//onMouseLeave={onMouseUp}
			>
				{Array.from({ length: size.h + 1 }).map((_, row) =>
					Array.from({ length: size.w + 1 }).map((_, col) => {
						return (
							<React.Fragment key={`${seed}.${row}.${col}`}>
								{row === 0 || col === 0 ? (
									<Hint
										row={row - 1}
										col={col - 1}
									/>
								) : (
									<Block
										row={row - 1}
										col={col - 1}
									/>
								)}
							</React.Fragment>
						);
					})
				)}
			</div>
		</div>
	);
};
export default Grid;
