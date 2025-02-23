import { InteractionType } from './interaction';

export type Grid = boolean[][];
export type Interactions = (InteractionType | false)[][];

export interface HintProps {
	total: number;
	isDone: boolean;
}

export interface Engine {
	grid: Grid;
	hints: {
		rows: HintProps[][];
		cols: HintProps[][];
	};
	total: {
		_: number;
		found: number;
		errors: number;
	};

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
