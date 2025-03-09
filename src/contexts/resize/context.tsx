import { createContext } from 'react';
import { ResizeContextProps } from '!/types/resize';

export const ResizeContext = createContext<ResizeContextProps | undefined>(
	undefined
);
