import { useContext } from 'react';
import { EngineContext } from './context';

export const useEngine = () => {
	const context = useContext(EngineContext);

	if (!context) {
		throw new Error('useEngine must be used within a EngineProvider');
	}
	return context;
};
