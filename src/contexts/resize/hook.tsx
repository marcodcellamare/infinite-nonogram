import { useContext, useEffect } from 'react';
import { ResizeContext } from './context';

export const useResize = (callback: () => void) => {
	const context = useContext(ResizeContext);

	useEffect(() => {
		if (!context) {
			throw new Error('useResize must be used within a ResizeProvider');
			return;
		}
		const unsubscribe = context.subscribe(callback);

		return () => unsubscribe();
	}, [context, callback]);
};
