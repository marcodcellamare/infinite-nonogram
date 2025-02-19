import { useEffect, useState } from 'react';

interface SizeProps {
	label: string;
	min?: number;
	max?: number;
	onChange: (value: number) => void;
}

const Size = ({ label, min = 5, max = 20, onChange }: SizeProps) => {
	const [value, setValue] = useState(min);

	useEffect(() => {
		onChange(value);
	}, [onChange, value]);

	return (
		<div className='flex flex-col sm:flex-row md:flex-col xl:flex-row gap-1 border-2 border-primary text-primary rounded p-1'>
			<span className='text-xs bg-white rounded py-1 px-3 min-w-30 text-center sm:text-left md:text-center xl:text-left'>
				{label}: <strong>{value}</strong>
			</span>
			<input
				type='range'
				className='range range-primary w-full'
				min={min}
				max={max}
				step={1}
				value={value}
				onChange={(e) => setValue(Number(e.target.value))}
			/>
		</div>
	);
};
export default Size;
