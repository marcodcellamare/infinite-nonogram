import { useState, ReactNode, useEffect, useCallback, useMemo } from 'react';
import { EngineContext } from './context';

import { useTimer } from '!/contexts/timer/hook';
import { useSettings } from '../settings/hook';

import seedrandom from 'seedrandom';
import Config from '!config';

import {
	GridType,
	HintNumbersProps,
	InteractionsGridType,
} from '!/types/engine';
import { InteractionType } from '!/types/interaction';

export const EngineProvider = ({ children }: { children: ReactNode }) => {
	const settings = useSettings();
	const {
		start: startTimer,
		stop: stopTimer,
		total: totalTime,
		reset: resetTimer,
	} = useTimer();

	const [grid, setGrid] = useState<GridType>([]);
	const [interactions, setInteractions] = useState<InteractionsGridType>([]);
	const [rowHints, setRowHints] = useState<HintNumbersProps[][]>([]);
	const [colHints, setColHints] = useState<HintNumbersProps[][]>([]);

	const emptyGrid = useMemo(
		() =>
			Array.from({ length: settings.rows }, () =>
				Array(settings.cols).fill(false)
			),
		[settings.rows, settings.cols]
	);

	const init = useCallback(() => {
		if (!settings.seed) return;

		const rng = seedrandom(settings.seed);

		setGrid(
			emptyGrid.map((row) => row.map(() => rng() < settings.probability))
		);
		setInteractions(emptyGrid);
		stopTimer();
		resetTimer();
	}, [emptyGrid, settings.seed, settings.probability, stopTimer, resetTimer]);

	const total = useMemo(() => grid.flat().length, [grid]);

	const totalAvailable = useMemo(
		() => grid.flat().filter((g) => g === true).length,
		[grid]
	);

	const totalFound = useMemo(
		() =>
			grid
				.flat()
				.filter(
					(g, k) => g === true && interactions.flat()[k] !== false
				).length,
		[grid, interactions]
	);

	const totalCorrects = useMemo(
		() =>
			grid
				.flat()
				.filter(
					(g, k) => g === true && interactions.flat()[k] === 'left'
				).length,
		[grid, interactions]
	);

	const totalErrors = useMemo(
		() =>
			grid
				.flat()
				.filter(
					(g, k) =>
						(g === true && interactions.flat()[k] === 'right') ||
						(g === false && interactions.flat()[k] === 'left')
				).length,
		[grid, interactions]
	);

	const totalInteractions = useMemo(
		() => interactions.flat().filter((i) => i !== false).length,
		[interactions]
	);

	const totalInteractionsRight = useMemo(
		() => interactions.flat().filter((i) => i === 'right').length,
		[interactions]
	);

	const isStarted = useMemo(() => totalInteractions > 0, [totalInteractions]);

	const isReady = useMemo(
		() =>
			grid.flat().length === settings.rows * settings.cols &&
			interactions.flat().length === grid.flat().length,
		[grid, interactions, settings.rows, settings.cols]
	);

	const rating = useMemo(() => {
		if (totalAvailable === 0 || (totalFound > 0 && totalCorrects <= 0))
			return 0;

		const errorsPenalty = totalErrors / Config.game.score.penalty.errors;
		const interactionPenalty =
			totalInteractionsRight / Config.game.score.penalty.interactions;

		const errorsPenaltyNormalized = Math.min(
			(errorsPenalty / 100) * totalCorrects,
			totalCorrects
		);
		const interactionPenaltyNormalized = Math.min(
			(interactionPenalty / 100) * totalCorrects,
			totalCorrects
		);

		return Math.min(
			Math.max(
				0,
				(totalCorrects -
					errorsPenaltyNormalized -
					interactionPenaltyNormalized) /
					totalAvailable
			),
			1
		);
	}, [
		totalFound,
		totalCorrects,
		totalErrors,
		totalInteractionsRight,
		totalAvailable,
	]);

	const score = useMemo(() => {
		const timePenalty = 1 / (1 + totalTime / total);
		const difficultyPenalty = 1 / settings.probability;
		const gridSizeBonus =
			total / (Config.game.grid.min * Config.game.grid.min);

		return rating * 100 * timePenalty * difficultyPenalty * gridSizeBonus;
	}, [rating, total, totalTime, settings.probability]);

	const isCompleted = useMemo(
		() => totalFound >= totalAvailable,
		[totalFound, totalAvailable]
	);

	const gatedSetInteraction = useCallback(
		({
			row,
			col,
			hasInteracted,
		}: {
			row: number;
			col: number;
			hasInteracted: InteractionType;
		}) => {
			setInteractions((prevInteractions) => {
				const newInteractions = [...prevInteractions];
				newInteractions[row] = [...newInteractions[row]];
				newInteractions[row][col] = hasInteracted;

				return newInteractions;
			});
		},
		[]
	);

	const calculateRowHints = useCallback(() => {
		if (!isReady) return;

		let blocks: number[];
		let found: boolean[];
		const hints: HintNumbersProps[][] = Array.from(
			{ length: settings.rows },
			() => []
		);

		for (let row = 0; row < settings.rows; row++) {
			blocks = [];
			found = [];

			for (let col = 0; col < settings.cols; col++) {
				if (grid[row][col]) {
					blocks.push(col);
					found.push(
						interactions[row][col] !== false &&
							(!interactions[row].slice(0, col).includes(false) ||
								!interactions[row]
									.slice(col + 1)
									.includes(false))
					);
				}
				if (
					blocks.length > 0 &&
					(!grid[row][col] || col >= settings.cols - 1)
				) {
					hints[row].push({
						total: blocks.length,
						blocks: blocks,
						found: found,
						isDone: !found.includes(false),
					});
					blocks = [];
					found = [];
				}
			}
		}
		setRowHints(hints);
	}, [isReady, grid, interactions, settings.rows, settings.cols]);

	const calculateColHints = useCallback(() => {
		if (!isReady) return;

		let hintIdx: number;
		let blocks: number[];
		let found: boolean[];
		const hints: HintNumbersProps[][] = Array.from(
			{ length: settings.cols },
			() => []
		);

		for (let col = 0; col < settings.cols; col++) {
			hintIdx = 0;
			blocks = [];
			found = [];

			for (let row = 0; row < settings.rows; row++) {
				if (grid[row][col]) {
					blocks.push(row);
					found.push(
						interactions[row][col] !== false &&
							(!interactions
								.slice(0, row)
								.map((r) => r[col])
								.includes(false) ||
								!interactions
									.slice(row + 1)
									.map((r) => r[col])
									.includes(false))
					);
				}
				if (
					blocks.length > 0 &&
					(!grid[row][col] || row >= settings.rows - 1)
				) {
					hints[col][hintIdx] = {
						total: blocks.length,
						blocks: blocks,
						found: found,
						isDone: !found.includes(false),
					};
					hintIdx++;
					blocks = [];
					found = [];
				}
			}
		}
		setColHints(hints);
	}, [isReady, grid, interactions, settings.rows, settings.cols]);

	useEffect(() => init(), [init]);

	useEffect(() => {
		calculateRowHints();
		calculateColHints();
	}, [calculateRowHints, calculateColHints]);

	useEffect(() => {
		if (isStarted && isCompleted) {
			stopTimer();
		} else if (isStarted) {
			startTimer();
		}
		return () => stopTimer();
	}, [isStarted, isCompleted, startTimer, stopTimer]);

	return (
		<EngineContext.Provider
			value={{
				isReady,
				isStarted,
				isCompleted,
				grid,
				interactions,
				hints: {
					rows: rowHints,
					cols: colHints,
				},
				total,
				totalAvailable,
				totalFound,
				totalCorrects,
				totalErrors,
				totalInteractions,
				rating,
				score,

				init,
				setInteraction: gatedSetInteraction,
			}}>
			{children}
		</EngineContext.Provider>
	);
};
