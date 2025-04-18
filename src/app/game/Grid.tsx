import { CSSProperties, Fragment, useState } from 'react';
import { useEngine } from '!/contexts/engine';
import { useSettings } from '!/contexts/settings/hook';
import MountTransition from '!/app/misc/MountTransition';
import classNames from 'classnames';
import { colorToRgb } from '!/utils/colors';
import { cssVariable } from '!/utils/misc';

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

	const [gridKey, setGridKey] = useState('');

	const colSizeClassName: Record<number, string> = {
		5: 'grid-cols-[min-content_repeat(5,1fr)]',
		6: 'grid-cols-[min-content_repeat(6,1fr)]',
		7: 'grid-cols-[min-content_repeat(7,1fr)]',
		8: 'grid-cols-[min-content_repeat(8,1fr)]',
		9: 'grid-cols-[min-content_repeat(9,1fr)]',
		10: 'grid-cols-[min-content_repeat(10,1fr)]',
		11: 'grid-cols-[min-content_repeat(11,1fr)]',
		12: 'grid-cols-[min-content_repeat(12,1fr)]',
		13: 'grid-cols-[min-content_repeat(13,1fr)]',
		14: 'grid-cols-[min-content_repeat(14,1fr)]',
		15: 'grid-cols-[min-content_repeat(15,1fr)]',
		16: 'grid-cols-[min-content_repeat(16,1fr)]',
		17: 'grid-cols-[min-content_repeat(17,1fr)]',
		18: 'grid-cols-[min-content_repeat(18,1fr)]',
		19: 'grid-cols-[min-content_repeat(19,1fr)]',
		20: 'grid-cols-[min-content_repeat(20,1fr)]',
	};

	const rowSizeClassName: Record<number, string> = {
		5: 'grid-rows-[min-content_repeat(5,1fr)]',
		6: 'grid-rows-[min-content_repeat(6,1fr)]',
		7: 'grid-rows-[min-content_repeat(7,1fr)]',
		8: 'grid-rows-[min-content_repeat(8,1fr)]',
		9: 'grid-rows-[min-content_repeat(9,1fr)]',
		10: 'grid-rows-[min-content_repeat(10,1fr)]',
		11: 'grid-rows-[min-content_repeat(11,1fr)]',
		12: 'grid-rows-[min-content_repeat(12,1fr)]',
		13: 'grid-rows-[min-content_repeat(13,1fr)]',
		14: 'grid-rows-[min-content_repeat(14,1fr)]',
		15: 'grid-rows-[min-content_repeat(15,1fr)]',
		16: 'grid-rows-[min-content_repeat(16,1fr)]',
		17: 'grid-rows-[min-content_repeat(17,1fr)]',
		18: 'grid-rows-[min-content_repeat(18,1fr)]',
		19: 'grid-rows-[min-content_repeat(19,1fr)]',
		20: 'grid-rows-[min-content_repeat(20,1fr)]',
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
						])}
						style={
							{
								'--block-color': `${colorToRgb(
									cssVariable('--color-white')
								)}`,
							} as CSSProperties
						}>
						<div
							className={classNames([
								'game-grid-wrapper grid',
								colSizeClassName[cols],
								rowSizeClassName[rows],
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
							])}>
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
