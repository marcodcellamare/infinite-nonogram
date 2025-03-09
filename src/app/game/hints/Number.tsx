import { useSettings } from '!/contexts/settings';
import { HintNumbersProps } from '!/types/engine';

const Number = ({ total, isDone }: HintNumbersProps) => {
	const { showEffects } = useSettings();

	return (
		<div
			className={`min-w-[1.3em] h-[1.3em] leading-[1.3em] text-center${
				showEffects ? ' transition-[opacity,color] duration-500' : ''
			} ${!isDone ? 'text-primary font-bold' : 'text-accent/50'}`}>
			{total}
		</div>
	);
};
export default Number;
