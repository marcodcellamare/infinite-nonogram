import { useScale } from '!/contexts/scale';

import { HintNumbersProps } from '!/types/engine';

const Number = ({ total, isDone }: HintNumbersProps) => {
	const { scale } = useScale();

	return (
		<div
			className={`relative transition-opacity duration-500 ${
				isDone ? 'opacity-30' : 'opacity-100'
			}`}>
			<div
				className={`absolute top-1/2 left-1/2 -translate-1/2 aspect-square w-[1.3em] h-[1.3em] border border-dashed rounded-full tramsition-opacity transition-bg duration-400 ${
					isDone ? 'border-base-content' : 'border-base-content/0'
				}${scale < 0.8 ? ' opacity-0' : ''}`}
			/>
			<span className='relative'>{total}</span>
		</div>
	);
};
export default Number;
