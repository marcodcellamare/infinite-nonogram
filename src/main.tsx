import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/index';

import '@styles/config.css';
import '@styles/main.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
