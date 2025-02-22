import { Hint } from '!/types/engine';

const Number = ({ total, isDone }: Hint) => {
	return <div className={isDone ? 'opacity-50' : ''}>{total}</div>;
};
export default Number;
