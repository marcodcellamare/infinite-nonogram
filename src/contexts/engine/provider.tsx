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
		console.log('HINTS');

		const hints: Hints = { rows: [], cols: [] };

		if (grid.length > 0) {
			grid.map((row) => {
				let count = 0;

				row.forEach((block) => {
					if (block) {
						count++;
					} else if (count > 0) {
						hints.rows[count].push(count);
						count = 0;
					}
					console.log('COUNT', count, block);
				});
			});

			console.log('hints', hints);
		}

		/*!SECTION function getHints(lines) {
        return lines.map(row => {
            let hints = [];
            let count = 0;
            row.forEach(cell => {
                if (cell === 1) {
                    count++;
                } else if (count > 0) {
                    hints.push(count);
                    count = 0;
                }
            });
            if (count > 0) hints.push(count);
            return hints.length ? hints : [0];
        });
    }

    const rowHints = getHints(grid);
    const colHints = getHints(grid[0].map((_, col) => grid.map(row => row[col])));
	*/
	}, [grid]);

	useEffect(() => {
		generateGrid({
			w: 5,
			h: 5,
			seed: 'gnappo',
			difficulty: 'hard',
		});
	}, [generateGrid]);

	useEffect(() => {
		console.log('grid', seed, grid);

		generateHints();
	}, [grid, seed]);

	return (
		<EngineContext.Provider
			value={{ seed, difficulty, size, grid, generateGrid }}>
			{children}
		</EngineContext.Provider>
	);
};

/*
function seededRandom(seed) {
    let value = seed;
    return function () {
        value = (value * 9301 + 49297) % 233280;
        return value / 233280;
    };
}

function generateNonogram(width, height, seed, difficulty = "medium") {
    const random = seededRandom(seed);
    const grid = Array.from({ length: height }, () => Array(width).fill(0));

    // Difficulty settings: controls block density & size
    const difficultySettings = {
        easy: { minBlocks: 2, maxBlocks: width / 2, fillChance: 0.7 },
        medium: { minBlocks: 1, maxBlocks: width / 3, fillChance: 0.5 },
        hard: { minBlocks: 1, maxBlocks: width / 4, fillChance: 0.35 }
    };
    const { minBlocks, maxBlocks, fillChance } = difficultySettings[difficulty] || difficultySettings.medium;

    // Fill rows with controlled randomness
    for (let y = 0; y < height; y++) {
        if (random() > fillChance) continue; // Chance to skip filling row

        let blocks = Math.floor(random() * (maxBlocks - minBlocks + 1)) + minBlocks;
        let start = Math.floor(random() * (width - blocks + 1));

        for (let i = 0; i < blocks; i++) {
            grid[y][start + i] = 1;
        }
    }

    // Ensure every column has at least one filled cell
    for (let x = 0; x < width; x++) {
        if (grid.some(row => row[x] === 1)) continue; // Already has filled cells

        let blocks = Math.floor(random() * (maxBlocks - minBlocks + 1)) + minBlocks;
        let start = Math.floor(random() * (height - blocks + 1));

        for (let i = 0; i < blocks; i++) {
            grid[start + i][x] = 1;
        }
    }

    // Calculate hints
    function getHints(lines) {
        return lines.map(row => {
            let hints = [];
            let count = 0;
            row.forEach(cell => {
                if (cell === 1) {
                    count++;
                } else if (count > 0) {
                    hints.push(count);
                    count = 0;
                }
            });
            if (count > 0) hints.push(count);
            return hints.length ? hints : [0];
        });
    }

    const rowHints = getHints(grid);
    const colHints = getHints(grid[0].map((_, col) => grid.map(row => row[col])));

    return { grid, rowHints, colHints };
}

// Example Usage
const { grid, rowHints, colHints } = generateNonogram(10, 10, 12345, "hard");
console.log("Grid:", grid);
console.log("Row Hints:", rowHints);
console.log("Column Hints:", colHints);
*/
