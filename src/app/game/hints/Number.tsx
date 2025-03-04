import { HintNumbersProps } from '!/types/engine';

const Number = ({ total, isDone }: HintNumbersProps) => {
	return (
		<div
			className={`min-w-[1.3em] h-[1.3em] leading-[1.3em] text-center transition-[opacity,color] duration-200 ${
				!isDone ? 'text-primary font-bold' : 'text-accent'
			}`}>
			{total}
		</div>
	);
};
export default Number;
