import { ReactNode, useEffect, useRef } from 'react';
import { ResizeContext } from './context';

export const ResizeProvider = ({ children }: { children: ReactNode }) => {
	const listeners = useRef<Set<() => void>>(new Set());

	const subscribe = (callback: () => void) => {
		listeners.current.add(callback);

		return () => listeners.current.delete(callback);
	};

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		const handleResize = () => {
			clearTimeout(timeout);

			timeout = setTimeout(
				() => listeners.current.forEach((callback) => callback()),
				200
			);
		};
		window.addEventListener('resize', handleResize);
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<ResizeContext.Provider
			value={{
				subscribe,
			}}>
			{children}
		</ResizeContext.Provider>
	);
};
