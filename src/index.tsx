import { createRoot } from 'react-dom/client';
import ProvidersTree from './ProvidersTree';

import App from './app/index';

import './locales/i18n';
import '@/styles/index.css';

createRoot(document.getElementById('root')!).render(
	<ProvidersTree>
		<App />
	</ProvidersTree>
);
