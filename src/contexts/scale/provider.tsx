import { ReactNode, useCallback, useEffect, useState } from 'react';
import { ScaleContext } from './context';

import Config from '!config';

import { storageName } from '!/utils/misc';

export const ScaleProvider = ({ children }: { children: ReactNode }) => {
	const [scale, setScale] = useState(Config.game.scale.default);

	const gatedSetScale = useCallback((scale: number) => {
		if (scale < Config.game.scale.min) scale = Config.game.scale.min;
		if (scale > Config.game.scale.max) scale = Config.game.scale.max;

		setScale(scale);
		localStorage.setItem(storageName('scale'), scale.toString());
	}, []);

	const handleWheel = (e: WheelEvent) => {
		if (e.shiftKey) {
			e.preventDefault();

			setScale((prevScale) =>
				Math.min(
					Config.game.scale.max,
					Math.max(
						Config.game.scale.min,
						prevScale - Math.sign(e.deltaY) * Config.game.scale.step
					)
				)
			);
		}
	};

	// TODO

	const handleTouchStart = () => {
		/*
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
			*/
	};

	useEffect(() => {
		const scale = localStorage.getItem(storageName('scale'));

		gatedSetScale(
			scale && !isNaN(Number(scale))
				? Number(scale)
				: Config.game.scale.default
		);
	}, [gatedSetScale]);

	useEffect(() => {
		document.addEventListener('wheel', handleWheel, { passive: false });
		document.addEventListener('touchstart', handleTouchStart, {
			passive: false,
		});

		return () => {
			document.removeEventListener('wheel', handleWheel);
			document.removeEventListener('touchstart', handleTouchStart);
		};
	}, []);

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
