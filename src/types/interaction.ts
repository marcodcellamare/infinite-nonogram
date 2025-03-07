export type InteractionType = 'left' | 'right';

export interface InteractionContextProps {
	isClicked: boolean;
	isInteracting: InteractionType;
	isOverGrid: boolean;
	isOverCol: number | undefined;
	isOverRow: number | undefined;

	setIsInteracting: (type: InteractionType) => void;
	setIsOverGrid: (isOver: boolean) => void;
	setIsOverCol: (col?: number) => void;
	setIsOverRow: (row?: number) => void;
}
