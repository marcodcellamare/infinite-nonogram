import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { InteractionContext } from './context';
import { useSettings } from '../settings';
import { useScale } from '../scale';

import { InteractionType } from '!/types/interaction';

export const InteractionProvider = ({ children }: { children: ReactNode }) => {
	const { isAuto, setIsAuto, isDrawerShown } = useSettings();
	const { isScaling } = useScale();

	const [isClicked, setIsClicked] = useState(false);
	const [isInteracting, setIsInteracting] = useState<InteractionType>('left');
	const [isOverCol, setIsOverCol] = useState<number | undefined>(undefined);
	const [isOverRow, setIsOverRow] = useState<number | undefined>(undefined);

	const spacePressed = useRef(false);

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

			console.log('handlePointerDown');

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

			console.log('handlePointerUp');
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

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.code === 'Space') {
				if (!spacePressed.current) {
					spacePressed.current = true;

					setIsAuto(false);
					setIsInteracting((prevIsInteracting) =>
						prevIsInteracting !== 'left' ? 'left' : 'right'
					);
				}
				e.preventDefault();
			}
		},
		[setIsAuto]
	);

	const handleKeyUp = (e: KeyboardEvent) => {
		if (e.code === 'Space') {
			spacePressed.current = false;
		}
	};

	useEffect(() => {
		if (!isDrawerShown) {
			document.addEventListener('pointerdown', handlePointerDown);
			document.addEventListener('pointerup', handlePointerUp);
			document.addEventListener('pointercancel', handlePointerUp);

			document.addEventListener('pointerover', handlePointerOver);
			document.addEventListener('pointerout', handlePointerOut);

			window.addEventListener('keydown', handleKeyDown);
			window.addEventListener('keyup', handleKeyUp);
		}
		return () => {
			document.removeEventListener('pointerdown', handlePointerDown);
			document.removeEventListener('pointerup', handlePointerUp);
			document.removeEventListener('pointercancel', handlePointerUp);

			document.removeEventListener('pointerover', handlePointerOver);
			document.removeEventListener('pointerout', handlePointerOut);

			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, [
		isDrawerShown,
		handlePointerDown,
		handlePointerUp,
		handlePointerOver,
		handlePointerOut,
		handleKeyDown,
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
				isOverCol,
				isOverRow,

				setIsInteracting: memoizedSetIsInteracting,
			}}>
			{children}
		</InteractionContext.Provider>
	);
};
