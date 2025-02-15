import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MouseProvider } from '@contexts/mouse';
import { EngineProvider } from '@contexts/engine';
import App from './app/index';

// Initialize languages
import './locales/i18n';

import '@styles/config.css';
import '@styles/main.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<MouseProvider>
			<EngineProvider>
				<App />
			</EngineProvider>
		</MouseProvider>
	</StrictMode>
);
