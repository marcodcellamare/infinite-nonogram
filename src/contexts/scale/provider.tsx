import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { ScaleContext } from './context';

import Config from '@config';

import { storageName } from '@/utils/misc';

import { TimeoutType } from '@/types/timer';

export const ScaleProvider = ({ children }: { children: ReactNode }) => {
	const [scale, setScale] = useState<number>(Config.game.scale.default);
	const [isScaling, setIsScaling] = useState(false);

	const timeoutRef = useRef<TimeoutType>(null);
	const storage = useRef({
		scale: Number(localStorage.getItem(storageName('scale'))),
	});

	const calculateScale = (scale: number) =>
		Math.round(
			Math.min(
				Config.game.scale.max,
				Math.max(Config.game.scale.min, scale)
			) * 1000
		) / 1000;

	const gatedSetScale = useCallback(
		(scale: number) => setScale(calculateScale(scale)),
		[]
	);

	const acc = useRef(0);

	const handleWheel = useCallback((e: WheelEvent) => {
		if (!e.shiftKey) return;

		e.preventDefault();
		acc.current += e.deltaY || e.deltaX;

		if (Math.abs(acc.current) >= 25) {
			setScale((prevScale) =>
				calculateScale(
					prevScale -
						Math.sign(e.deltaY || e.deltaX) *
							Config.game.scale.step *
							2
				)
			);
			acc.current = 0;
		}
	}, []);

	const handleTouchStart = (e: TouchEvent) => {
		if (e.touches.length === 2) {
			const [touch1, touch2] = e.touches;
			const startDistance = Math.hypot(
				touch2.pageX - touch1.pageX,
				touch2.pageY - touch1.pageY
			);

			const handleTouchMove = (eMove: TouchEvent) => {
				if (eMove.touches.length === 2) {
					const [moveTouch1, moveTouch2] = eMove.touches;
					const newDistance = Math.hypot(
						moveTouch2.pageX - moveTouch1.pageX,
						moveTouch2.pageY - moveTouch1.pageY
					);

					const zoomChange = (newDistance - startDistance) * 0.0005;

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

	const cleanup = () => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	useEffect(() => {
		cleanup();

		localStorage.setItem(storageName('scale'), scale.toString());
		document.documentElement.style.setProperty('--scale', scale.toString());

		setIsScaling(true);
		timeoutRef.current = setTimeout(() => setIsScaling(false), 200);

		return () => cleanup();
	}, [scale]);

	useEffect(() => {
		gatedSetScale(
			storage.current.scale && !isNaN(storage.current.scale)
				? storage.current.scale
				: Config.game.scale.default
		);
		document.addEventListener('wheel', handleWheel, { passive: false });
		document.addEventListener('touchstart', handleTouchStart, {
			passive: false,
		});

		return () => {
			document.removeEventListener('wheel', handleWheel);
			document.removeEventListener('touchstart', handleTouchStart);
		};
	}, [gatedSetScale, handleWheel]);

	return (
		<ScaleContext.Provider
			value={{
				scale,
				isScaling,
				setScale: gatedSetScale,
			}}>
			{children}
		</ScaleContext.Provider>
	);
};
