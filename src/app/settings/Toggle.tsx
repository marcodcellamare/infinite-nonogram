import { cloneElement, ReactElement, useEffect } from 'react';
import { useAudio } from '@/contexts/audio';
import classNames from 'classnames';

interface ToggleProps {
	label: string;
	icon?: ReactElement<{ className?: string }>;
	iconOff?: ReactElement<{ className?: string }>;
	checked: boolean;
	disabled?: boolean;
	onChange: (checked: boolean) => void;
}

const Toggle = ({
	label,
	icon,
	iconOff,
	checked,
	disabled = false,
	onChange,
}: ToggleProps) => {
	const { play: playSound } = useAudio();
	const iconProps = {
		className: 'text-svg text-lg',
	};

	useEffect(() => {
		if (disabled) onChange(false);
	}, [disabled, onChange]);

	return (
		<label
			className={classNames([
				'flex gap-2 items-center max-w-fit',
				'text-xs font-bold',
				!disabled ? 'cursor-pointer' : 'cursor-not-allowed',
				checked ? 'text-secondary' : 'text-base-content/50',
				disabled ? 'opacity-50' : 'hover:opacity-80',
			])}
			onPointerEnter={() =>
				!disabled ? playSound('grid-block-over') : null
			}>
			<input
				type='checkbox'
				className='toggle toggle-sm toggle-secondary disabled:opacity-100'
				checked={checked}
				disabled={disabled}
				onChange={(e) => {
					if (!disabled) {
						playSound('grid-block-correct');
						onChange(e.target.checked);
					}
				}}
			/>
			{icon ? (
				<>
					{icon && iconOff
						? checked
							? cloneElement(icon, iconProps)
							: cloneElement(iconOff, iconProps)
						: cloneElement(icon, iconProps)}{' '}
				</>
			) : null}
			<span>{label}</span>
		</label>
	);
};
export default Toggle;
