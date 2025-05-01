import { useCallback, useEffect, useRef } from 'react';

const useThrottleCallback = <T extends (...args: any[]) => void>(
	callback: T,
	delay: number
) => {
	const lastCallRef = useRef<number>(0);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const throttled = useCallback(
		(...args: Parameters<T>) => {
			const now = Date.now();
			const timeSinceLastCall = now - lastCallRef.current;

			if (timeSinceLastCall >= delay) {
				lastCallRef.current = now;
				callback(...args);
			} else if (!timeoutRef.current) {
				timeoutRef.current = setTimeout(() => {
					lastCallRef.current = Date.now();
					timeoutRef.current = null;
					callback(...args);
				}, delay - timeSinceLastCall);
			}
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

	return throttled;
};
export default useThrottleCallback;
