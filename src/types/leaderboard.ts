import { DifficultyTypes } from './settings';

export interface LeaderboardPlayerProps {
	date: string;
	name: string;
	country: string;
	score: number;
	rating: number;
	cols: number;
	rows: number;
	difficulty: DifficultyTypes;
	seed: string;
	time: number;
}
