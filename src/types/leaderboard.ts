import { FieldValue, Timestamp } from 'firebase/firestore';
import { DifficultyTypes } from './settings';

export type DateType = Timestamp | FieldValue | string;

export interface LeaderboardPlayerProps {
	date?: DateType;
	id?: string;
	name: string;
	country?: string | null;
	score: number;
	rating: number;
	cols: number;
	rows: number;
	difficulty: DifficultyTypes;
	seed: string;
	time: number;
}
