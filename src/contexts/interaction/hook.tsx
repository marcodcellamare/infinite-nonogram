import { useContext } from 'react';
import { InteractionContext } from './context';

export const useInteraction = () => {
	const context = useContext(InteractionContext);

	if (!context) {
		throw new Error(
			'useInteraction must be used within a InteractionProvider'
		);
	}
	return context;
};
