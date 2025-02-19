export type InteractionType = 'left' | 'right';

export interface InteractionContextProps {
	isClicked: boolean;
	isAuto: boolean;
	isInteracting: InteractionType;
	interaction: (type: InteractionType) => void;
	setIsAuto: (auto: boolean) => void;
}
