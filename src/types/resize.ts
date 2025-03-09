export interface ResizeContextProps {
	subscribe: (callback: () => void) => () => void;
}
