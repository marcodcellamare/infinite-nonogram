import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { TimerContext } from './context';
import { dateMs, msToTimeUnits } from '!/utils/timer';

import { TimeUnits } from '!/types/timer';

export const TimerProvider = ({ children }: { children: ReactNode }) => {
	const [startDate, setStartDate] = useState<number | null>(null);
	const [ms, setMs] = useState(0);
	const [timeUnits, setTimeUnits] = useState<TimeUnits>({});
	const [blink, setBlink] = useState(true);

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
		setMs(0);
		setTimeUnits({
			seconds: 0,
		});
		setBlink(true);
	}, [stop]);

	const start = useCallback(() => {
		reset();
		setStartDate(dateMs());
	}, [reset]);

	const update = useCallback(() => {
		if (startDate) {
			setMs(Math.abs(dateMs() - startDate));
			setTimeUnits(msToTimeUnits(dateMs() - startDate));
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
				ms,
				timeUnits,
				blink,

				start,
				stop,
				reset,
			}}>
			{children}
		</TimerContext.Provider>
	);
};
