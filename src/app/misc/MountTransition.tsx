import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

import { TimeoutType } from '!/types/timer';

type StatusType =
	| 'idle'
	| 'mounted'
	| 'entering'
	| 'done'
	| 'exiting'
	| 'unmounted';

interface TimeoutInterface {
	delay?: number;
	start?: number;
	entering?: number;
	exiting?: number;
}

interface MountTransitionProps {
	mountIf: boolean;
	timeout: number | TimeoutInterface;
	className?: string;
	unmountOnExit?: boolean;

	onMounted?: () => void;
	onEnter?: () => void;
	onEntering?: () => void;
	onDone?: () => void;
	onExiting?: () => void;
	onUnmounted?: () => void;

	children: (props: {
		className: string;
		status: StatusType;
		isEntering: boolean;
		isMounting: boolean;
	}) => ReactNode;
}

const MountTransition = ({
	mountIf,
	timeout,
	className: transitionClassName = '',
	unmountOnExit = true,

	onMounted,
	onEntering,
	onDone,
	onExiting,
	onUnmounted,

	children,
}: MountTransitionProps) => {
	const [isMounted, setIsMounted] = useState(mountIf);
	const [status, setStatus] = useState<StatusType>('idle');

	const timeoutDelayRef = useRef<TimeoutType>(null);
	const timeoutStartRef = useRef<TimeoutType>(null);
	const timeoutEnteringRef = useRef<TimeoutType>(null);
	const timeoutExitingRef = useRef<TimeoutType>(null);

	const timeoutDelay = useMemo(
		() =>
			typeof timeout === 'object' && timeout.delay ? timeout.delay : 0,
		[timeout]
	);
	const timeoutEntering = useMemo(
		() => (typeof timeout === 'object' ? timeout.entering ?? 0 : timeout),
		[timeout]
	);
	const timeoutExiting = useMemo(
		() => (typeof timeout === 'object' ? timeout.exiting ?? 0 : timeout),
		[timeout]
	);
	const timeoutStart = useMemo(
		() =>
			timeoutEntering > 0
				? typeof timeout === 'object' &&
				  timeout.start &&
				  timeout.start >= 50
					? timeout.start
					: 50
				: 0,
		[timeout, timeoutEntering]
	);

	const isEntering = useMemo(
		() => ['entering', 'done'].includes(status),
		[status]
	);

	const isMounting = useMemo(
		() => ['mounted', 'entering'].includes(status),
		[status]
	);

	const cleanup = () => {
		[
			timeoutDelayRef,
			timeoutStartRef,
			timeoutEnteringRef,
			timeoutExitingRef,
		].forEach((ref) => {
			if (ref.current !== null) {
				clearTimeout(ref.current);
				ref.current = null;
			}
		});
	};

	useEffect(() => {
		cleanup();

		if (mountIf) {
			timeoutDelayRef.current = setTimeout(() => {
				setIsMounted(true);
				setStatus('mounted');

				timeoutStartRef.current = setTimeout(() => {
					setStatus('entering');

					timeoutEnteringRef.current = setTimeout(
						() => setStatus('done'),
						timeoutEntering
					);
				}, timeoutStart);
			}, timeoutDelay);
		} else {
			setStatus('exiting');

			timeoutExitingRef.current = setTimeout(
				() => setStatus('unmounted'),
				timeoutExiting
			);
		}
		return () => cleanup();
	}, [
		mountIf,
		timeoutDelay,
		timeoutStart,
		timeoutEntering,
		timeoutExiting,
		unmountOnExit,
	]);

	useEffect(() => {
		switch (status) {
			case 'mounted':
				if (onMounted) onMounted();
				break;

			case 'entering':
				if (onEntering) onEntering();
				break;

			case 'done':
				if (onDone) onDone();
				break;

			case 'exiting':
				if (onExiting) onExiting();
				break;

			case 'unmounted':
				if (onUnmounted) onUnmounted();
				if (unmountOnExit) setIsMounted(false);
				setStatus('idle');
		}
	}, [
		status,
		onMounted,
		onEntering,
		onDone,
		onExiting,
		onUnmounted,
		unmountOnExit,
	]);

	if (!isMounted) return null;

	const className = classNames([
		`mount-transition-${status}`,
		{
			[`mount-transition ${transitionClassName}`]: isEntering,
		},
	]);

	return children({
		className,
		status,
		isEntering,
		isMounting,
	});
};
export default MountTransition;
