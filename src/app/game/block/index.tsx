import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { useSettings } from '!/contexts/settings/hook';
import { useEngine } from '!/contexts/engine';
import { useInteraction } from '!/contexts/interaction';

import Void from './Void';
import Empty from './Empty';
import Highlight from './Highlight';
import Icon from './Icon';
import Filled from './Filled';

import '!/styles/components/GridBlock.css';

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

	const hasRandomOpacity = useMemo(() => Math.random() < 0.8, []);
	const randomOpacity = useMemo(
		() =>
			hasRandomOpacity ? Math.round(Math.random() * 0.2 * 100) / 100 : 0,
		[hasRandomOpacity]
	);

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

	useEffect(() => {
		if (isError) setIsGlobalError(true);

		return () => setIsGlobalError(false);
	}, [isError, setIsGlobalError]);

	return (
		<button
			type='button'
			className={`game-grid-block aspect-square relative overflow-hidden text-primary${
				hasInteracted === false && !isGlobalError
					? ' cursor-pointer'
					: ''
			}${row % 5 === 0 ? ' game-grid-block-t-strong' : ''}${
				col % 5 === 0 ? ' game-grid-block-l-strong' : ''
			}${row >= rows - 1 ? ' game-grid-block-b-strong' : ''}${
				col >= cols - 1 ? ' game-grid-block-r-strong' : ''
			}`}
			disabled={isCompleted || isGlobalError || hasInteracted !== false}
			onPointerEnter={() => setIsOver(!isCompleted ? true : false)}
			onPointerLeave={() => setIsOver(false)}
			style={
				{
					'--random-opacity': `${randomOpacity * 100}%`,
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
