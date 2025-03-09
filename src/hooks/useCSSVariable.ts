const useCSSVariable = (variableName: string) => {
	const root = getComputedStyle(document.documentElement);
	return root.getPropertyValue(variableName).trim();
};
export default useCSSVariable;
