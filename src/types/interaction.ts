export type InteractionType = 'left' | 'right';

export interface InteractionContextProps {
	isClicked: boolean;
	isAuto: boolean;
	showIntersections: boolean;
	isInteracting: InteractionType;
	isError: boolean;
	isOverGrid: boolean;
	isOverCol: number | undefined;
	isOverRow: number | undefined;

	setIsAuto: (auto: boolean) => void;
	setShowIntersections: (intersections: boolean) => void;
	setIsInteracting: (type: InteractionType) => void;
	setIsError: (error: boolean) => void;
	setIsOverGrid: (isOver: boolean) => void;
	setIsOverCol: (col?: number) => void;
	setIsOverRow: (row?: number) => void;
}
