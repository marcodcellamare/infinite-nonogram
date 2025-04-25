import { InteractionType } from './interaction';

export type GridType = boolean[][];
export type InteractionsGridType = (InteractionType | false)[][];
export type ScoreTransitionStatus = 'show' | 'hide' | false;

export interface HintNumbersProps {
	total: number;
	filled?: boolean;
	blocks?: number[];
	found?: boolean[];
	isDone: boolean;
}

export interface EngineContextProps {
	isReady: boolean;
	isStarted: boolean;
	isCompleted: boolean;
	isDone: { rows: boolean[]; cols: boolean[] };
	hasWin: boolean;

	grid: GridType;
	interactions: InteractionsGridType;
	hints: {
		rows: HintNumbersProps[][];
		cols: HintNumbersProps[][];
	};

	total: number;
	totalAvailable: number;
	totalFound: number;
	totalCorrect: number;
	totalErrors: number;
	totalInteractions: number;
	rating: number;
	score: number;

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
