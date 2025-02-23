import { createContext } from 'react';
import { EngineContextProps } from '!/types/engine';

export const EngineContext = createContext<EngineContextProps | undefined>(
	undefined
);
