import { createContext } from 'react';
import { TimerContextProps } from '@_types/timer';

export const TimerContext = createContext<TimerContextProps | undefined>(
	undefined
);
