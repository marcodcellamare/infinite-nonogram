import { useCallback, useEffect, useRef, useState } from 'react';
import { useSettings } from '!/contexts/settings/hook';
import { generateSeed } from '!/utils/misc';

import { intervalType } from '!/types/timer';

const Seed = () => {
	const { seed, isRefreshing } = useSettings();

	const [randomSeed, setRandomSeed] = useState('');

	const intervalRef = useRef<intervalType>(null);

	const randomize = useCallback(() => setRandomSeed(generateSeed()), []);
	const cleanup = useCallback(() => {
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
		}
	}, []);

	useEffect(() => {
		cleanup();

		if (isRefreshing) {
			randomize();
			intervalRef.current = setInterval(() => randomize(), 30);
		} else {
			setRandomSeed('');
		}
		return () => cleanup();
	}, [isRefreshing, randomize, cleanup]);

	return (
		<div className='absolute top-0 bottom-0 left-0 right-0 pointer-events-none overflow-hidden'>
			<p className='absolute top-1/2 left-1/2 -translate-1/2 w-[110%] text-[16vw] sm:text-[13vw] md:text-[15vw] lg:text-[13vw] xl:text-[10vw] font-black italic leading-[0.8em] tracking-tighter text-base-100 break-all text-center'>
				{randomSeed || seed}
			</p>
		</div>
	);
};
export default Seed;
