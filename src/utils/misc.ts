export const cleanSeed = (seed: string): string => {
	return seed
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]/g, '')
		.trim()
		.substring(0, 20);
};
