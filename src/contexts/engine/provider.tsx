import { useState, ReactNode, useEffect, useCallback } from 'react';
import { EngineContext } from './context';

import { useTimer } from '!/contexts/timer/hook';
import { useSettings } from '../settings/hook';

import seedrandom from 'seedrandom';

import { Grid, HintProps, Interactions } from '!/types/engine';
import { InteractionType } from '!/types/interaction';

export const EngineProvider = ({ children }: { children: ReactNode }) => {
	const { start, stop } = useTimer();
	const settings = useSettings();

	const [started, setStarted] = useState(false);

	const [grid, setGrid] = useState<Grid>([]);
	const [interactions, setInteractions] = useState<Interactions>([]);

	const [rowHints, setRowHints] = useState<HintProps[][]>([]);
	const [colHints, setColHints] = useState<HintProps[][]>([]);

	const [total, setTotal] = useState(0);
	const [totalFound, setTotalFound] = useState(0);
	const [totalErrors, setTotalErrors] = useState(0);

	const check = useCallback(() => {
		return grid.flat().length === settings.rows * settings.cols;
	}, [grid, settings.rows, settings.cols]);

	const init = useCallback(() => {
		if (settings.seed) {
			const rng = seedrandom(settings.seed);
			const grid = Array.from({ length: settings.rows }, () =>
				Array(settings.cols).fill(false)
			);

			stop();
			setStarted(false);
			setGrid(
				grid.map((row) => row.map(() => rng() < settings.probability))
			);
			setInteractions(grid);
		}
	}, [
		settings.seed,
		settings.rows,
		settings.cols,
		settings.probability,
		stop,
	]);

	const interacted = useCallback(
		({
			row,
			col,
			hasClicked,
		}: {
			row: number;
			col: number;
			hasClicked: InteractionType;
		}) => {
			setStarted(true);
			setInteractions((prevInteractions) => {
				const newInteractions = [...prevInteractions];
				newInteractions[row] = [...newInteractions[row]];
				newInteractions[row][col] = hasClicked;

				return newInteractions;
			});
		},
		[]
	);

	const calculateRowHints = useCallback(() => {
		if (!check()) return;

		let total: number;
		const hints: HintProps[][] = Array.from(
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
	}, [check, grid, settings.rows, settings.cols]);

	const calculateColHints = useCallback(() => {
		if (!check()) return;

		let total: number;
		const hints: HintProps[][] = Array.from(
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
	}, [check, grid, settings.rows, settings.cols]);

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

	useEffect(() => {
		init();
	}, [init]);

	useEffect(() => {
		calculateRowHints();
		calculateColHints();
	}, [calculateRowHints, calculateColHints]);

	useEffect(() => {
		setTotal(grid.flat().filter((g) => g === true).length);
	}, [grid]);

	useEffect(() => {
		setTotalFound(
			grid
				.flat()
				.filter(
					(g, k) => g === true && interactions.flat()[k] !== false
				).length
		);
		setTotalErrors(
			grid
				.flat()
				.filter(
					(g, k) =>
						(g === true && interactions.flat()[k] === 'right') ||
						(g === false && interactions.flat()[k] === 'left')
				).length
		);
		//console.log('SCORE', cols * rows);
	}, [grid, interactions]);

	useEffect(() => {
		if (started) {
			start();
		}
	}, [started, start]);

	useEffect(() => {
		if (started && totalFound >= total) {
			stop();
			setStarted(false);
		}
	}, [started, stop, totalFound, total]);

	/*
	useEffect(() => {
		checkGrid();
	}, [checkGrid]);
	*/

	return (
		<EngineContext.Provider
			value={{
				grid,
				hints: {
					rows: rowHints,
					cols: colHints,
				},
				total: {
					_: total,
					found: totalFound,
					errors: totalErrors,
				},
				init,
				interacted,
			}}>
			{children}
		</EngineContext.Provider>
	);
};
