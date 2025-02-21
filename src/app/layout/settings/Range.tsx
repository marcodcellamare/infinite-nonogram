import { useEffect, useRef, useState } from 'react';

interface RangeProps {
	label: string;
	value: number;
	min?: number;
	max?: number;
	onChange: (value: number) => void;
}

const Range = ({ label, value, min = 5, max = 20, onChange }: RangeProps) => {
	const [isChanging, setIsChanging] = useState(false);
	const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (timeout.current !== null) clearTimeout(timeout.current);

		setIsChanging(true);

		timeout.current = setTimeout(() => {
			setIsChanging(false);
		}, 700);
	}, [onChange, value]);

	return (
		<div className='indicator indicator-center indicator-middle flex w-full'>
			<span
				className={`indicator-item badge badge-xs badge-primary pointer-events-none gap-1 transition-opacity duration-300${
					!isChanging ? ' opacity-0' : ''
				}`}>
				{label}: <strong>{value}</strong>
			</span>
			<input
				type='range'
				className='range range-primary w-full'
				min={min}
				max={max}
				step={1}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
			/>
		</div>
	);
};
export default Range;
