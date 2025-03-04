import { useEffect, useMemo, useState } from 'react';
import { useSettings } from '!/contexts/settings/hook';
import { useEngine } from '!/contexts/engine';
import { useInteraction } from '!/contexts/interaction';
import { useScale } from '!/contexts/scale';
import useCSSVariable from '!/hooks/useCSSVariable';

import { colorToRgb } from '!/utils/colors';
import Config from '!config';

import { X } from 'lucide-react';

import '!/styles/components/GridBlock.css';

interface BlockProps {
	row: number;
	col: number;
}

const Block = ({ row, col }: BlockProps) => {
	const {
		grid,
		setInteraction,
		interactions,
		isCompleted,
		isReady,
		totalErrors,
	} = useEngine();
	const { isRefreshing, rows, cols } = useSettings();
	const {
		isClicked,
		isInteracting,
		isError: isGlobalError,
		isOverCol,
		isOverRow,
		setIsError,
		setIsOverCol,
		setIsOverRow,
	} = useInteraction();
	const { scale } = useScale();
	const cssVariable = useCSSVariable();

	const [isOver, setIsOver] = useState(false);
	const [animationDelay, setAnimationDelay] = useState(0);
	const [randomOpacity, setRandomOpacity] = useState(0);

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
		if (isError) setIsError(true);
	}, [setIsError, isError]);

	useEffect(() => {
		setAnimationDelay(Math.round(Math.random() * 5 * 100) / 100);
		setRandomOpacity(Math.round(Math.random() * 0.2 * 100) / 100);
	}, [hasInteracted, gridBlock]);

	useEffect(() => {
		if (isOver) {
			setIsOverRow(row);
			setIsOverCol(col);
		}

		if (hasInteracted === false && isOver && isClicked && !isGlobalError) {
			setInteraction({ row, col, hasInteracted: isInteracting });
		}
	}, [
		row,
		col,
		hasInteracted,
		setInteraction,
		setIsOverRow,
		setIsOverCol,
		isOver,
		isClicked,
		isInteracting,
		isGlobalError,
	]);

	return (
		<button
			type='button'
			className={`grid-block aspect-square relative overflow-hidden text-primary${
				hasInteracted === false && !isGlobalError
					? ' cursor-pointer'
					: ''
			}`}
			disabled={isCompleted || isGlobalError || hasInteracted !== false}
			onPointerEnter={() => setIsOver(!isCompleted ? true : false)}
			onPointerLeave={() => setIsOver(false)}
			style={{
				minWidth: `${Config.game.grid.block.size * scale}rem`,
				minHeight: `${Config.game.grid.block.size * scale}rem`,
			}}>
			{!isRefreshing ? (
				<>
					{!isGlobalError ? (
						<div
							className={`absolute top-0 bottom-0 left-0 right-0 bg-primary transition-[opacity,scale,filter] duration-200${
								!isCompleted &&
								hasInteracted === false &&
								!isOver
									? ' scale-50 blur-md opacity-0'
									: ''
							}`}
							style={{
								boxShadow: `inset 0 0 ${
									0.5 * scale
								}rem rgba(${colorToRgb(
									cssVariable('--color-primary')
								)},0.25)`,
							}}
						/>
					) : null}

					{gridBlock ? (
						<div
							className={`absolute top-0 bottom-0 left-0 right-0 bg-accent transition-[opacity,scale,filter] duration-200${
								hasInteracted === false
									? ' scale-50 blur-sm opacity-0'
									: ''
							}`}>
							{hasInteracted !== false && !isError ? (
								<div
									className={`grid-block-perfect absolute top-0 bottom-0 left-0 right-0 scale-1000 transition-opacity duration-200 ${
										isCompleted && totalErrors === 0
											? 'opacity-100'
											: 'opacity-0'
									}`}
								/>
							) : null}
							{hasInteracted !== false ? (
								<>
									<div
										className='absolute top-0 bottom-0 left-0 right-0'
										style={{
											boxShadow: `inset 0 -${
												0.5 * scale
											}rem ${
												0.1 * scale
											}rem rgba(${colorToRgb(
												cssVariable('--color-primary')
											)},0.25)`,
										}}
									/>
									<div
										className='absolute top-0 bottom-0 left-0 right-0 bg-primary'
										style={{
											opacity: randomOpacity,
										}}
									/>
								</>
							) : null}
							{hasInteracted === 'left' ? (
								<div
									className='grid-block-filled absolute top-0 bottom-0 left-0 right-0 scale-500 mix-blend-overlay opacity-30'
									style={{
										animationDelay: `${animationDelay}s`,
									}}
								/>
							) : null}
						</div>
					) : (
						<div
							className={`absolute top-0 bottom-0 left-0 right-0 bg-base-200 transition-[opacity,scale,filter] duration-500${
								!isCompleted && hasInteracted === false
									? ' scale-10 blur-sm opacity-0'
									: ''
							}`}
							style={{
								boxShadow: `inset 0 ${1 * scale}rem ${
									0.3 * scale
								}rem rgba(${colorToRgb(
									cssVariable('--color-primary')
								)},0.25)`,
							}}>
							{hasInteracted !== false ? (
								<div
									className='grid-block-empty absolute top-0 bottom-0 left-0 right-0 bg-primary/5'
									style={{
										animationDelay: `${animationDelay}s`,
									}}
								/>
							) : null}
						</div>
					)}

					<div
						className={`absolute top-1/2 left-1/2 -translate-1/2 w-full h-full transition-[opacity,scale,filter] duration-300 ease-out ${
							(!gridBlock && hasInteracted !== false) ||
							(isCompleted && hasInteracted === false) ||
							isError ||
							(!isCompleted &&
								isInteracting === 'right' &&
								hasInteracted === false)
								? (!gridBlock && hasInteracted !== false) ||
								  (isCompleted && hasInteracted === false) ||
								  isError
									? 'opacity-100'
									: 'opacity-15 scale-80 blur-[0.15rem]'
								: 'opacity-0 scale-200 blur-sm'
						} ${
							isError
								? 'text-error'
								: !isCompleted &&
								  isOver &&
								  hasInteracted === false
								? 'text-base-content'
								: 'text-primary'
						}`}>
						<X
							className='w-full h-full'
							style={{
								filter: `drop-shadow(0 ${
									0.2 * scale
								}rem 0.1rem rgba(${colorToRgb(
									cssVariable('--color-primary')
								)},0.35)`,
							}}
						/>
					</div>
				</>
			) : null}

			{isOverCol === col || isOverRow === row ? (
				<div className='absolute top-0 bottom-0 left-0 right-0 bg-primary/10' />
			) : null}
			<div
				className={`absolute top-0 bottom-0 left-0 right-0 ${
					row % 5 === 0 ? 'border-t-2' : 'border-t-1'
				} ${col % 5 === 0 ? 'border-l-2' : 'border-l-1'}${
					row >= rows - 1 ? ' border-b-2' : ''
				}${
					col >= cols - 1 ? ' border-r-2' : ''
				} border-base-200 mix-blend-multiply`}
			/>
		</button>
	);
};
export default Block;
