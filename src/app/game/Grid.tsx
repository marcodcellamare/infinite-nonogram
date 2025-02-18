import { Fragment } from 'react';
import { useEngine } from '@contexts/engine';
import Block from './Block';
import Hint from './hints';
import Controls from './Controls';

const Grid = () => {
	const { size, difficulty, seed } = useEngine();

	const sizeClass: Record<number, string> = {
		5: 'grid-cols-[minmax(min-content,auto)_repeat(5,1fr)]',
		10: 'grid-cols-[minmax(min-content,auto)_repeat(10,1fr)]',
		15: 'grid-cols-[minmax(min-content,auto)_repeat(15,1fr)]',
		20: 'grid-cols-[minmax(min-content,auto)_repeat(20,1fr)]',
	};

	return (
		<div className='flex flex-col grow justify-center items-center my-auto'>
			<div
				className={`grid grid-rows-[minmax(min-content,auto)_repeat(10, auto)] ${
					sizeClass[size.w]
				} p-0.5 bg-white min-w-fit min-h-fit h-full max-w-full max-h-full border-5 border-accent shadow-[0_0.3rem_1.5rem] shadow-accent/40`}>
				{Array.from({ length: size.h + 1 }).map((_, row) =>
					Array.from({ length: size.w + 1 }).map((_, col) => {
						return (
							<Fragment
								key={`${seed}.${size.w}x${size.h}.${difficulty}.${row}.${col}`}>
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
			<div className='mt-5'>
				<Controls />
			</div>
		</div>
	);
};
export default Grid;
