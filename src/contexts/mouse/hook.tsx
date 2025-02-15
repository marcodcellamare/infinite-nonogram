import { useContext } from 'react';
import { MouseContext } from './context';

export const useMouse = () => {
	const context = useContext(MouseContext);

	if (!context) {
		throw new Error('useMouse must be used within a MouseProvider');
	}
	return context;
};
