import { ReactNode, useCallback, useEffect, useState } from 'react';
import { InteractionContext } from './context';
import { useSettings } from '../settings';
import { useScale } from '../scale';

import { InteractionType } from '!/types/interaction';

export const InteractionProvider = ({ children }: { children: ReactNode }) => {
	const { isAuto, isDrawerShown, isRefreshing } = useSettings();
	const { isScaling } = useScale();

	const [isClicked, setIsClicked] = useState(false);
	const [isInteracting, setIsInteracting] = useState<InteractionType>('left');
	const [overCol, setOverCol] = useState<number | undefined>(undefined);
	const [overRow, setOverRow] = useState<number | undefined>(undefined);

	const isOnGame = useCallback(
		(target: HTMLElement) =>
			target.classList.contains('game-grid') ||
			target.classList.contains('game-grid-wrapper') ||
			target.classList.contains('game-grid-block'),
		[]
	);

	const memoizedSetIsInteracting = useCallback(setIsInteracting, [
		setIsInteracting,
	]);

	const handlePointerDown = useCallback(
		(e: PointerEvent) => {
			if (!isOnGame(e.target as HTMLElement) || isClicked || isScaling)
				return;

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
		[isAuto, isClicked, isScaling, isOnGame]
	);

	const handlePointerUp = useCallback(
		(e: PointerEvent) => {
			if (!isOnGame(e.target as HTMLElement)) return;

			setIsClicked(false);
		},
		[isOnGame]
	);

	const handleHover = useCallback(
		(target: HTMLElement, isOver: boolean) => {
			if (target.classList.contains('game-grid-block')) {
				if (!isScaling && isOver) {
					const row = Number(target.dataset.row);
					const col = Number(target.dataset.col);

					setOverCol(col);
					setOverRow(row);
				} else {
					setOverCol(undefined);
					setOverRow(undefined);
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

	useEffect(() => {
		setOverCol(undefined);
		setOverRow(undefined);
	}, [isRefreshing]);

	useEffect(() => {
		if (!isDrawerShown) {
			document.addEventListener('pointerdown', handlePointerDown);
			document.addEventListener('pointerup', handlePointerUp);
			document.addEventListener('pointercancel', handlePointerUp);

			document.addEventListener('pointerover', handlePointerOver);
			document.addEventListener('pointerout', handlePointerOut);
		}
		return () => {
			document.removeEventListener('pointerdown', handlePointerDown);
			document.removeEventListener('pointerup', handlePointerUp);
			document.removeEventListener('pointercancel', handlePointerUp);

			document.removeEventListener('pointerover', handlePointerOver);
			document.removeEventListener('pointerout', handlePointerOut);
		};
	}, [
		isDrawerShown,
		handlePointerDown,
		handlePointerUp,
		handlePointerOver,
		handlePointerOut,
	]);

	useEffect(() => {
		document.addEventListener('contextmenu', handleContextMenu);

		return () =>
			document.removeEventListener('contextmenu', handleContextMenu);
	}, []);

	return (
		<InteractionContext.Provider
			value={{
				isClicked,
				isInteracting,
				overCol,
				overRow,

				setIsInteracting: memoizedSetIsInteracting,
			}}>
			{children}
		</InteractionContext.Provider>
	);
};
