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
	const [isOver, setIsOver] = useState(false);
	const [isChanging, setIsChanging] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

		setIsChanging(true);
		timeoutRef.current = setTimeout(() => setIsChanging(false), 700);

		return () => {
			if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
		};
	}, [value]);

	return (
		<div>
			<div className='indicator indicator-middle flex w-full'>
				<span
					className={`indicator-item left-0 translate-x-1 -translate-y-1/2 badge badge-xs pointer-events-none gap-1 transition-[background-color,opacity,border-color,color] duration-300 backdrop-blur-xs badge-accent${
						isOver ? ' opacity-50' : ''
					}${
						isChanging
							? ' bg-accent/0 border-base-content text-base-content opacity-100'
							: ''
					}`}>
					{label}: <strong>{showValue ?? value}</strong>
				</span>
				<input
					type='range'
					className={`range ${
						isChanging ? 'range-accent' : 'range-primary'
					} w-full`}
					min={min}
					max={max}
					step={step}
					value={value}
					onPointerOver={() => setIsOver(true)}
					onPointerOut={() => setIsOver(false)}
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
