import { createContext } from 'react';
import { InteractionContextProps } from '@_types/interaction';

export const InteractionContext = createContext<
	InteractionContextProps | undefined
>(undefined);
