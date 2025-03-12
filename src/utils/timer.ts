import { TimeUnit } from '!/types/timer';

const secondsUnits = <Record<TimeUnit, number>>{
	years: 60 * 60 * 24 * 365,
	months: 60 * 60 * 24 * 30,
	days: 60 * 60 * 24,
	hours: 60 * 60,
	minutes: 60,
	seconds: 1,
};

export const date = () => new Date();
export const dateMs = () => date().getTime();

export const secondsToTimer = (
	ms: number
): Partial<Record<TimeUnit, number>> => {
	const timer: Partial<Record<TimeUnit, number>> = {};

	let dateDiff = Math.abs((dateMs() - ms) / 1000);

	Object.entries(secondsUnits).forEach(([type, seconds]) => {
		timer[type as TimeUnit] = Math.floor(dateDiff / seconds);
		dateDiff -= (timer[type as TimeUnit] ?? 0) * seconds;
	});

	Object.entries(timer).some(([type, count]) => {
		if (count === 0 && !['seconds'].includes(type)) {
			delete timer[type as TimeUnit];
		} else {
			return true;
		}
	});
	return timer;
};
