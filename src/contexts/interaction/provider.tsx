import { ReactNode, useCallback, useEffect, useState } from 'react';
import { InteractionContext } from './context';
import { useSettings } from '../settings';
import { useScale } from '../scale';

import { InteractionType } from '!/types/interaction';

export const InteractionProvider = ({ children }: { children: ReactNode }) => {
	const { isAuto } = useSettings();
	const { isScaling } = useScale();

	const [isClicked, setIsClicked] = useState(false);
	const [isInteracting, setIsInteracting] = useState<InteractionType>('left');
	const [isOverCol, setIsOverCol] = useState<number | undefined>(undefined);
	const [isOverRow, setIsOverRow] = useState<number | undefined>(undefined);

	const memoizedSetIsInteracting = useCallback(setIsInteracting, [
		setIsInteracting,
	]);

	const handlePointerDown = useCallback(
		(e: PointerEvent) => {
			if (isClicked || isScaling) return;

			setIsClicked(true);

			if (isAuto && e.pointerType === 'mouse') {
				switch (e.button) {
					case 0:
						setIsInteracting('left');
						break;

					case 2:
						setIsInteracting('right');
				}
			}
		},
		[isAuto, isClicked, isScaling]
	);

	const handlePointerUp = () => setIsClicked(false);

	const handleHover = useCallback(
		(target: HTMLElement, isOver: boolean) => {
			if (target.classList.contains('game-grid-block')) {
				if (!isScaling && isOver) {
					const row = Number(target.dataset.row);
					const col = Number(target.dataset.col);

					setIsOverCol(col);
					setIsOverRow(row);
				} else {
					setIsOverCol(undefined);
					setIsOverRow(undefined);
				}
			}
		},
		[isScaling]
	);

	const handlePointerOver = useCallback(
		(e: PointerEvent) => handleHover(e.target as HTMLElement, true),
		[handleHover]
	);

	const handlePointerOut = useCallback(
		(e: PointerEvent) => handleHover(e.target as HTMLElement, false),
		[handleHover]
	);

	const handleContextMenu = (e: MouseEvent) => e.preventDefault();

	const cleanup = useCallback(() => {
		document.removeEventListener('pointerdown', handlePointerDown);
		document.removeEventListener('pointerup', handlePointerUp);
		document.removeEventListener('pointercancel', handlePointerUp);

		document.removeEventListener('pointerover', handlePointerOver);
		document.removeEventListener('pointerout', handlePointerOut);

		document.removeEventListener('contextmenu', handleContextMenu);
	}, [handlePointerDown, handlePointerOver, handlePointerOut]);

	useEffect(() => {
		cleanup();

		document.addEventListener('pointerdown', handlePointerDown);
		document.addEventListener('pointerup', handlePointerUp);
		document.addEventListener('pointercancel', handlePointerUp);

		document.addEventListener('pointerover', handlePointerOver);
		document.addEventListener('pointerout', handlePointerOut);

		document.addEventListener('contextmenu', handleContextMenu);

		return () => cleanup();
	}, [handlePointerDown, cleanup, handlePointerOver, handlePointerOut]);

	return (
		<InteractionContext.Provider
			value={{
				isClicked,
				isInteracting,
				isOverCol,
				isOverRow,

				setIsInteracting: memoizedSetIsInteracting,
			}}>
			{children}
		</InteractionContext.Provider>
	);
};
