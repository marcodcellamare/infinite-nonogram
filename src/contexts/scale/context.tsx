import { createContext } from 'react';
import { ScaleContextProps } from '!/types/scale';

export const ScaleContext = createContext<ScaleContextProps | undefined>(
	undefined
);
