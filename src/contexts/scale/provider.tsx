import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { ScaleContext } from './context';

import Config from '!config';

import { storageName } from '!/utils/misc';

export const ScaleProvider = ({ children }: { children: ReactNode }) => {
	const [scale, setScale] = useState<number>(Config.game.scale.default);

	const storage = useRef({
		scale: Number(localStorage.getItem(storageName('scale'))),
	});

	const calculateScale = useCallback(
		(scale: number) =>
			Math.round(
				Math.min(
					Config.game.scale.max,
					Math.max(Config.game.scale.min, scale)
				) * 1000
			) / 1000,
		[]
	);

	const gatedSetScale = useCallback(
		(scale: number) => {
			setScale(calculateScale(scale));
		},
		[calculateScale]
	);

	const handleWheel = useCallback(
		(e: WheelEvent) => {
			if (e.shiftKey) {
				e.preventDefault();

				setScale((prevScale) =>
					calculateScale(
						prevScale -
							Math.sign(e.deltaY || e.deltaX) *
								Config.game.scale.step
					)
				);
			}
		},
		[calculateScale]
	);

	// TODO to handle the pinch and zoom
	/*
	const handleTouchStart = () => {
		
		event: TouchEvent
		
		if (event.touches.length === 2) {
			const [touch1, touch2] = event.touches;
			const startDistance = Math.hypot(
				touch2.pageX - touch1.pageX,
				touch2.pageY - touch1.pageY
			);

			const handleTouchMove = (moveEvent: TouchEvent) => {
				if (moveEvent.touches.length === 2) {
					const [moveTouch1, moveTouch2] = moveEvent.touches;
					const newDistance = Math.hypot(
						moveTouch2.pageX - moveTouch1.pageX,
						moveTouch2.pageY - moveTouch1.pageY
					);

					const zoomChange = (newDistance - startDistance) * 0.005; // Adjust sensitivity

					setScale((prevScale) =>
						Math.min(
							Config.game.scale.max,
							Math.max(
								Config.game.scale.min,
								prevScale + zoomChange
							)
						)
					);
				}
			};

			const handleTouchEnd = () => {
				document.removeEventListener('touchmove', handleTouchMove);
				document.removeEventListener('touchend', handleTouchEnd);
			};

			document.addEventListener('touchmove', handleTouchMove, {
				passive: false,
			});
			document.addEventListener('touchend', handleTouchEnd);
		}
			
	};
	*/

	const cleanup = useCallback(() => {
		document.removeEventListener('wheel', handleWheel);
		//document.removeEventListener('touchstart', handleTouchStart);
	}, [handleWheel]);

	useEffect(() => {
		localStorage.setItem(storageName('scale'), scale.toString());
		document.documentElement.style.setProperty('--scale', scale.toString());
	}, [scale]);

	useEffect(() => {
		cleanup();

		gatedSetScale(
			storage.current.scale && !isNaN(storage.current.scale)
				? storage.current.scale
				: Config.game.scale.default
		);
		document.addEventListener('wheel', handleWheel, { passive: false });
		/*
		document.addEventListener('touchstart', handleTouchStart, {
			passive: false,
		});
		*/

		return () => cleanup();
	}, [gatedSetScale, handleWheel, cleanup]);

	return (
		<ScaleContext.Provider
			value={{
				scale,
				setScale: gatedSetScale,
			}}>
			{children}
		</ScaleContext.Provider>
	);
};
