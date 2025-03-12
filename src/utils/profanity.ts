import badWords from '!/assets/bad-words.json';

export const optimizeArray = (words: string[]): string[] => {
	const wordSet = new Set(
		words
			.map((word) => word.toLowerCase())
			.filter((word) => word.indexOf(' ') === -1)
			.filter((word) => /^[a-z0-9]+$/i.test(word))
			.sort((a, b) => a.length - b.length)
	);

	for (const word of wordSet) {
		for (const longerWord of wordSet) {
			if (word !== longerWord && longerWord.includes(word)) {
				wordSet.delete(longerWord);
			}
		}
	}
	return [...wordSet];
};

const BAD_WORDS_REGEX = new RegExp(
	badWords
		.map((word) => `(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`)
		.join('|'),
	'gi'
);

export default (text: string): string =>
	text.replace(BAD_WORDS_REGEX, (match) => '*'.repeat(match.length));
