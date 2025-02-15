import { createContext } from 'react';
import { Mouse } from '@interfaces/mouse';

export const MouseContext = createContext<Mouse | undefined>(undefined);
