export type InteractionType = 'left' | 'right';

export interface InteractionContextProps {
	isClicked: boolean;
	isInteracting: InteractionType;
	interaction: (type: InteractionType) => void;
}
