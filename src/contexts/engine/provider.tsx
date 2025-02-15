import { useState, ReactNode, useEffect, useCallback } from 'react';
import seedrandom from 'seedrandom';
import { EngineContext } from './context';
import { v4 as uuidv4 } from 'uuid';

import { Difficulty, Grid, GridProps, Hints } from '@interfaces/engine';
import { Size } from '@interfaces/math';

export const EngineProvider = ({ children }: { children: ReactNode }) => {
	const [seed, setSeed] = useState<string>('');
	const [difficulty, setDifficulty] = useState<Difficulty>('easy');
	const [size, setSize] = useState<Size>({ w: 0, h: 0 });
	const [grid, setGrid] = useState<Grid>([]);
	const [hints, setHints] = useState<Hints>({
		rows: [],
		cols: [],
	});

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

	const generateGrid = useCallback(
		({ w, h, seed, difficulty = 'medium' }: GridProps) => {
			if (!seed) seed = uuidv4();

			const cleanedSeed = cleanSeed(seed);
			const rng = seedrandom(seed);
			const probability = difficultyToProbability(difficulty);

			let grid = Array.from({ length: w }, () => Array(h).fill(false));
			grid = grid.map((row) => row.map(() => rng() < probability));

			setSeed(cleanedSeed);
			setDifficulty(difficulty);
			setSize({ w, h });
			setGrid(grid);
		},
		[]
	);

	const generateHints = useCallback(() => {
		const hints: Hints = { rows: [], cols: [] };
		let totalBlocks;

		if (grid.length > 0) {
			// Calculate rows hints

			for (let rowIdx = 0; rowIdx < size.w; rowIdx++) {
				if (!hints.rows[rowIdx]) hints.rows[rowIdx] = [];
				totalBlocks = 0;

				for (let colIdx = 0; colIdx < size.h; colIdx++) {
					if (grid[rowIdx][colIdx]) {
						totalBlocks++;
					}
					if (!grid[rowIdx][colIdx] || colIdx >= size.w - 1) {
						if (totalBlocks) hints.rows[rowIdx].push(totalBlocks);

						totalBlocks = 0;
					}
				}
			}

			// Calculate cols hints

			for (let colIdx = 0; colIdx < size.h; colIdx++) {
				if (!hints.cols[colIdx]) hints.cols[colIdx] = [];
				totalBlocks = 0;

				for (let rowIdx = 0; rowIdx < size.w; rowIdx++) {
					if (grid[rowIdx][colIdx]) {
						totalBlocks++;
					}
					if (!grid[rowIdx][colIdx] || rowIdx >= size.h - 1) {
						if (totalBlocks) hints.cols[colIdx].push(totalBlocks);

						totalBlocks = 0;
					}
				}
			}
		}
		setHints(hints);
	}, [grid, size]);

	useEffect(() => {
		generateGrid({
			w: 10,
			h: 10,
			seed: 'gnappo',
			difficulty: 'easy',
		});
	}, [generateGrid]);

	useEffect(() => {
		generateHints();
	}, [generateHints]);

	return (
		<EngineContext.Provider
			value={{ seed, difficulty, size, grid, hints, generateGrid }}>
			{children}
		</EngineContext.Provider>
	);
};
