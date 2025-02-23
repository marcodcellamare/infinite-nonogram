import { ReactNode, useEffect, useRef, useState } from 'react';

import { CircleHelp } from 'lucide-react';

interface RangeProps {
	label: string;
	value: number;
	showValue?: number | string;
	min: number;
	max: number;
	step?: number;
	help?: ReactNode;
	onChange: (value: number) => void;
}

const Range = ({
	label,
	value,
	showValue,
	min,
	max,
	step = 1,
	help,
	onChange,
}: RangeProps) => {
	const [isChanging, setIsChanging] = useState(false);
	const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (timeout.current !== null) clearTimeout(timeout.current);

		setIsChanging(true);

		timeout.current = setTimeout(() => {
			setIsChanging(false);
		}, 700);
	}, [value]);

	return (
		<div>
			<div className='indicator indicator-middle flex w-full'>
				<span
					className={`indicator-item left-0 translate-x-1 -translate-y-1/2 badge badge-xs badge-accent border-none pointer-events-none gap-1 transition-[background-color] duration-300 backdrop-blur-xs ${
						!isChanging ? 'bg-accent/50' : 'bg-accent/90'
					}`}>
					{label}: <strong>{showValue ?? value}</strong>
				</span>
				<input
					type='range'
					className='range range-primary w-full'
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={(e) => onChange(Number(e.target.value))}
				/>
			</div>
			{help ? (
				<span className='text-xs hidden md:block text-primary italic mt-1'>
					<CircleHelp className='lucide-text' /> {help}
				</span>
			) : null}
		</div>
	);
};
export default Range;
