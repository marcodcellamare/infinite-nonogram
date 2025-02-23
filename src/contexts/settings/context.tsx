import { createContext } from 'react';
import { SettingsContextProps } from '!/types/settings';

export const SettingsContext = createContext<SettingsContextProps | undefined>(
	undefined
);
