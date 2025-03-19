import badWords from '!/assets/bad-words.json';
import Config from '!config';

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

const encryptToNumbers = (match: string): string => {
	const map: Record<string, string> = {
		a: '4',
		b: '8',
		e: '3',
		g: '9',
		i: '1',
		l: '1',
		o: '0',
		r: '2',
		s: '5',
		t: '7',
		z: '2',
	};
	return match
		.split('')
		.map((char, k) => (k > 0 ? map[char.toLowerCase()] || '*' : char))
		.join('');
};

const encryptToAsterisks = (match: string): string => '*'.repeat(match.length);

export default (text: string): string =>
	typeof Config.profanity === 'string'
		? text.replace(
				BAD_WORDS_REGEX,
				Config.profanity === 'numbers'
					? encryptToNumbers
					: encryptToAsterisks
		  )
		: text;
