import { HintNumbersProps } from '!/types/engine';

const Number = ({ total, isDone }: HintNumbersProps) => {
	return <div className={isDone ? 'opacity-50' : ''}>{total}</div>;
};
export default Number;
