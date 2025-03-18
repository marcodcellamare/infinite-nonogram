import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { FirebaseProvider } from './contexts/firebase';
import { ResizeProvider } from './contexts/resize';
import { SettingsProvider } from './contexts/settings/provider';
import { InteractionProvider } from '!/contexts/interaction';
import { ScaleProvider } from '!/contexts/scale';
import { EngineProvider } from '!/contexts/engine';
import { TimerProvider } from '!/contexts/timer/provider';
import { AudioProvider } from './contexts/audio';

import App from './app/index';

import './locales/i18n';
import '!/styles/index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<FirebaseProvider>
			<HashRouter>
				<ResizeProvider>
					<SettingsProvider>
						<AudioProvider>
							<TimerProvider>
								<InteractionProvider>
									<ScaleProvider>
										<EngineProvider>
											<App />
										</EngineProvider>
									</ScaleProvider>
								</InteractionProvider>
							</TimerProvider>
						</AudioProvider>
					</SettingsProvider>
				</ResizeProvider>
			</HashRouter>
		</FirebaseProvider>
	</StrictMode>
);
