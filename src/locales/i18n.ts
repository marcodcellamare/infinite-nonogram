import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Config from '!config';
import resources from './resources';

export const i18n = i18next
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)

	// Detect user language https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)

	// Init i18next https://www.i18next.com/overview/configuration-options
	.init({
		ns: Config.locale.groups.list,
		defaultNS: Config.locale.groups.default,
		resources: await resources(),
		fallbackLng: Config.locale.allowed.default,
		supportedLngs: Config.locale.allowed.list,
		returnEmptyString: true,
		debug: false,
		//process.env.NODE_ENV !== 'production' &&
		//process.env.NODE_ENV !== 'test',

		interpolation: {
			escapeValue: false,
		},
		// Returns an empty string when the translation is missing
		parseMissingKeyHandler: () => '',
	});
