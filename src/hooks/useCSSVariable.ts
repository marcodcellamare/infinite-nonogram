import { useCallback } from 'react';

const useCSSVariable = () => {
	return useCallback((variableName: string) => {
		const root = getComputedStyle(document.documentElement);
		return root.getPropertyValue(variableName).trim();
	}, []);
};
export default useCSSVariable;
