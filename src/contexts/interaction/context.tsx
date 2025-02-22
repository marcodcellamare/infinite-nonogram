import { createContext } from 'react';
import { InteractionContextProps } from '!/types/interaction';

export const InteractionContext = createContext<
	InteractionContextProps | undefined
>(undefined);
