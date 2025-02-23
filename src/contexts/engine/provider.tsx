import { useState, ReactNode, useEffect, useCallback, useMemo } from 'react';
import { EngineContext } from './context';

import { useTimer } from '!/contexts/timer/hook';
import { useSettings } from '../settings/hook';

import seedrandom from 'seedrandom';

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
		total: totalTimer,
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
	}, [emptyGrid, settings.seed, settings.probability, stopTimer]);

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

	const isStarted = useMemo(() => totalInteractions > 0, [totalInteractions]);

	const isReady = useMemo(
		() =>
			grid.flat().length === settings.rows * settings.cols &&
			interactions.flat().length === grid.flat().length,
		[grid, interactions, settings.rows, settings.cols]
	);

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

		let total: number;
		const hints: HintNumbersProps[][] = Array.from(
			{ length: settings.rows },
			() => []
		);

		for (let row = 0; row < settings.rows; row++) {
			total = 0;

			for (let col = 0; col < settings.cols; col++) {
				if (grid[row][col]) {
					total++;
				}
				if (!grid[row][col] || col >= settings.cols - 1) {
					if (total > 0) {
						hints[row].push({
							total,
							isDone: false,
						});
					}
					total = 0;
				}
			}
		}
		setRowHints(hints);
	}, [isReady, grid, settings.rows, settings.cols]);

	const calculateColHints = useCallback(() => {
		if (!isReady) return;

		let total: number;
		const hints: HintNumbersProps[][] = Array.from(
			{ length: settings.cols },
			() => []
		);

		for (let col = 0; col < settings.cols; col++) {
			total = 0;

			for (let row = 0; row < settings.rows; row++) {
				if (grid[row][col]) {
					total++;
				}
				if (!grid[row][col] || row >= settings.rows - 1) {
					if (total > 0) {
						hints[col].push({
							total,
							isDone: false,
						});
					}
					total = 0;
				}
			}
		}
		setColHints(hints);
	}, [isReady, grid, settings.rows, settings.cols]);

	/*
	const checkGrid = useCallback(() => {
		if (grid.length > 0 && grid[0].length > 0) {
			//console.clear();
			for (let row = 0; row < cols; row++) {
				for (let col = 0; col < rows; col++) {
					//if (interactions[row][col]) {
					/*
						console.log(
							'>>>',
							row,
							col,
							'isFilled',
							interactions[row][col],
							(grid[row][col] &&
								interactions[row][col] === 'left') ||
								(!grid[row][col] &&
									interactions[row][col] === 'right')
						);
						* /
					//}
				}
			}
		}
		/*
		if (grid.length > 0 && interactions.length > 0) {
			//let gridValidation: boolean[][] = [];

			// Check rows
			
		}
			* /
	}, [grid, cols, rows, interactions]);
	*/

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

	useEffect(() => {
		if (isStarted && isCompleted) {
			console.log('>>> totalTimer', totalTimer);
		}
	}, [isStarted, isCompleted, totalTimer]);

	/*
	useEffect(() => {
		checkGrid();
	}, [checkGrid]);
	*/

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
				totalAvailable,
				totalFound,
				totalErrors,
				totalInteractions,

				init,
				setInteraction: gatedSetInteraction,
			}}>
			{children}
		</EngineContext.Provider>
	);
};
