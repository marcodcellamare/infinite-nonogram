import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { TimerContext } from './context';
import { dateMs, secondsToTimer } from '!/utils/timer';

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
		setStartDate(dateMs());
	}, [reset]);

	const update = useCallback(() => {
		if (startDate) setCounter(secondsToTimer(startDate));
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
