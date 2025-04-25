import { ReactNode, useEffect, useRef, useState } from 'react';
import { useAudio } from '!/contexts/audio';
import { useSettings } from '!/contexts/settings';
import classNames from 'classnames';

import { CircleHelpIcon } from 'lucide-react';

import { TimeoutType } from '!/types/timer';

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
	const { showEffects } = useSettings();
	const { play: playSound } = useAudio();

	const [isOver, setIsOver] = useState(false);
	const [isChanging, setIsChanging] = useState(false);

	const timeoutRef = useRef<TimeoutType>(null);

	const cleanup = () => {
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	useEffect(() => {
		cleanup();

		setIsChanging(true);
		timeoutRef.current = setTimeout(() => setIsChanging(false), 700);

		return () => cleanup();
	}, [value]);

	return (
		<div>
			<div className='indicator indicator-middle flex w-full'>
				<span
					className={classNames([
						'indicator-item gap-1 left-0 translate-x-1 -translate-y-1/2',
						'badge badge-xs badge-accent pointer-events-none',
						{
							'transition-[background-color,opacity,border-color,color] duration-300 backdrop-blur-xs':
								showEffects,
							'opacity-50': isOver,
							'bg-accent/0 border-base-content text-base-content opacity-100':
								isOver && isChanging,
						},
					])}>
					{label}: <strong>{showValue ?? value}</strong>
				</span>
				<input
					type='range'
					className={classNames([
						'range w-full',
						isOver && isChanging ? 'range-accent' : 'range-primary',
					])}
					min={min}
					max={max}
					step={step}
					value={value}
					onPointerEnter={() => {
						playSound('grid-block-over');
						setIsOver(true);
					}}
					onPointerLeave={() => setIsOver(false)}
					onPointerUp={() => playSound('grid-block-correct')}
					onChange={(e) => onChange(Number(e.target.value))}
				/>
			</div>
			{help ? (
				<span className='text-xs hidden md:block text-primary italic mt-1'>
					<CircleHelpIcon className='text-svg-inline' /> {help}
				</span>
			) : null}
		</div>
	);
};
export default Range;
