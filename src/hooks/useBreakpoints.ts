import { useRef, useState } from 'react';
import { useResize } from '!/contexts/resize';

import { windowSize } from '!/utils/misc';
import { cssVariable } from '!/utils/misc';
import { remToPx } from '!/utils/math';

import { BreakpointsType } from '!/types/misc';

const useBreakpoints = () => {
	const [current, setCurrent] = useState<BreakpointsType | ''>('');

	const breakpoints = useRef({
		xs: 0,
		sm: remToPx(parseFloat(cssVariable('--breakpoint-sm'))),
		md: remToPx(parseFloat(cssVariable('--breakpoint-md'))),
		lg: remToPx(parseFloat(cssVariable('--breakpoint-lg'))),
		xl: remToPx(parseFloat(cssVariable('--breakpoint-xl'))),
		'2xl': remToPx(parseFloat(cssVariable('--breakpoint-2xl'))),
	});

	useResize(() => {
		setCurrent(
			Object.entries(breakpoints.current)
				.reverse()
				.find(
					([_, breakpoint]) => windowSize.width() >= breakpoint
				)?.[0] as BreakpointsType
		);
	});

	return { breakpoints, currentBreakpoint: current };
};

export default useBreakpoints;
