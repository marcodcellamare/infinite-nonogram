import { Hint } from '@_types/engine';

const Number = ({ total, isDone }: Hint) => {
	return <span className={isDone ? 'opacity-50' : ''}>{total}</span>;
};
export default Number;
