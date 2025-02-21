import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { TimerContext } from './context';
import { TimeUnit } from '@_types/timer';

export const TimerProvider = ({ children }: { children: ReactNode }) => {
	const [startDate, setStartDate] = useState<number | null>(null);
	const [counter, setCounter] = useState<Partial<Record<TimeUnit, number>>>(
		{}
	);
	const interval = useRef<ReturnType<typeof setInterval> | null>(null);
	const seconds = useRef<Record<TimeUnit, number>>({
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
		if (interval.current !== null) {
			clearInterval(interval.current);
		}
	}, []);

	const start = useCallback(() => {
		setStartDate(date());
	}, []);

	const update = useCallback(() => {
		if (startDate) {
			const counter: Partial<Record<TimeUnit, number>> = {};
			let dateDiff = Math.abs((date() - startDate) / 1000);

			Object.entries(seconds.current).forEach(([type, seconds]) => {
				counter[type as TimeUnit] = Math.floor(dateDiff / seconds);
				dateDiff -= (counter[type as TimeUnit] ?? 0) * seconds;
			});
			setCounter(counter);
		}
	}, [startDate]);

	const timer = useCallback(() => {
		stop();
		update();
		interval.current = setInterval(update, 1000);
	}, [update, stop]);

	useEffect(() => {
		timer();
	}, [timer]);

	useEffect(() => {
		return () => stop();
	}, [start, stop]);

	return (
		<TimerContext.Provider
			value={{
				counter,
				start,
				stop,
			}}>
			{children}
		</TimerContext.Provider>
	);
};
