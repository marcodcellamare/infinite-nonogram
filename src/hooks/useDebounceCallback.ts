import { useEffect, useRef, useCallback } from 'react';

export const useDebounceCallback = <T extends (...args: any[]) => void>(
	callback: T,
	delay: number
) => {
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const debounced = useCallback(
		(...args: Parameters<T>) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay]
	);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return debounced;
};
