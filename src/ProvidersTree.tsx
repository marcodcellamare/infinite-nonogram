import { ReactNode, StrictMode } from 'react';
import { HashRouter } from 'react-router-dom';

import { FirebaseProvider } from './contexts/firebase';
import { ResizeProvider } from './contexts/resize';
import { SettingsProvider } from './contexts/settings/provider';
import { InteractionProvider } from '@/contexts/interaction';
import { ScaleProvider } from '@/contexts/scale';
import { EngineProvider } from '@/contexts/engine';
import { TimerProvider } from '@/contexts/timer/provider';
import { AudioProvider } from './contexts/audio';

const providers = [
	StrictMode,
	ResizeProvider,
	SettingsProvider,
	FirebaseProvider,
	HashRouter,
	ScaleProvider,
	AudioProvider,
	TimerProvider,
	InteractionProvider,
	EngineProvider,
];

const ProvidersTree = ({ children }: { children: ReactNode }) =>
	providers.reduceRight((acc, Provider) => {
		return <Provider>{acc}</Provider>;
	}, children);

export default ProvidersTree;
