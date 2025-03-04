import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { TimerContext } from './context';

import { TimeUnit } from '!/types/timer';

export const TimerProvider = ({ children }: { children: ReactNode }) => {
	const [startDate, setStartDate] = useState<number | null>(null);
	const [counter, setCounter] = useState<Partial<Record<TimeUnit, number>>>(
		{}
	);
	const [blink, setBlink] = useState(true);
	const [total, setTotal] = useState(0);

	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const intervalBlinkRef = useRef<ReturnType<typeof setInterval> | null>(
		null
	);

	const secondsRef = useRef<Record<TimeUnit, number>>({
		years: 60 * 60 * 24 * 365,
		months: 60 * 60 * 24 * 30,
		days: 60 * 60 * 24,
		hours: 60 * 60,
		minutes: 60,
		seconds: 1,
	});

	const date = () => {
		return new Date().getTime();
	};

	const stop = useCallback(() => {
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
		}
		if (intervalBlinkRef.current !== null) {
			clearInterval(intervalBlinkRef.current);
		}
		setBlink(true);
	}, []);

	const reset = useCallback(() => {
		stop();
		setStartDate(null);
		setCounter({
			seconds: 0,
		});
		setBlink(true);
		setTotal(0);
	}, [stop]);

	const start = useCallback(() => {
		reset();
		setStartDate(date());
	}, [reset]);

	const update = useCallback(() => {
		if (startDate) {
			const counter: Partial<Record<TimeUnit, number>> = {};
			let dateDiff = Math.abs((date() - startDate) / 1000);

			setTotal(dateDiff);

			Object.entries(secondsRef.current).forEach(([type, seconds]) => {
				counter[type as TimeUnit] = Math.floor(dateDiff / seconds);
				dateDiff -= (counter[type as TimeUnit] ?? 0) * seconds;
			});

			Object.entries(counter).some(([type, count]) => {
				if (count === 0 && !['seconds'].includes(type)) {
					delete counter[type as TimeUnit];
				} else {
					return true;
				}
			});
			setCounter(counter);
		}
	}, [startDate]);

	const timer = useCallback(() => {
		stop();
		update();
		intervalRef.current = setInterval(update, 1000);

		if (startDate) {
			intervalBlinkRef.current = setInterval(
				() => setBlink((prevBlink) => !prevBlink),
				500
			);
		}
	}, [update, stop, startDate]);

	useEffect(() => {
		timer();
	}, [timer]);

	useEffect(() => {
		reset();
		return () => stop();
	}, [reset, stop]);

	return (
		<TimerContext.Provider
			value={{
				counter,
				blink,
				total,
				start,
				stop,
				reset,
			}}>
			{children}
		</TimerContext.Provider>
	);
};
