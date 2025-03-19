import { v4 as uuidv4 } from 'uuid';
import cleanProfanity from './profanity';

export const generateSeed = (): string => cleanSeed(uuidv4());

export const cleanSeed = (seed: string): string =>
	cleanProfanity(seed)
		.replace(/[^A-Za-z0-9*]/g, '')
		.substring(0, 50);

export const generateUser = (): string =>
	`Nonogrammer*${uuidv4()
		.replace(/[^A-Za-z0-9*]/g, '')
		.substring(10)}`;

export const cleanUser = (user: string): string =>
	cleanProfanity(user)
		.replace(/[^A-Za-z0-9*\s]/g, '')
		.replace(/\s+/g, ' ')
		.substring(0, 50);

export const isOnlyAsterisks = (str: string): boolean => /^[*]+$/.test(str);

export const storageName = (name: string): string => `infNono:${name}`;

export const cssVariable = (variableName: string) => {
	const root = getComputedStyle(document.documentElement);
	return root.getPropertyValue(variableName).trim();
};

export const windowSize = {
	width: () => window.innerWidth,
	height: () => window.innerHeight,
};

export const openExternalLink = (link: string) =>
	window.open(link, '_blank', 'noopener, noreferrer');
