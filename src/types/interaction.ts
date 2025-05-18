export type InteractionType = 'left' | 'right';

export interface InteractionContextProps {
	isClicked: boolean;
	isInteracting: InteractionType;
	overCol: number | undefined;
	overRow: number | undefined;

	setIsInteracting: (type: InteractionType) => void;
}
