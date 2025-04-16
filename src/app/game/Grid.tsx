import { Fragment, useState } from 'react';
import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings/hook';
import { useInteraction } from '!/contexts/interaction';
import MountTransition from '!/app/misc/MountTransition';
import classNames from 'classnames';

import Block from './block';
import Hint from './hints';

import '!/styles/components/game/Grid.css';

const Grid = () => {
	const { isCompleted } = useEngine();
	const {
		showEffects,
		isRefreshing,
		isGlobalError,
		rows,
		cols,
		difficulty,
		seed,
	} = useSettings();
	const { setIsOverGrid } = useInteraction();

	const [gridKey, setGridKey] = useState('');

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
		<MountTransition
			mountIf={!isCompleted && !isRefreshing}
			timeout={{
				entering: 300,
				exiting: !isCompleted ? 300 : 1700,
			}}
			onMounted={() =>
				setGridKey(`${seed}.${rows}x${cols}.${difficulty}`)
			}>
			{({ isEntering }) => {
				return (
					<div
						key={gridKey}
						className={classNames([
							'game-grid',
							{ 'game-grid-error': isGlobalError },
							'flex flex-col grow justify-center items-center my-auto relative',
						])}>
						<div
							className={classNames([
								'grid grid-rows-[minmax(min-content,auto)_repeat(1, auto)]',
								sizeClass[cols],
								'p-0.5 min-w-fit min-h-fit h-full max-w-full max-h-full',
								'border-5 rounded-lg',
								!isGlobalError
									? 'border-accent'
									: 'border-error',
								!isEntering
									? isCompleted
										? 'scale-50 opacity-0'
										: 'scale-90 opacity-0'
									: 'opacity-100 scale-100',
								showEffects
									? 'transition-[opacity,filter,scale,border-color]'
									: 'transition-[opacity,scale,border-color]',
								!isCompleted
									? 'duration-300 ease-out'
									: 'duration-1200 ease-in delay-500',
								{
									'blur-md': showEffects && isCompleted,
									'blur-xs':
										showEffects &&
										!isCompleted &&
										isRefreshing,
								},
							])}
							onPointerEnter={() => setIsOverGrid(true)}
							onPointerLeave={() => setIsOverGrid(false)}>
							{Array.from({ length: rows + 1 }).map((_, row) =>
								Array.from({ length: cols + 1 }).map(
									(_, col) => {
										return (
											<Fragment key={`${row}.${col}`}>
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
									}
								)
							)}
						</div>
					</div>
				);
			}}
		</MountTransition>
	);
};
export default Grid;
