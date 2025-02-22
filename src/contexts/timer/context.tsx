import { createContext } from 'react';
import { TimerContextProps } from '!/types/timer';

export const TimerContext = createContext<TimerContextProps | undefined>(
	undefined
);
