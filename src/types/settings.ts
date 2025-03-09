export type DifficultyTypes = 'easy' | 'medium' | 'hard';
export type RGB = [number, number, number];

export interface SettingsContextProps {
	isRefreshing: boolean;
	isGlobalError: boolean;
	user: string;
	seed: string;
	difficulty: DifficultyTypes;
	probability: number;
	rows: number;
	cols: number;
	isAuto: boolean;
	showIntersections: boolean;
	showEffects: boolean;

	setIsGlobalError: (error: boolean) => void;
	setUser: (user?: string) => void;
	setSeed: (seed?: string) => void;
	setDifficulty: (difficulty: string) => void;
	setRows: (rows: number) => void;
	setCols: (cols: number) => void;
	setIsAuto: (auto: boolean) => void;
	setShowIntersections: (intersections: boolean) => void;
	setShowEffects: (effects: boolean) => void;
}
