import { ReactNode, useCallback, useEffect, useState } from 'react';
import { MouseContext } from './context';

import { MouseClick } from '@interfaces/mouse';

export const MouseProvider = ({ children }: { children: ReactNode }) => {
	const [isMouseDown, setIsMouseDown] = useState<MouseClick>(false);

	const onMouseDown = useCallback((e: MouseEvent | React.MouseEvent) => {
		switch (e.button) {
			case 0:
				setIsMouseDown('left');
				break;

			case 1:
				setIsMouseDown('center');
				break;

			case 2:
				setIsMouseDown('right');
				break;

			default:
				setIsMouseDown(false);
		}
		e.preventDefault();
	}, []);

	const onMouseUp = useCallback(() => {
		setIsMouseDown(false);
	}, []);

	const onContextMenu = (e: MouseEvent) => e.preventDefault();

	useEffect(() => {
		document.addEventListener('mousedown', onMouseDown);
		document.addEventListener('mouseup', onMouseUp);
		document.addEventListener('contextmenu', onContextMenu);

		return () => {
			document.removeEventListener('mousedown', onMouseDown);
			document.removeEventListener('mouseup', onMouseUp);
			document.removeEventListener('contextmenu', onContextMenu);
		};
	}, [onMouseDown, onMouseUp]);

	return (
		<MouseContext.Provider value={{ isMouseDown, onMouseDown, onMouseUp }}>
			{children}
		</MouseContext.Provider>
	);
};
