export type timeoutType = ReturnType<typeof setTimeout> | null;
export type intervalType = ReturnType<typeof setInterval> | null;

export type TimeUnit =
	| 'years'
	| 'months'
	| 'days'
	| 'hours'
	| 'minutes'
	| 'seconds';

export type TimeUnits = Partial<Record<TimeUnit, number>>;

export interface TimerContextProps {
	ms: number;
	timeUnits: TimeUnits;
	blink: boolean;

	start: () => void;
	stop: () => void;
	reset: () => void;
}
