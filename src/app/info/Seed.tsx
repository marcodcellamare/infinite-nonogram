import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSettings } from '!/contexts/settings/hook';
import { generateSeed } from '!/utils/misc';

import { IntervalType } from '!/types/timer';

const Seed = () => {
	const { seed, isRefreshing } = useSettings();

	const [randomSeed, setRandomSeed] = useState('');

	const intervalRef = useRef<IntervalType>(null);

	const splittedSeed = useMemo(() => {
		const str = randomSeed || seed;
		const minChars = 10;
		const maxParts = 5;

		if (str.length < minChars) return [str];

		const result = [];
		const parts = Math.min(Math.round(str.length / minChars), maxParts);
		const partLength = Math.ceil(str.length / parts);

		for (
			let i = 0;
			i < str.length && result.length < parts;
			i += partLength
		) {
			result.push(str.slice(i, i + partLength));
		}
		return result;
	}, [randomSeed, seed]);

	const randomize = useCallback(() => setRandomSeed(generateSeed()), []);

	const cleanup = () => {
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	useEffect(() => {
		cleanup();

		if (isRefreshing) {
			randomize();
			intervalRef.current = setInterval(randomize, 100);
		} else {
			setRandomSeed('');
		}
		return () => cleanup();
	}, [isRefreshing, randomize]);

	return (
		<div
			className='absolute top-0 bottom-0 left-0 right-0 pointer-events-none overflow-hidden contain-layout'
			aria-hidden={true}>
			<div className='absolute top-1/2 left-1/2 -translate-1/2 w-[110%] max-h-[100vh] text-[16vw] font-black italic leading-[0.8em] tracking-tighter text-base-100 text-center'>
				{splittedSeed.map((s, k) => (
					<div key={k}>{s}</div>
				))}
			</div>
		</div>
	);
};
export default Seed;
