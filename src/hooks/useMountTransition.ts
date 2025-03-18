import {
	TransitionEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useSettings } from '!/contexts/settings';

import { timeoutType } from '!/types/timer';

interface useMountTransitionReturn {
	isMounted: boolean;
	isTransitioning: boolean;

	handleTransitionEnd: (e: TransitionEvent<HTMLDivElement>) => void;
	setCondition: React.Dispatch<React.SetStateAction<boolean>>;
	setTransitioningDelay: (ms: number) => void;
	setIsMountedCallback: (fn: () => void) => void;
	setIsTransitioningCallback: (fn: () => void) => void;
	setIsUnmountingCallback: (fn: () => void) => void;
	setIsUnmountedCallback: (fn: () => void) => void;
}

const useMountTransition = (): useMountTransitionReturn => {
	const { showEffects } = useSettings();

	const [isMounted, setIsMounted] = useState(false);
	const [isUnmounting, setIsUnmounting] = useState(false);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [condition, setCondition] = useState(false);
	const [transitionDelay, setTransitioningDelay] = useState(10);

	const isMountedCallbackRef = useRef<() => void | null>(null);
	const isTransitioningCallbackRef = useRef<() => void | null>(null);
	const isUnmountingCallbackRef = useRef<() => void | null>(null);
	const isUnmountedCallbackRef = useRef<() => void | null>(null);
	const timeoutRef = useRef<timeoutType>(null);

	const setIsMountedCallback = useCallback(
		(fn: () => void) => (isMountedCallbackRef.current = fn),
		[]
	);
	const setIsTransitioningCallback = useCallback(
		(fn: () => void) => (isTransitioningCallbackRef.current = fn),
		[]
	);
	const setIsUnmountingCallback = useCallback(
		(fn: () => void) => (isUnmountingCallbackRef.current = fn),
		[]
	);
	const setIsUnmountedCallback = useCallback(
		(fn: () => void) => (isUnmountedCallbackRef.current = fn),
		[]
	);

	const memoizedSetTransitioningDelay = useCallback(setTransitioningDelay, [
		setTransitioningDelay,
	]);

	const handleTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
		if (e.target !== e.currentTarget) return;
		if (!isTransitioning) {
			setIsMounted(false);
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

		if (condition) {
			setIsUnmounting(false);
			setIsMounted(true);
			timeoutRef.current = setTimeout(
				() => setIsTransitioning(true),
				transitionDelay
			);
		} else {
			if (isMounted && isTransitioning) {
				setIsTransitioning(false);
				setIsUnmounting(true);
				if (!showEffects) setIsMounted(false);
			}
		}
		return () => cleanup();
	}, [condition, showEffects, transitionDelay, isMounted, isTransitioning]);

	useEffect(() => {
		if (isMounted) {
			isMountedCallbackRef.current?.();

			if (isTransitioning) {
				isTransitioningCallbackRef.current?.();
			} else if (isUnmounting) {
				isUnmountingCallbackRef.current?.();
			}
		} else {
			isUnmountedCallbackRef.current?.();
		}
	}, [isMounted, isTransitioning, isUnmounting]);

	return {
		isMounted,
		isTransitioning,

		handleTransitionEnd,
		setCondition,
		setTransitioningDelay: memoizedSetTransitioningDelay,
		setIsMountedCallback,
		setIsTransitioningCallback,
		setIsUnmountingCallback,
		setIsUnmountedCallback,
	};
};
export default useMountTransition;
