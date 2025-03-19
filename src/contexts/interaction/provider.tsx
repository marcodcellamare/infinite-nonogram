import { ReactNode, useCallback, useEffect, useState } from 'react';
import { InteractionContext } from './context';
import { useSettings } from '../settings';

import { InteractionType } from '!/types/interaction';

export const InteractionProvider = ({ children }: { children: ReactNode }) => {
	const { showIntersections, isAuto } = useSettings();

	const [isClicked, setIsClicked] = useState(false);
	const [isInteracting, setIsInteracting] = useState<InteractionType>('left');
	const [isOverGrid, setIsOverGrid] = useState<boolean>(false);
	const [isOverCol, setIsOverCol] = useState<number | undefined>();
	const [isOverRow, setIsOverRow] = useState<number | undefined>();

	const gatedSetIsInteracting = useCallback((type: InteractionType) => {
		setIsInteracting(type);
	}, []);

	const gatedSetIsOverGrid = useCallback(
		(isOver: boolean) => {
			setIsOverGrid(showIntersections ? isOver : false);

			if (!showIntersections || !isOver) {
				setIsOverCol(undefined);
				setIsOverRow(undefined);
			}
		},
		[showIntersections]
	);

	const gatedSetIsOverCol = useCallback(
		(col?: number) => {
			setIsOverCol(isOverGrid ? col : undefined);
		},
		[isOverGrid]
	);

	const gatedSetIsOverRow = useCallback(
		(row?: number) => {
			setIsOverRow(isOverGrid ? row : undefined);
		},
		[isOverGrid]
	);

	const handlePointerDown = useCallback(
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

	const handlePointerUp = () => {
		setIsClicked(false);
	};

	const handleContextMenu = (e: MouseEvent) => e.preventDefault();

	const cleanup = useCallback(() => {
		document.removeEventListener('pointerdown', handlePointerDown);
		document.removeEventListener('pointerup', handlePointerUp);
		document.removeEventListener('contextmenu', handleContextMenu);
	}, [handlePointerDown]);

	useEffect(() => {
		cleanup();

		document.addEventListener('pointerdown', handlePointerDown);
		document.addEventListener('pointerup', handlePointerUp);
		document.addEventListener('contextmenu', handleContextMenu);

		return () => cleanup();
	}, [handlePointerDown, cleanup]);

	return (
		<InteractionContext.Provider
			value={{
				isClicked,
				isInteracting,
				isOverGrid,
				isOverCol,
				isOverRow,

				setIsInteracting: gatedSetIsInteracting,
				setIsOverGrid: gatedSetIsOverGrid,
				setIsOverCol: gatedSetIsOverCol,
				setIsOverRow: gatedSetIsOverRow,
			}}>
			{children}
		</InteractionContext.Provider>
	);
};
