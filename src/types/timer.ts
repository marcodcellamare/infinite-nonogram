export type TimeUnit =
	| 'years'
	| 'months'
	| 'days'
	| 'hours'
	| 'minutes'
	| 'seconds';

export interface TimerContextProps {
	counter: Partial<Record<TimeUnit, number>>;
	blink: boolean;
	total: number;
	start: () => void;
	stop: () => void;
	reset: () => void;
}
