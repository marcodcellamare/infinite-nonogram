import { HintProps } from '!/types/engine';

const Number = ({ total, isDone }: HintProps) => {
	return <div className={isDone ? 'opacity-50' : ''}>{total}</div>;
};
export default Number;
