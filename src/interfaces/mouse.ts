import React from 'react';

export type MouseClick = 'left' | 'center' | 'right' | false;

export interface Mouse {
	isMouseDown: MouseClick;
	onMouseDown: (e: MouseEvent | React.MouseEvent) => void;
	onMouseUp: () => void;
}
