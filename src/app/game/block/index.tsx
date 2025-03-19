import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { useSettings } from '!/contexts/settings/hook';
import { useEngine } from '!/contexts/engine';
import { useInteraction } from '!/contexts/interaction';
import classNames from 'classnames';

import Void from './Void';
import Empty from './Empty';
import Highlight from './Highlight';
import Icon from './Icon';
import Filled from './Filled';

import '!/styles/components/game/block/Main.css';

interface BlockProps {
	row: number;
	col: number;
}

const Block = ({ row, col }: BlockProps) => {
	const { grid, setInteraction, interactions, isCompleted, isReady } =
		useEngine();
	const {
		isRefreshing,
		isGlobalError,
		rows,
		cols,
		setIsGlobalError,
		showIntersections,
		showEffects,
	} = useSettings();
	const {
		isClicked,
		isInteracting,
		isOverCol,
		isOverRow,
		setIsOverCol,
		setIsOverRow,
	} = useInteraction();

	const [isOver, setIsOver] = useState(false);

	const isFilled = useMemo(
		() => (isReady && grid[row][col] ? grid[row][col] : false),
		[isReady, grid, row, col]
	);

	const hasInteracted = useMemo(
		() => isReady && interactions[row][col],
		[isReady, interactions, row, col]
	);

	const isError = useMemo(
		() =>
			isReady &&
			((hasInteracted === 'left' && !isFilled) ||
				(hasInteracted === 'right' && isFilled)),
		[isReady, hasInteracted, isFilled]
	);

	const hasRandomOpacityEffect = useMemo(
		() => showEffects && hasInteracted === false && Math.random() < 0.5,
		[showEffects, hasInteracted]
	);
	const hasGlitchingEffect = useMemo(
		() =>
			showEffects && hasInteracted === false && !isRefreshing
				? Math.random() < 0.2
				: 0,
		[showEffects, hasInteracted, isRefreshing]
	);
	const randomOpacity = useMemo(
		() =>
			hasRandomOpacityEffect
				? Math.round(Math.random() * 0.2 * 100) / 100
				: 0,
		[hasRandomOpacityEffect]
	);
	const glitchingDelay = useMemo(
		() =>
			hasGlitchingEffect
				? Math.round(Math.random() * 0.9 * 100) / 100
				: 0,
		[hasGlitchingEffect]
	);

	useEffect(() => {
		if (hasInteracted === false && isOver && isClicked && !isGlobalError) {
			setInteraction({ row, col, hasInteracted: isInteracting });
		}
	}, [
		row,
		col,
		hasInteracted,
		setInteraction,
		isOver,
		isClicked,
		isInteracting,
		isGlobalError,
	]);

	useEffect(() => {
		if (showIntersections && !isCompleted && isOver) {
			setIsOverRow(row);
			setIsOverCol(col);
		}
	}, [
		row,
		col,
		setIsOverRow,
		setIsOverCol,
		showIntersections,
		isCompleted,
		isOver,
	]);

	useEffect(() => {
		if (isError) setIsGlobalError(true);
		return () => setIsGlobalError(false);
	}, [isError, setIsGlobalError]);

	return (
		<button
			type='button'
			className={classNames([
				'game-grid-block',
				'relative aspect-square overflow-hidden',
				{
					'game-grid-block-t-strong': row % 5 === 0,
					'game-grid-block-l-strong': col % 5 === 0,
					'game-grid-block-b-strong': row >= rows - 1,
					'game-grid-block-r-strong': col >= cols - 1,
					'game-grid-block-glitching backdrop-blur-sm':
						hasGlitchingEffect,
					'transition-[background-color] duration-100': showEffects,
					'cursor-pointer': hasInteracted === false && !isGlobalError,
				},
			])}
			disabled={isCompleted || isGlobalError || hasInteracted !== false}
			onPointerEnter={() => setIsOver(!isCompleted ? true : false)}
			onPointerLeave={() => setIsOver(false)}
			style={
				{
					'--block-random-opacity': `${randomOpacity * 100}%`,
					'--glitching-delay': `${glitchingDelay}s`,
				} as CSSProperties
			}>
			{!isRefreshing ? (
				<>
					{!isCompleted ? (
						<Void
							hasInteracted={hasInteracted}
							isOver={isOver}
						/>
					) : null}
					{isFilled ? (
						<Filled
							hasInteracted={hasInteracted}
							isError={isError}
						/>
					) : (
						<Empty
							hasInteracted={hasInteracted}
							isError={isError}
						/>
					)}
					<Icon
						hasInteracted={hasInteracted}
						isFilled={isFilled}
						isError={isError}
						isOver={isOver}
					/>
					{showIntersections &&
					!isCompleted &&
					(isOverCol === col || isOverRow === row) ? (
						<Highlight />
					) : null}
				</>
			) : null}
		</button>
	);
};
export default Block;
