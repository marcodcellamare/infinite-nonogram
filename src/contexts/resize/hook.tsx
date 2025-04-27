import { useContext, useEffect, useRef } from 'react';
import { ResizeContext } from './context';

export const useResize = (callback?: () => void) => {
	const context = useContext(ResizeContext);
	const callbackRunRef = useRef(false);

	if (!context) {
		throw new Error('useResize must be used within a ResizeProvider');
	}

	useEffect(() => {
		if (!callback) return;
		if (!callbackRunRef.current) {
			callback();
			callbackRunRef.current = true;
		}
		const unsubscribe = context.subscribe(callback);

		return () => unsubscribe();
	}, [context, callback]);

	return {
		width: context.width,
		height: context.height,
	};
};
