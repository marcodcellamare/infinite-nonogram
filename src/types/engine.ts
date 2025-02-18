import { Size } from './math';
import { InteractionType } from './interaction';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Grid = boolean[][];
export type Interactions = (InteractionType | false)[][];

export interface Hint {
	total: number;
	isDone: boolean;
}
export interface Engine {
	seed: string;
	difficulty: Difficulty;
	size: Size;
	grid: Grid;
	hints: {
		rows: Hint[][];
		cols: Hint[][];
	};
	total: {
		_: number;
		found: number;
		errors: number;
	};

	setSeed: (seed?: string) => void;
	setDifficulty: (difficulty: Difficulty) => void;
	setSize: (w: number, h: number) => void;

	init: () => void;

	interacted: ({
		row,
		col,
		hasClicked,
	}: {
		row: number;
		col: number;
		hasClicked: InteractionType;
	}) => void;
}
