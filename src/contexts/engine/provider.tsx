import { useState, ReactNode, useEffect, useCallback } from 'react';
import seedrandom from 'seedrandom';
import { EngineContext } from './context';
import { v4 as uuidv4 } from 'uuid';

import { Difficulty, Grid, Hint, Interactions } from '@_types/engine';
import { Size } from '@_types/math';
import { InteractionType } from '@_types/interaction';

export const EngineProvider = ({ children }: { children: ReactNode }) => {
	const [seed, setSeed] = useState<string>('');
	const [difficulty, setDifficulty] = useState<Difficulty>('medium');
	const [size, setSize] = useState<Size>({ w: 10, h: 10 });

	const [grid, setGrid] = useState<Grid>([]);
	const [interactions, setInteractions] = useState<Interactions>([]);

	const [rowHints, setRowHints] = useState<Hint[][]>([]);
	const [colHints, setColHints] = useState<Hint[][]>([]);

	const [total, setTotal] = useState(0);
	const [totalFound, setTotalFound] = useState(0);
	const [totalErrors, setTotalErrors] = useState(0);

	const cleanSeed = (seed: string): string => {
		return seed
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]/g, '')
			.trim();
	};

	const difficultyToProbability = (difficulty: Difficulty) => {
		switch (difficulty) {
			case 'easy':
				return 0.7;

			case 'medium':
				return 0.5;

			default:
			case 'hard':
				return 0.3;
		}
	};

	const gatedSetSeed = useCallback((seed?: string) => {
		if (!seed) seed = uuidv4();

		setSeed(cleanSeed(seed));
	}, []);

	const gatedSetDifficulty = useCallback(
		(difficulty: Difficulty = 'medium') => {
			setDifficulty(difficulty);
		},
		[]
	);

	const gatedSetSize = useCallback((w: number, h: number) => {
		setSize({ w, h });
	}, []);

	const init = useCallback(() => {
		if (seed) {
			const rng = seedrandom(seed);
			const probability = difficultyToProbability(difficulty);
			const grid = Array.from({ length: size.w }, () =>
				Array(size.h).fill(false)
			);

			setGrid(grid.map((row) => row.map(() => rng() < probability)));
			setInteractions(grid);
		} else {
			gatedSetSeed();
		}
	}, [seed, size, difficulty, gatedSetSeed]);

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
		if (grid.length > 0 && grid[0].length > 0) {
			let total: number;
			const rows = grid.length;
			const cols = grid[0].length;
			const hints: Hint[][] = Array.from({ length: rows }, () => []);

			for (let row = 0; row < rows; row++) {
				total = 0;

				for (let col = 0; col < cols; col++) {
					if (grid[row][col]) {
						total++;
					}
					if (!grid[row][col] || col >= cols - 1) {
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
		}
	}, [grid]);

	const calculateColHints = useCallback(() => {
		if (grid.length > 0 && grid[0].length > 0) {
			let total: number;
			const rows = grid.length;
			const cols = grid[0].length;
			const hints: Hint[][] = Array.from({ length: cols }, () => []);

			for (let col = 0; col < cols; col++) {
				total = 0;

				for (let row = 0; row < rows; row++) {
					if (grid[row][col]) {
						total++;
					}
					if (!grid[row][col] || row >= rows - 1) {
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
		}
	}, [grid]);

	const checkGrid = useCallback(() => {
		if (grid.length > 0 && grid[0].length > 0) {
			//console.clear();
			for (let row = 0; row < size.w; row++) {
				for (let col = 0; col < size.h; col++) {
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
						*/
					//}
				}
			}
		}
		/*
		if (grid.length > 0 && interactions.length > 0) {
			//let gridValidation: boolean[][] = [];

			// Check rows
			
		}
			*/
	}, [grid, size, interactions]);

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
	}, [grid, interactions]);

	useEffect(() => {
		checkGrid();
	}, [checkGrid]);

	return (
		<EngineContext.Provider
			value={{
				seed,
				difficulty,
				size,
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
				setSeed: gatedSetSeed,
				setDifficulty: gatedSetDifficulty,
				setSize: gatedSetSize,

				init,
				interacted,
			}}>
			{children}
		</EngineContext.Provider>
	);
};
