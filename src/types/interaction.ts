export type InteractionType = 'left' | 'right';

export interface InteractionContextProps {
	isClicked: boolean;
	isInteracting: InteractionType;
	isOverCol: number | undefined;
	isOverRow: number | undefined;

	setIsInteracting: (type: InteractionType) => void;
}
