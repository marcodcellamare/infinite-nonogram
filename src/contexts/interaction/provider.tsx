import { ReactNode, useCallback, useEffect, useState } from 'react';
import { InteractionContext } from './context';

import { InteractionType } from '!/types/interaction';

export const InteractionProvider = ({ children }: { children: ReactNode }) => {
	const [isClicked, setIsClicked] = useState(false);
	const [isInteracting, setIsInteracting] = useState<InteractionType>('left');
	const [isAuto, setIsAuto] = useState(true);

	const gatedSetIsAuto = useCallback((auto: boolean) => {
		setIsAuto(auto);
	}, []);

	const interaction = useCallback((type: InteractionType) => {
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
							interaction('left');
							break;

						case 2:
							interaction('right');
					}
				}
			}
		},
		[interaction, isAuto]
	);

	const onPointerUp = useCallback(() => {
		setIsClicked(false);
	}, []);

	const onContextMenu = (e: MouseEvent) => e.preventDefault();

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
				interaction,
				setIsAuto: gatedSetIsAuto,
			}}>
			{children}
		</InteractionContext.Provider>
	);
};
