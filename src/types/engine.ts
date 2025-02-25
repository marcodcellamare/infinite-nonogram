import { InteractionType } from './interaction';

export type GridType = boolean[][];
export type InteractionsGridType = (InteractionType | false)[][];
export type ScoreTransitionStatus = 'show' | 'hide' | false;

export interface HintNumbersProps {
	total: number;
	blocks?: number[];
	found?: boolean[];
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
	total: number;
	totalAvailable: number;
	totalFound: number;
	totalCorrects: number;
	totalErrors: number;
	totalInteractions: number;
	score: number;
	advancedScore: number;

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
