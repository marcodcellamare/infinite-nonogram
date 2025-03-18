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
	setIsMountedCallback: (fn: () => void) => void;
	setIsUnmountingCallback: (fn: () => void) => void;
	setIsUnmountedCallback: (fn: () => void) => void;
}

const useMountTransition = (): useMountTransitionReturn => {
	const { showEffects } = useSettings();

	const [isMounted, setIsMounted] = useState(false);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [condition, setCondition] = useState(false);

	const isMountedCallbackRef = useRef<() => void | null>(null);
	const isUnmountingCallbackRef = useRef<() => void | null>(null);
	const isUnmountedCallbackRef = useRef<() => void | null>(null);
	const timeoutRef = useRef<timeoutType>(null);

	const setIsMountedCallback = useCallback(
		(fn: () => void) => (isMountedCallbackRef.current = fn),
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
			setIsMounted(true);
			timeoutRef.current = setTimeout(() => setIsTransitioning(true), 10);
		} else {
			setIsTransitioning(false);
			if (!showEffects) setIsMounted(false);
		}
		return () => cleanup();
	}, [condition, showEffects]);

	useEffect(() => {
		if (isMounted) isMountedCallbackRef.current?.();
		if (isMounted && !isTransitioning) isUnmountingCallbackRef.current?.();
		if (!isMounted) isUnmountedCallbackRef.current?.();
	}, [isMounted, isTransitioning]);

	return {
		isMounted,
		isTransitioning,
		handleTransitionEnd,

		setCondition,
		setIsMountedCallback,
		setIsUnmountingCallback,
		setIsUnmountedCallback,
	};
};
export default useMountTransition;
