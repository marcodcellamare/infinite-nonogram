export type DifficultyTypes = 'easy' | 'medium' | 'hard';

export interface SettingsContextProps {
	user: string;
	seed: string;
	difficulty: DifficultyTypes;
	probability: number;
	rows: number;
	cols: number;

	setUser: (user?: string) => void;
	setSeed: (seed?: string) => void;
	setDifficulty: (difficulty: string) => void;
	setRows: (rows: number) => void;
	setCols: (cols: number) => void;
}
