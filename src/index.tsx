import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { SettingsProvider } from './contexts/settings/provider';
import { InteractionProvider } from '!/contexts/interaction';
import { ScaleProvider } from '!/contexts/scale';
import { EngineProvider } from '!/contexts/engine';
import { TimerProvider } from '!/contexts/timer/provider';

import App from './app/index';

import './locales/i18n';
import '!/styles/index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<HashRouter>
			<SettingsProvider>
				<TimerProvider>
					<InteractionProvider>
						<ScaleProvider>
							<EngineProvider>
								<App />
							</EngineProvider>
						</ScaleProvider>
					</InteractionProvider>
				</TimerProvider>
			</SettingsProvider>
		</HashRouter>
	</StrictMode>
);
