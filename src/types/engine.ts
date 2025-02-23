import { InteractionType } from './interaction';

export type GridType = boolean[][];
export type InteractionsGridType = (InteractionType | false)[][];

export interface HintNumbersProps {
	total: number;
	isDone: boolean;
}

export interface EngineContextProps {
	isReady: boolean;
	isStarted: boolean;
	isCompleted: boolean;
	grid: GridType;
	interactions: InteractionsGridType;
	hints: {
		rows: HintNumbersProps[][];
		cols: HintNumbersProps[][];
	};
	totalAvailable: number;
	totalFound: number;
	totalErrors: number;
	totalInteractions: number;

	init: () => void;
	setInteraction: ({
		row,
		col,
		hasInteracted,
	}: {
		row: number;
		col: number;
		hasInteracted: InteractionType;
	}) => void;
}
