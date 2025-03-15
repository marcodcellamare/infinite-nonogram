import { TimeUnit, TimeUnits } from '!/types/timer';

const unitsInSeconds = <Record<TimeUnit, number>>{
	years: 60 * 60 * 24 * 365,
	months: 60 * 60 * 24 * 30,
	days: 60 * 60 * 24,
	hours: 60 * 60,
	minutes: 60,
	seconds: 1,
};

export const date = () => new Date();
export const dateMs = () => date().getTime();

export const msToTimeUnits = (ms: number): TimeUnits => {
	const timer: TimeUnits = {};

	let foundNonZero = false;
	let dateDiff = Math.abs(ms / 1000);

	Object.entries(unitsInSeconds).forEach(([unit, seconds]) => {
		timer[unit as TimeUnit] = Math.floor(dateDiff / seconds);
		dateDiff -= (timer[unit as TimeUnit] ?? 0) * seconds;
	});

	return Object.fromEntries(
		Object.entries(timer).filter(([unit, value]) => {
			if (foundNonZero || unit === 'seconds') return true;
			if (value !== 0) foundNonZero = true;
			return foundNonZero;
		})
	);
};
