import {
	CSSProperties,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useSettings } from '!/contexts/settings/hook';
import { useEngine } from '!/contexts/engine';
import { useInteraction } from '!/contexts/interaction';

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
	} = useSettings();
	const {
		isClicked,
		isInteracting,
		isOverCol,
		isOverRow,
		setIsOverCol,
		setIsOverRow,
	} = useInteraction();

	const intervalGlitchingRef = useRef<ReturnType<typeof setInterval> | null>(
		null
	);

	const [isOver, setIsOver] = useState(false);
	const [isGlitching, setIsGlitching] = useState(false);

	const hasRandomOpacity = useRef(Math.random() < 0.8);
	const hasRandomGlitch = useRef(Math.random() < 0.2);

	const randomOpacity = useRef(
		hasRandomOpacity.current
			? Math.round(Math.random() * 0.15 * 100) / 100
			: 0
	);

	const delay = useRef(
		hasRandomGlitch.current
			? Math.round(Math.random() * 0.3 * 100) / 100
			: 0
	);

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

	const cleanup = useCallback(() => {
		if (intervalGlitchingRef.current !== null) {
			clearInterval(intervalGlitchingRef.current);
		}
	}, []);

	useEffect(() => {
		if (!hasRandomGlitch.current) return;
		cleanup();

		intervalGlitchingRef.current = setInterval(() => {
			setIsGlitching((prevIsGlitching) => !prevIsGlitching);
		}, 50);

		return () => cleanup();
	}, [cleanup]);

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
			className={`game-grid-block aspect-square relative overflow-hidden transition-[background-color] duration-100${
				hasInteracted === false && !isGlobalError
					? ' cursor-pointer'
					: ''
			}${row % 5 === 0 ? ' game-grid-block-t-strong' : ''}${
				col % 5 === 0 ? ' game-grid-block-l-strong' : ''
			}${row >= rows - 1 ? ' game-grid-block-b-strong' : ''}${
				col >= cols - 1 ? ' game-grid-block-r-strong' : ''
			}${
				hasRandomGlitch.current
					? ' backdrop-blur-sm game-grid-block-glitching'
					: ''
			}`}
			disabled={isCompleted || isGlobalError || hasInteracted !== false}
			onPointerEnter={() => setIsOver(!isCompleted ? true : false)}
			onPointerLeave={() => setIsOver(false)}
			style={
				{
					'--random-opacity': `${
						!isRefreshing ? randomOpacity.current * 100 : 0
					}%`,
					'--delay': `${delay}s`,
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
