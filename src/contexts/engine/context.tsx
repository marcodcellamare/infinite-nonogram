import { createContext } from 'react';
import { Engine } from '@interfaces/engine';

export const EngineContext = createContext<Engine | undefined>(undefined);
