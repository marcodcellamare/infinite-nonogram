import { ReactNode, useCallback, useEffect, useState } from 'react';
import { InteractionContext } from './context';

import { storageName } from '!/utils/misc';

import { InteractionType } from '!/types/interaction';

export const InteractionProvider = ({ children }: { children: ReactNode }) => {
	const [isClicked, setIsClicked] = useState(false);
	const [isInteracting, setIsInteracting] = useState<InteractionType>('left');
	const [isAuto, setIsAuto] = useState(true);

	const gatedSetIsAuto = useCallback((auto: boolean) => {
		setIsAuto(auto);
		localStorage.setItem(storageName('isAuto'), auto.toString());
	}, []);

	const gatedSetIsInteracting = useCallback((type: InteractionType) => {
		setIsInteracting(type);
	}, []);

	const onPointerDown = useCallback(
		(e: PointerEvent) => {
			setIsClicked(true);

			if (isAuto) {
				if (e.pointerType === 'mouse') {
					switch (e.button) {
						default:
						case 0:
							setIsInteracting('left');
							break;

						case 2:
							setIsInteracting('right');
					}
				}
			}
		},
		[isAuto]
	);

	const onPointerUp = useCallback(() => {
		setIsClicked(false);
	}, []);

	const onContextMenu = (e: MouseEvent) => e.preventDefault();

	useEffect(() => {
		const isAuto = localStorage.getItem(storageName('isAuto')) ?? '';

		gatedSetIsAuto(
			['true', 'false'].includes(isAuto) ? isAuto === 'true' : true
		);
	}, [gatedSetIsAuto]);

	useEffect(() => {
		document.addEventListener('pointerdown', onPointerDown);
		document.addEventListener('pointerup', onPointerUp);

		document.addEventListener('contextmenu', onContextMenu);

		return () => {
			document.removeEventListener('pointerdown', onPointerDown);
			document.removeEventListener('pointerup', onPointerUp);

			document.removeEventListener('contextmenu', onContextMenu);
		};
	}, [onPointerDown, onPointerUp]);

	return (
		<InteractionContext.Provider
			value={{
				isClicked,
				isAuto,
				isInteracting,

				setIsAuto: gatedSetIsAuto,
				setIsInteracting: gatedSetIsInteracting,
			}}>
			{children}
		</InteractionContext.Provider>
	);
};
