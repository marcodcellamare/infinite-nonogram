import { InteractionType } from './interaction';

export type DifficultyTypes = 'easy' | 'medium' | 'hard';

export type Grid = boolean[][];
export type Interactions = (InteractionType | false)[][];

export interface Hint {
	total: number;
	isDone: boolean;
}
export interface Engine {
	seed: string;
	difficulty: DifficultyTypes;
	rows: number;
	cols: number;
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
	setDifficulty: (difficulty: DifficultyTypes) => void;
	setRows: (rows: number) => void;
	setCols: (cols: number) => void;

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
