export interface ResizeContextProps {
	width: number;
	height: number;
	subscribe: (callback: () => void) => () => void;
}
