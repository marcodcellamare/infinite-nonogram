import { Hint } from '@_types/engine';

const Number = ({ total, isDone }: Hint) => {
	return <div className={isDone ? 'opacity-50' : ''}>{total}</div>;
};
export default Number;
