import { Size } from './math';

export type Grid = number[][];

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Hints {
	rows: Grid;
	cols: Grid;
}

export interface GridProps {
	w: number;
	h: number;
	seed?: string;
	difficulty?: Difficulty;
}

export interface Engine {
	seed: string;
	difficulty: Difficulty;
	size: Size;
	grid: Grid;
	generateGrid: ({ w, h, seed, difficulty }: GridProps) => void;
}
