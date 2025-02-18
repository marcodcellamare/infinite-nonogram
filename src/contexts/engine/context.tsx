import { createContext } from 'react';
import { Engine } from '@_types/engine';

export const EngineContext = createContext<Engine | undefined>(undefined);
