import { createContext } from 'react';
import { Engine } from '!/types/engine';

export const EngineContext = createContext<Engine | undefined>(undefined);
