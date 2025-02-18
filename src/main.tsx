import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { InteractionProvider } from '@contexts/interaction';
import { EngineProvider } from '@contexts/engine';
import App from './app/index';

// Initialize languages
import './locales/i18n';

import '@styles/config.css';
import '@styles/main.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<HashRouter>
			<InteractionProvider>
				<EngineProvider>
					<App />
				</EngineProvider>
			</InteractionProvider>
		</HashRouter>
	</StrictMode>
);
