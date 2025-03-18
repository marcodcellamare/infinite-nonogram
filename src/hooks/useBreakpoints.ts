import { useRef, useState } from 'react';
import { useResize } from '!/contexts/resize';
import useWindowSize from './useWindowSize';
import useCSSVariable from './useCSSVariable';

import { remToPx } from '!/utils/math';

import { BreakpointsType } from '!/types/misc';

const useBreakpoints = () => {
	const { width } = useWindowSize();
	const [current, setCurrent] = useState<BreakpointsType>('xs');

	const breakpoints = useRef({
		xs: 0,
		sm: remToPx(parseFloat(useCSSVariable('--breakpoint-sm'))),
		md: remToPx(parseFloat(useCSSVariable('--breakpoint-md'))),
		lg: remToPx(parseFloat(useCSSVariable('--breakpoint-lg'))),
		xl: remToPx(parseFloat(useCSSVariable('--breakpoint-xl'))),
		'2xl': remToPx(parseFloat(useCSSVariable('--breakpoint-2xl'))),
	});

	useResize(() =>
		setCurrent(
			Object.entries(breakpoints.current)
				.reverse()
				.find(
					([_, breakpoint]) => width() >= breakpoint
				)?.[0] as BreakpointsType
		)
	);

	return { breakpoints, currentBreakpoint: current };
};

export default useBreakpoints;
