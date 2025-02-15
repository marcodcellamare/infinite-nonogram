import { ReactNode, useEffect, useState } from 'react';
import { MouseContext } from './context';

import { MouseClick } from '@interfaces/mouse';

export const MouseProvider = ({ children }: { children: ReactNode }) => {
	const [isMouseDown, setIsMouseDown] = useState<MouseClick>(false);
	const [isMouseUp, setIsMouseUp] = useState<boolean>(true);

	const onMouseDown = (e: MouseEvent) => {
		setIsMouseUp(false);

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
	};

	const onMouseUp = () => {
		setIsMouseUp(true);
	};

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
	}, []);

	return (
		<MouseContext.Provider value={{ isMouseDown, isMouseUp }}>
			{children}
		</MouseContext.Provider>
	);
};
