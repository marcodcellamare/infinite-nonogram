import { Fragment } from 'react';

import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings/hook';
import { useInteraction } from '!/contexts/interaction';
import { useScale } from '!/contexts/scale';

import Block from './Block';
import Hint from './hints';

import '!/styles/components/Grid.css';

const Grid = () => {
	const { isCompleted } = useEngine();
	const { isRefreshing, rows, cols, difficulty, seed } = useSettings();
	const { setIsOverGrid, isError } = useInteraction();
	const { scale } = useScale();

	const sizeClass: Record<number, string> = {
		5: 'grid-cols-[minmax(min-content,auto)_repeat(5,1fr)]',
		6: 'grid-cols-[minmax(min-content,auto)_repeat(6,1fr)]',
		7: 'grid-cols-[minmax(min-content,auto)_repeat(7,1fr)]',
		8: 'grid-cols-[minmax(min-content,auto)_repeat(8,1fr)]',
		9: 'grid-cols-[minmax(min-content,auto)_repeat(9,1fr)]',
		10: 'grid-cols-[minmax(min-content,auto)_repeat(10,1fr)]',
		11: 'grid-cols-[minmax(min-content,auto)_repeat(11,1fr)]',
		12: 'grid-cols-[minmax(min-content,auto)_repeat(12,1fr)]',
		13: 'grid-cols-[minmax(min-content,auto)_repeat(13,1fr)]',
		14: 'grid-cols-[minmax(min-content,auto)_repeat(14,1fr)]',
		15: 'grid-cols-[minmax(min-content,auto)_repeat(15,1fr)]',
		16: 'grid-cols-[minmax(min-content,auto)_repeat(16,1fr)]',
		17: 'grid-cols-[minmax(min-content,auto)_repeat(17,1fr)]',
		18: 'grid-cols-[minmax(min-content,auto)_repeat(18,1fr)]',
		19: 'grid-cols-[minmax(min-content,auto)_repeat(19,1fr)]',
		20: 'grid-cols-[minmax(min-content,auto)_repeat(20,1fr)]',
	};

	return (
		<div
			className='grid-container flex flex-col grow justify-center items-center my-auto relative'
			style={{ padding: `${scale * 5}rem` }}>
			<div
				className={`grid grid-rows-[minmax(min-content,auto)_repeat(1, auto)] ${
					sizeClass[cols]
				} p-0.5 bg-white min-w-fit min-h-fit h-full max-w-full max-h-full border-5 ${
					!isError ? 'border-accent' : 'border-error'
				} shadow-[0_0.3rem_1.5rem] shadow-accent/40 rounded-lg transition-[opacity,filter,scale,border-color] ${
					isCompleted
						? 'duration-1500 ease-in delay-100 blur-md scale-50 opacity-0'
						: `duration-200 ${
								isRefreshing
									? 'ease-in blur-xs scale-90 opacity-0'
									: 'ease-out'
						  }`
				}${isError ? ' grid-error' : ''}`}
				onPointerEnter={() => setIsOverGrid(true)}
				onPointerLeave={() => setIsOverGrid(false)}>
				{Array.from({ length: rows + 1 }).map((_, row) =>
					Array.from({ length: cols + 1 }).map((_, col) => {
						return (
							<Fragment
								key={`${seed}.${rows}x${cols}.${difficulty}.${row}.${col}`}>
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
							</Fragment>
						);
					})
				)}
			</div>
		</div>
	);
};
export default Grid;
