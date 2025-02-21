export type TimeUnit =
	| 'years'
	| 'months'
	| 'days'
	| 'hours'
	| 'minutes'
	| 'seconds';

export interface TimerContextProps {
	counter: Partial<Record<TimeUnit, number>>;
	start: () => void;
	stop: () => void;
}
