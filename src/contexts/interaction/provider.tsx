import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { InteractionContext } from './context';

import { storageName } from '!/utils/misc';

import { InteractionType } from '!/types/interaction';

export const InteractionProvider = ({ children }: { children: ReactNode }) => {
	const [isClicked, setIsClicked] = useState(false);
	const [isInteracting, setIsInteracting] = useState<InteractionType>('left');
	const [isError, setIsError] = useState(false);
	const [isAuto, setIsAuto] = useState(true);
	const [showIntersections, setShowIntersections] = useState(true);
	const [isOverGrid, setIsOverGrid] = useState<boolean>(false);
	const [isOverCol, setIsOverCol] = useState<number | undefined>();
	const [isOverRow, setIsOverRow] = useState<number | undefined>();

	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const gatedSetIsAuto = useCallback((auto: boolean) => {
		setIsAuto(auto);
		localStorage.setItem(storageName('isAuto'), auto.toString());
	}, []);

	const gatedSetShowIntersections = useCallback((intersections: boolean) => {
		setShowIntersections(intersections);
		localStorage.setItem(
			storageName('showIntersections'),
			intersections.toString()
		);
	}, []);

	const gatedSetIsInteracting = useCallback((type: InteractionType) => {
		setIsInteracting(type);
	}, []);

	const gatedSetIsError = useCallback((error: boolean) => {
		setIsError(error);
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

	const handlePointerUp = useCallback(() => {
		setIsClicked(false);
	}, []);

	const handleContextMenu = (e: MouseEvent) => e.preventDefault();

	useEffect(() => {
		if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

		if (isError) {
			timeoutRef.current = setTimeout(() => setIsError(false), 500);
		}
		return () => {
			if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
		};
	}, [isError]);

	useEffect(() => {
		const isAuto = localStorage.getItem(storageName('isAuto')) ?? '';
		const showIntersections =
			localStorage.getItem(storageName('showIntersections')) ?? '';

		gatedSetIsAuto(
			['true', 'false'].includes(isAuto) ? isAuto === 'true' : true
		);
		gatedSetShowIntersections(
			['true', 'false'].includes(showIntersections)
				? showIntersections === 'true'
				: true
		);
	}, [gatedSetIsAuto, gatedSetShowIntersections]);

	useEffect(() => {
		document.addEventListener('pointerdown', handlePointerDown);
		document.addEventListener('pointerup', handlePointerUp);

		document.addEventListener('contextmenu', handleContextMenu);

		return () => {
			document.removeEventListener('pointerdown', handlePointerDown);
			document.removeEventListener('pointerup', handlePointerUp);

			document.removeEventListener('contextmenu', handleContextMenu);
		};
	}, [handlePointerDown, handlePointerUp]);

	return (
		<InteractionContext.Provider
			value={{
				isClicked,
				isAuto,
				showIntersections,
				isInteracting,
				isError,
				isOverGrid,
				isOverCol,
				isOverRow,

				setIsAuto: gatedSetIsAuto,
				setShowIntersections: gatedSetShowIntersections,
				setIsInteracting: gatedSetIsInteracting,
				setIsError: gatedSetIsError,
				setIsOverGrid: gatedSetIsOverGrid,
				setIsOverCol: gatedSetIsOverCol,
				setIsOverRow: gatedSetIsOverRow,
			}}>
			{children}
		</InteractionContext.Provider>
	);
};
