import { createContext } from 'react';
import { ScaleContextProps } from '@_types/scale';

export const ScaleContext = createContext<ScaleContextProps | undefined>(
	undefined
);
