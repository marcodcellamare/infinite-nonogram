import { useContext } from 'react';
import { ScaleContext } from './context';

export const useScale = () => {
	const context = useContext(ScaleContext);

	if (!context) {
		throw new Error('useScale must be used within a ScaleProvider');
	}
	return context;
};
