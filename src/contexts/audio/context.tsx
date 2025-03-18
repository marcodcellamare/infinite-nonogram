import { createContext } from 'react';
import { AudioContextProps } from '!/types/audio';

export const AudioContext = createContext<AudioContextProps | undefined>(
	undefined
);
