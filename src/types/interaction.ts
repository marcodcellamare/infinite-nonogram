export type InteractionType = 'left' | 'right';

export interface InteractionContextProps {
	isClicked: boolean;
	isAuto: boolean;
	isInteracting: InteractionType;

	setIsAuto: (auto: boolean) => void;
	setIsInteracting: (type: InteractionType) => void;
}
