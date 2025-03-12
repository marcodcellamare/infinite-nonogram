import { v4 as uuidv4 } from 'uuid';
import cleanProfanity from './profanity';

export const cleanSeed = (seed: string): string => {
	return cleanProfanity(seed)
		.replace(/[^A-Za-z0-9*]/g, '')
		.substring(0, 50);
};

export const generateUser = (): string => {
	return `Nonogrammer*${uuidv4()
		.replace(/[^A-Za-z0-9*]/g, '')
		.substring(10)}`;
};

export const cleanUser = (user: string): string => {
	return cleanProfanity(user)
		.replace(/[^A-Za-z0-9*\s]/g, '')
		.replace(/\s+/g, ' ')
		.substring(0, 50);
};

export const storageName = (name: string): string => {
	return `infNono:${name}`;
};

export const openExternalLink = (link: string) => {
	window.open(link, '_blank', 'noopener, noreferrer');
};
