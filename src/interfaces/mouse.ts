export type MouseClick = 'left' | 'center' | 'right' | false;

export interface Mouse {
	isMouseDown: MouseClick;
	isMouseUp: boolean;
}
